Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

let viewer;
let simulationState = { selectedMeteor: null, impactLocation: null };
let impactMarkerEntity = null;
let craterEntities = [];

window.initializeGoogleMaps = async function() {
    const { PlaceAutocompleteElement } = await google.maps.importLibrary("places");
    const searchInput = document.getElementById('location-search-input');
    
    const autocomplete = new PlaceAutocompleteElement({
        inputElement: searchInput,
    });

    autocomplete.addEventListener('gmp-placeselect', (event) => {
        const place = event.place;
        if (place.location) {
            syncUIToLocation(place.location.latitude, place.location.longitude, 1, place.displayName);
        }
    });
}

function loadGoogleMapsApi() {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) {
      console.error("Chave da API do Google não encontrada.");
      return;
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initializeGoogleMaps`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}


document.addEventListener('DOMContentLoaded', main);

async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    simulationState.selectedMeteor = {
        name: urlParams.get('name'),
        size: parseFloat(urlParams.get('size')),
        velocity: parseFloat(urlParams.get('velocity'))
    };

    if (!simulationState.selectedMeteor.name || isNaN(simulationState.selectedMeteor.size)) {
        window.location.href = '/pages/lista.html';
        return;
    }
    
    viewer = new Cesium.Viewer('cesium-container', {
        animation: false, baseLayerPicker: false, fullscreenButton: false, geocoder: false,
        homeButton: false, infoBox: false, sceneModePicker: false, selectionIndicator: false,
        timeline: false, navigationHelpButton: false, shouldAnimate: true
    });
    
    updateMeteorUI();
    setupEventHandlers();
    
    loadGoogleMapsApi();
}

function updateMeteorUI() {
    document.getElementById('meteor-name').textContent = simulationState.selectedMeteor.name;
    document.getElementById('meteor-size').textContent = `${simulationState.selectedMeteor.size.toFixed(0)} m`;
    document.getElementById('meteor-velocity').textContent = `${simulationState.selectedMeteor.velocity.toFixed(2)} km/s`;
}

function setupEventHandlers() {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((click) => {
        const isActionPanelVisible = !document.getElementById('warning-panel').classList.contains('hidden') ||
                                     !document.getElementById('results-panel').classList.contains('hidden') ||
                                     !document.getElementById('evacuation-panel').classList.contains('hidden');
        if (isActionPanelVisible) return;
        
        const cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);
        if (cartesian) {
            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            syncUIToLocation(
                Cesium.Math.toDegrees(cartographic.latitude),
                Cesium.Math.toDegrees(cartographic.longitude),
                cartographic.height
            );
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    document.getElementById('simulate-button').addEventListener('click', runFullSimulation);
    document.getElementById('reset-button').addEventListener('click', resetSimulation);
    document.getElementById('cancel-simulation-btn').addEventListener('click', cancelAndReselect);
    document.getElementById('show-evacuation-btn').addEventListener('click', showEvacuationPanel);
    document.getElementById('close-evacuation-btn').addEventListener('click', hideEvacuationPanel);
}

function showEvacuationPanel() {
    const evacuationPanel = document.getElementById('evacuation-panel');
    const asteroidNameEl = document.getElementById('evacuation-asteroid-name');
    asteroidNameEl.textContent = simulationState.selectedMeteor.name;
    evacuationPanel.classList.remove('hidden');
}

function hideEvacuationPanel() {
    document.getElementById('evacuation-panel').classList.add('hidden');
}

function cancelAndReselect() {
    document.getElementById('warning-panel').classList.add('hidden');
    document.getElementById('control-panel').classList.remove('hidden');
    simulationState.impactLocation = null;
    if (impactMarkerEntity) viewer.entities.remove(impactMarkerEntity);
    impactMarkerEntity = null;
    document.querySelector('#location-data span').textContent = 'Nenhum selecionado';
}

async function syncUIToLocation(lat, lon, elevation, name = null) {
    const locationDataEl = document.querySelector('#location-data span');
    simulationState.impactLocation = { lat, lon, elevation };
    if (impactMarkerEntity) viewer.entities.remove(impactMarkerEntity);
    impactMarkerEntity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat),
        point: { pixelSize: 15, color: Cesium.Color.RED, outlineColor: Cesium.Color.WHITE, outlineWidth: 3 },
    });
    
    const placeName = name || await reverseGeocode(lat, lon);
    locationDataEl.textContent = placeName;
    
    document.getElementById('control-panel').classList.add('hidden');
    document.getElementById('warning-panel').classList.remove('hidden');
}

async function reverseGeocode(lat, lon) {
    const locationDataEl = document.querySelector('#location-data span');
    locationDataEl.textContent = 'Buscando local...';
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`);
        const data = await response.json();
        return data.results[0] ? data.results[0].formatted_address : `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
    } catch (e) { return `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`; }
}

async function animate3DImpact(viewer, impactLocation) {
    if (impactMarkerEntity) { viewer.entities.remove(impactMarkerEntity); impactMarkerEntity = null; }
    
    const fallDurationSeconds = 4;
    const startHeight = 400000;
    const startPosition = Cesium.Cartesian3.fromDegrees(impactLocation.lon, impactLocation.lat, startHeight);
    const impactPosition = Cesium.Cartesian3.fromDegrees(impactLocation.lon, impactLocation.lat, impactLocation.elevation > 0 ? impactLocation.elevation : 0);

    const meteorEntity = viewer.entities.add({
        position: startPosition,
        model: { uri: '/assets/meteor.glb', minimumPixelSize: 128, maximumScale: 25000 },
    });

    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(impactLocation.lon + 0.8, impactLocation.lat - 0.8, startHeight / 4),
        orientation: { heading: Cesium.Math.toRadians(-45.0), pitch: Cesium.Math.toRadians(-30.0), roll: 0 },
        duration: 2
    });

    await new Promise(resolve => setTimeout(resolve, 2500));

    const startTime = viewer.clock.currentTime.clone();
    const impactTime = Cesium.JulianDate.addSeconds(startTime, fallDurationSeconds, new Cesium.JulianDate());
    const positionProperty = new Cesium.SampledPositionProperty();
    positionProperty.addSample(startTime, startPosition);
    positionProperty.addSample(impactTime, impactPosition);

    meteorEntity.position = positionProperty;
    meteorEntity.orientation = new Cesium.VelocityOrientationProperty(positionProperty);
    viewer.trackedEntity = meteorEntity;

    await new Promise(resolve => {
        setTimeout(() => {
            if (viewer.entities.contains(meteorEntity)) {
                viewer.entities.remove(meteorEntity);
            }
            viewer.trackedEntity = undefined;
            resolve();
        }, fallDurationSeconds * 1000);
    });
}

function drawCrater(viewer, impactLocation, craterDiameterKm) {
    if (craterEntities.length > 0) {
        craterEntities.forEach(e => viewer.entities.remove(e));
        craterEntities = [];
    }
    const finalRadiusMeters = (craterDiameterKm * 1000) / 2;
    if (finalRadiusMeters <= 0) return;
    const animationDurationSeconds = 2.5;
    const startTime = viewer.clock.currentTime.clone();
    const radiusProperty = new Cesium.CallbackProperty(function(time, result) {
        const elapsedTime = Cesium.JulianDate.secondsDifference(time, startTime);
        const progress = Math.min(elapsedTime / animationDurationSeconds, 1.0);
        return finalRadiusMeters * progress;
    }, false);
    craterEntities.push(viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(impactLocation.lon, impactLocation.lat),
        ellipse: { semiMinorAxis: radiusProperty, semiMajorAxis: radiusProperty, material: Cesium.Color.RED.withAlpha(0.4), clampToGround: true }
    }));
    craterEntities.push(viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(impactLocation.lon, impactLocation.lat),
        ellipse: { semiMinorAxis: radiusProperty, semiMajorAxis: radiusProperty, material: new Cesium.PolylineGlowMaterialProperty({ glowPower: 0.25, color: Cesium.Color.ORANGERED }), clampToGround: true, fill: false, outline: true, outlineColor: Cesium.Color.ORANGERED, outlineWidth: 2 }
    }));
}

async function runFullSimulation() {
    const warningPanel = document.getElementById('warning-panel');
    const resultsPanel = document.getElementById('results-panel');
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    
    if (!simulationState.selectedMeteor || !simulationState.impactLocation) return;
    
    warningPanel.classList.add('hidden');
    
    await animate3DImpact(viewer, simulationState.impactLocation);
    
    resultsPanel.classList.remove('hidden');
    resultsPanel.querySelector('h2').textContent = "Calculando Impacto...";
    try {
        const response = await fetch(`${API_BASE_URL}/api/calculate_impact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ size: simulationState.selectedMeteor.size, velocity: simulationState.selectedMeteor.velocity, elevation: simulationState.impactLocation.elevation })
        });
        if (!response.ok) { throw new Error(`Falha na conexão com o backend.`); }
        const results = await response.json();
        
        resultsPanel.querySelector('h2').textContent = "Resultados do Impacto";
        document.getElementById('result-velocity').textContent = `${results.impact_velocity_km_s} km/s`;
        document.getElementById('result-energy').textContent = `${results.energy_megatons} Megatons`;
        document.getElementById('result-crater').textContent = `${results.crater_diameter_km} km`;
        document.getElementById('result-magnitude').textContent = `${results.seismic_magnitude}`;
        document.getElementById('result-hiroshima').textContent = `~${results.hiroshima_equivalent.toLocaleString('pt-BR')}`;
        document.getElementById('result-tsar').textContent = `~${results.tsar_bombs_equivalent.toLocaleString('pt-BR')}`;
        
        drawCrater(viewer, simulationState.impactLocation, results.crater_diameter_km);
    } catch (error) {
        console.error("Erro ao calcular impacto:", error);
        resultsPanel.querySelector('h2').textContent = "Erro na Simulação";
    }
}

function resetSimulation() {
    if (craterEntities.length > 0) {
        craterEntities.forEach(e => viewer.entities.remove(e));
        craterEntities = [];
    }
    window.location.href = '/pages/lista.html';
}
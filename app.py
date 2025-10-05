from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from datetime import date, timedelta
import os
import math

app = Flask(__name__)
CORS(app)


NASA_API_KEY = "9b1BMDAfJzsYJG6hSsQG4eRly2g3fw35wAVyBpB9"

# --- FUNÇÕES DE FÍSICA E SEGURANÇA ---
def safe_float(value, default=0.0):
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def calculate_asteroid_mass(avg_diameter_m: float, density_kg_m3: float = 2000) -> float:
    if not avg_diameter_m or avg_diameter_m == 0: return 0.0
    radius_m = avg_diameter_m / 2
    volume_m3 = (4/3) * math.pi * (radius_m ** 3)
    return density_kg_m3 * volume_m3

def calculate_kinetic_energy(mass_kg: float, velocity_km_s: float) -> dict:
    if not mass_kg or not velocity_km_s: return {"joules": 0.0, "megatons_tnt": 0.0}
    velocity_m_s = velocity_km_s * 1000
    energy_joules = 0.5 * mass_kg * (velocity_m_s ** 2)
    energy_megatons_tnt = energy_joules / 4.184e15
    return {"joules": energy_joules, "megatons_tnt": energy_megatons_tnt}

def calculate_impact_effects(energy_joules: float) -> dict:
    if energy_joules == 0:
        return {"seismic_magnitude_mw": 0, "crater_diameter_km": 0, "hiroshima_bombs": 0, "tsar_bombs": 0}

    seismic_magnitude_mw = (2/3) * math.log10(energy_joules) - 6.0
    crater_diameter_m = 0.07 * (energy_joules ** (1/3.4))
    hiroshima_equivalency = energy_joules / 6.3e13
    tsar_equivalency = energy_joules / 2.1e17
    
    return {
        "seismic_magnitude_mw": round(seismic_magnitude_mw, 1),
        "crater_diameter_km": round(crater_diameter_m / 1000, 2),
        "hiroshima_bombs": round(hiroshima_equivalency),
        "tsar_bombs": round(tsar_equivalency, 2)
    }

# --- FUNÇÃO DE CLASSIFICAÇÃO DE PERIGO---
def classify_hazard_level(energy_megatons: float) -> dict:
    if energy_megatons < 1:
        return {"level": "Risco Baixo", "class": "risk-low"}
    elif energy_megatons < 100:
        return {"level": "Risco Moderado", "class": "risk-moderate"}
    elif energy_megatons < 50000:
        return {"level": "Risco Elevado", "class": "risk-high"}
    else:
        return {"level": "Risco Cataclísmico", "class": "risk-cataclysmic"}

# --- FUNÇÃO get_weekly_asteroids ---
def get_weekly_asteroids():
    """Busca os asteroides da próxima semana e retorna uma lista com classificação de perigo."""
    start_date = date.today()
    end_date = start_date + timedelta(days=7)
    url = "https://api.nasa.gov/neo/rest/v1/feed"
    params = {"start_date": start_date.strftime("%Y-%m-%d"), "end_date": end_date.strftime("%Y-%m-%d"), "api_key": NASA_API_KEY}
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        feed_data = response.json()
        all_neos = []
        for date_key in feed_data.get("near_earth_objects", {}):
            all_neos.extend(feed_data["near_earth_objects"][date_key])

        if not all_neos:
            return []

        processed_neos = []
        for neo in all_neos:
            approach_data = neo.get("close_approach_data", [{}])[0]
            size_m = safe_float(neo.get("estimated_diameter", {}).get("meters", {}).get("estimated_diameter_max", 0))
            velocity_km_s = safe_float(approach_data.get("relative_velocity", {}).get("kilometers_per_second", 0))

            # Pré-cálculo da energia e do nível de perigo para o filtro
            mass = calculate_asteroid_mass(size_m)
            energy = calculate_kinetic_energy(mass, velocity_km_s)
            hazard_level = classify_hazard_level(energy["megatons_tnt"])

            processed_neos.append({
                "id": neo.get("id"),
                "name": neo.get("name"),
                "size_meters": size_m,
                "velocity_km_s": velocity_km_s,
                "hazard_level": hazard_level
            })
        return processed_neos
    except Exception as e:
        print(f"Um erro ocorreu ao buscar asteroides: {e}")
        return None 

# --- ENDPOINTS DA API ---
@app.route('/api/asteroids')
def asteroids_endpoint():
    return jsonify(get_weekly_asteroids())

@app.route('/api/calculate_impact', methods=['POST'])
def calculate_impact_endpoint():
    data = request.get_json()
    meteor_size_m = safe_float(data.get('size'))
    meteor_velocity_km_s = safe_float(data.get('velocity'))
    
    mass_kg = calculate_asteroid_mass(meteor_size_m)
    energy = calculate_kinetic_energy(mass_kg, meteor_velocity_km_s)
    effects = calculate_impact_effects(energy["joules"])
    
    result = {
        "impact_velocity_km_s": round(meteor_velocity_km_s, 2),
        "energy_megatons": round(energy["megatons_tnt"], 2),
        "crater_diameter_km": effects["crater_diameter_km"],
        "seismic_magnitude": effects["seismic_magnitude_mw"],
        "hiroshima_equivalent": effects["hiroshima_bombs"],
        "tsar_bombs_equivalent": effects["tsar_bombs"]
    }
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
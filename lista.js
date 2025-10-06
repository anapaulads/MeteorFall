const API_URL = 'https://meteorfall.onrender.com/api/asteroids';

let allAsteroids = [];

const listContainer = document.getElementById('asteroid-list');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderAsteroids(asteroidsToRender) {
    listContainer.innerHTML = '';
    if (asteroidsToRender.length === 0) {
        listContainer.innerHTML = '<p class="loading-message">Nenhum asteroide encontrado com este critério.</p>';
        return;
    }

    asteroidsToRender.forEach(asteroid => {
        const cardLink = document.createElement('a');
        cardLink.className = 'asteroid-card-link';
        
        const params = new URLSearchParams({
            name: asteroid.name,
            size: asteroid.size_meters,
            velocity: asteroid.velocity_km_s
        });
        cardLink.href = `simulador.html?${params.toString()}`;

        cardLink.innerHTML = `
            <article class="asteroid-card ${asteroid.hazard_level.class}">
                <h3>${asteroid.name}</h3>
                <div class="asteroid-info">
                    <p><strong>Tamanho:</strong> ${parseFloat(asteroid.size_meters).toFixed(0)} metros (diâmetro)</p>
                    <p><strong>Velocidade:</strong> ${parseFloat(asteroid.velocity_km_s).toFixed(2)} km/s</p>
                </div>
                <div class="hazard-status">${asteroid.hazard_level.level}</div>
            </article>
        `;
        listContainer.appendChild(cardLink);
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.dataset.filter;
        if (filterValue === 'all') {
            renderAsteroids(allAsteroids);
        } else {
            const filteredAsteroids = allAsteroids.filter(asteroid => asteroid.hazard_level.level === filterValue);
            renderAsteroids(filteredAsteroids);
        }
    });
});

async function fetchAndDisplayAsteroids() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erro na rede`);
        allAsteroids = await response.json();
        renderAsteroids(allAsteroids);
    } catch (error) {
        console.error("Falha ao buscar dados:", error);
        listContainer.innerHTML = '<p class="error-message">Não foi possível carregar os dados. Verifique se o servidor Python está rodando.</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayAsteroids);
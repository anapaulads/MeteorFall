import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */const l="/api/asteroids";let a=[];const t=document.getElementById("asteroid-list"),i=document.querySelectorAll(".filter-btn");function n(e){if(t.innerHTML="",e.length===0){t.innerHTML='<p class="loading-message">Nenhum asteroide encontrado com este critério.</p>';return}e.forEach(s=>{const r=document.createElement("a");r.className="asteroid-card-link";const o=new URLSearchParams({name:s.name,size:s.size_meters,velocity:s.velocity_km_s});r.href=`/pages/simulador.html?${o.toString()}`,r.innerHTML=`
            <article class="asteroid-card ${s.hazard_level.class}">
                <h3>${s.name}</h3>
                <div class="asteroid-info">
                    <p><strong>Tamanho:</strong> ${parseFloat(s.size_meters).toFixed(0)} metros (diâmetro)</p>
                    <p><strong>Velocidade:</strong> ${parseFloat(s.velocity_km_s).toFixed(2)} km/s</p>
                </div>
                <div class="hazard-status">${s.hazard_level.level}</div>
            </article>
        `,t.appendChild(r)})}i.forEach(e=>{e.addEventListener("click",()=>{i.forEach(r=>r.classList.remove("active")),e.classList.add("active");const s=e.dataset.filter;if(s==="all")n(a);else{const r=a.filter(o=>o.hazard_level.level===s);n(r)}})});async function c(){try{const e=await fetch(l);if(!e.ok)throw new Error("Erro na rede");a=await e.json(),n(a)}catch(e){console.error("Falha ao buscar dados:",e),t.innerHTML='<p class="error-message">Não foi possível carregar os dados. Verifique se o servidor Python está rodando.</p>'}}document.addEventListener("DOMContentLoaded",c);

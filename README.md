# MeteorFall ☄️ Simulação Interativa de Impacto de Asteroides

| Status          | Simulação ao Vivo                                  | Repositório                                      |
| --------------- | -------------------------------------------------- | ------------------------------------------------ |
| ![Status da API](https://img.shields.io/badge/App-Online-brightgreen) | [meteorfall.onrender.com](https://meteorfall.onrender.com/) | [GitHub](https://github.com/anapaulads/MeteorFall) |

<p align="right"><a href="#-english-version">🇬🇧 Click here for the English version</a></p>

---

## 🎬 Demonstração Rápida

O vídeo abaixo, criado para o desafio NASA Space Apps Challenge, demonstra as principais funcionalidades do MeteorFall em ação, desde a seleção de um asteroide até a simulação do impacto e o alerta de defesa civil.

<a href="https://youtu.be/K1H9yasswzk" target="_blank">
  <img src="https://i.ibb.co/BHVnV65T/Captura-de-tela-2025-10-11-174242.png" alt="Demonstração do Projeto MeteorFall" width="100%">
</a>

*(Clique na imagem para assistir ao vídeo no YouTube)*

## 📝 Sobre o Projeto

O **MeteorFall** nasceu como uma solução para o desafio **NASA Space Apps Challenge**, com o objetivo de transformar dados astronómicos complexos numa simulação visualmente impactante e acessível. A nossa plataforma explora o cenário "e se?", permitindo que qualquer pessoa compreenda a magnitude do impacto de um asteroide em qualquer lugar do mundo.

O verdadeiro diferencial do projeto, no entanto, está em conectar a simulação física à resposta humana. O MeteorFall incorpora uma camada de **defesa civil** que transforma a experiência: em vez de apenas observar o impacto, o utilizador recebe um alerta de emergência simulado, completo com protocolos de segurança acionáveis baseados em planos de contingência reais. Isto transforma um evento astronómico complexo numa poderosa lição sobre preparação, resiliência e tomada de decisão.

## ✨ Funcionalidades Principais

* **Dados da NASA em Tempo Real:** A lista de asteroides é alimentada em tempo real pela API de Objetos Próximos à Terra (NEO) da NASA.
* **Globo 3D Interativo:** Utiliza **CesiumJS** para renderizar um globo 3D onde o utilizador pode selecionar o local exato do impacto com um clique ou através da busca de localizações.
* **Cálculo de Impacto Físico:** O backend em Python calcula os efeitos do impacto, incluindo diâmetro da cratera, energia libertada (Megatons) e magnitude sísmica equivalente.
* **Contexto Educacional:** Traduz a energia libertada em equivalentes compreensíveis, como o número de bombas de Hiroshima ou da Tsar Bomba.
* **Alerta de Defesa Civil:** Simula um alerta de emergência, educando o utilizador sobre ações de preparação e protocolos de segurança.
* **Animação de Impacto:** Visualiza a trajetória e a colisão do meteoro no globo 3D para uma experiência mais imersiva.

## 🛠️ Tecnologias Utilizadas

| Categoria       | Tecnologias                                                                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) |
| **Globo 3D** | ![Cesium](https://img.shields.io/badge/CesiumJS-007FFF?logo=cesium&logoColor=white)                                                                                                                   |
| **Backend** | ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white) ![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?logo=gunicorn&logoColor=white)      |
| **APIs Externas** | ![NASA](https://img.shields.io/badge/NASA_API-0B3D91?logo=nasa&logoColor=white) ![Google Places](https://img.shields.io/badge/Google_Places_API-4285F4?logo=google&logoColor=white)                |
| **Deploy** | ![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white)                                                                                                                      |

## 🚀 Como Executar Localmente

Siga os passos abaixo para configurar e executar o projeto no seu ambiente.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/anapaulads/MeteorFall.git](https://github.com/anapaulads/MeteorFall.git)
    cd MeteorFall
    ```

2.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo `.env` na **raiz do projeto** e adicione a chave do backend:
        ```
        NASA_API_KEY=SUA_CHAVE_DA_NASA_AQUI
        ```
    * Crie um arquivo `.env` na **pasta `frontend/`** e adicione as chaves do frontend:
        ```
        VITE_GOOGLE_API_KEY=SUA_CHAVE_DO_GOOGLE_AQUI
        VITE_CESIUM_ION_TOKEN=SUA_CHAVE_DO_CESIUM_AQUI
        VITE_API_URL=[http://127.0.0.1:5000](http://127.0.0.1:5000)
        ```

3.  **Execute a Aplicação (Frontend e Backend juntos):**
    O projeto está configurado para iniciar ambos os servidores com um único comando.
    ```bash
    # Navegue até a pasta do frontend
    cd frontend
    # Instale as dependências (apenas na primeira vez)
    npm install
    # Inicie os dois servidores
    npm start
    ```
    * O frontend estará acessível em `http://localhost:5173` (ou outra porta indicada no terminal).
    * O backend estará a rodar em `http://localhost:5000`.

## 📂 Estrutura do Projeto
```
├── frontend/               # Aplicação visual com Vite
│   ├── public/
│   ├── src/
│   ├── pages/
│   ├── index.html
│   └── package.json
├── app.py                  # Servidor Backend em Flask
├── requirements.txt        # Dependências do Python
├── .gitignore
└── README.md
```

## 👨‍💻 Autores

* **Ana Paula** - [LinkedIn](https://www.linkedin.com/in/anapaulads) | [GitHub](https://github.com/anapaulads)
* **Morpheu** - [GitHub](https://github.com/morpheu-Capitulino) 
* **Miguel** - [GitHub](https://github.com/MiguelMaranhao) 
* **Kathelen** - [GitHub](https://github.com/kathy2004)
* **Mahalia** - [Linkedin](https://www.linkedin.com/in/mahalia-azevedo-813185322/)

---

<div id="-english-version"></div>

<details>
<summary>🇬🇧 English Version</summary>

# MeteorFall ☄️ Interactive Asteroid Impact Simulation

| Status      | Live Simulation                                    | Repository                                       |
| ----------- | -------------------------------------------------- | ------------------------------------------------ |
| ![App Status](https://img.shields.io/badge/App-Online-brightgreen) | [meteorfall.onrender.com](https://meteorfall.onrender.com/) | [GitHub](https://github.com/anapaulads/MeteorFall) |

---

## 🎬 Quick Demo

The video below, created for the NASA Space Apps Challenge, demonstrates MeteorFall's main features in action, from selecting an asteroid to simulating the impact and the civil defense alert.

<a href="https://youtu.be/K1H9yasswzk" target="_blank">
  <img src="https://i.ibb.co/BHVnV65T/Captura-de-tela-2025-10-11-174242.png" alt="MeteorFall Project Demo" width="100%">
</a>

*(Click the image to watch the video on YouTube)*


## 📝 About The Project

**MeteorFall** was created as a solution for the **NASA Space Apps Challenge**, with the goal of transforming complex astronomical data into a visually impactful and accessible simulation. Our platform explores the "what if?" scenario, allowing anyone to understand the magnitude of an asteroid impact event anywhere in the world.

However, our true differentiator lies in connecting the physical simulation to the human response. MeteorFall incorporates a **civil defense layer** that transforms the experience: instead of just observing the impact, the user receives a simulated emergency alert, complete with actionable safety protocols based on real contingency plans. This turns a complex astronomical event into a powerful lesson on preparedness, resilience, and decision-making.

## ✨ Key Features

* **Real-time NASA Data:** The list of asteroids is fed in real-time by NASA's Near-Earth Object (NEO) API.
* **Interactive 3D Globe:** Utilizes **CesiumJS** to render a 3D globe where the user can select the exact impact location with a click or through a location search.
* **Physical Impact Calculation:** The Python backend calculates the effects of the impact, including crater diameter, energy released (in Megatons), and equivalent seismic magnitude.
* **Educational Context:** Translates the released energy into understandable equivalents, such as the number of Hiroshima or Tsar Bombs.
* **Civil Defense Alert:** Simulates an emergency alert, educating the user on preparedness actions and safety protocols.
* **Impact Animation:** Visualizes the meteor's trajectory and collision on the 3D globe for a more immersive experience.

## 🛠️ Technologies Used

| Category        | Technologies                                                                                                                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) |
| **3D Globe** | ![Cesium](https://img.shields.io/badge/CesiumJS-007FFF?logo=cesium&logoColor=white)                                                                                                                   |
| **Backend** | ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white) ![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?logo=gunicorn&logoColor=white)      |
| **External APIs** | ![NASA](https://img.shields.io/badge/NASA_API-0B3D91?logo=nasa&logoColor=white) ![Google Places](https://img.shields.io/badge/Google_Places_API-4285F4?logo=google&logoColor=white)                |
| **Deployment** | ![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white)                                                                                                                      |

## 🚀 How to Run Locally

Follow the steps below to set up and run the project in your local environment.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/anapaulads/MeteorFall.git](https://github.com/anapaulads/MeteorFall.git)
    cd MeteorFall
    ```

2.  **Set Up Environment Variables:**
    * Create a `.env` file in the **project root** and add the backend key:
        ```
        NASA_API_KEY=YOUR_NASA_KEY_HERE
        ```
    * Create a `.env` file in the **`frontend/` folder** and add the frontend keys:
        ```
        VITE_GOOGLE_API_KEY=YOUR_GOOGLE_KEY_HERE
        VITE_CESIUM_ION_TOKEN=YOUR_CESIUM_KEY_HERE
        VITE_API_URL=[http://127.0.0.1:5000](http://127.0.0.1:5000)
        ```

3.  **Run the Application (Frontend & Backend together):**
    The project is configured to launch both servers with a single command.
    ```bash
    # Navigate to the frontend folder
    cd frontend
    # Install dependencies (only the first time)
    npm install
    # Start both servers
    npm start
    ```
    * The frontend will be accessible at `http://localhost:5173` (or another port shown in the terminal).
    * The backend will be running at `http://localhost:5000`.

## 📂 Project Structure
```
├── frontend/               # Visual application with Vite
│   ├── public/
│   ├── src/
│   ├── pages/
│   ├── index.html
│   └── package.json
├── app.py                  # Flask Backend Server
├── requirements.txt        # Python dependencies
├── .gitignore
└── README.md
```

## 👨‍💻 Authors

* **Ana Paula** - [LinkedIn](https://www.linkedin.com/in/anapaulads) | [GitHub](https://github.com/anapaulads)
* **Morpheu** - [GitHub](https://github.com/morpheu-Capitulino) 
* **Miguel** - [GitHub](https://github.com/MiguelMaranhao) 
* **Kathelen** - [GitHub](https://github.com/kathy2004)
* **Mahalia** - [Linkedin](https://www.linkedin.com/in/mahalia-azevedo-813185322/)

* 
</details>

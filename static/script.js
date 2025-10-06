const quizData = [
    { question: "Qual é a função da Escala de Torino?", options: ["Avaliar danos ambientais após impacto", "Comunicar a ameaça de um NEO (0 a 10)", "Medir a temperatura após colisão", "Calcular a velocidade de um meteoro"], answer: "Comunicar a ameaça de um NEO (0 a 10)" },
    { question: "Por que a Escala de Palermo é considerada uma limitação?", options: ["Porque só considera meteoros grandes", "Porque traduz as consequências práticas ao público", "Porque é abstrata e apenas quantifica o risco", "Porque é usada apenas na Rússia"], answer: "Porque é abstrata e apenas quantifica o risco" },
    { question: "Qual foi o maior risco de saúde destacado em impactos de meteoros?", options: ["Colapso da infraestrutura e falta de água potável", "Aumento da taxa de natalidade", "Expansão agrícola rápida", "Aquecimento global imediato"], answer: "Colapso da infraestrutura e falta de água potável" },
    { question: "O evento de Chelyabinsk (2013) causou mais de 1.000 feridos. Qual foi o principal mecanismo das lesões?", options: ["Onda de choque quebrando vidros", "Contato direto com o meteoro", "Radiação cósmica", "Explosão nuclear secundária"], answer: "Onda de choque quebrando vidros" },
    { question: "O evento de Chicxulub (66 milhões de anos) levou à extinção de 75% das espécies. Qual foi a principal causa?", options: ["Nuvem de poeira bloqueando o Sol", "Água fervente nos oceanos", "Radiação solar intensa", "Tsunamis globais"], answer: "Nuvem de poeira bloqueando o Sol" },
    { question: "Quando um meteoro se desintegra no ar sobre uma cidade, qual é o principal risco?", options: ["Formação de uma cratera profunda", "Onda de choque global", "Estrondo sônico que quebra vidros e causa pânico", "Tsunami devastador"], answer: "Estrondo sônico que quebra vidros e causa pânico" },
    { question: "Qual a consequência de um “Risco Moderado” em área rural?", options: ["Apenas queda de árvores pela onda de choque", "Cratera de quilômetros e destruição regional", "Extinção imediata da vida no planeta", "Apenas ondas locais sem danos maiores"], answer: "Cratera de quilômetros e destruição regional" },
    { question: "Um impacto em oceano que gera um “Tsunami Regional Devastador” é considerado?", options: ["Risco Leve", "Risco Moderado", "Risco Médio", "Risco Alto"], answer: "Risco Moderado" },
    { question: "O que caracteriza um “Risco Médio” quando o impacto acontece em áreas urbanas?", options: ["Apenas explosão aérea com vento forte", "Catástrofe de Extinção Total, com colapso imediato da biosfera", "Tsunami local sem maiores danos", "Cratera regional que destrói cidades próximas"], answer: "Catástrofe de Extinção Total, com colapso imediato da biosfera" },
    { question: "Qual alternativa descreve um “Risco Alto” em impacto oceânico?", options: ["Apenas ondas perigosas para embarcações", "Tsunami que atinge apenas o litoral próximo", "Colapso climático global temporário", "Cataclismo que vaporiza parte dos oceanos e altera o clima permanentemente"], answer: "Cataclismo que vaporiza parte dos oceanos e altera o clima permanentemente" }
];

let currentQuestion = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const introSection = document.getElementById("intro-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const questionCounterEl = document.getElementById("question-counter");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
    introSection.classList.add("hidden");
    resultSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    nextBtn.style.display = "none";
    const current = quizData[currentQuestion];

    questionCounterEl.textContent = `Questão ${currentQuestion + 1} de ${quizData.length}`;
    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
        btn.addEventListener('click', () => selectAnswer(btn, option));
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(btn, selectedOption) {
    const correct = quizData[currentQuestion].answer;
    
    if (selectedOption === correct) {
        score++;
        btn.classList.add("correct");
    } else {
        btn.classList.add("incorrect");
    }

    Array.from(optionsEl.children).forEach(button => {
        button.disabled = true;
        if (button.textContent === correct) {
            button.classList.add("correct");
        }
    });

    nextBtn.style.display = "block";
}

function showResult() {
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    resultEl.textContent = `Sua pontuação final foi ${score} de ${quizData.length}!`;
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});
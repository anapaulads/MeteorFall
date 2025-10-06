document.addEventListener('DOMContentLoaded', () => {
    const simulationButton = document.getElementById('start-simulation-btn');
    if (simulationButton) {
        simulationButton.addEventListener('click', () => {
            console.log("Botão clicado! Redirecionando para lista.html...");
            window.location.href = 'lista.html';
        });
    } else {
        console.error("ERRO: O botão com ID 'start-simulation-btn' não foi encontrado no HTML.");
    }

    const quizButton = document.getElementById('quiz-btn');
    if (quizButton) {
        quizButton.addEventListener('click', () => {
            console.log("Botão de Quiz clicado! Redirecionando para quiz.html...");
            window.location.href = 'quiz.html';
        });
    } else {
        console.error("ERRO: O botão com ID 'quiz-btn' não foi encontrado no HTML.");
    }
});
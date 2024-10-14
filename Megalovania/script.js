// Função que carrega os recursos do jogo
function loadResources(stage, callback) {
    console.log(`Carregando recursos para a fase: ${stage}`);
    // Simulação de carregamento com um timeout
    setTimeout(() => {
        console.log(`Recursos da fase ${stage} carregados.`);
        callback(); // Chama o callback após o carregamento
    }, 1000); // Simula 1 segundo de carregamento
}

// Função para iniciar o jogo
function startGame() {
    console.log("Iniciando o jogo...");
    initGame(); // Chame uma função que inicializa o jogo
}

// Função para inicializar o jogo
function initGame() {
    console.log("Configuração do jogo realizada.");
    // Aqui você deve colocar a lógica para configurar o jogo
    gameLoop(); // Inicia o loop do jogo
}

// Loop do jogo
function gameLoop() {
    // Lógica de atualização e renderização do jogo aqui
    requestAnimationFrame(gameLoop); // Chama novamente o loop
}

// Função que verifica e força duas atualizações da página
function forceDoubleReload(stage) {
    if (!sessionStorage.getItem('reloadedOnce')) {
        sessionStorage.setItem('reloadedOnce', 'true');
        location.reload();
    } else {
        sessionStorage.removeItem('reloadedOnce');
        loadResources(stage, () => {
            startGame(); // Aqui você chama a função para iniciar o jogo
        });
    }
}

// Adiciona um evento de clique a todos os botões
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function (event) {
        const stage = this.getAttribute('data-stage'); // Obtém o estágio a partir do atributo data
        // Redireciona imediatamente para a página da fase
        window.location.href = `${stage}.php`;
    });
});

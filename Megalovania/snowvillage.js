const canvas = document.getElementById('snowvillageCanvas');
const ctx = canvas.getContext('2d');

// Função que verifica e força duas atualizações da página
function forceDoubleReload() {
    // Verifica se o navegador já foi atualizado uma vez
    if (!sessionStorage.getItem('reloadedOnce')) {
        // Se não foi atualizado, marca como atualizado e recarrega a página
        sessionStorage.setItem('reloadedOnce', 'true');
        location.reload(); // Recarrega a página
    } else {
        // Se já foi atualizado uma vez, remove a marcação e carrega o jogo normalmente
        sessionStorage.removeItem('reloadedOnce');
        startGame(); // Aqui você chama a função para iniciar o jogo
    }
}

var gameover = 0;

const avatarImage = new Image();
avatarImage.src = 'heart.png';

const snowballImage = new Image();
snowballImage.src = 'snowball.png';

const bossImage = new Image();
bossImage.src = 'pinguim.png';

const heartgoldImage = new Image();
heartgoldImage.src = 'heartgold.png';

const snowballtwoImage = new Image();
snowballtwoImage.src = 'snowball.png';

const snowballthreeImage = new Image();
snowballthreeImage.src = 'snowball.png'; // Usando a mesma imagem, pode mudar se necessário

const snowballfourImage = new Image();
snowballfourImage.src = 'snowball.png'; // Usando a mesma imagem, pode mudar se necessário

const gmImage = new Image();
gmImage.src = 'gameover.png';

const avatar = {
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 50,
    width: 70,
    height: 50,
    speed: 9, // Velocidade do avatar
};

const gm = {
    x: canvas.width / 2 - 250,
    y: canvas.height / 2 - 150,
    width: 500,
    height: 250,
};

const snowball = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 100,
    height: 90,
    speed: 9,
};

const snowballthree = {
    x: -100, // Inicia fora da tela à esquerda
    y: Math.random() * (canvas.height - 90), // Posição aleatória vertical
    width: 100,
    height: 90,
    speed: 6, // Velocidade da snowball three
};

const snowballfour = {
    x: canvas.width + 100, // Inicia fora da tela à direita
    y: Math.random() * (canvas.height - 90), // Posição aleatória vertical
    width: 100,
    height: 90,
    speed: 3, // Velocidade da snowball four
};

const boss = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 270,
    height: 170,
    speed: 2,
};

const heartgold = {
    x: Math.random() * (canvas.width - 40),
    y: -50,
    width: 100,
    height: 90,
    speed: 5,
};

const snowballtwo = {
    x: Math.random() * (canvas.width - 40),
    y: -50,
    width: 100,
    height: 90,
    speed: 13,
};

let keys = {};
let score = 500; // Total de pontos inicial
const scoreElement = document.getElementById('score');

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Função para mover o avatar
function moveAvatar() {
    if (keys['ArrowUp'] && avatar.y > 0) {
        avatar.y -= avatar.speed;
    }
    if (keys['ArrowDown'] && avatar.y < canvas.height - avatar.height) {
        avatar.y += avatar.speed;
    }
    if (keys['ArrowLeft'] && avatar.x > 0) {
        avatar.x -= avatar.speed;
    }
    if (keys['ArrowRight'] && avatar.x < canvas.width - avatar.width) {
        avatar.x += avatar.speed;
    }
    if (keys['w'] && avatar.y > 0) {
        avatar.y -= avatar.speed;
    }
    if (keys['s'] && avatar.y < canvas.height - avatar.height) {
        avatar.y += avatar.speed;
    }
    if (keys['a'] && avatar.x > 0) {
        avatar.x -= avatar.speed;
    }
    if (keys['d'] && avatar.x < canvas.width - avatar.width) {
        avatar.x += avatar.speed;
    }

    handleGamepadInput();
}

// Função para lidar com o controle do gamepad
function handleGamepadInput() {
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
        const gp = gamepads[0];

        // Eixos para movimentação
        if (gp.axes[1] < -0.5 && avatar.y > 0) avatar.y -= avatar.speed; // Para cima
        if (gp.axes[1] > 0.5 && avatar.y < canvas.height - avatar.height) avatar.y += avatar.speed; // Para baixo
        if (gp.axes[0] < -0.5 && avatar.x > 0) avatar.x -= avatar.speed; // Para esquerda
        if (gp.axes[0] > 0.5 && avatar.x < canvas.width - avatar.width) avatar.x += avatar.speed; // Para direita
    }
}

function movesnowball() {
    snowball.y += snowball.speed;

    // Reiniciar a snowball quando ela alcançar o fundo do canvas
    if (snowball.y > canvas.height) {
        snowball.x = Math.random() * (canvas.width - 50);
        snowball.y = -50;
    }
}

function movesnowballthree() {
    snowballthree.x += snowballthree.speed;

    // Reiniciar a snowballthree quando ela alcançar o lado direito do canvas
    if (snowballthree.x > canvas.width) {
        snowballthree.x = -100; // Reinicia fora da tela à esquerda
        snowballthree.y = Math.random() * (canvas.height - 90); // Nova posição vertical aleatória
    }
}

function movesnowballfour() {
    snowballfour.x -= snowballfour.speed;

    // Reiniciar a snowballfour quando ela alcançar o lado esquerdo do canvas
    if (snowballfour.x < -100) {
        snowballfour.x = canvas.width + 100; // Reinicia fora da tela à direita
        snowballfour.y = Math.random() * (canvas.height - 90); // Nova posição vertical aleatória
    }
}

function moveboss() {
    boss.y += boss.speed;

    // Reiniciar a snowball quando ela alcançar o fundo do canvas
    if (boss.y > canvas.height) {
        boss.x = Math.random() * (canvas.width - 50);
        boss.y = -50;
    }
}

function moveheartgold() {
    heartgold.y += heartgold.speed;

    // Reiniciar a snowball quando ela alcançar o fundo do canvas
    if (heartgold.y > canvas.height) {
        heartgold.x = Math.random() * (canvas.width - 50);
        heartgold.y = -50;
    }
}

function movesnowballtwo() {
    snowballtwo.y += snowballtwo.speed;

    // Reiniciar a snowball quando ela alcançar o fundo do canvas
    if (snowballtwo.y > canvas.height) {
        snowballtwo.x = Math.random() * (canvas.width - 50);
        snowballtwo.y = -50;
    }
}

function checkCollision() {
    if (
        avatar.x < heartgold.x + heartgold.width &&
        avatar.x + avatar.width > heartgold.x &&
        avatar.y < heartgold.y + heartgold.height &&
        avatar.y + avatar.height > heartgold.y
    ) {
        // Colisão detectada
        score += 60; // aumenta 60 pontos
        updateScore();
        heartgold.y = -heartgold.height; // Reposicionar após a coleta
        heartgold.x = Math.random() * (canvas.width - heartgold.width); // Nova posição aleatória
    }
    if (
        avatar.x < snowball.x + snowball.width &&
        avatar.x + avatar.width > snowball.x &&
        avatar.y < snowball.y + snowball.height &&
        avatar.y + avatar.height > snowball.y
    ) {
        // Colisão detectada
        score -= 6; // Subtrai 5 pontos
        updateScore();
    }
    if (
        avatar.x < boss.x + boss.width &&
        avatar.x + avatar.width > boss.x &&
        avatar.y < boss.y + boss.height &&
        avatar.y + avatar.height > boss.y
    ) {
        // Colisão detectada
        score -= 20; // Subtrai 25 pontos
        updateScore();
    }
    if (
        avatar.y < snowballtwo.y + snowballtwo.height &&
        avatar.y + avatar.height > snowballtwo.y &&
        avatar.x < snowballtwo.x + snowballtwo.width &&
        avatar.x + avatar.width > snowballtwo.x
    ) {
        // Colisão detectada
        score -= 4; // Subtrai 5 pontos
        updateScore();
    }
    if (
        avatar.y < snowballthree.y + snowballthree.height &&
        avatar.y + avatar.height > snowballthree.y &&
        avatar.x < snowballthree.x + snowballthree.width &&
        avatar.x + avatar.width > snowballthree.x
    ) {
        // Colisão detectada
        score -= 7; // Subtrai 10 pontos para a snowballthree
        updateScore();
    }
    if (
        avatar.y < snowballfour.y + snowballfour.height &&
        avatar.y + avatar.height > snowballfour.y &&
        avatar.x < snowballfour.x + snowballfour.width &&
        avatar.x + avatar.width > snowballfour.x
    ) {
        // Colisão detectada
        score -= 7; // Subtrai 10 pontos para a snowballfour
        updateScore();
    }
    if (score < 0) {
        score = 0;
        gameover = 1;
        snowball.x = -150;
        boss.x = -150;
        heartgold.x = -150;
        snowballtwo.x = -150;
        snowballthree.x = -150; // Para garantir que a snowballthree pare
        snowballfour.x = -150; // Para garantir que a snowballfour pare
    }
}

function updateScore() {
    scoreElement.textContent = `Pontuação: ${score}`;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawAvatar() {
    ctx.drawImage(avatarImage, avatar.x, avatar.y, avatar.width, avatar.height);
}

function drawGm() {
    ctx.drawImage(gmImage, gm.x, gm.y, gm.width, gm.height);
}

function drawsnowball() {
    ctx.drawImage(snowballImage, snowball.x, snowball.y, snowball.width, snowball.height);
}

function drawsnowballthree() {
    ctx.drawImage(snowballthreeImage, snowballthree.x, snowballthree.y, snowballthree.width, snowballthree.height);
}

function drawsnowballfour() {
    ctx.drawImage(snowballfourImage, snowballfour.x, snowballfour.y, snowballfour.width, snowballfour.height);
}

function drawboss() {
    ctx.drawImage(bossImage, boss.x, boss.y, boss.width, boss.height);
}

function drawheartgold() {
    ctx.drawImage(heartgoldImage, heartgold.x, heartgold.y, heartgold.width, heartgold.height);
}

function drawsnowballtwo() {
    ctx.drawImage(snowballtwoImage, snowballtwo.x, snowballtwo.y, snowballtwo.width, snowballtwo.height);
}

function gameLoop() {
    clearCanvas();

    if (gameover == 0) {
        moveAvatar();
        movesnowball();
        movesnowballthree();
        movesnowballfour();
        moveboss();
        moveheartgold();
        movesnowballtwo();
        checkCollision();
        drawAvatar();
        drawsnowball();
        drawsnowballthree();
        drawsnowballfour();
        drawboss();
        drawheartgold();
        drawsnowballtwo();
    } else {
        drawGm();

        document.querySelector("[data-reiniciarBtn]").addEventListener('click', () => {
            window.location.reload();
        });
    }

    updateScore();
    requestAnimationFrame(gameLoop);
}

avatarImage.onload = () => {
    snowballImage.onload = () => {
        bossImage.onload = () => {
            heartgoldImage.onload = () => {
                snowballtwoImage.onload = () => {
                    snowballthreeImage.onload = () => {
                        snowballfourImage.onload = () => {
                            updateScore();
                            gameLoop();
                        };
                    };
                };
            };
        };
    };
};

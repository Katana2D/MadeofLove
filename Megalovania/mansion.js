const canvas = document.getElementById('mansionCanvas');
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

const fireblueImage = new Image();
fireblueImage.src = 'fireblue.png';

const firebluerisingImage = new Image();
fireblueImage.src = 'fireblueH.png';

const bossImage = new Image();
bossImage.src = 'madamskull.png';

const heartgoldImage = new Image();
heartgoldImage.src = 'heartgold.png';

const gmImage = new Image();
gmImage.src = 'gameover.png';

const avatar = {
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 50,
    width: 70,
    height: 50,
    speed: 8, // Velocidade do avatar
};

const gm = {
    x: canvas.width / 2 - 250,
    y: canvas.height / 2 - 150,
    width: 500,
    height: 250,
};

// fireblue que desce
const fireblue = {
    x: Math.random() * (canvas.width - 100), // Posição horizontal aleatória
    y: -90, // Começa fora da tela, na parte superior
    width: 100,
    height: 90,
    speed: 9, // Velocidade de descida
};

// Novo firebluerising que se moverá de baixo para cima
const firebluerising = {
    x: Math.random() * (canvas.width - 100), // Posição horizontal aleatória
    y: canvas.height, // Começa fora da tela, na parte inferior
    width: 100,
    height: 90,
    speed: 8, // Velocidade de subida
};

// fireblueleft que se moverá da esquerda para a direita
const fireblueleft = {
    x: -100, // Começa fora da tela, à esquerda
    y: Math.random() * (canvas.height - 90), // Posição vertical aleatória
    width: 100,
    height: 90,
    speed: 6, // Velocidade
};

// fireblueright que se moverá da direita para a esquerda
const fireblueright = {
    x: canvas.width, // Começa fora da tela, à direita
    y: Math.random() * (canvas.height - 90), // Posição vertical aleatória
    width: 100,
    height: 90,
    speed: 4, // Velocidade
};

// Boss com comportamento de aparecer em locais aleatórios
const boss = {
    x: Math.random() < 0.5 ? -170 : canvas.width, // Inicia fora da tela à esquerda ou à direita
    y: Math.random() * (canvas.height - 150), // Posição vertical aleatória
    width: 170,
    height: 200,
    speed: 6,
};

const heartgold = {
    x: Math.random() * (canvas.width - 40),
    y: -50,
    width: 100,
    height: 90,
    speed: 6,
};

let keys = {};
let gamepadIndex = null;
let score = 500;

const scoreElement = document.getElementById('score');

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

window.addEventListener("gamepadconnected", (event) => {
    gamepadIndex = event.gamepad.index;
    console.log("Gamepad conectado no índice:", gamepadIndex);
});

window.addEventListener("gamepaddisconnected", () => {
    console.log("Gamepad desconectado.");
    gamepadIndex = null;
});

function handleGamepadInput() {
    const gamepad = navigator.getGamepads()[gamepadIndex];
    if (!gamepad) return;

    const threshold = 0.2;
    const [leftStickX, leftStickY] = [gamepad.axes[0], gamepad.axes[1]];

    if (Math.abs(leftStickY) > threshold) {
        avatar.y += leftStickY * avatar.speed;
    }
    if (Math.abs(leftStickX) > threshold) {
        avatar.x += leftStickX * avatar.speed;
    }

    // Limita o movimento dentro da tela
    avatar.x = Math.max(0, Math.min(canvas.width - avatar.width, avatar.x));
    avatar.y = Math.max(0, Math.min(canvas.height - avatar.height, avatar.y));
}

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
}

// Função para mover fireblue
function movefireblue() {
    fireblue.y += fireblue.speed; // Move para baixo
    if (fireblue.y > canvas.height) { // Se sair da tela pela parte inferior
        fireblue.x = Math.random() * (canvas.width - fireblue.width); // Nova posição horizontal aleatória
        fireblue.y = -fireblue.height; // Reposiciona no topo da tela
    }
}

// Função para mover firebluerising
function movefirebluerising() {
    firebluerising.y -= firebluerising.speed; // Move para cima
    if (firebluerising.y < -firebluerising.height) { // Se sair da tela para cima
        firebluerising.x = Math.random() * (canvas.width - firebluerising.width); // Nova posição horizontal
        firebluerising.y = canvas.height; // Reposiciona para a parte inferior da tela
    }
}

// Função para mover fireblueleft (da esquerda para a direita)
function movefireblueleft() {
    fireblueleft.x += fireblueleft.speed; // Move para a direita
    if (fireblueleft.x > canvas.width) { // Se sair da tela pela parte direita
        fireblueleft.x = -100; // Reposiciona fora da tela à esquerda
        fireblueleft.y = Math.random() * (canvas.height - fireblueleft.height); // Nova posição vertical aleatória
    }
}

// Função para mover fireblueright (da direita para a esquerda)
function movefireblueright() {
    fireblueright.x -= fireblueright.speed; // Move para a esquerda
    if (fireblueright.x < -fireblueright.width) { // Se sair da tela pela parte esquerda
        fireblueright.x = canvas.width; // Reposiciona fora da tela à direita
        fireblueright.y = Math.random() * (canvas.height - fireblueright.height); // Nova posição vertical aleatória
    }
}

// Função para mover boss
function moveboss() {
    boss.x += boss.speed; // Move para a direita
    if (boss.x > canvas.width) {
        boss.x = Math.random() < 0.5 ? -boss.width : canvas.width; // Volta para a esquerda ou para a direita
        boss.y = Math.random() * (canvas.height - 150); // Nova posição vertical
    }
}

function moveheartgold() {
    heartgold.y += heartgold.speed;
    if (heartgold.y > canvas.height) {
        heartgold.x = Math.random() * (canvas.width - 50);
        heartgold.y = -50;
    }
}

function checkCollision() {
    // Colisão com fireblue (movendo da direita para a esquerda)
    if (
        avatar.x < fireblue.x + fireblue.width &&
        avatar.x + avatar.width > fireblue.x &&
        avatar.y < fireblue.y + fireblue.height &&
        avatar.y + avatar.height > fireblue.y
    ) {
        score -= 7;
        updateScore();
    }

    // Colisão com firebluerising (movendo de baixo para cima)
    if (
        avatar.x < firebluerising.x + firebluerising.width &&
        avatar.x + avatar.width > firebluerising.x &&
        avatar.y < firebluerising.y + firebluerising.height &&
        avatar.y + avatar.height > firebluerising.y
    ) {
        score -= 6;
        updateScore();
    }

    // Colisão com fireblueleft (movendo da esquerda para a direita)
    if (
        avatar.x < fireblueleft.x + fireblueleft.width &&
        avatar.x + avatar.width > fireblueleft.x &&
        avatar.y < fireblueleft.y + fireblueleft.height &&
        avatar.y + avatar.height > fireblueleft.y
    ) {
        score -= 8;
        updateScore();
    }

    // Colisão com fireblueright (movendo da direita para a esquerda)
    if (
        avatar.x < fireblueright.x + fireblueright.width &&
        avatar.x + avatar.width > fireblueright.x &&
        avatar.y < fireblueright.y + fireblueright.height &&
        avatar.y + avatar.height > fireblueright.y
    ) {
        score -= 7;
        updateScore();
    }

    // Colisão com boss
    if (
        avatar.x < boss.x + boss.width &&
        avatar.x + avatar.width > boss.x &&
        avatar.y < boss.y + boss.height &&
        avatar.y + avatar.height > boss.y
    ) {
        score -= 13;
        updateScore();
    }

    // Colisão com heartgold
    if (
        avatar.x < heartgold.x + heartgold.width &&
        avatar.x + avatar.width > heartgold.x &&
        avatar.y < heartgold.y + heartgold.height &&
        avatar.y + avatar.height > heartgold.y
    ) {
        score += 80;
        updateScore();
        heartgold.y = -heartgold.height; // Reposicionar após a coleta
        heartgold.x = Math.random() * (canvas.width - heartgold.width); // Nova posição aleatória
    }

    // Verifica se a pontuação caiu para zero ou menos
    if (score < 0) {
        score = 0;
        gameover = 1;
        fireblue.x = -150; // Posiciona fireblue fora da tela
        firebluerising.x = -150; // Posiciona firebluerising fora da tela
        fireblueleft.x = -150; // Posiciona fireblueleft fora da tela
        fireblueright.x = -150; // Posiciona fireblueright fora da tela
        boss.x = -150; // Posiciona boss fora da tela
        heartgold.x = -150; // Posiciona heartgold fora da tela
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

function drawfireblue() {
    ctx.drawImage(fireblueImage, fireblue.x, fireblue.y, fireblue.width, fireblue.height);
}

function drawfirebluerising() {
    ctx.drawImage(fireblueImage, firebluerising.x, firebluerising.y, firebluerising.width, firebluerising.height);
}

function drawfireblueleft() {
    ctx.drawImage(fireblueImage, fireblueleft.x, fireblueleft.y, fireblueleft.width, fireblueleft.height);
}

function drawfireblueright() {
    ctx.drawImage(fireblueImage, fireblueright.x, fireblueright.y, fireblueright.width, fireblueright.height);
}

function drawboss() {
    ctx.drawImage(bossImage, boss.x, boss.y, boss.width, boss.height);
}

function drawheartgold() {
    ctx.drawImage(heartgoldImage, heartgold.x, heartgold.y, heartgold.width, heartgold.height);
}

function gameLoop() {
    clearCanvas();

    if (gameover == 0) {
        moveAvatar();
        if (gamepadIndex !== null) {
            handleGamepadInput();
        }
        movefireblue();
        movefirebluerising();
        movefireblueleft();
        movefireblueright();
        moveboss();
        moveheartgold();
        checkCollision();
        drawAvatar();
        drawfireblue();
        drawfirebluerising();
        drawfireblueleft();
        drawfireblueright();
        drawboss();
        drawheartgold();
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
    fireblueImage.onload = () => {
        bossImage.onload = () => {
            heartgoldImage.onload = () => {
                updateScore();
                gameLoop();
            };
        };
    };
};

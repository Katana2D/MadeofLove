const canvas = document.getElementById('insanemodeCanvas');
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

const bonesImage = new Image();
bonesImage.src = 'bones.png';

const bluebonesImage = new Image();
bluebonesImage.src = 'bluebones.png';

const bossImage = new Image();
bossImage.src = 'boss.png';

const heartgoldImage = new Image();
heartgoldImage.src = 'heartgold.png';

const guardImage = new Image();
guardImage.src = 'guard.png';

const darkswordImage = new Image();
darkswordImage.src = 'darksword.png';


const gmImage = new Image();
gmImage.src = 'gameover.png';

const avatar = {
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 50,
    width: 70,
    height: 50,
    speed: 6, // Velocidade do satélite
};
const gm = {
    x: canvas.width / 2 - 250,
    y: canvas.height / 2 - 150,
    width: 500,
    height: 250,
};

const bones = {
    x: Math.random() * (canvas.width - 50), // Posição aleatória no topo
    y: -50, // Inicia acima do canvas
    width: 100,
    height: 90,
    speed: 8, // Velocidade de movimento vertical
};
const bluebones = {
    x: Math.random() * (canvas.width - 50), // Posição aleatória no topo
    y: -50, // Inicia acima do canvas
    width: 40,
    height: 180,
    speed: 9, // Velocidade de movimento vertical
};
const boss = {
    x: Math.random() * (canvas.width - 50), // Posição aleatória no topo
    y: -50, // Inicia acima do canvas
    width: 170,
    height: 150,
    speed: 10, // Velocidade de movimento vertical
};

const heartgold = {
    x: Math.random() * (canvas.width - 40), // Posição aleatória no topo
    y: -50, // Inicia acima do canvas
    width: 100,
    height: 90,
    speed: 8, // Velocidade de movimento vertical
};

const guard = {
    x: canvas.width - 100,
    y: Math.random() * (canvas.height - 90),
    width: 200,
    height: 180,
    speed: 9,
};

const darksword = {
    y: Math.random() * (canvas.height - 40), // Posição aleatória no eixo y
    x: -50, // Inicia à esquerda do canvas no eixo x
    width: 100,
    height: 90,
    speed: 10, // Velocidade de movimento horizontal
};

let keys = {};
let score = 500; // Total de pontos inicial

const scoreElement = document.getElementById('score');

// Variáveis para controle de gamepad
let gamepadIndex = null;

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Detecta gamepad conectado
window.addEventListener('gamepadconnected', (event) => {
    gamepadIndex = event.gamepad.index;
    console.log("Gamepad conectado:", event.gamepad);
});

// Detecta gamepad desconectado
window.addEventListener('gamepaddisconnected', () => {
    gamepadIndex = null;
    console.log("Gamepad desconectado");
});

function handleGamepadInput() {
    if (gamepadIndex !== null) {
        const gamepad = navigator.getGamepads()[gamepadIndex];

        // Usamos o eixo X e Y do analógico esquerdo
        const leftStickX = gamepad.axes[0]; // Eixo X
        const leftStickY = gamepad.axes[1]; // Eixo Y
        const deadZone = 0.1;

        if (Math.abs(leftStickX) > deadZone) {
            avatar.x += leftStickX * avatar.speed;
        }
        if (Math.abs(leftStickY) > deadZone) {
            avatar.y += leftStickY * avatar.speed;
        }

        // D-pad como alternativa aos movimentos
        if (gamepad.buttons[12].pressed) { // Cima
            avatar.y -= avatar.speed;
        }
        if (gamepad.buttons[13].pressed) { // Baixo
            avatar.y += avatar.speed;
        }
        if (gamepad.buttons[14].pressed) { // Esquerda
            avatar.x -= avatar.speed;
        }
        if (gamepad.buttons[15].pressed) { // Direita
            avatar.x += avatar.speed;
        }
    }
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

function movebones() {
    bones.y += bones.speed;

    if (bones.y > canvas.height) {
        bones.x = Math.random() * (canvas.width - 50);
        bones.y = -50;
    }
}

function movebluebones() {
    bluebones.y += bluebones.speed;

    if (bluebones.y > canvas.height) {
        bluebones.x = Math.random() * (canvas.width - 50);
        bluebones.y = -50;
    }
}

function moveboss() {
    boss.y += boss.speed;

    if (boss.y > canvas.height) {
        boss.x = Math.random() * (canvas.width - 50);
        boss.y = -50;
    }
}

function moveheartgold() {
    heartgold.y += heartgold.speed;

    if (heartgold.y > canvas.height) {
        heartgold.x = Math.random() * (canvas.width - 50);
        heartgold.y = -50;
    }
}

function moveguard() {
    guard.x -= guard.speed;
    if (guard.x < -guard.width) {
        guard.x = canvas.width;
        guard.y = Math.random() * (canvas.height - guard.height);
    }
}

function movedarksword() {
    darksword.x += darksword.speed; // Movimento horizontal

    if (darksword.x > canvas.width) { // Verifica se saiu da tela no eixo x
        darksword.x = -darksword.width; // Reposiciona fora da tela à esquerda
        darksword.y = Math.random() * (canvas.height - darksword.height); // Nova posição aleatória no eixo y
    }
}

function checkCollision() {
    if (
        avatar.x < heartgold.x + heartgold.width &&
        avatar.x + avatar.width > heartgold.x &&
        avatar.y < heartgold.y + heartgold.height &&
        avatar.y + avatar.height > heartgold.y
    ) {
        score += 100;
        updateScore();
        heartgold.y = -heartgold.height; // Reposicionar após a coleta
        heartgold.x = Math.random() * (canvas.width - heartgold.width); // Nova posição aleatória
    }
    if (
        avatar.x < bones.x + bones.width &&
        avatar.x + avatar.width > bones.x &&
        avatar.y < bones.y + bones.height &&
        avatar.y + avatar.height > bones.y
    ) {
        score -= 3;
        updateScore();
    }
    if (
        avatar.x < boss.x + boss.width &&
        avatar.x + avatar.width > boss.x &&
        avatar.y < boss.y + boss.height &&
        avatar.y + avatar.height > boss.y
    ) {
        score -= 20;
        updateScore();
    }
    if (
        avatar.x < bluebones.x + bluebones.width &&
        avatar.x + avatar.width > bluebones.x &&
        avatar.y < bluebones.y + bluebones.height &&
        avatar.y + avatar.height > bluebones.y
    ) {
        score -= 5;
        updateScore();
    }

    // Colisão com guard - subtrair da pontuação
    if (
        avatar.x < guard.x + guard.width &&
        avatar.x + avatar.width > guard.x &&
        avatar.y < guard.y + guard.height &&
        avatar.y + avatar.height > guard.y
    ) {
        score -= 9;
        updateScore();
    }

    if (
        avatar.y < darksword.y + darksword.height &&
        avatar.y + avatar.height > darksword.y &&
        avatar.x < darksword.x + darksword.width &&
        avatar.x + avatar.width > darksword.x
    ) {
        score -= 5;
        updateScore();
    }
    if (score < 0) {
        score = 0;
        gameover = 1;
        bones.x = -150;
        bluebones.x = -150;
        boss.x = -150;
        heartgold.x = -150;
        guard.x = -150;
        darksword.x = -150;
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

function drawbones() {
    ctx.drawImage(bonesImage, bones.x, bones.y, bones.width, bones.height);
}

function drawbluebones() {
    ctx.drawImage(bluebonesImage, bluebones.x, bluebones.y, bluebones.width, bluebones.height);
}

function drawboss() {
    ctx.drawImage(bossImage, boss.x, boss.y, boss.width, boss.height);
}

function drawheartgold() {
    ctx.drawImage(heartgoldImage, heartgold.x, heartgold.y, heartgold.width, heartgold.height);
}

function drawguard() {
    ctx.drawImage(guardImage, guard.x, guard.y, guard.width, guard.height);
}

function drawdarksword() {
    ctx.drawImage(darkswordImage, darksword.x, darksword.y, darksword.width, darksword.height); // Corrigido para desenhar nas posições corretas
}

function gameLoop() {
    clearCanvas();

    if (gameover == 0) {
        handleGamepadInput(); // Adiciona suporte ao controle
        moveAvatar();
        movebones();
        movebluebones();
        moveboss();
        moveheartgold();
        moveguard();
        movedarksword();
        checkCollision();
        drawAvatar();
        drawbones();
        drawbluebones();
        drawboss();
        drawheartgold();
        drawguard();
        drawdarksword();
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
    bonesImage.onload = () => {
        bluebonesImage.onload = () => {
            bossImage.onload = () => {
                heartgoldImage.onload = () => {
                    guardImage.onload = () => {
                        darkswordImage.onload = () => {
                            updateScore();
                            gameLoop();
                        };
                    };
                };
            };
        };
    };
};

const canvas = document.getElementById('castleCanvas');
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

const fireballImage = new Image();
fireballImage.src = 'fireball.png';

const fireblueImage = new Image();
fireblueImage.src = 'fireblue.png';

const bossImage = new Image();
bossImage.src = 'bigguard.png';

const heartgoldImage = new Image();
heartgoldImage.src = 'heartgold.png';

const guardImage = new Image();
guardImage.src = 'guard.png';

const gmImage = new Image();
gmImage.src = 'gameover.png';

const avatar = {
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 50,
    width: 70,
    height: 50,
    speed: 7,
};

const gm = {
    x: canvas.width / 2 - 250,
    y: canvas.height / 2 - 150,
    width: 500,
    height: 250,
};

// Itens do jogo
const fireball = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 80,
    height: 100,
    speed: 8,
};

const fireblue = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 100,
    height: 100,
    speed: 10,
};

const boss = {
    x: 0,
    y: Math.random() * (canvas.height - 150),
    width: 250,
    height: 200,
    speed: 3,
};

const heartgold = {
    x: Math.random() * (canvas.width - 40),
    y: -50,
    width: 100,
    height: 90,
    speed: 4,
};

const guard = {
    x: canvas.width - 100,
    y: Math.random() * (canvas.height - 90),
    width: 200,
    height: 180,
    speed: 6,
};

let keys = {};
let score = 500;
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

// Funções para mover os itens
function moveFireball() {
    fireball.y += fireball.speed;
    if (fireball.y > canvas.height) {
        fireball.x = Math.random() * (canvas.width - fireball.width);
        fireball.y = -fireball.height;
    }
}

function moveFireblue() {
    fireblue.y += fireblue.speed;
    if (fireblue.y > canvas.height) {
        fireblue.x = Math.random() * (canvas.width - fireblue.width);
        fireblue.y = -fireblue.height;
    }
}

function moveboss() {
    boss.x += boss.speed;
    if (boss.x > canvas.width) {
        boss.x = 0;
        boss.y = Math.random() * (canvas.height - boss.height);
    }
}

function moveheartgold() {
    heartgold.y += heartgold.speed;
    if (heartgold.y > canvas.height) {
        heartgold.x = Math.random() * (canvas.width - heartgold.width);
        heartgold.y = -heartgold.height;
    }
}

function moveguard() {
    guard.x -= guard.speed;
    if (guard.x < -guard.width) {
        guard.x = canvas.width;
        guard.y = Math.random() * (canvas.height - guard.height);
    }
}

// Função para verificar colisões
function checkCollision() {
    // Colisão com heartgold - reposicionar
    if (
        avatar.x < heartgold.x + heartgold.width &&
        avatar.x + avatar.width > heartgold.x &&
        avatar.y < heartgold.y + heartgold.height &&
        avatar.y + avatar.height > heartgold.y
    ) {
        score += 100;
        updateScore();
        heartgold.y = -heartgold.height; // Reposicionar após a coleta

    }

    // Colisão com fireball - subtrair da pontuação
    if (
        avatar.x < fireball.x + fireball.width &&
        avatar.x + avatar.width > fireball.x &&
        avatar.y < fireball.y + fireball.height &&
        avatar.y + avatar.height > fireball.y
    ) {
        score -= 5;
        updateScore();
    }

    // Colisão com boss - subtrair da pontuação
    if (
        avatar.x < boss.x + boss.width &&
        avatar.x + avatar.width > boss.x &&
        avatar.y < boss.y + boss.height &&
        avatar.y + avatar.height > boss.y
    ) {
        score -= 7;
        updateScore();
    }

    // Colisão com fireblue - subtrair da pontuação
    if (
        avatar.x < fireblue.x + fireblue.width &&
        avatar.x + avatar.width > fireblue.x &&
        avatar.y < fireblue.y + fireblue.height &&
        avatar.y + avatar.height > fireblue.y
    ) {
        score -= 10;
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

    // Verifica se a pontuação é menor que 0 para terminar o jogo
    if (score < 0) {
        score = 0;
        gameover = 1;
        fireball.x = -150; // Mover para fora da tela
        fireblue.x = -150; // Mover para fora da tela
        boss.x = -150; // Mover para fora da tela
        heartgold.x = -150; // Mover para fora da tela
        guard.x = -150; // Mover para fora da tela
    }
}

// Atualizar a pontuação na tela
function updateScore() {
    scoreElement.textContent = `Pontuação: ${score}`;
}

// Limpar o canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Desenhar os elementos do jogo
function drawAvatar() {
    ctx.drawImage(avatarImage, avatar.x, avatar.y, avatar.width, avatar.height);
}
function drawGm() {
    ctx.drawImage(gmImage, gm.x, gm.y, gm.width, gm.height);
}

function drawfireball() {
    ctx.drawImage(fireballImage, fireball.x, fireball.y, fireball.width, fireball.height);
}

function drawfireblue() {
    ctx.drawImage(fireblueImage, fireblue.x, fireblue.y, fireblue.width, fireblue.height);
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

// Loop do jogo
function gameLoop() {
    clearCanvas();

    if (gameover === 0) {
        moveAvatar();
        moveFireball();
        moveFireblue();
        moveboss();
        moveheartgold();
        moveguard();
        checkCollision();
        drawAvatar();
        drawfireball();
        drawfireblue();
        drawboss();
        drawheartgold();
        drawguard();
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
    fireballImage.onload = () => {
        fireblueImage.onload = () => {
            bossImage.onload = () => {
                heartgoldImage.onload = () => {
                    guardImage.onload = () => {
                        updateScore();
                        gameLoop();
                    };
                };
            };
        };
    };
};

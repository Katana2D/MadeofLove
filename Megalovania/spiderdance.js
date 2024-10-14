const canvas = document.getElementById('spiderdanceCanvas');
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

const spiderImage = new Image();
spiderImage.src = 'spider.png';

const bossImage = new Image();
bossImage.src = 'spiderboss.png';

const heartgoldImage = new Image();
heartgoldImage.src = 'heartgold.png';

const bigspiderImage = new Image();
bigspiderImage.src = 'bigspider.png';

const bigspider02Image = new Image();
bigspider02Image.src = 'bigspider.png';

const gmImage = new Image();
gmImage.src = 'gameover.png';

const avatar = {
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 50,
    width: 70,
    height: 50,
    speed: 4, // Velocidade do avatar
};

const gm = {
    x: canvas.width / 2 - 250,
    y: canvas.height / 2 - 150,
    width: 500,
    height: 250,
};

const spider = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 100,
    height: 90,
    speed: 9,
};

const boss = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 170,
    height: 150,
    speed: 6,
};

const heartgold = {
    x: Math.random() * (canvas.width - 40),
    y: -50,
    width: 100,
    height: 90,
    speed: 5,
};

const bigspider = {
    y: Math.random() * (canvas.height - 40),
    x: -50,
    width: 200,
    height: 180,
    speed: 1,
};

const bigspider02 = {
    y: Math.random() * (canvas.height - 40),
    x: -50,
    width: 200,
    height: 180,
    speed: 1,
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

function movespider() {
    spider.y += spider.speed;

    // Reiniciar o spider quando ele alcançar o fundo do canvas
    if (spider.y > canvas.height) {
        spider.x = Math.random() * (canvas.width - 50);
        spider.y = -50;
    }
}

function moveboss() {
    boss.y += boss.speed;

    // Reiniciar o spider quando ele alcançar o fundo do canvas
    if (boss.y > canvas.height) {
        boss.x = Math.random() * (canvas.width - 50);
        boss.y = -50;
    }
}

function moveheartgold() {
    heartgold.y += heartgold.speed;

    // Reiniciar o heartgold quando ele alcançar o fundo do canvas
    if (heartgold.y > canvas.height) {
        heartgold.x = Math.random() * (canvas.width - 50);
        heartgold.y = -50;
    }
}

function movebigspider() {
    bigspider.y += bigspider.speed;

    // Reiniciar o bigspider quando ele alcançar o fundo do canvas
    if (bigspider.y > canvas.height) {
        bigspider.x = Math.random() * (canvas.width - 50);
        bigspider.y = -50;
    }
}

function movebigspider02() {
    bigspider02.y += bigspider02.speed;

    // Reiniciar o bigspider02 quando ele alcançar o fundo do canvas
    if (bigspider02.y > canvas.height) {
        bigspider02.x = Math.random() * (canvas.width - 50);
        bigspider02.y = -50;
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
        score += 50; // aumenta 40 pontos
        updateScore();
        heartgold.y = -heartgold.height; // Reposicionar após a coleta
        heartgold.x = Math.random() * (canvas.width - heartgold.width); // Nova posição aleatória
    }
    if (
        avatar.x < spider.x + spider.width &&
        avatar.x + avatar.width > spider.x &&
        avatar.y < spider.y + spider.height &&
        avatar.y + avatar.height > spider.y
    ) {
        // Colisão detectada
        score -= 5; // Subtrai 5 pontos
        updateScore();
    }
    if (
        avatar.x < boss.x + boss.width &&
        avatar.x + avatar.width > boss.x &&
        avatar.y < boss.y + boss.height &&
        avatar.y + avatar.height > boss.y
    ) {
        // Colisão detectada
        score -= 10; // Subtrai 10 pontos
        updateScore();
    }
    if (
        avatar.y < bigspider.y + bigspider.height &&
        avatar.y + avatar.height > bigspider.y &&
        avatar.x < bigspider.x + bigspider.width &&
        avatar.x + avatar.width > bigspider.x
    ) {
        // Colisão detectada
        score -= 8; // Subtrai 35 pontos
        updateScore();
    }
    if (
        avatar.y < bigspider02.y + bigspider02.height &&
        avatar.y + avatar.height > bigspider02.y &&
        avatar.x < bigspider02.x + bigspider02.width &&
        avatar.x + avatar.width > bigspider02.x
    ) {
        // Colisão detectada
        score -= 8; // Subtrai 35 pontos
        updateScore();
    }
    if (score < 0) {
        score = 0;
        gameover = 1;
        spider.x = -150;
        boss.x = -150;
        heartgold.x = -150;
        bigspider.x = -150;
        bigspider02.x = -150;
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

function drawspider() {
    ctx.drawImage(spiderImage, spider.x, spider.y, spider.width, spider.height);
}

function drawboss() {
    ctx.drawImage(bossImage, boss.x, boss.y, boss.width, boss.height);
}

function drawheartgold() {
    ctx.drawImage(heartgoldImage, heartgold.x, heartgold.y, heartgold.width, heartgold.height);
}

function drawbigspider() {
    ctx.drawImage(bigspiderImage, bigspider.x, bigspider.y, bigspider.width, bigspider.height);
}

function drawbigspider02() {
    ctx.drawImage(bigspider02Image, bigspider02.x, bigspider02.y, bigspider02.width, bigspider02.height);
}

function gameLoop() {
    clearCanvas();

    if (gameover == 0) {
        moveAvatar();
        movespider();
        moveboss();
        moveheartgold();
        movebigspider();
        movebigspider02();
        checkCollision();
        drawAvatar();
        drawspider();
        drawboss();
        drawheartgold();
        drawbigspider();
        drawbigspider02();
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
    spiderImage.onload = () => {
        bossImage.onload = () => {
            heartgoldImage.onload = () => {
                bigspiderImage.onload = () => {
                    bigspider02Image.onload = () => {
                        updateScore();
                        gameLoop();
                    };
                };
            };
        };
    };
};

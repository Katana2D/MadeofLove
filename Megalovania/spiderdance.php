<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="setgame.css">
    <title>MEGALOVANIA</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>

<body>
    <div class="spiderdance">
        <h1 id="score">Pontuação: </h1>
        <div class="canvas-container">
            <canvas id="spiderdanceCanvas" width="1000" height="600"></canvas>
            <!-- Música do jogo-->
            <div>
                <button onclick="document.getElementById('player').play()">Play</button>
                <button onclick="document.getElementById('player').pause()">Pause</button>
                <button onclick="document.getElementById('player').volume+=0.1">Aumentar volume</button>
                <button onclick="document.getElementById('player').volume-=0.1">Diminuir volume</button>
                <button class="reiniciar-btn" data-reiniciarBtn>Jogar novamente</button>
                <button onclick="goBack()">Voltar</button>
            </div>

            <audio id="player" autoplay="autoplay" loop style="margin-right: auto; margin-top: 0;">
                <source src="music/Undertale OST_ 059 - Spider Dance(MP3_160K).mp3" type="audio/mp3">
                <source src="music/Undertale OST_ 059 - Spider Dance(MP3_160K).mp3" type="audio/mp3">
                Your browser does not support the audio tag.
            </audio>
        </div>
        <script src="spiderdance.js"></script>
        <script>
            function goBack() {
                window.location.href = 'index.php'; // Redireciona para index.php
            }
        </script>
    </div>
</body>

</html>
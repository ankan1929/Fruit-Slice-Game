let playing = false;
        let score = 0;
        let trialsLeft;
        let step;
        let action;
        let speedInterval;
        let baseSpeed = 1.5; // Initial speed
        let speedIncreaseRate = 0.2;
        let maxSpeed = 3;

        const fruitImages = [
            "1.png", "2.png", "3.png", "4.png", "5.png",
            "6.png", "7.png", "8.png", "9.png", "10.png"
        ];

        const startReset = document.getElementById("startReset");
        const fruit = document.getElementById("fruit1");
        const scoreValue = document.getElementById("scoreValue");
        const trialsLeftContainer = document.getElementById("trialsleft");
        const gameOver = document.getElementById("gameOver");
        const sliceSound = document.getElementById("slicesound");

        // Start or Reset Game
        startReset.addEventListener("click", function() {
            if (playing) {
                location.reload(); // Reload page to reset game
            } else {
                playing = true;
                score = 0;
                baseSpeed = 1.5; // Reset speed when restarting
                scoreValue.innerText = score;
                trialsLeft = 3;
                updateLives();
                gameOver.style.display = "none";
                startReset.innerText = "Reset Game";

                // Clear previous speed interval if it exists
                clearInterval(speedInterval);

                // Start increasing speed every 15 seconds
                speedInterval = setInterval(() => {
                    if (playing && baseSpeed < maxSpeed) {
                        baseSpeed += speedIncreaseRate; // Increase speed
                    }
                }, 15000); // Increase speed every 15 seconds

                startFruitAction();
            }
        });

        // Slice Fruit
        fruit.addEventListener("mouseover", function() {
            score++;
            scoreValue.innerText = score;
            sliceSound.play();
            clearInterval(action);
            fruit.style.display = "none";
            setTimeout(startFruitAction, 500);
        });

        function updateLives() {
            trialsLeftContainer.innerHTML = "";
            for (let i = 0; i < trialsLeft; i++) {
                let img = document.createElement("img");
                img.src = "./assets/wrong.png";
                img.classList.add("life");
                trialsLeftContainer.appendChild(img);
            }
        }

        function startFruitAction() {
            clearInterval(action); // Clear the previous fruit action interval

            fruit.style.position = "absolute";
            fruit.style.display = "block";
            fruit.src = "./assets/images/" + fruitImages[Math.floor(Math.random() * fruitImages.length)];
            fruit.style.left = Math.random() * 550 + "px";
            fruit.style.top = "-50px";

            step = baseSpeed; 

            action = setInterval(function() {
                fruit.style.top = (fruit.offsetTop + step) + "px";

                if (fruit.offsetTop > document.getElementById("fruitcontainer").offsetHeight - 50) {
                    if (trialsLeft > 1) {
                        trialsLeft--;
                        updateLives();
                        fruit.style.display = "block";
                        startFruitAction();
                    } else {
                        playing = false;
                        gameOver.style.display = "block";
                        gameOver.innerHTML = `<p>Game Over!</p><p>Your Score: ${score}</p>`;
                        startReset.innerText = "Start Game";
                        trialsLeftContainer.innerHTML = "";
                        clearInterval(action); // Game over pe interval band karna zaroori hai
                        fruit.style.display = "none";
                    }
                }
            }, 8);
        }
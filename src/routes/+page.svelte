<script>
    import "../app.css";
    let time = 300;
    let userTime = 300;
    let timer;

    const startTimer = () => {
        if (!timer) {
            timer = setInterval(() => {
                if (time > 0) {
                    time -= 1;
                }
            }, 1000); // Increment time every second
        }
    };

    const stopTimer = () => {
        clearInterval(timer);
        timer = null;
    };

    const resetTimer = () => {
        stopTimer();
        time = userTime;
    };

    const secUp = () => {
        if (!timer) {
            time += 1;
            userTime += 1;
        }
    };

    const secDown = () => {
        if (!timer) {
            if (time > 0) {
                time -= 1;
                userTime -= 1;
            }
        }
    };

    const minUp = () => {
        if (!timer) {
            time += 60;
            userTime += 60;
        }
    };

    const minDown = () => {
        if (!timer) {
            if (time > 60) {
                time -= 60;
                userTime -= 60;
            } else {
                time = 0;
                userTime = 0;
            }
        }
    };

    const originalTime = () => {
        time = 300;
        userTime = 300;
    };
</script>

<h1 class="bg-lime-400">Timer!</h1>
<h2 id="time">{time}</h2>

<button on:click={secUp}>+ 1 sec</button>
<button on:click={secDown}>- 1 sec</button>
<button on:click={minUp}>+ 1 min</button>
<button on:click={minDown}>- 1 min</button>
<br>
<button on:click={startTimer}>Start</button>
<button on:click={stopTimer}>Stop</button>
<button on:click={resetTimer}>Reset</button>
<button on:click={originalTime}>original-time</button>

<!-- Navigatiebalk -->
<nav class="navbar">
    <a href="/shop" class="nav-item" aria-label="Shop">
        <i class="fas fa-shopping-cart"></i>
    </a>
    <a href="/statistics" class="nav-item" aria-label="Statistics">
        <i class="fas fa-chart-bar"></i>
    </a>
    <a href="/leaderbord" class="nav-item" aria-label="Leaderboard">
        <i class="fas fa-trophy"></i>
    </a>
    <a href="/goals" class="nav-item" aria-label="Goals">
        <i class="fas fa-bullseye"></i>
    </a>
    <a href="/settings" class="nav-item" aria-label="Settings">
        <i class="fas fa-cog"></i>
    </a>
</nav>

<style>
    .navbar {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #d1e8ff;
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
        border-top: 2px solid #aaa;
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    }

    .nav-item {
        color: #4a4a4a;
        text-decoration: none;
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .nav-item:hover {
        background-color: #b0d7ff;
        color: #0066cc;
    }

    .nav-item i {
        font-size: 24px;
    }
</style>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
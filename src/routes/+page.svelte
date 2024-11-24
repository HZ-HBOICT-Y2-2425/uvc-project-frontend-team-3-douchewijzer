<script>
    import "../app.css";

    let time = 300;
    let userTime = 300;
    let timer;
    const startTimer = () => {
        if (!timer) {
            timer = setInterval(() => {
                if (time > 0){
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
    }

    const secDown = () => {
        if (!timer) {
            if (time > 0) {
            time -= 1;
            userTime -= 1;
            }
        }
    }

    const minUp = () => {
        if (!timer) {
            time += 60;
            userTime += 60;
        }
    }

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
    }

    const originalTime = () => {
        time = 300;
        userTime = 300;
    }
</script>

<h1 class="bg-lime-400">Timer!</h1>
<h2 id = "time"> {time} </h2>

<button on:click={secUp}>+ 1 sec</button>
<button on:click={secDown}>- 1 sec</button>
<button on:click={minUp}>+ 1 min</button>
<button on:click={minDown}>- 1 min</button>
<br>
<button on:click={startTimer}>Start</button>
<button on:click={stopTimer}>Stop</button>
<button on:click={resetTimer}>Reset</button>
<button on:click={originalTime}>original-time</button>


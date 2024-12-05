<script>
    import { createEventDispatcher } from 'svelte';
    let time = 300;
    let userTime = 300;
    let timer = null;
    let isEditing = false;
    let showNotification = false;
    const dispatch = createEventDispatcher();

    const startTimer = () => {
        if (!timer) {
            timer = setInterval(() => {
                if (time > 0) {
                    time -= 1;
                } else {
                    stopTimer();
                    showNotification = true;
                    dispatch('timerEnd');
                }
            }, 1000);
        }
    };

    const stopTimer = () => {
        clearInterval(timer);
        timer = null;
    };

    const resetTimer = () => {
        stopTimer();
        time = userTime;
        showNotification = false;
    };

    const secUp = () => {
        if (!timer) {
            time += 1;
            userTime += 1;
        }
    };

    const secDown = () => {
        if (!timer && time > 0) {
            time -= 1;
            userTime -= 1;
        }
    };

    const minUp = () => {
        if (!timer) {
            time += 60;
            userTime += 60;
        }
    };

    const minDown = () => {
        if (!timer && time >= 60) {
            time -= 60;
            userTime -= 60;
        }
    };

    const originalTime = () => {
        time = 300;
        userTime = 300;
    };

    const toggleEditing = () => {
        isEditing = !isEditing;
    };

    const adjustTime = (amount) => {
        if (!timer) {
            time = Math.max(0, time + amount);
            userTime = Math.max(0, userTime + amount);
        }
    };

    const toggleTimer = () => {
        if (timer) {
            stopTimer();
        } else {
            startTimer();
        }
    };

    const closeNotification = () => {
        showNotification = false;
        resetTimer(); // Reset de timer naar de ingestelde waarde
    };
</script>

{#if showNotification}
    <div class="overlay"></div>
    <div class="alert">
        <p>De timer is afgelopen!</p>
        <button on:click={closeNotification}>Sluiten</button>
    </div>
{/if}

<div class="timer-container" on:click>
    <button class="edit-button" on:click|stopPropagation={toggleEditing}>
        {isEditing ? 'Opslaan' : 'Pas aan'}
    </button>
    <h2 class="timer-title">Timer</h2>
    <div class="timer-display">
        {Math.floor(time / 60).toString().padStart(2, '0')}:
        {(time % 60).toString().padStart(2, '0')}
    </div>
    <button class="timer-button" on:click|stopPropagation={toggleTimer}>
        {timer ? 'Stop' : 'Start'}
    </button>
    {#if isEditing}
        <div class="adjust-buttons">
            <button class="adjust-button" on:click={() => adjustTime(60)}>+1 min</button>
            <button class="adjust-button" on:click={() => adjustTime(1)}>+1 sec</button>
            <button class="adjust-button" on:click={() => adjustTime(-60)}>-1 min</button>
            <button class="adjust-button" on:click={() => adjustTime(-1)}>-1 sec</button>
        </div>
    {/if}
</div>

<style>
    @import '../lib/app.css';
</style>
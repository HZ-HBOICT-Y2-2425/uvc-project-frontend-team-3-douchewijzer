<script>
    import { createEventDispatcher } from 'svelte';
    let time = 300;
    let userTime = 300;
    let timer = null;
    let isEditing = false;
    let showNotification = false;
    let liters = 0;
    let costs = 0;
    let co2 = 0;
    const dispatch = createEventDispatcher();

    const startTimer = () => {
        if (!timer) {
            timer = setInterval(() => {
                if (time > 0) {
                    time -= 1;
                    updateValues();
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

    const updateValues = () => {
        liters += 0.1;
        costs += 0.00116667;
        co2 += 0.00166667;
        dispatch('updateLiters', { liters });
        dispatch('updateCosts', { costs });
        dispatch('updateCO2', { co2 });
    };

    const resetTimer = () => {
        stopTimer();
        time = userTime;
        liters = 0;
        costs = 0;
        co2 = 0;
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
        if (!isEditing) {
            if (timer) {
                stopTimer();
            } else {
                startTimer();
            }
        }
    };

    const closeNotification = () => {
        showNotification = false;
        resetTimer();
    };
</script>

{#if showNotification}
    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 p-10 rounded-2xl shadow-lg text-center z-50 w-4/5 max-w-lg">
        <p class="text-2xl mb-5">De timer is afgelopen!</p>
        <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800" on:click={closeNotification}>Sluiten</button>
    </div>
{/if}

<div class="relative bg-custom-blue p-5 rounded-2xl w-80 mx-auto text-center text-white shadow-md cursor-pointer" on:click>
    <button class="absolute top-2 right-2 bg-white text-blue-600 border-none px-2 py-1 text-sm rounded-md cursor-pointer shadow-sm hover:bg-blue-100" on:click|stopPropagation={toggleEditing}>
        {isEditing ? 'Opslaan' : 'Pas aan'}
    </button>
    <h2 class="text-2xl mb-2 font-sans">Timer</h2>
    <div class="text-4xl font-bold tracking-wider font-mono mb-5">
        {Math.floor(time / 60).toString().padStart(2, '0')}:
        {(time % 60).toString().padStart(2, '0')}
    </div>
    <button class="bg-white text-blue-600 border-none px-5 py-2 text-lg rounded-lg cursor-pointer shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-100 mb-1" on:click|stopPropagation={toggleTimer}>
        {timer ? 'Stop' : 'Start'}
    </button>
    {#if isEditing}
        <div class="flex justify-around mt-5">
            <button class="bg-white text-blue-600 border-solid-3, px-7, padding-3, py-2 text-lg rounded-lg cursor-pointer shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-100" on:click={() => adjustTime(60)}>+1 min</button>
            <button class="bg-white text-blue-600 border-none px-7, padding-3, py-2 text-lg rounded-lg cursor-pointer shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-100" on:click={() => adjustTime(1)}>+1 sec</button>
            <button class="bg-white text-blue-600 border-none px-7, padding-3, py-2 text-lg rounded-lg cursor-pointer shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-100" on:click={() => adjustTime(-60)}>-1 min</button>
            <button class="bg-white text-blue-600 border-none px-7, padding-3, py-2 text-lg rounded-lg cursor-pointer shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-100" on:click={() => adjustTime(-1)}>-1 sec</button>
        </div>
    {/if}
</div>

<style>
    @import '../lib/app.css';
</style>
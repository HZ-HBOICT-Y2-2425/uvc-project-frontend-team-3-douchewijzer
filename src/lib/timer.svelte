<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    import DecodeToken from './DecodeToken.svelte';

    let time = 0;
    let userTime = 0;
    let timer = null;
    let isEditing = false;
    let showNotification = false;
    let showEndOfTimerNotification = false; // Nieuwe variabele voor de extra melding
    let isPaused = false;
    let isStarted = false;
    let liters = 0;
    let costs = 0;
    let co2 = 0;
    let temperature = 35; // Default temperatuur
    let showTemperatureModal = false;
    let showerTime = 0; // Tijd gedoucht in seconden
    let isManuallyStopped = false; // Nieuwe variabele om handmatige stop bij te houden
    let endOfTimerNotificationShown = false; // Variabele om bij te houden of de melding al is getoond
    const dispatch = createEventDispatcher();

    const baseCostPerMinute = 0.037; // Basis kosten per minuut bij 35 graden
    const baseCO2PerMinute = 0.030; // Basis CO2-uitstoot per minuut bij 35 graden (kg)

    const calculateExponentialFactor = (temp) => {
        const baseTemp = 35;
        return Math.pow(1.1, temp - baseTemp); // Exponentiële factor
    };

    const fetchTimerSetting = async () => {
        try {
            const response = await fetch(`http://localhost:3010/users/${userID}/preferences`); // Vervang door je API URL
            const data = await response.json();
            time = data.timerSetting;
            userTime = data.timerSetting;
        } catch (error) {
            console.error('Error fetching timer setting:', error);
        }
    };

    const updateTimerSetting = async (newTime) => {
        try {
            await fetch(`http://localhost:3010/users/${userID}/preferences`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ timerSetting: newTime })
            });
        } catch (error) {
            console.error('Error updating timer setting:', error);
        }
    };

    onMount(() => {
        fetchTimerSetting();
    });

    const startTimer = () => {
        if (isEditing) return; // Blokkeer de startknop als de timer wordt aangepast
        showTemperatureModal = true;
    };

    const confirmTemperature = () => {
        showTemperatureModal = false;
        if (!timer) {
            timer = setInterval(() => {
                if (time > 0) {
                    time -= 1;
                } else if (time === 0 && !endOfTimerNotificationShown) {
                    showEndOfTimerNotification = true; // Toon de extra melding
                    endOfTimerNotificationShown = true; // Zet de variabele om te voorkomen dat de melding opnieuw wordt getoond
                }
                showerTime += 1; // Verhoog de gedouchte tijd
                updateValues();
            }, 1000);
            isStarted = true;
        }
    };

    const stopTimer = (dispatchEvent = true) => {
        clearInterval(timer);
        timer = null;
        if (dispatchEvent) {
            showNotification = true;
            dispatch('timerEnd', {
                showerTime,
                liters,
                costs,
                co2,
                temperature
            });
        }
        dispatch('updateTime', { time: showerTime }); // Dispatch updateTime event with showerTime
    };

    const updateValues = () => {
        liters += 0.1; // 0.1 liter per seconde
        const factor = calculateExponentialFactor(temperature);

        costs += baseCostPerMinute * factor / 60; // Kosten per seconde
        co2 += baseCO2PerMinute * factor / 60; // CO2-uitstoot per seconde

        dispatch('updateLiters', { liters });
        dispatch('updateCosts', { costs });
        dispatch('updateCO2', { co2 });
        dispatch('updateTemperature', { temperature });
        dispatch('updateTime', { time: showerTime }); // Ensure updateTime is dispatched here as well
    };

    const resetTimer = (dispatchEvent = true) => {
        stopTimer(dispatchEvent);
        time = userTime;
        liters = 0;
        costs = 0;
        co2 = 0;
        showerTime = 0; // Reset de gedouchte tijd
        showNotification = false;
        showEndOfTimerNotification = false; // Reset de extra melding
        endOfTimerNotificationShown = false; // Reset de variabele om de melding opnieuw te kunnen tonen
        isStarted = false;
        dispatch('updateLiters', { liters });
        dispatch('updateCosts', { costs });
        dispatch('updateCO2', { co2 });
        dispatch('updateTemperature', { temperature });
    };

    const pauseTimer = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
            isPaused = true;
        } else if (isPaused) {
            timer = setInterval(() => {
                if (time > 0) {
                    time -= 1;
                } else if (time === 0 && !endOfTimerNotificationShown) {
                    showEndOfTimerNotification = true; // Toon de extra melding
                    endOfTimerNotificationShown = true; // Zet de variabele om te voorkomen dat de melding opnieuw wordt getoond
                }
                showerTime += 1; // Verhoog de gedouchte tijd
                updateValues();
            }, 1000);
            isPaused = false;
            isStarted = true;
        }
    };

    const toggleEditing = () => {
        isEditing = !isEditing;
    };

    const adjustTime = (amount) => {
        if (!timer) {
            time = Math.max(0, time + amount);
            userTime = Math.max(0, userTime + amount);
            updateTimerSetting(userTime); // Update de nieuwe standaardtijd van de gebruiker
        }
    };

    const closeNotification = () => {
        showNotification = false;
        resetTimer(false); // Do not dispatch timerEnd event when closing notification
    };

    const closeEndOfTimerNotification = () => {
        showEndOfTimerNotification = false;
    };

    let userID = '';
    let name = '';
</script>

<DecodeToken bind:userID bind:name />

{#if showTemperatureModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 class="text-xl font-semibold mb-4">Stel de temperatuur in</h2>
            <input type="range" min="13" max="45" bind:value={temperature} class="w-full mb-2" />
            <input type="number" min="13" max="45" bind:value={temperature} class="w-full text-center mb-4" />
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg" on:click={confirmTemperature}>Bevestigen</button>
        </div>
    </div>
{/if}

{#if showNotification}
    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 p-10 rounded-2xl shadow-lg text-center z-50 w-4/5 max-w-lg">
        <p class="text-2xl mb-5">De timer is afgelopen!</p>
        <p class="text-lg mb-5">Tijd Gedoucht: {Math.floor(showerTime / 60)} min {showerTime % 60} sec</p>
        <p class="text-lg mb-2">Aantal Liter: {liters.toFixed(1)} L</p>
        <p class="text-lg mb-2">Kosten: €{costs.toFixed(2)}</p>
        <p class="text-lg mb-2">CO2 Emissie: {co2.toFixed(2)} kg</p>
        <p class="text-lg mb-5">Temperatuur: {temperature} °C</p>
        <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800" on:click={closeNotification}>Sluiten</button>
    </div>
{/if}

{#if showEndOfTimerNotification}
    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 p-10 rounded-2xl shadow-lg text-center z-50 w-4/5 max-w-lg">
        <p class="text-2xl mb-5">Je timer is afgegaan druk op stop als je klaar bent met douchen</p>
        <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800" on:click={() => { isManuallyStopped = true; stopTimer(); closeEndOfTimerNotification(); }}>Stop</button>
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
    {#if !isStarted}
        <button class="bg-white text-blue-600 border-none px-5 py-2 text-lg rounded-lg cursor-pointer shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-100 mb-1" on:click|stopPropagation={startTimer}>
            Start
        </button>
    {/if}
    {#if isStarted}
        <button class="bg-white text-blue-600 border-none px-5 py-2 text-lg rounded-lg cursor-pointer shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-100 mb-1" on:click|stopPropagation={() => { isManuallyStopped = true; stopTimer(); }}>
            Stop
        </button>
        <button class="bg-white text-blue-600 border-none px-5 py-2 text-lg rounded-lg cursor-pointer shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-100 mb-1" on:click|stopPropagation={pauseTimer}>
            {isPaused ? 'Hervatten' : 'Pauze'}
        </button>
    {/if}
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
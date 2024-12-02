<script>
    import { goto } from '$app/navigation'; // Import Svelte navigatie

    let time = 300; // huidige tijd in seconden
    let userTime = 300; // standaard ingestelde tijd in seconden
    let timer = null;
    let isEditing = false; // bepaalt of de gebruiker de tijd aanpast
    let showNotification = false; // bepaalt of de melding wordt getoond

    const startTimer = () => {
        if (!timer) {
            timer = setInterval(() => {
                if (time > 0) {
                    time -= 1;
                } else {
                    stopTimer(); // stopt de timer als deze op 0 komt
                    showNotification = true; // toont melding dat de timer afgelopen is
                }
            }, 1000);
        }
    };

    const stopTimer = () => {
        clearInterval(timer);
        timer = null;
    };

    const toggleTimer = () => {
        if (timer) {
            stopTimer();
        } else {
            startTimer();
        }
    };

    const toggleEditMode = () => {
        isEditing = !isEditing;
        stopTimer(); // timer stoppen als de gebruiker de tijd aanpast
    };

    const adjustTime = (seconds) => {
        if (isEditing) {
            time = Math.max(0, time + seconds); // voorkomt negatieve tijd
            userTime = time; // slaat de laatste waarde op als standaard
        }
    };

    const navigateToShowerTimer = (event) => {
        // Alleen navigeren als de klik niet op een knop of interactief element was
        if (event.target === event.currentTarget) {
            goto('/showerTimer'); // Navigeren naar de gewenste pagina
        }
    };

    const closeNotification = () => {
        showNotification = false; // verbergt de melding
        time = userTime; // reset de timer naar de laatste ingestelde waarde
    };
</script>

<div
    class="timer-container"
    on:click={navigateToShowerTimer}
>
    <button
        class="edit-button"
        on:click|stopPropagation={toggleEditMode}
    >
        {isEditing ? 'Opslaan' : 'Pas aan'}
    </button>

    <h2 class="timer-title">Timer</h2>
    <div class="timer-display">
        {Math.floor(time / 60).toString().padStart(2, '0')}:
        {(time % 60).toString().padStart(2, '0')}
    </div>

    <button
        class="timer-button"
        on:click|stopPropagation={toggleTimer}
    >
        {timer ? 'Stop' : 'Start'}
    </button>

    {#if isEditing}
        <div class="adjust-buttons">
            <button
                class="adjust-button"
                on:click|stopPropagation={() => adjustTime(60)}
            >
                +1 min
            </button>
            <button
                class="adjust-button"
                on:click|stopPropagation={() => adjustTime(-60)}
            >
                -1 min
            </button>
            <button
                class="adjust-button"
                on:click|stopPropagation={() => adjustTime(1)}
            >
                +1 sec
            </button>
            <button
                class="adjust-button"
                on:click|stopPropagation={() => adjustTime(-1)}
            >
                -1 sec
            </button>
        </div>
    {/if}
</div>

{#if showNotification}
    <div class="overlay">
        <div class="notification">
            <h2>Timer afgelopen!</h2>
            <button class="close-notification" on:click={closeNotification}>
                Sluiten
            </button>
        </div>
    </div>
{/if}

<style>
    /* Timer Container */
    .timer-container {
        position: relative;
        background-color: #5b8df8;
        padding: 20px;
        border-radius: 20px;
        width: 300px;
        margin: 20px auto;
        text-align: center;
        color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .timer-container button {
        cursor: auto; /* Zorgt ervoor dat knoppen niet als links werken */
    }

    .timer-title {
        font-size: 24px;
        margin-bottom: 10px;
        font-family: Arial, sans-serif;
    }

    .timer-display {
        font-size: 48px;
        font-weight: bold;
        letter-spacing: 2px;
        font-family: 'Courier New', Courier, monospace;
        margin-bottom: 20px;
    }

    .timer-button {
        background-color: white;
        color: #5b8df8;
        border: none;
        padding: 10px 20px;
        font-size: 18px;
        border-radius: 10px;
        cursor: pointer;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease, color 0.3s ease;
        margin: 5px;
    }

    .timer-button:hover {
        background-color: #d1e8ff;
        color: #3c64c6;
    }

    .edit-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: white;
        color: #5b8df8;
        border: none;
        padding: 5px 10px;
        font-size: 14px;
        border-radius: 8px;
        cursor: pointer;
        font-family: Arial, sans-serif;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .edit-button:hover {
        background-color: #d1e8ff;
        color: #3c64c6;
    }

    .adjust-buttons {
        margin-top: 10px;
    }

    .adjust-button {
        background-color: white;
        color: #5b8df8;
        border: none;
        padding: 5px 10px;
        font-size: 14px;
        border-radius: 8px;
        cursor: pointer;
        font-family: Arial, sans-serif;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        margin: 5px;
    }

    .adjust-button:hover {
        background-color: #d1e8ff;
        color: #3c64c6;
    }

    /* Overlay and Notification */
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .notification {
        background-color: #ffffff;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        font-family: Arial, sans-serif;
        width: 50%;
        max-width: 500px;
    }

    .notification h2 {
        font-size: 24px;
        margin-bottom: 20px;
        color: #5b8df8;
    }

    .close-notification {
        background-color: #5b8df8;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 10px;
        cursor: pointer;
        font-family: Arial, sans-serif;
    }

    .close-notification:hover {
        background-color: #3c64c6;
    }
</style>

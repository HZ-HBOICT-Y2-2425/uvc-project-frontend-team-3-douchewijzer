<script>
    import { goto } from '$app/navigation'; // Import Svelte navigatie
    import Timer from '$lib/Timer.svelte';

    const navigateToShowerTimer = (event) => {
        // Alleen navigeren als de klik niet op een knop of interactief element was
        if (event.target === event.currentTarget) {
            goto('/showerTimer'); // Navigeren naar de gewenste pagina
        }
    };

    const handleTimerEnd = () => {
        console.log('Timer is afgelopen!');
    };
</script>

<Timer on:timerEnd={handleTimerEnd} on:click={navigateToShowerTimer} />

<style>
    @import '$lib/app.css';
</style>
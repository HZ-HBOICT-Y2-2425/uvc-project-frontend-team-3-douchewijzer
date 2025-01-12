<script>
    import { goto } from '$app/navigation'; // Import Svelte navigatie
    import Timer from '$lib/timer.svelte';
    import VerifyToken from '$lib/VerifyToken.svelte';
    import StatisticsData from '$lib/StatisticsData.svelte';
    import LatestBadges from '$lib/LatestBadges.svelte';

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

<VerifyToken />

<StatisticsData />

<Timer on:timerEnd={handleTimerEnd} on:click={navigateToShowerTimer} />

<div class="p-5 border border-gray-300 rounded-lg bg-gray-100 mt-5">
    <LatestBadges />
</div>

<style>
    @import '$lib/app.css';
</style>
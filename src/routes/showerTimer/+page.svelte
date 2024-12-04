<script>
    import Timer from '$lib/Timer.svelte';

    const handleTimerEnd = () => {
        console.log('Timer is afgelopen!');
    };
</script>

<h1>Shower Timer</h1>

<Timer on:timerEnd={handleTimerEnd} />

<style>
    @import '$lib/app.css';
</style>
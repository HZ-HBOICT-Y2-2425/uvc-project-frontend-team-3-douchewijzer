<script>
    import Timer from '$lib/Timer.svelte';
    import VerifyToken from '$lib/VerifyToken.svelte';

    let liters = 0;
    let costs = 0;
    let co2 = 0;

    const handleTimerEnd = () => {
        console.log('Timer is afgelopen!');
        liters = 0;
        costs = 0;
        co2 = 0;
    };

    const handleUpdateLiters = (event) => {
        liters = event.detail.liters.toFixed(1); // Update liters en rond af op 1 decimaal
    };

    const handleUpdateCosts = (event) => {
        costs = event.detail.costs.toFixed(2); // Update costs en rond af op 2 decimalen
    };

    const handleUpdateCO2 = (event) => {
        co2 = event.detail.co2.toFixed(2); // Update CO2 en rond af op 2 decimalen
    };
</script>

<VerifyToken />	

<Timer on:timerEnd={handleTimerEnd} on:updateLiters={handleUpdateLiters} on:updateCosts={handleUpdateCosts} on:updateCO2={handleUpdateCO2} />
<div class="flex justify-center mt-10">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <div class="flex justify-between">
            <div class="flex-1 bg-blue-100 p-4 m-2 rounded-lg text-center">
                <h2 class="text-xl font-semibold">Kosten</h2>
                <p class="text-lg">€{costs}</p>
            </div>
            <div class="flex-1 bg-blue-100 p-4 m-2 rounded-lg text-center">
                <h2 class="text-xl font-semibold">Aantal Liter</h2>
                <p class="text-lg">{liters} L</p>
            </div>
            <div class="flex-1 bg-blue-100 p-4 m-2 rounded-lg text-center">
                <h2 class="text-xl font-semibold">CO2 Emissie</h2>
                <p class="text-lg">{co2} kg</p>
            </div>
        </div>
    </div>
</div>
<style>
    @import '$lib/app.css';
</style>
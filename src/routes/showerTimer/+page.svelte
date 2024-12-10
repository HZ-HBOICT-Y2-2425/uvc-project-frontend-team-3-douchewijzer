<script>
    import Timer from '$lib/Timer.svelte';
    let liters = 0;
    let costs = 0;
    let co2 = 0;
    let temperature = 35; // Default temperatuur
    let showModal = true; // Toon het modaal venster bij het laden van de pagina

    const handleTimerEnd = () => {
        console.log('Timer is afgelopen!');
        liters = 0;
        costs = 0;
        co2 = 0;
    };

    const handleUpdateLiters = (event) => {
        liters = event.detail.liters.toFixed(1); // Update liters en rond af op 1 decimaal
        updateCostsAndCO2();
    };

    const handleUpdateCosts = (event) => {
        costs = event.detail.costs.toFixed(2); // Update costs en rond af op 2 decimalen
    };

    const handleUpdateCO2 = (event) => {
        co2 = event.detail.co2.toFixed(2); // Update CO2 en rond af op 2 decimalen
    };

    const handleTemperatureChange = (event) => {
        temperature = Math.max(13, Math.min(45, event.target.value)); // Zorg ervoor dat de temperatuur tussen 13 en 45 blijft
    };

    const handleTemperatureInput = (event) => {
        temperature = Math.max(13, Math.min(45, event.target.value)); // Zorg ervoor dat de temperatuur tussen 13 en 45 blijft
    };

    const setTemperature = () => {
        showModal = false; // Sluit het modaal venster
        updateCostsAndCO2(); // Bereken de kosten en CO2 op basis van de ingestelde temperatuur
    };

    const updateCostsAndCO2 = () => {
        // Bereken kosten en CO2 op basis van temperatuur
        const baseCostPerLiter = 0.07; // Basis kosten per liter
        const baseCO2PerLiter = 0.1; // Basis CO2 per liter

        // Verhoog de kosten en CO2 lineair met de temperatuur
        const temperatureFactor = (temperature - 13) / (45 - 13);
        costs = (liters * baseCostPerLiter * (1 + temperatureFactor)).toFixed(2);
        co2 = (liters * baseCO2PerLiter * (1 + temperatureFactor)).toFixed(2);
    };
</script>

{#if showModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 class="text-xl font-semibold mb-4">Stel de temperatuur in</h2>
            <input type="range" min="13" max="45" value={temperature} on:input={handleTemperatureChange} class="w-full mb-2" />
            <input type="number" min="13" max="45" value={temperature} on:input={handleTemperatureInput} class="w-full text-center mb-4" />
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg" on:click={setTemperature}>Bevestigen</button>
        </div>
    </div>
{/if}

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
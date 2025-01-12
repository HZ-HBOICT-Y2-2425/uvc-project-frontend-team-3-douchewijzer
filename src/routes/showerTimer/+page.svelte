<script>
    import Timer from '$lib/timer.svelte';
    import VerifyToken from '$lib/VerifyToken.svelte';
    import { onMount } from 'svelte';
    import DecodeToken from '$lib/DecodeToken.svelte';

    let liters = 0;
    let costs = 0;
    let co2 = 0;
    let temperature = 0;    
    let lastTime = 0; // lastTime variable

    const handleTimerEnd = () => {
        liters = 0;
        costs = 0;
        co2 = 0;
        temperature = 0;
        lastTime = 0; // Reset lastTime
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

    const handleUpdateTemperature = (event) => {
        temperature = event.detail.temperature.toFixed(1); // Update temperature
    };

    const handleUpdateTime = (event) => {
        lastTime = event.detail.time.toFixed(1); // Update lastTime
    };

    const saveShowerResult = async () => {
        try {
            const response = await fetch(`http://localhost:3010/statistics/${userID}?temperature=${temperature}&currentCosts=${costs}&waterUsage=${liters}&lastTime=${lastTime}`, { // Add lastTime to URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to save shower result');
            }

            const data = await response.json();
        } catch (error) {
            console.error('Error saving shower result:', error);
        }
    };

        let userID = '';
        let name = '';
</script>

<DecodeToken bind:userID bind:name />

<VerifyToken />	


<Timer on:timerEnd={handleTimerEnd} on:updateLiters={handleUpdateLiters} on:updateCosts={handleUpdateCosts} on:updateCO2={handleUpdateCO2} on:updateTemperature={handleUpdateTemperature} on:updateTime={handleUpdateTime} /> <!-- Add on:updateTime event -->

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
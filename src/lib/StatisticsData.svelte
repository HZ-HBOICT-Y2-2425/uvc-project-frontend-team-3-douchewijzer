<script>
    import { onMount } from "svelte";
    import VerifyToken from "$lib/VerifyToken.svelte";
    import DecodeToken from "$lib/DecodeToken.svelte";

    let rows = [];
    let userID = "";

    // Fetch the data from the backend when the component is mounted
    onMount(async () => {
        try {
            const response = await fetch(
                `http://localhost:3010/statistics/${userID}/`,
                {
                    mode: "cors",
                },
            );
            if (response.ok) {
                const data = await response.json();

                const sortedData = data.sort(
                    (a, b) => b.statisticsID - a.statisticsID,
                );
                const latestStatistics = sortedData[0];

                let totalWaterUsage = 0;
                let totalTemperature = 0;
                let totalTime = 0;
                let totalGasUsage = 0;
                let totalCO2 = 0;
                let totalCost = 0;

                let countWater = 0;
                let countTemperature = 0;
                let countTime = 0;
                let countGas = 0;
                let countCO2 = 0;
                let countCost = 0;

                sortedData.forEach((stat) => {
                    if (stat.waterUsage) {
                        totalWaterUsage += parseFloat(stat.waterUsage);
                        countWater++;
                    }
                    if (stat.temperature) {
                        totalTemperature += parseFloat(stat.temperature);
                        countTemperature++;
                    }
                    if (stat.lastTime) {
                        totalTime += parseFloat(stat.lastTime) / 60;
                        countTime++;
                    }
                    if (stat.gasUsage) {
                        totalGasUsage += parseFloat(stat.gasUsage);
                        countGas++;
                    }
                    if (stat.carbonEmission) {
                        totalCO2 += parseFloat(stat.carbonEmission);
                        countCO2++;
                    }
                    if (stat.currentCosts) {
                        totalCost += parseFloat(stat.currentCosts);
                        countCost++;
                    }
                });

                const averageWater = countWater
                    ? (totalWaterUsage / countWater).toFixed(2)
                    : "---";
                const averageTemperature = countTemperature
                    ? (totalTemperature / countTemperature).toFixed(2)
                    : "---";
                const averageTime = countTime
                    ? (totalTime / countTime).toFixed(2)
                    : "---";
                const averageGas = countGas
                    ? (totalGasUsage / countGas).toFixed(2)
                    : "---";
                const averageCO2 = countCO2
                    ? (totalCO2 / countCO2).toFixed(2)
                    : "---";
                const averageCost = countCost
                    ? (totalCost / countCost).toFixed(2)
                    : "---";

                rows = [
                    {
                        id: 1,
                        unit: "Water",
                        last_session: `${latestStatistics.waterUsage || "---"} L`,
                        average: `${averageWater} L`,
                        total: `${totalWaterUsage.toFixed(2)} L`,
                    },
                    {
                        id: 2,
                        unit: "Temperatuur",
                        last_session: `${latestStatistics.temperature || "---"}°C`,
                        average: `${averageTemperature}°C`,
                        total: "---",
                    },
                    {
                        id: 3,
                        unit: "Tijd",
                        last_session: `${latestStatistics.lastTime ? (latestStatistics.lastTime / 60).toFixed(2) : "---"} minuten`,
                        average: `${averageTime} minuten`,
                        total: `${totalTime.toFixed(2)} minuten`,
                    },
                    // {
                    //     id: 4,
                    //     unit: "Gas",
                    //     last_session: `${latestStatistics.gasUsage || "---"} m³`,
                    //     average: `${averageGas} m³`,
                    //     total: `${totalGasUsage.toFixed(2)} m³`,
                    // },
                    // {
                    //     id: 5,
                    //     unit: "CO2",
                    //     last_session: `${latestStatistics.carbonEmission || "---"} g`,
                    //     average: `${averageCO2} g`,
                    //     total: `${totalCO2.toFixed(2)} g`,
                    // },
                    // {
                    //     id: 6,
                    //     unit: "Kosten",
                    //     last_session: `€${latestStatistics.currentCosts || "---"}`,
                    //     average: `€${averageCost}`,
                    //     total: `€${totalCost.toFixed(2)}`,
                    // },
                ];
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
</script>

<VerifyToken />
<DecodeToken bind:userID />

<div class="container mx-auto px-4">
    <table class="min-w-full bg-blue-200 rounded-3xl border border-black mb-8">
        <thead class="bg-blue-900 text-white">
            <tr>
                <th class="border border-gray-300 p-2">Eenheden</th>
                <th class="border border-gray-300 p-2">Laatste sessie</th>
                <th class="border border-gray-300 p-2">Gemiddeld</th>
                <th class="border border-gray-300 p-2">Totaal</th>
            </tr>
        </thead>
        <tbody>
            {#each rows as row (row.id)}
                <tr class="bg-white">
                    <td class="border border-gray-300 p-2">{row.unit}</td>
                    <td class="border border-gray-300 p-2"
                        >{row.last_session}</td
                    >
                    <td class="border border-gray-300 p-2">{row.average}</td>
                    <td class="border border-gray-300 p-2">{row.total}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

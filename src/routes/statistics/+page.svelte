   <script>
    import { onMount } from 'svelte';
    import VerifyToken from '$lib/VerifyToken.svelte';
    import SvelteTable from "svelte-table";
    import DecodeToken from '$lib/DecodeToken.svelte';

    let rows = []; // Initialize empty rows
    let userID = '';

    // Fetch the data from the backend when the component is mounted
    onMount(async () => {
      try {
        const response = await fetch(`http://localhost:3010/statistics/ ${userID} /`, {
          mode: 'cors',
        });
        if (response.ok) {
          const data = await response.json();

          // Sort data by statisticsID in descending order
          const sortedData = data.sort((a, b) => b.statisticsID - a.statisticsID);
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

          sortedData.forEach(stat => {
            if (stat.waterUsage) {
              totalWaterUsage += parseFloat(stat.waterUsage);
              countWater++;
            }
            if (stat.temperature) {
              totalTemperature += parseFloat(stat.temperature);
              countTemperature++;
            }
            if (stat.lastTime) {
              totalTime += parseFloat(stat.lastTime);
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

          // Calculate averages by dividing totals by count
          const averageWater = countWater ? (totalWaterUsage / countWater).toFixed(2) : '---';
          const averageTemperature = countTemperature ? (totalTemperature / countTemperature).toFixed(2) : '---';
          const averageTime = countTime ? (totalTime / countTime).toFixed(2) : '---';
          const averageGas = countGas ? (totalGasUsage / countGas).toFixed(2) : '---';
          const averageCO2 = countCO2 ? (totalCO2 / countCO2).toFixed(2) : '---';
          const averageCost = countCost ? (totalCost / countCost).toFixed(2) : '---';

          // total values
          // const totalWaterUsage = totalWaterUsage.toFixed(2);
          // const totalTime = totalTime.toFixed(2);
          // const totalGasUsage = totalGasUsage.toFixed(2);
          // const totalCO2 = totalCO2.toFixed(2);
          // const totalCost = totalCost.toFixed(2);
          

          rows = [
            {
              id: 1,
              unit: "Water",
              last_session: `${latestStatistics.waterUsage || '---'} L`,
              average: `${averageWater} L`,
              total: `${totalWaterUsage.toFixed(2)} L`
            },
            {
              id: 2,
              unit: "Temperatuur",
              last_session: `${latestStatistics.temperature || '---'}°C`,
              average: `${averageTemperature}°C`,
              total: "---"
            },
            {
              id: 3,
              unit: "Tijd",
              last_session: `${latestStatistics.lastTime || '---'} seconden`,
              average: `${averageTime} seconden`,
              total: "---"
            },
            {
              id: 4,
              unit: "Gas",
              last_session: `${latestStatistics.gasUsage || '---'} m³`,
              average: `${averageGas} m³`,
              total: `${totalGasUsage.toFixed(2)} m³`
            },
            {
              id: 5,
              unit: "CO2",
              last_session: `${latestStatistics.carbonEmission || '---'} g`,
              average: `${averageCO2} g`,
              total: "---"
            },
            {
              id: 6,
              unit: "Kosten",
              last_session: `€${latestStatistics.currentCosts || '---'}`,
              average: `€${averageCost}`,
              total: `€${totalCost.toFixed(2)}`
            }
          ];
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });

    // Columns for the SvelteTable
    const columns = [
      {
        key: "unit",
        title: "Eenheden",
        value: (v) => v.unit,
        sortable: true,
        sortFunction: (a, b) => {
          const sortOrder = [
            "Water",
            "Temperatuur",
            "Tijd",
            "Gas",
            "CO2",
            "Kosten",
          ];
          return sortOrder.indexOf(a.unit) - sortOrder.indexOf(b.unit);
        },
        filterOptions: (rows) => {
          let units = {};
          rows.forEach((row) => {
            let unit = row.unit;
            if (units[unit] === undefined)
              units[unit] = {
                name: `${unit}`,
                value: unit,
              };
          });
          units = Object.entries(units)
            .sort()
            .reduce((o, [k, v]) => ((o[k] = v), o), {});
          return Object.values(units);
        },
        filterValue: (v) => v.unit,
      },
      {
        key: "last_session",
        title: "Laatste sessie",
        value: (v) => v.last_session,
      },
      {
        key: "average",
        title: "Gemiddeld",
        value: (v) => v.average,
      },
      {
        key: "total",
        title: "Totaal",
        value: (v) => v.total,
      },
    ];
</script>

<VerifyToken />
<DecodeToken bind:userID />

<!-- <div class="table" style="margin-left:35%">
  <SvelteTable {columns} {rows}></SvelteTable>
</div> -->

<table class="htmlTable2 w-11/12 border-collapse bg-blue-200 rounded-3xl p-8 m-8 border border-black mb-72" style="margin-left: 20%; width: 60%; height: 40%;">
    <thead class="columnNames2">
        <tr>
            <th class="border border-gray-300 p-2 bg-blue-900 text-white">Eenheden</th>
            <th class="border border-gray-300 p-2 bg-blue-900 text-white">Laatste sessie</th>
            <th class="border border-gray-300 p-2 bg-blue-900 text-white">Gemiddeld</th>
            <th class="border border-gray-300 p-2 bg-blue-900 text-white">Totaal</th>
        </tr>
    </thead>
    <tbody class="tableRow">
        {#each rows as row (row.id)}
        <tr>
            <td class="border border-gray-300 p-2 bg-white">{row.unit}</td>
            <td class="border border-gray-300 p-2 bg-white">{row.last_session}</td>
            <td class="border border-gray-300 p-2 bg-white">{row.average}</td>
            <td class="border border-gray-300 p-2 bg-white">{row.total}</td>
        </tr>
        {/each}
    </tbody>
</table>

<div>
    <img src="src\routes\statistics\a mock graph.png" alt="A mock graph" class="w-11/12 m-8" style="width: 60%; height: 40%; margin-top: -280px; margin-left: 20%;">
    <img src="src\routes\statistics\a mock graph 2.png" alt="A mock graph" class="w-11/12 m-8" style="width: 60%; height: 40%; margin-bottom: 30%; margin-left: 20%;">
</div>

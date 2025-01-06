<script>
  import { onMount } from 'svelte';
  import VerifyToken from '$lib/VerifyToken.svelte';
  import SvelteTable from "svelte-table";
    const rows = [
        {
            id: 1,
            unit: "Water",
            last_session: "32 L",
            average: "35 L",
            total: "1345 L",
        },
        {
            id: 2,
            unit: "Temperatuur",
            last_session: "38°C",
            average: "36°C",
            total: "---",
        },
        {
            id: 3,
            unit: "Tijd",
            last_session: "5:20",
            average: "6:14",
            total: "256",
        },
        {
            id: 4,
            unit: "Gas",
            last_session: "0.23m³",
            average: "0.29m³",
            total: "27.923m³",
        },
        {
            id: 5,
            unit: "CO2",
            last_session: "10,5g",
            average: "12,2g",
            total: "124g",
        },
        {
            id: 6,
            unit: "Kosten",
            last_session: "€1,35",
            average: "€1,67",
            total: "€245",
        },
    ];
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
                // fix order
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
   
<div class="table" style="margin-left:35%"><SvelteTable {columns} {rows}></SvelteTable></div>

<table class="htmlTable2 w-11/12 border-collapse bg-blue-200 rounded-3xl p-8 m-8 border border-black mb-72"
 style="margin-left: 20%; width: 60%; height: 40%;">
    <thead class="columnNames2">
        <tr>
            <th class="border border-gray-300 p-2 bg-blue-900 text-white">Eenheden</th>
            <th class="border border-gray-300 p-2 bg-blue-900 text-white">Laatste sessie</th>
            <th class="border border-gray-300 p-2 bg-blue-900 text-white">Gemiddeld</th>
            <th class="border border-gray-300 p-2 bg-blue-900 text-white">Totaal</th>
        </tr>
    </thead>
    <tbody class="tableRow">
        <tr class="rowRow">
            <td class="border border-gray-300 p-2 bg-white">Water</td>
            <td class="border border-gray-300 p-2 bg-white">32 L</td>
            <td class="border border-gray-300 p-2 bg-white">35 L</td>
            <td class="border border-gray-300 p-2 bg-white">1345 L</td>
        </tr>
        <tr>
            <td class="border border-gray-300 p-2 bg-white">Temperatuur</td>
            <td class="border border-gray-300 p-2 bg-white">38°C</td>
            <td class="border border-gray-300 p-2 bg-white">36°C</td>
            <td class="border border-gray-300 p-2 bg-white">---</td>
        </tr>
        <tr>
            <td class="border border-gray-300 p-2 bg-white">Tijd</td>
            <td class="border border-gray-300 p-2 bg-white">5:20</td>
            <td class="border border-gray-300 p-2 bg-white">6:14</td>
            <td class="border border-gray-300 p-2 bg-white">256</td>
        </tr>
        <tr>
            <td class="border border-gray-300 p-2 bg-white">Gas</td>
            <td class="border border-gray-300 p-2 bg-white">0.23m³</td>
            <td class="border border-gray-300 p-2 bg-white">0.29m³</td>
            <td class="border border-gray-300 p-2 bg-white">27.923m³</td>
        </tr>
        <tr>
            <td class="border border-gray-300 p-2 bg-white">CO2</td>
            <td class="border border-gray-300 p-2 bg-white">10,5g</td>
            <td class="border border-gray-300 p-2 bg-white">12,2g</td>
            <td class="border border-gray-300 p-2 bg-white">124g</td>
        </tr>
        <tr>
            <td class="border border-gray-300 p-2 bg-white">Kosten</td>
            <td class="border border-gray-300 p-2 bg-white">€1,35</td>
            <td class="border border-gray-300 p-2 bg-white">€1,67</td>
            <td class="border border-gray-300 p-2 bg-white">€245</td>
        </tr>
    </tbody>
</table>

<div>
    <img src="src\routes\statistics\a mock graph.png" alt="A mock graph" class="w-11/12 m-8" style="width: 60%; height: 40%; margin-top: -280px; margin-left: 20%;">
    <img src="src\routes\statistics\a mock graph 2.png" alt="A mock graph" class="w-11/12 m-8" style="width: 60%; height: 40%; margin-bottom: 30%; margin-left: 20%;">
</div>

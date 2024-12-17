<script lang="ts">
  import TopUser from './TopUser.svelte';
  import { onMount } from 'svelte';
  import VerifyToken from '$lib/VerifyToken.svelte';

  let leaderboardData = [
    { name: "Eiden", liters: 210, temperature: 22, time: 180 },
    { name: "Jackson", liters: 160, temperature: 24, time: 140 },
    { name: "Emma Aria", liters: 130, temperature: 23, time: 150 },
    { name: "Sebastian", liters: 115, temperature: 21, time: 170 },
    { name: "Jason", liters: 80, temperature: 25, time: 160 },
    { name: "Natalie", liters: 74, temperature: 20, time: 190 },
    { name: "Serenity", liters: 60, temperature: 19, time: 200 },
    { name: "Hannah", liters: 40, temperature: 18, time: 210 },
    { name: "Aria", liters: 30, temperature: 17, time: 220 },
    { name: "Mr. Beast", liters: 20, temperature: 16, time: 230 },
    { name: "Liam", liters: 10, temperature: 15, time: 240 },
    { name: "Mila", liters: 5, temperature: 14, time: 250 },
    { name: "Tyler", liters: 2, temperature: 13, time: 260 },
  ];

  // Restrict selectedSort to valid keys
  let selectedSort: "liters" | "temperature" | "time" = "liters";

  $: sortedData = leaderboardData.slice().sort((a, b) => {
  if (selectedSort === "temperature" || selectedSort === "time") {
    return a[selectedSort] - b[selectedSort]; // Ascending for temperature
  }
  return b[selectedSort] - a[selectedSort]; // Descending for others
});

  $: headerDescription = {
    liters: "Liters water bespaard",
    temperature: "Laagste temperatuur douchen",
    time: "Tijd gedoucht",
  }[selectedSort];
</script>

<VerifyToken />

<main class="min-h-screen bg-blue-50 flex flex-col gap-4">
  <!-- Leaderboard header -->
  <header class="bg-[#00A9FF] py-4 px-6 text-white text-center sticky top-0 z-10 rounded">
    <p class="text-sm" style="margin-top: -20px;">{headerDescription}</p>
  </header>

  <!-- Filter buttons -->
  <nav class="bg-[#CDF5FD] text-black py-2 flex justify-around rounded space-x-2 px-4">
    <button 
      class="font-medium py-2 px-4 rounded border border-[#89CFF3] {selectedSort === 'liters' ? 'bg-[#007BFF] text-white' : 'bg-[#89CFF3]'}"
      on:click={() => (selectedSort = "liters")}
    >
      Liters
    </button>
    <button 
      class="font-medium py-2 px-4 rounded border border-[#89CFF3] {selectedSort === 'temperature' ? 'bg-[#007BFF] text-white' : 'bg-[#89CFF3]'}"
      on:click={() => (selectedSort = "temperature")}
    >
      Temperatuur
    </button>
    <button 
      class="font-medium py-2 px-4 rounded border border-[#89CFF3] {selectedSort === 'time' ? 'bg-[#007BFF] text-white' : 'bg-[#89CFF3]'}"
      on:click={() => (selectedSort = "time")}
    >
      Tijd
    </button>
  </nav>
  

  <!-- Top 3 podium -->
  <section class="flex justify-center items-end bg-[#CDF5FD] py-6 space-x-0 rounded-t-lg">
    <TopUser 
      user={sortedData[1]} 
      position={2} 
      selectedSort={selectedSort} 
      boxColor="#A0E9FF" 
    />
    <TopUser 
      user={sortedData[0]} 
      position={1} 
      selectedSort={selectedSort} 
      boxColor="#89CFF3" 
    />
    <TopUser 
      user={sortedData[2]} 
      position={3} 
      selectedSort={selectedSort} 
      boxColor="#A0E9FF" 
    />
  </section>


  <!-- Other users list -->
  <section
  class="flex-1 bg-blue-50 py-4 px-6 rounded overflow-y-auto"
  style="max-height: calc(100vh - 500px);"
>
  {#each sortedData.slice(3) as user, idx}
    <article
      class="flex justify-between items-center mb-0 p-3 rounded {idx % 2 === 0 ? 'bg-[#A0E9FF]' : 'bg-[#CDF5FD]'}"
    >
      <div class="flex items-center">
        <img src="https://via.placeholder.com/40" alt="Avatar" class="w-10 h-10 rounded-full mr-3" />
        <div>
          <p class="text-sm font-medium">{user.name}</p>
          <p class="text-xs text-gray-500">eventueel badge hier?</p>
        </div>
      </div>
      <div class="text-sm font-semibold text-blue-700">
        {user[selectedSort]} {selectedSort === "time" ? "s" : selectedSort === "temperature" ? "°C" : "L"}
      </div>
    </article>
  {/each}
</section>
</main>


<script>
    import TopUser from './TopUser.svelte';
  
    // wat nep data
    let leaderboardData = [
      { name: "Eiden", liters: 210, temperature: 22, time: 180 },
      { name: "Jackson", liters: 160, temperature: 24, time: 140 },
      { name: "Emma Aria", liters: 130, temperature: 23, time: 150 },
      { name: "Sebastian", liters: 115, temperature: 21, time: 170 },
      { name: "Jason", liters: 80, temperature: 25, time: 160 },
      { name: "Natalie", liters: 74, temperature: 20, time: 190 },
      { name: "Serenity", liters: 60, temperature: 19, time: 200 },
      { name: "Hannah", liters: 40, temperature: 18, time: 210 },
    ];
  // zorgt dat ie start op liter bespaard
    let selectedSort = "liters";
  
  // sort voor nu de users op t leaderboard
    $: sortedData = leaderboardData.slice().sort((a, b) => b[selectedSort] - a[selectedSort]);
  
    // past de beschrijving aan als je van filter veranderd
    $: headerDescription = {
      liters: "Liters water bespaard",
      temperature: "Laagste temperatuur douchen",
      time: "Tijd bespaard"
    }[selectedSort];
  </script>
  
  <main class="min-h-screen bg-blue-50 flex justify-center items-center">
    <section class="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
      <header class="bg-blue-400 py-4 px-6 text-white text-center">
        <h1 class="text-lg font-bold">Leaderboard</h1>
        <p class="text-sm">{headerDescription}</p>
      </header>
  
      <nav class="flex justify-around bg-blue-300 text-white py-2">
        <button class="font-medium" on:click={() => (selectedSort = "liters")}>Liters</button>
        <button class="font-medium" on:click={() => (selectedSort = "temperature")}>Temperatuur</button>
        <button class="font-medium" on:click={() => (selectedSort = "time")}>Tijd</button>
      </nav>
  
      <section class="flex justify-center items-end bg-blue-200 py-6 space-x-4">
        <TopUser user={sortedData[1]} position={2} selectedSort={selectedSort} />
        <TopUser user={sortedData[0]} position={1} selectedSort={selectedSort} />
        <TopUser user={sortedData[2]} position={3} selectedSort={selectedSort} />
      </section>
      
  
      <section class="bg-blue-50 py-4 px-6">
        {#each sortedData.slice(3) as user, idx}
          <article class="flex justify-between items-center mb-3">
            <div class="flex items-center">
              <img src="https://via.placeholder.com/40" alt="Avatar" class="w-10 h-10 rounded-full mr-3" />
              <div>
                <p class="text-sm font-medium">{user.name}</p>
                <p class="text-xs text-gray-500">@username</p>
              </div>
            </div>
            <div class="text-sm font-semibold text-blue-700">
                {user[selectedSort]} {selectedSort === "time" ? "s" : selectedSort === "temperature" ? "°C" : "L"}

            </div>
          </article>
        {/each}
      </section>
    </section>
  </main>
  
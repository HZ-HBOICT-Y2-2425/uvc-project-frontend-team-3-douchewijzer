<script lang="ts">
  import { onMount } from 'svelte';
  import VerifyToken from '$lib/VerifyToken.svelte';
  import DecodeToken from '$lib/DecodeToken.svelte';

  let leaderboardData = []; // Holds the leaderboard data
  let userData = {}; // Holds user data fetched from /users endpoint
  let selectedSort: "liters" | "temperature" | "time" = "liters"; // Sorting state
  let errorMessage = ''; // For handling errors
  let loading = true; // For loading state

  // Function to fetch the leaderboard data
  const fetchLeaderboardData = async () => {
    loading = true; // Start loading
    try {
      const response = await fetch('http://localhost:3010/statistics');
      if (!response.ok) {
        throw new Error(`Failed to fetch leaderboard data: ${response.statusText}`);
      }
      const data = await response.json();

      // Process the data to keep the latest entry for each user
      const latestEntries = {};
      data.forEach(entry => {
        if (!latestEntries[entry.userID] || entry.statisticsID > latestEntries[entry.userID].statisticsID) {
          latestEntries[entry.userID] = entry;
        }
      });

      leaderboardData = Object.values(latestEntries); // Update leaderboard data with latest entries
      console.log('Leaderboard Data:', leaderboardData); // Log to confirm the data

    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      errorMessage = 'Failed to load leaderboard data.';
    } finally {
      loading = false; // End loading
    }
  };

  // Function to fetch the user data
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3010/users/');
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
      const data = await response.json();

      // Store user data by userID for easy access
      data.forEach(user => {
        userData[user.userID] = user;
      });
      console.log('User Data:', userData); // Log to confirm the data
    } catch (error) {
      console.error('Error fetching user data:', error);
      errorMessage = 'Failed to load user data.';
    }
  };

  // Sort the data based on the selected sorting parameter
  $: sortedData = leaderboardData.slice().sort((a, b) => {
    return a[selectedSort] - b[selectedSort];
  });

  // Sorting labels and descriptions
  $: headerDescription = {
    liters: "Liters of water used",
    temperature: "Lowest temperature during shower",
    time: "Shower duration",
  }[selectedSort];

  // Fetch data when the component is mounted
  onMount(() => {
    fetchLeaderboardData();
    fetchUserData();
  });
</script>

<VerifyToken /> <!-- Add any required token verification here -->

<main class="min-h-screen flex flex-col">
  <!-- Header with sorting description -->
  <header class="bg-[#00A9FF] py-4 px-6 text-white text-center sticky">
    <p class="text-sm" style="margin-top: -20px;">{headerDescription}</p>
  </header>

  <!-- Filter buttons to change sorting -->
  <nav class="text-black py-2 flex justify-around rounded space-x-2 px-4">
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
      Temperature
    </button>
    <button
      class="font-medium py-2 px-4 rounded border border-[#89CFF3] {selectedSort === 'time' ? 'bg-[#007BFF] text-white' : 'bg-[#89CFF3]'}"
      on:click={() => (selectedSort = "time")}
    >
      Time
    </button>
  </nav>

  <!-- Loading State -->
  {#if loading}
    <div class="text-center py-4">Loading leaderboard...</div>
  {/if}

  <!-- Error State -->
  {#if errorMessage}
    <div class="text-center py-4 text-red-500">{errorMessage}</div>
  {/if}

  <!-- Top 3 podium -->
  <section class="flex justify-center items-end py-6 space-x-0 rounded-t-lg">
    {#if leaderboardData.length > 0}
      <TopUser user={sortedData[1]} position={2} selectedSort={selectedSort} boxColor="#A0E9FF" />
      <TopUser user={sortedData[0]} position={1} selectedSort={selectedSort} boxColor="#89CFF3" />
      <TopUser user={sortedData[2]} position={3} selectedSort={selectedSort} boxColor="#A0E9FF" />
    {/if}
  </section>

  <!-- Other users list -->
  <section class="flex-1 bg-blue-50 py-4 px-6 rounded overflow-y-auto" style="max-height: calc(100vh - 480px);">
    {#each sortedData.slice(3) as user, idx}
      <article
        class="flex justify-between items-center mb-0 p-3 rounded {idx % 2 === 0 ? 'bg-[#A0E9FF]' : 'bg-[#CDF5FD]'}"
      >
        <div class="flex items-center">
          <!-- Show user image or placeholder -->
          <img 
            src={userData[user.userID]?.userImage || 'https://via.placeholder.com/40'} 
            alt="Avatar" 
            class="w-10 h-10 rounded-full mr-3" 
          />
          <div>
            <!-- Show user's name -->
            <p class="text-sm font-medium">{userData[user.userID]?.name || 'Unknown User'}</p>
          </div>
        </div>
        <div class="text-sm font-semibold text-blue-700">
          {user[selectedSort]} {selectedSort === "time" ? "s" : selectedSort === "temperature" ? "°C" : "L"}
        </div>
      </article>
    {/each}
  </section>
</main>

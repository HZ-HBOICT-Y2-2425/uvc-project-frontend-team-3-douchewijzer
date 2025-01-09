<script lang="ts">
  import { onMount } from 'svelte';
  import VerifyToken from '$lib/VerifyToken.svelte';
  import DecodeToken from '$lib/DecodeToken.svelte';
  import TopUser from '$lib/TopUser.svelte';
  import EmojiConvertor from 'emoji-js';

  let leaderboardData = []; // Holds the leaderboard data
  let selectedSort: "liters" | "temperature" | "time" = "liters"; // Sorting state
  let errorMessage = ''; // For handling errors
  let loading = true; // For loading state

  const emoji = new EmojiConvertor();
  emoji.img_set = 'apple';
  emoji.img_sets.apple.path = 'https://cdnjs.cloudflare.com/ajax/libs/emoji-datasource-apple/6.0.1/img/apple/64/';
  emoji.replace_mode = 'img'; // Ensures the output is <img>

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

  // Function to fetch user data and enrich leaderboardData
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3010/users');
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
      const users = await response.json();

      const preferenceResponse = await fetch('http://localhost:3010/users/preferences');
      if (!preferenceResponse.ok) {
        throw new Error(`Failed to fetch user preferences: ${preferenceResponse.statusText}`);
      }
      const preferences = await preferenceResponse.json();

      // Create a map of userID to user details for quick lookup
      const userMap = {};
      const preferenceMap = preferences.reduce((map, pref) => {
        if (pref.leaderbordUploadPreference === 1) {
          map[pref.userID] = true;
        }
        return map;
      }, {});

      users.forEach((user) => {
        if (preferenceMap[user.userID]) {
          const emojiChar = String.fromCodePoint(parseInt(user.userImage, 16)); // Convert Unicode code point to emoji character
          const userImage = emoji.replace_unified(emojiChar); // Convert emoji to HTML <img> tag
          userMap[user.userID] = {
            name: user.name,
            userImage: userImage || "https://via.placeholder.com/40", // Default to placeholder if no image
          };
        }
      });

      // Update leaderboardData with user details
      leaderboardData = leaderboardData.filter(entry => userMap[entry.userID]).map((entry) => ({
        ...entry,
        name: userMap[entry.userID]?.name || `User ${entry.userID}`, // Default to "User {userID}" if no name
        userImage: userMap[entry.userID]?.userImage,
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
      errorMessage = 'Failed to load user data.';
    }
  };

  // Fetch leaderboard and user data when the component is mounted
  onMount(async () => {
    await fetchLeaderboardData();
    await fetchUserData();
  });

  // Sort the data based on the selected sorting parameter and filter out invalid entries
  $: sortedData = leaderboardData
    .filter((user) => {
      const fieldMap = {
        liters: "waterUsage",
        temperature: "temperature",
        time: "lastTime",
      };

      const key = fieldMap[selectedSort];
      const value = parseFloat(user[key]); // Ensure the value is treated as a number
      return value > 0; // Keep all valid positive numbers (including decimals) and exclude 0 or invalid entries
    })
    .sort((a, b) => {
      const fieldMap = {
        liters: "waterUsage",
        temperature: "temperature",
        time: "lastTime",
      };

      const key = fieldMap[selectedSort];
      return parseFloat(a[key] || 0) - parseFloat(b[key] || 0); // Sort numerically
    });

  // Sorting labels and descriptions
  $: headerDescription = {
    liters: "Liters of water used",
    temperature: "Lowest temperature during shower",
    time: "Shower duration",
  }[selectedSort];
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
      <article class="flex justify-between items-center mb-0 p-3 rounded {idx % 2 === 0 ? 'bg-[#A0E9FF]' : 'bg-[#CDF5FD]'}">
        <div class="flex items-center">
          {@html user.userImage}
          <div>
            <p class="text-lg font-medium ml-4">{user.name || `User ${user.userID}`}</p>
          </div>
        </div>
        <div class="text-sm font-semibold text-blue-700">
          {#if selectedSort === "liters"}
            {parseFloat(user.waterUsage || 0).toFixed(2)} L
          {:else if selectedSort === "temperature"}
            {parseFloat(user.temperature || 0).toFixed(2)} °C
          {:else if selectedSort === "time"}
            {parseFloat(user.lastTime || 0).toFixed(2)} s
          {/if}
        </div>
      </article>
    {/each}
  </section>
</main>

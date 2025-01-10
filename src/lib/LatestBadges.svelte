<script>
  import { onMount } from 'svelte';
  import DecodeToken from '$lib/DecodeToken.svelte';
  let userID = ""; // Assuming userID is available
  let ownedItems = [];
  let badges = [];
  let errorMessage = '';

  const fetchOwnedItems = async () => {
    try {
      const response = await fetch(`http://localhost:3010/users/${userID}/owned-items`);
      if (!response.ok) {
        throw new Error(`Failed to fetch owned items: ${response.statusText}`);
      }
      ownedItems = await response.json();
      console.log("Owned items fetched:", ownedItems);
    } catch (error) {
      console.error("Error fetching owned items:", error);
      errorMessage = "Failed to load owned items.";
    }
  };

  const fetchBadges = async () => {
    try {
      const response = await fetch('http://localhost:3010/badges');
      if (!response.ok) {
        throw new Error(`Failed to fetch badges: ${response.statusText}`);
      }
      const data = await response.json();
      badges = Array.isArray(data) ? data : [data];
      console.log("Badges fetched:", badges);
    } catch (error) {
      console.error('Error fetching badges:', error);
      errorMessage = 'Failed to load badges.';
    }
  };

  onMount(async () => {
    try {
      await fetchOwnedItems();
      await fetchBadges();
    } catch (error) {
      console.error("Error in fetching data during onMount:", error);
      errorMessage = "An error occurred while fetching data.";
    }
  });

  $: filteredBadges = badges.filter(badge => ownedItems.some(item => item.badgeID === badge.badgeID)).slice(0, 3);
</script>

<DecodeToken bind:userID />
<div class="flex items-center justify-center relative w-full h-12">
  {#if filteredBadges.length > 0}
    {#each filteredBadges as badge, i}
      <a
        href="/badges"
        class="absolute border-2 border-white rounded-full overflow-hidden shadow-md transition-transform hover:scale-105"
        style="width: 78px; height: 78px; left: {i * 85}px; z-index: {3 - i};"
      >
        <img
          src={badge.badgeImage} 
          alt={badge.badgeName}
          class="w-full h-full object-cover"
        />
      </a>
    {/each}
  {:else if errorMessage}
    <p class="text-sm text-gray-500">{errorMessage}</p>
  {:else}
    <p class="text-sm text-gray-500">Geen badges om weer te geven</p>
  {/if}
</div>

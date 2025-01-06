<script>
  import { onMount } from 'svelte';

  let badges = []; 
  let latestBadges = []; 
  let errorMessage = ''; 


  const fetchBadges = async () => {
    try {
      const response = await fetch('http://localhost:3010/badges'); 
      if (!response.ok) {
        throw new Error(`Failed to fetch badges: ${response.statusText}`);
      }
      const data = await response.json();
      badges = Array.isArray(data) ? data : [data]; 
      latestBadges = badges.slice(-3).reverse();
    } catch (error) {
      console.error('Error fetching badges:', error);
      errorMessage = 'Failed to load badges.';
    }
  };

  onMount(() => {
    fetchBadges();
  });
</script>

<div class="flex items-center justify-center relative w-full h-12">
  {#if latestBadges.length > 0}
    {#each latestBadges as badge, i}
      <a
        href="/badges"
        class="absolute border-2 border-white rounded-full overflow-hidden shadow-md transition-transform hover:scale-105"
        style="width: 48px; height: 48px; left: {i * 40}px; z-index: {3 - i};"
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
    <p class="text-sm text-gray-500">Geen recente badges</p>
  {/if}
</div>

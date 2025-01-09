<script>
  import { onMount } from 'svelte';

  let badges = [];
  let randomBadges = [];
  let errorMessage = '';

  const fetchBadges = async () => {
    try {
      const response = await fetch('http://localhost:3010/badges');
      if (!response.ok) {
        throw new Error(`Failed to fetch badges: ${response.statusText}`);
      }
      const data = await response.json();
      badges = Array.isArray(data) ? data : [data];

      if (badges.length > 0) {
        // Shuffle the badges array and select 3 random badges
        randomBadges = badges
          .slice() // Create a shallow copy to avoid modifying the original array
          .sort(() => Math.random() - 0.5) // Shuffle badges randomly
          .slice(0, 3); // Take the first 3 badges
      }
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
  {#if randomBadges.length > 0}
    {#each randomBadges as badge, i}
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

<script>
    // Dit component laat de onderste 3 badges vanuit de array zien
  export let badges = [];


  const latestBadges = badges.slice(-3).reverse(); 
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
          src={badge.itemImage}
          alt={badge.name || 'Badge'}
          class="w-full h-full object-cover"
        />
      </a>
    {/each}
  {:else}
    <p class="text-sm text-gray-500">Geen recente badges</p>
  {/if}
</div>

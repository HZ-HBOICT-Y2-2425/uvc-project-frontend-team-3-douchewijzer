<script>
  export let badges = [];

  const latestBadges = badges
    .filter((badge) => badge.achieved)
    .sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt))
    .slice(0, 3);
</script>

<div class="flex items-center justify-center relative w-full h-12">
  {#each latestBadges as badge, i}
    <a
      href="/badges"
      class="absolute border-2 border-white rounded-full overflow-hidden shadow-md transition-transform hover:scale-105"
      style="width: 48px; height: 48px; left: {i * 24}px; z-index: {3 - i};"
    >
      <img
        src={badge.image}
        alt={badge.name}
        class="w-full h-full object-cover"
      />
    </a>
  {/each}
</div>

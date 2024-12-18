<script>
  import VerifyToken from '$lib/VerifyToken.svelte';
  import LatestBadges from '$lib/LatestBadges.svelte';

  // Fetch badges from the database (mocked here for now)
  let badges = [
    {
      itemID: 1,
      itemValue: "4.00",
      itemImage: "https://via.placeholder.com/40",
    },
    {
      itemID: 2,
      itemValue: "10.00",
      itemImage: "https://via.placeholder.com/40",
    },
    {
      itemID: 3,
      itemValue: "1.00",
      itemImage: "https://via.placeholder.com/40",
    },
  ];

  // If required, transform or sort the badges for display
  let sortedBadges = badges.sort((a, b) => a.itemID - b.itemID);

</script>

<!-- Header -->
<VerifyToken />

<header class="bg-[#00A9FF] py-4 px-6 text-white text-center sticky top-0 z-10 rounded">
  <h1 class="text-2xl font-bold">Jou Badges</h1>
</header>

<!-- Badges Grid -->
<section class="p-4 bg-blue-100 grid grid-cols-2 gap-4">
  {#each sortedBadges as badge}
    <div class="bg-white rounded-lg shadow-md overflow-hidden p-2 flex flex-col items-center">
      <img src={badge.itemImage} alt="Badge" class="w-16 h-16 object-cover mb-2" />
      <p class="text-sm font-semibold text-center">Badge ID: {badge.itemID}</p>
      <p class="text-xs text-gray-500">Value: {badge.itemValue}</p>
    </div>
  {/each}
</section>

<!-- Recently Earned Section -->
<section class="bg-blue-100 py-4">
  <h2 class="text-center text-lg font-semibold mb-2">Recently Earned</h2>
  <LatestBadges {badges} />
</section>

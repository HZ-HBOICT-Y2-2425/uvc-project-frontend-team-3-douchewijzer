<script>
  import VerifyToken from '$lib/VerifyToken.svelte';
  import LatestBadges from '$lib/LatestBadges.svelte';

  // Fetch badges from the database (mocked here for now)
  let badges = [
  { itemID: 1, itemValue: "4.00", itemImage: "https://via.placeholder.com/40" },
  { itemID: 2, itemValue: "10.00", itemImage: "https://via.placeholder.com/40" },
  { itemID: 3, itemValue: "1.00", itemImage: "https://via.placeholder.com/40" },
  { itemID: 4, itemValue: "11.00", itemImage: "https://via.placeholder.com/40" },
  { itemID: 5, itemValue: "7.50", itemImage: "https://via.placeholder.com/40" },
  { itemID: 6, itemValue: "3.25", itemImage: "https://via.placeholder.com/40" },
  { itemID: 7, itemValue: "12.00", itemImage: "https://via.placeholder.com/40" },
  { itemID: 8, itemValue: "8.75", itemImage: "https://via.placeholder.com/40" },
  { itemID: 9, itemValue: "5.50", itemImage: "https://via.placeholder.com/40" },
  { itemID: 10, itemValue: "6.30", itemImage: "https://via.placeholder.com/40" },
  { itemID: 11, itemValue: "9.00", itemImage: "https://via.placeholder.com/40" },
  { itemID: 12, itemValue: "2.00", itemImage: "https://via.placeholder.com/40" },
  { itemID: 13, itemValue: "10.50", itemImage: "https://via.placeholder.com/40" },
  { itemID: 14, itemValue: "4.75", itemImage: "https://via.placeholder.com/40" },
  { itemID: 15, itemValue: "3.90", itemImage: "https://via.placeholder.com/40" },
  { itemID: 16, itemValue: "7.20", itemImage: "https://via.placeholder.com/40" },
  { itemID: 17, itemValue: "8.00", itemImage: "https://via.placeholder.com/40" },
  { itemID: 18, itemValue: "5.80", itemImage: "https://via.placeholder.com/40" },
  { itemID: 19, itemValue: "9.40", itemImage: "https://via.placeholder.com/40" },
  { itemID: 20, itemValue: "3.10", itemImage: "https://via.placeholder.com/40" },
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
<section class="p-4 bg-blue-100 grid grid-cols-2 pb-16 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
  {#each sortedBadges as badge}
    <div class="bg-white rounded-lg shadow-md overflow-hidden p-2 flex flex-col items-center aspect-w-1 aspect-h-1">
      <img src={badge.itemImage} alt="Badge" class="w-full h-full object-cover mb-2" />
      <p class="text-sm font-semibold text-center">Badge ID: {badge.itemID}</p>
      <p class="text-xs text-gray-500">Value: {badge.itemValue}</p>
    </div>
  {/each}
</section>



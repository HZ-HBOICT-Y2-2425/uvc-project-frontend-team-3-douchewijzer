<script>
  import { onMount } from 'svelte';
  import VerifyToken from '$lib/VerifyToken.svelte';

  let badges = []; // Store the badges fetched from the backend
  let errorMessage = ''; // Error message for failed fetch

  // Fetch badges from the backend
  const fetchBadges = async () => {
    try {
      const response = await fetch('http://localhost:3000/badges'); // Replace with your actual backend endpoint
      if (!response.ok) {
        throw new Error(`Failed to fetch badges: ${response.statusText}`);
      }
      const data = await response.json(); // Assuming the backend returns an array of badges
      badges = data; // Store the fetched badges
    } catch (error) {
      console.error('Error fetching badges:', error);
      errorMessage = 'Failed to load badges.';
    }
  };

  // Fetch badges on component mount
  onMount(() => {
    fetchBadges();
  });
</script>

<!-- Header -->
<VerifyToken />

<header class="bg-[#00A9FF] py-4 px-6 text-white text-center sticky top-0 z-10 rounded">
  <h1 class="text-2xl font-bold">Jouw Badges</h1>
</header>

<!-- Badges Grid -->
<section class="p-4 bg-blue-100 grid grid-cols-2 pb-16 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
  {#if badges.length > 0}
    {#each badges as badge}
      <div class="bg-white rounded-lg shadow-md overflow-hidden p-2 flex flex-col items-center aspect-w-1 aspect-h-1">
        <img src={badge.badgeImage || 'placeholder.png'} alt="Badge" class="w-full h-full object-cover mb-2" />
        <p class="text-sm font-semibold text-center">Badge ID: {badge.badgeID}</p>
        <p class="text-xs text-gray-500">{badge.badgeDescription}</p>
      </div>
    {/each}
  {:else}
    <p class="text-center text-gray-500">{errorMessage || 'Loading badges...'}</p>
  {/if}
</section>

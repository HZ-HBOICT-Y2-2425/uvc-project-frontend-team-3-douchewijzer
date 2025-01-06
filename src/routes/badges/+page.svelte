<script>
  import VerifyToken from '$lib/VerifyToken.svelte';

  let badges = []; // Store the fetched badges
  let loading = true; // Indicate loading state
  let error = null; // Capture any errors during the fetch

  // Fetch badges from the backend
  const fetchBadges = async () => {
    try {
      const response = await fetch('http://localhost:3000/badges'); // Replace with your backend URL
      if (!response.ok) {
        throw new Error(`Failed to fetch badges: ${response.statusText}`);
      }
      const data = await response.json();
      badges = data; // Update the badges array with the fetched data
    } catch (err) {
      console.error(err);
      error = err.message;
    } finally {
      loading = false; // Stop the loading spinner
    }
  };

  // Call the function on component load
  fetchBadges();
</script>

<!-- Header -->
<VerifyToken />

<header class="bg-[#00A9FF] py-4 px-6 text-white text-center sticky top-0 z-10 rounded">
  <h1 class="text-2xl font-bold">Your Badges</h1>
</header>

<!-- Loading or Error State -->
{#if loading}
  <div class="p-4 text-center text-gray-500">Loading badges...</div>
{:else if error}
  <div class="p-4 text-center text-red-500">Error: {error}</div>
{:else}

  <!-- Badges Grid -->
  <section class="p-4 bg-blue-100 grid grid-cols-2 pb-16 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {#each badges as badge}
      <div class="bg-white rounded-lg shadow-md overflow-hidden p-2 flex flex-col items-center aspect-w-1 aspect-h-1">
        <img
          src={badge.badgeImage || '/images/default.png'}
          alt={badge.badgeName}
          class="w-full h-full object-cover mb-2"
        />
        <p class="text-sm font-semibold text-center">{badge.badgeName}</p>
        <p class="text-xs text-gray-500">{badge.badgeDescription || 'No description available'}</p>
      </div>
    {/each}
  </section>
{/if}

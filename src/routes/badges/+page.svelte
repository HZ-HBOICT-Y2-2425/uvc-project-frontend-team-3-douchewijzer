<script>
  import { onMount } from "svelte";
  import VerifyToken from "$lib/VerifyToken.svelte";
  import DecodeToken from "$lib/DecodeToken.svelte";

  let userID = ""; 
  let ownedItems = [];
  let badges = [];
  let errorMessage = "";
  let loading = true; 

  const fetchOwnedItems = async () => {
    try {
      const response = await fetch(`http://localhost:3010/users/${userID}/owned-items`);
      if (!response.ok) {
        throw new Error(`Failed to fetch owned items: ${response.statusText}`);
      }
      ownedItems = await response.json();
    } catch (error) {
      errorMessage = "Failed to load owned items.";
    }
  };

  const fetchBadgeDetails = async (badgeID) => {
    try {
      const response = await fetch(`http://localhost:3010/badges/${badgeID}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch badge details: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      errorMessage = "Failed to load badge details.";
    }
  };

  const fetchBadges = async () => {
    try {
      const badgePromises = ownedItems.map(item => fetchBadgeDetails(item.badgeID));
      badges = await Promise.all(badgePromises);
    } catch (error) {
      errorMessage = "Failed to load badges.";
    }
  };

  onMount(async () => {
    try {
      await fetchOwnedItems();
      await fetchBadges();
    } catch (error) {
      errorMessage = "An error occurred while fetching data.";
    } finally {
      loading = false; // Ensure loading is only set to false after all processing
    }
  });
</script>

<VerifyToken />
<DecodeToken bind:userID />

<section class="p-4 bg-white grid grid-cols-2 pb-16 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
  {#if loading}
    <p class="text-center text-gray-500">Laden... Als dit lang duurt, herlaad de pagina</p>
  {:else if badges.length > 0}
    {#each badges as badge}
      <div class="bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center aspect-w-1 aspect-h-2 border border-black">
        <img src="{badge.badgeImage}" alt="Badge" class="w-full h-auto object-cover mb-4" />
        <p class="text-sm font-semibold text-center mb-1">{badge.badgeName}</p>
        <p class="text-xs text-gray-500 text-center">{badge.badgeDescription}</p>
      </div>
    {/each}
  {:else}
    <p class="text-center text-gray-500">{errorMessage || "Herlaad alstublieft deze pagina"}</p>
  {/if}
</section>


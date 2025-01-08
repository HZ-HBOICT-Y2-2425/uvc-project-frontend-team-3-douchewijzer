<script>
  import { onMount } from "svelte";
  import VerifyToken from "$lib/VerifyToken.svelte";
  import DecodeToken from "$lib/DecodeToken.svelte";

  let userID = ""; // This will be populated from DecodeToken
  let badges = [];
  let filteredBadges = [];
  let unfilteredBadges = [];
  let userStatistics = null; // Define userStatistics globally
  let errorMessage = "";

  // Fetch badges
  const fetchBadges = async () => {
    try {
      const response = await fetch("http://localhost:3010/badges");
      if (!response.ok) {
        throw new Error(`Failed to fetch badges: ${response.statusText}`);
      }
      badges = await response.json();
    } catch (error) {
      console.error("Error fetching badges:", error);
      errorMessage = "Failed to load badges.";
    }
  };

  // Fetch and process user statistics
  const fetchUserStatistics = async () => {
    try {
      const response = await fetch(
        `http://localhost:3010/statistics/${userID}`,
        {
          mode: "cors",
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Sort data by `statisticsID` to find the latest
        const sortedData = data.sort(
          (a, b) => b.statisticsID - a.statisticsID
        );
        const latestStatistics = sortedData[0];

        // Store the latest statistics globally
        userStatistics = latestStatistics;

        console.log("Processed statistics:", userStatistics);
      } else {
        console.error("Failed to fetch user statistics");
        errorMessage = "Failed to load user statistics.";
      }
    } catch (error) {
      console.error("Error fetching user statistics:", error);
      errorMessage = "Failed to load user statistics.";
    }
  };

  // Filter badges based on user statistics
  const filterBadges = () => {
    if (!userStatistics || badges.length === 0) return;

    // Badge 1 condition: Only show if latest statistic's average temperature < 20
    filteredBadges = badges.filter((badge) => {
      switch (badge.badgeID) {
        case 1:
          return userStatistics.averageTemperature <= 26;
        case 2:
          return userStatistics.averageTemperature <= 20;
        case 3:
          return userStatistics.averageTemperature <= 16;
        default:
          return false; // Exclude badges with no conditions or badges we don't want to show
      }
    });

    // Badges that don't meet the requirements
    unfilteredBadges = badges.filter((badge) => !filteredBadges.includes(badge));

    console.log("Filtered badges:", filteredBadges);
    console.log("Unfiltered badges:", unfilteredBadges);
  };

  // On mount, fetch the badges and statistics
  onMount(async () => {
    await Promise.all([fetchBadges(), fetchUserStatistics()]);
    filterBadges(); // Ensure it's called after both are done
  });
</script>

<VerifyToken />
<DecodeToken bind:userID />

<section class="p-4 bg-blue-100 grid grid-cols-2 pb-16 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
  {#if filteredBadges.length > 0}
    {#each filteredBadges as badge}
      <div class="bg-white rounded-lg shadow-md overflow-hidden p-2 flex flex-col items-center aspect-w-1 aspect-h-1">
        <img src="{badge.badgeImage}" alt="Badge" class="w-full h-full object-cover mb-2" />
        <p class="text-sm font-semibold text-center">Badge ID: {badge.badgeID}</p>
        <p class="text-sm font-semibold text-center">Badge Name: {badge.badgeName}</p>
        <p class="text-xs text-gray-500">{badge.badgeDescription}</p>
      </div>
    {/each}
  {:else}
    <p class="text-center text-gray-500">{errorMessage || "No badges to display."}</p>
  {/if}
</section>

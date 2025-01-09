<script>
  import { onMount } from "svelte";
  import VerifyToken from "$lib/VerifyToken.svelte";
  import DecodeToken from "$lib/DecodeToken.svelte";

  let userID = ""; 
  let badges = [];
  let filteredBadges = [];
  let unfilteredBadges = [];
  let userStatistics = null; 
  let userData = null; 
  let errorMessage = "";
  let loading = true; 

  const fetchBadges = async () => {
    try {
      const response = await fetch("http://localhost:3010/badges");
      if (!response.ok) {
        throw new Error(`Failed to fetch badges: ${response.statusText}`);
      }
      badges = await response.json();
      console.log("Badges fetched:", badges);
    } catch (error) {
      console.error("Error fetching badges:", error);
      errorMessage = "Failed to load badges.";
    }
  };

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

      // Calculate average temperature
      const validTemperatures = data
        .map((stat) => parseFloat(stat.temperature))
        .filter((temp) => !isNaN(temp));

      const averageTemperature =
        validTemperatures.reduce((sum, temp) => sum + temp, 0) /
        validTemperatures.length;

      console.log("Calculated average temperature:", averageTemperature);

      const sortedData = data.sort((a, b) => b.statisticsID - a.statisticsID);
      const latestStatistics = sortedData[0];

      const statisticsEntriesCount = data.length; // Include this count

      userStatistics = { 
        ...latestStatistics, 
        averageTemperature, 
        statisticsEntriesCount // Add this property to the userStatistics object
      };

      console.log("Processed statistics:", userStatistics);
      console.log("Total statistics entries:", statisticsEntriesCount);
    } else {
      console.error("Failed to fetch user statistics");
      errorMessage = "Failed to load user statistics.";
    }
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    errorMessage = "Failed to load user statistics.";
  }
};


  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3010/users/${userID}`);
      if (response.ok) {
        userData = await response.json();
        console.log("User data fetched:", userData);
      } else {
        console.error("Failed to fetch user data.");
        errorMessage = "Failed to load user data.";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      errorMessage = "Failed to load user data.";
    }
  };

  const filterBadges = () => {
    if (!userStatistics || !userData || badges.length === 0) {
      console.log("Not all data is ready for filtering badges.");
      return;
    }

    const averageTemperature = parseFloat(userStatistics.averageTemperature);
    const coins = userData.coins;

    if (isNaN(averageTemperature) || isNaN(coins)) {
      console.log("Invalid averageTemperature or coins.");
      return;
    }

    filteredBadges = badges.filter((badge) => {
      switch (badge.badgeID) {
        case 1:
          return true;
        case 2:
          return averageTemperature <= 28;
        case 3:
          return averageTemperature <= 22;
        case 4:
          return averageTemperature <= 18;
        case 5:
          return coins >= 1000;
        case 6:
          return coins >= 3000;
        case 7:
          return coins >= 1000;
        case 8:
        console.log("Total statistics entries:", userStatistics.statisticsEntriesCount);
          return userStatistics.statisticsEntriesCount >= 1;
        case 9:
          return userStatistics.statisticsEntriesCount >= 10;
        case 10:
          return userStatistics.statisticsEntriesCount >= 100;
        default:
          return false;
      }
    });

    unfilteredBadges = badges.filter((badge) => !filteredBadges.includes(badge));
    console.log("Filtered badges:", filteredBadges);
  };

  onMount(async () => {
    try {
      await fetchBadges();
      await fetchUserStatistics();
      await fetchUserData();

      // Ensure data is fully loaded before filtering badges
      if (badges.length > 0 && userStatistics && userData) {
        filterBadges();
      }
    } catch (error) {
      console.error("Error in fetching data during onMount:", error);
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
  {:else if filteredBadges.length > 0}
    {#each filteredBadges as badge}
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


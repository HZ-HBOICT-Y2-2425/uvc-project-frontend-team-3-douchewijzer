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

        const sortedData = data.sort(
          (a, b) => b.statisticsID - a.statisticsID
        );
        const latestStatistics = sortedData[0];

        const statisticsEntriesCount = data.length;

        userStatistics = latestStatistics;

        console.log("Processed statistics:", userStatistics);
        console.log("Total statistics entries:", statisticsEntriesCount);

        filterBadges(statisticsEntriesCount);
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

  const filterBadges = (statisticsEntriesCount) => {
    if (!userStatistics || !userData || badges.length === 0) {
      return;
    }

    const averageTemperature = parseFloat(userStatistics.averageTemperature);
    const coins = userData.coins;

    if (isNaN(averageTemperature) || isNaN(coins)) {
      return;
    }

    filteredBadges = badges.filter((badge) => {
      switch (badge.badgeID) {
        case 1:
          return averageTemperature < 20;
        case 2:
          return averageTemperature <= 26;
        case 3:
          return averageTemperature <= 20;
        case 4:
          return averageTemperature <= 16;
        case 5:
          return coins >= 1000;
        case 6:
          return coins >= 3000;
        case 7:
          return coins >= 1000;
        case 8:
          return statisticsEntriesCount >= 1;
        case 9:
          return statisticsEntriesCount >= 10;
        case 10:
          return statisticsEntriesCount >= 100;
        default:
          return false;
      }
    });

    unfilteredBadges = badges.filter((badge) => !filteredBadges.includes(badge));
    loading = false;
  };

  onMount(async () => {
    try {
      await Promise.all([fetchBadges(), fetchUserStatistics(), fetchUserData()]);
    } catch (error) {
      console.error("Error in fetching data during onMount:", error);
      errorMessage = "An error occurred while fetching data.";
    } finally {
      loading = false;
    }
  });
</script>

<VerifyToken />
<DecodeToken bind:userID />

<section class="p-4 bg-white grid grid-cols-2 pb-16 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
  {#if loading}
    <p class="text-center text-gray-500">Laden...  Als dit lang duurt, ververs de pagina</p>
  {:else if filteredBadges.length > 0}
    {#each filteredBadges as badge}
    <div class="bg-white rounded-lg shadow-md overflow-hidden p-2 flex flex-col items-center aspect-w-1 aspect-h-1 border border-black">
        <img src="{badge.badgeImage}" alt="Badge" class="w-full h-full object-cover mb-2" />
        <p class="text-sm font-semibold text-center">{badge.badgeName}</p>
        <p class="text-xs text-gray-500">{badge.badgeDescription}</p>
      </div>
    {/each}
  {:else}
    <p class="text-center text-gray-500">{errorMessage || "Herlaad alstublieft deze pagina"}</p>
  {/if}
</section>

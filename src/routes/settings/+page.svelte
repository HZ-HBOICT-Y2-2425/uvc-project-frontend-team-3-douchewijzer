<script lang="ts">
    import { onMount } from 'svelte';
    import VerifyToken from '$lib/VerifyToken.svelte';
    import DecodeToken from '$lib/DecodeToken.svelte';
    import LatestBadges from '$lib/LatestBadges.svelte';

    let badges = [
    {
      itemID: 1,
      itemValue: "4.00",
      itemImage: "https://via.placeholder.com/10",
    },
    {
      itemID: 2,
      itemValue: "10.00",
      itemImage: "https://via.placeholder.com/20",
    },
    {
      itemID: 3,
      itemValue: "1.00",
      itemImage: "https://via.placeholder.com/30",
    },
    {
      itemID: 4,
      itemValue: "1.00",
      itemImage: "https://via.placeholder.com/40",
    },
  ];

  
    let userID: string = '';
    let name: string = '';

  </script>
  
  <VerifyToken />
  <DecodeToken bind:userID bind:name />
  
  <p class="p-5">User ID: {userID}</p>
  <p class="p-5">Name: {name}</p>
  
  <h2 class="text-xl font-bold mt-4">Account:</h2>
  <div class="my-2">(insert image here)</div>
  <img src="" alt="it ain't here boss" class="my-2">
  <div class="my-2">Gebruikersnaam:</div>
  <div class="my-2">Email:</div>
  
  <h2 class="text-xl font-bold mt-4">Toestemming:</h2>
  <div class="my-2">
      <p class="mb-2">Leaderboard updates</p>
      <label class="relative inline-block w-16 h-8">
          <input type="checkbox" class="opacity-0 w-0 h-0 peer">
          <span class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-200 ease-in-out peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-500"></span>
          <span class="absolute left-1 bottom-1 bg-white h-6 w-6 rounded-full transition-transform duration-200 ease-in-out peer-checked:transform peer-checked:translate-x-8"></span>
      </label>
  </div>
  
  <h2 class="text-xl font-bold mt-4">Privacy:</h2>
  <div class="my-2">
      <p class="mb-2">Uploaden naar leaderboard</p>
      <label class="relative inline-block w-16 h-8">
          <input type="checkbox" class="opacity-0 w-0 h-0 peer">
          <span class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-200 ease-in-out peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-500"></span>
          <span class="absolute left-1 bottom-1 bg-white h-6 w-6 rounded-full transition-transform duration-200 ease-in-out peer-checked:transform peer-checked:translate-x-8"></span>
      </label>
  
      <section>
          <h2 class="text-center text-lg font-semibold mb-2">Recently Earned</h2>
          <LatestBadges {badges} /> 
        </section>
  </div>
  
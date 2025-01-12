<script>
  import { onMount } from 'svelte';
  import VerifyToken from '$lib/VerifyToken.svelte';
  import DecodeToken from '$lib/DecodeToken.svelte';

  export let data; //store goals data

let showPopup = false;
let goals = data;
let userID = '';
let name = '';
let coins = 0;

  const closePopUp = () => {
    showPopup = false;
  };

</script>

<VerifyToken />
<DecodeToken bind:userID bind:name bind:coins />


<div class="flex gap-9 justify-center">
  <div>
      <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800" on:click={() => (showPopup = true)}>Doel Maken</button>
  </div>
  <div>
    <a href="/milestones">
      <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800">mijlpalen</button>
    </a>
  </div>
</div>

{#if showPopup}
<form method='POST' action="?/addGoal">
<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
<div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 p-6 rounded-2xl shadow-lg text-center z-50 w-11/12 max-w-lg">
    <p class="text-2xl mb-5">doel maken</p>
    <input 
        type="hidden"
        name="userID"
        value={userID}
    />
    <select name= "goalDescription" class="block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md">
      <option value="douche met timer">Douche met Timer</option>
      <option value="bespaar water">Bespaar water</option>
      </select>
      <input
        type="number"
        name= "goalAmount"
        placeholder="hoevaak/hoeveel?"
        min="1"
        class="block w-full px-3 py-2 mb-5 border border-gray-300 rounded-md"
      />
    <button type="submit" class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800 w-full">Add Goal</button>
    <button class="bg-gray-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-gray-800 w-full" on:click={closePopUp}>Sluiten</button>
</div>
</form>
{/if}

<!--goal-->
{#if goals.props.data.length === 0}
  <p class="text-center text-blue-600 font-semibold">Loading goals...</p>
{:else}
  <div class="flex flex-wrap justify-center gap-6 py-4">
    {#each goals.props.data as goal, index} 
      {#if goal.userID == userID} 
        <div class="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden border border-blue-200">
          <!-- Milestone Header -->
          <div class="px-6 py-4 bg-blue-50 border-b border-blue-200">
            <h3 class="text-lg font-semibold text-blue-700">
              {goal.goalDescription}
            </h3>
          </div>
      
          <!-- Progress Bar -->
          <div class="px-6 py-4">
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm font-medium text-gray-600">Progress:</span>
              <span class="text-lg font-bold text-blue-700">
                {goal.goalProgress} / {goal.goalAmount}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4">
              <div
                class="bg-blue-600 h-4 rounded-full"
                style="width: {goal.goalProgress / goal.goalAmount * 100}%;"
              ></div>
            </div>
          </div>
      
          <!-- Reward Points -->
          <div class="px-6 py-4 bg-gray-50 border-t border-blue-200 flex justify-between items-center">
            <div>
              <span class="text-sm font-medium text-gray-600">Reward Coins:</span>
              <span class="ml-2 text-lg font-bold text-blue-700">{goal.coinValue} Coins</span>
            </div>
            <form method="POST" action="?/claimGoal">
              <input type="hidden" name="_method" value="DELETE" />
              <input type="hidden" name="goalID" value={goal.goalID} />
              <input type="hidden" name="userID" value={userID} />
              <input type="hidden" name="coinValue" value={goal.coinValue} />
              <input type="hidden" name="dataType" value={goal.dataType} />
              <button
                class="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={goal.goalProgress < goal.goalAmount}
              >
                Claim
              </button>
            </form>
          </div>
        </div>
      {/if}
    {/each}
  </div>
{/if}
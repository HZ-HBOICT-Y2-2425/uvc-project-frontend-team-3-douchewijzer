<script>
  import { onMount } from 'svelte';
  import VerifyToken from '$lib/VerifyToken.svelte';
  import DecodeToken from '$lib/DecodeToken.svelte';

  export let data; //store goals data

let showPopup = false;
let goals = data;
let userID = '';
let name = '';

// @ts-ignore
  function claim(index) {
       // Remove the goal at the specified index
    goals = goals.filter((_, i) => i !== index);
  };

  function test() {
    console.log(goals.props.data[0])
  }

  const closePopUp = () => {
    showPopup = false;
  };

</script>

<VerifyToken />
<DecodeToken bind:userID bind:name />


<div class="flex gap-9 justify-center">
  <div>
      <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800" on:click={() => (showPopup = true)}>Doel Maken</button>
  </div>
  <div>
      <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800" on:click={test}>mijlpalen</button>
  </div>
</div>

{#if showPopup}
<form method='POST' action="?/addGoal">
<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
<div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 p-10 rounded-2xl shadow-lg text-center z-50 w-4/5 max-w-lg">
    <p class="text-2xl mb-5">doel maken</p>
    <input 
        type="hidden"
        name="userID"
        value={userID}
      />
    <input
        type="text"
        name= "goalDescription"
        placeholder="Enter goal description"
      />
      <input
        type="number"
        name= "goalAmount"
        placeholder="Enter amount value"
        min="1"
      />
      <input
        type="number"
        name= "coinValue"
        placeholder="Enter points"
        min="1"
      />
    <button type="submit">Add Goal</button>
    <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800" on:click={closePopUp}>Sluiten</button>
</div>
</form>
{/if}

<!--goal-->
{#if goals.props.data.length === 0}
  <p>Loading goals...</p>
{:else}
  <div class="justify-center gap-y-3">  
      {#each goals.props.data as goal, index} 
        {#if goal.userID == userID} 
        <!-- <div class="p-4 bg-gray-100 min-h-screen flex items-center justify-center"> -->
          <div class="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
            <!-- Goal Header -->
            <div class="px-6 py-4 border-b">
              <h3 class="text-lg font-semibold text-gray-800">{goal.goalID}: {goal.goalDescription}</h3>
            </div>
        
            <!-- Progress Bar -->
            <div class="px-6 py-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-600">Progress:</span>
                <span class="text-lg font-bold text-blue-600">{goal.goalProgress} / {goal.goalAmount}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-4">
                <div
                  class="bg-blue-500 h-4 rounded-full"
                  style="width: {goal.goalProgress / goal.goalAmount * 100}%;"
                ></div>
              </div>
            </div>
        
            <!-- Reward Points -->
            <div class="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
              <div class="text-sm font-medium text-gray-600">Reward Points:</div>
              <div class="text-lg font-bold text-blue-600">{goal.coinValue} points</div>
              <div>
                <form method="POST" action="?/claimGoal">
                  <input type="hidden" name="_method" value="DELETE" />
                  <input type="hidden" name="goalID" value={goal.goalID} />
                  <button type="submit" class="bg-blue-600 text-white border-none px-3 py-1 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800 float-right">Claim</button>
                </form>
            </div>
            </div>
          </div>
        {/if}
      <!-- </div> -->
      {/each}
    </div>
{/if}
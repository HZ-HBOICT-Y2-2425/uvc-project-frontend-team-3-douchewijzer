<script>
    //export let goals = []; //store goals data
    let goals = [
        {userID: 1, description: "douche 1 keer met de Timer", progress: 1, coinValue: 100},
        {userID: 1, description: "douche 3 keer met de Timer", progress: 3, coinValue: 300},
    ];

    // New goal form fields
  let showPopup = false;
  let userID = 1; // You can make this dynamic if needed
  let description = '';
  let progress = 0;
  let coinValue = 0;

  // Function to add a new goal
  function addGoal() {
    if (description.trim() !== '' && progress > 0 && coinValue > 0) {
      goals = [...goals, { userID, description, progress, coinValue }];
      description = '';
      progress = 0;
      coinValue = 0;
      showPopup = false; // Close popup
      console.log(goals);
    }
  }
  
  // @ts-ignore
    function claim(index) {
         // Remove the goal at the specified index
      goals = goals.filter((_, i) => i !== index);
    };

    const closePopUp = () => {
      showPopup = false;
    };

</script>
<h1>goals</h1>
<br>
<br>

<div class="flex gap-1">
    <div>
        <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800" on:click={() => (showPopup = true)}>Doel Maken</button>
    </div>
    <div>
        <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800" on:click={claim}>mijlpalen</button>
    </div>
</div>

{#if showPopup}
<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
<div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 p-10 rounded-2xl shadow-lg text-center z-50 w-4/5 max-w-lg">
    <p class="text-2xl mb-5">doel maken</p>
    <input
        type="text"
        bind:value={description}
        placeholder="Enter goal description"
      />
      <input
        type="number"
        bind:value={progress}
        placeholder="Enter progress value"
        min="1"
      />
      <input
        type="number"
        bind:value={coinValue}
        placeholder="Enter coin value"
        min="1"
      />
    <button on:click={addGoal}>Add Goal</button>
    <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800" on:click={closePopUp}>Sluiten</button>
</div>
{/if}

<!--goal-->
{#if goals.length === 0}
    <p>Loading goals...</p>
{:else}
    <div>  
        {#each goals as goal, index}  
            <div class="bg-gray-300 border-none rounded-lg h-32 w-64 p-4">
                <p>{goal.description}</p>
                <div>
                    <div class="bg-blue-300 border-none rounded-lg text-center">
                        <p>{goal.progress}</p>
                    </div>
                    <p>{goal.coinValue} coins</p>
                </div>
                <div class="float-right bg-blue-400">
                    <button class="bg-blue-600 text-white" on:click={() => claim(index)}>Claim</button>
                </div>
            </div>
        {/each}
      </div>
 {/if}
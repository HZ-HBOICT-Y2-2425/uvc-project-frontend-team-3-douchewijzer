<script>
    import { onMount } from 'svelte';
    import VerifyToken from '$lib/VerifyToken.svelte';
    import DecodeToken from '$lib/DecodeToken.svelte';


    export let data;

    let userID = ''
    let name = ''
    let milestones = data;
</script>

<VerifyToken />
<DecodeToken bind:userID bind:name />

<div class="flex gap-9 justify-left ml-6">
    <div>
      <a href="/goals">
        <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800">Back</button>
      </a>
    </div>
</div>

{#if milestones.props.data.length === 0}
  <p>Loading milestones...</p>
{:else}
  <div class="justify-center gap-y-3">  
      {#each milestones.props.data as milestone, index} 
        {#if milestone.userID == userID} 
        <!-- <div class="p-4 bg-gray-100 min-h-screen flex items-center justify-center"> -->
          <div class="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
            <!-- Goal Header -->
            <div class="px-6 py-4 border-b">
              <h3 class="text-lg font-semibold text-gray-800">{milestone.milestoneID}: {milestone.milestoneDescription}</h3>
            </div>
        
            <!-- Progress Bar -->
            <div class="px-6 py-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-600">Progress:</span>
                <span class="text-lg font-bold text-blue-600">{milestone.milestoneProgress} / {milestone.milestoneAmount}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-4">
                <div
                  class="bg-blue-500 h-4 rounded-full"
                  style="width: {milestone.milestoneProgress / milestone.milestoneAmount * 100}%;"
                ></div>
              </div>
            </div>
        
            <!-- Reward Points -->
            <div class="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
              <div class="text-sm font-medium text-gray-600">Reward Points:</div>
              <div class="text-lg font-bold text-blue-600">{milestone.coinValue} points</div>
              <div>
                <form method="POST" action="?/claimMilestone">
                  <input type="hidden" name="_method" value="PUT" />
                  <input type="hidden" name="milestoneID" value={milestone.milestoneID} />
                  <input type="hidden" name="userID" value={userID} />
                  <input type="hidden" name="coinValue" value={milestone.coinValue} />
                  <input type="hidden" name="dataType" value={milestone.dataType} />
                  <input type="hidden" name="milestoneAmount" value={milestone.milestoneAmount} />
                  <button
                  class="bg-blue-600 text-white border-none px-3 py-1 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800 float-right
                    {milestone.milestoneProgress < milestone.milestoneAmount ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800'}"
                  on:click={() => claim(index)}
                  aria-label="Claim Goal"
                  disabled = {milestone.milestoneProgress < milestone.milestoneAmount} 
                >
                  Claim
                </button>
                </form>
            </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
{/if}

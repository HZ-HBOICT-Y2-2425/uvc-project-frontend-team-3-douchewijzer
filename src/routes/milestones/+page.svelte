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
<DecodeToken bind:userID bind:name/>

<div class="flex gap-9 justify-left ml-6">
    <div>
      <a href="/goals">
        <button class="bg-blue-600 text-white border-none px-6 py-3 text-lg rounded-lg cursor-pointer mt-2 hover:bg-blue-800">Back</button>
      </a>
    </div>
</div>

{#if milestones.props.data.length === 0}
  <p class="text-center text-blue-600 font-semibold">Loading milestones...</p>
{:else}
  <div class="flex flex-wrap justify-center gap-6 py-4">
    {#each milestones.props.data as milestone, index} 
      {#if milestone.userID == userID} 
        <div class="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden border border-blue-200">
          <!-- Milestone Header -->
          <div class="px-6 py-4 bg-blue-50 border-b border-blue-200">
            <h3 class="text-lg font-semibold text-blue-700">
              {milestone.milestoneDescription}
            </h3>
          </div>
      
          <!-- Progress Bar -->
          <div class="px-6 py-4">
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm font-medium text-gray-600">Progress:</span>
              <span class="text-lg font-bold text-blue-700">
                {milestone.milestoneProgress} / {milestone.milestoneAmount}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4">
              <div
                class="bg-blue-600 h-4 rounded-full"
                style="width: {milestone.milestoneProgress / milestone.milestoneAmount * 100}%;"
              ></div>
            </div>
          </div>
      
          <!-- Reward Points -->
          <div class="px-6 py-4 bg-gray-50 border-t border-blue-200 flex justify-between items-center">
            <div>
              <span class="text-sm font-medium text-gray-600">Reward Points:</span>
              <span class="ml-2 text-lg font-bold text-blue-700">{milestone.coinValue} points</span>
            </div>
            <form method="POST" action="?/claimMilestone">
              <input type="hidden" name="_method" value="PUT" />
              <input type="hidden" name="milestoneID" value={milestone.milestoneID} />
              <input type="hidden" name="userID" value={userID} />
              <input type="hidden" name="coinValue" value={milestone.coinValue} />
              <input type="hidden" name="dataType" value={milestone.dataType} />
              <input type="hidden" name="milestoneAmount" value={milestone.milestoneAmount} />
              <button
                class="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={milestone.milestoneProgress < milestone.milestoneAmount}
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
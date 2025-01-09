<script lang="ts">
  export let user: { [key: string]: any } = {}; // Default user object
  export let position = 0;
  export let selectedSort = 'liters';
  export let boxColor = '#FFFFFF';
</script>

<article
  class="text-center relative"
  style="background-color: {boxColor}; border-radius: 12px; padding: 20px 15px; margin-right: 0px; width: 120px;"
>
  {#if position === 1}
    <img
      src="/crown.png"
      alt="Crown"
      class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-8"
    />
  {/if}

  <div
    class="flex justify-center items-center mx-auto mb-2 relative"
    style="width: {position === 1 ? '100px' : position === 2 ? '75px' : '55px'}; height: {position === 1 ? '100px' : position === 2 ? '75px' : '55px'}; border-radius: 50%;">
    <div style="font-size: {position === 1 ? '80px' : position === 2 ? '60px' : '44px'};" class="mb-5">{@html user?.userImage || '<img src="https://via.placeholder.com/100" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;" />'}</div>
    <span
      class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
      style="width: {position === 1 ? '30px' : position === 2 ? '25px' : '20px'}; height: {position === 1 ? '30px' : position === 2 ? '25px' : '20px'};"
    >
      {position}
    </span>
  </div>

  <div class="flex items-center justify-center gap-1">
    <p class="text-sm font-medium mt-2">
      {user?.name || `User ${user?.userID || 'N/A'}`}
    </p>
  </div>

  <p class="text-sm text-blue-700 font-semibold">
    {#if selectedSort === 'liters'}
      {parseFloat(user?.waterUsage || '0').toFixed(2)} L
    {:else if selectedSort === 'temperature'}
      {parseFloat(user?.temperature || '0').toFixed(2)} °C
    {:else if selectedSort === 'time'}
      {parseFloat(user?.lastTime || '0').toFixed(2)} s
    {/if}
  </p>
</article>

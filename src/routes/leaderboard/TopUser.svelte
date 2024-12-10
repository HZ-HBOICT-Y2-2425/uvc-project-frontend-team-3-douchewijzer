<script>
    export let user;
    export let position;
    export let selectedSort;
  </script>
  
  <article class="text-center relative">
    <!-- Add Crown for First Place -->
    {#if position === 1}
      <img
        src="/crown.png"
        alt="Crown"
        class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-8"
      />
    {/if}
  
    <!-- Avatar Container -->
    <div
      class="bg-blue-400 flex justify-center items-center mx-auto mb-2"
      style="width: {position === 1 ? '80px' : '64px'}; height: {position === 1 ? '80px' : '64px'}; border-radius: 50%;"
    >
      <img
        src={`https://via.placeholder.com/${position === 1 ? '80' : '64'}`}
        alt="Avatar"
        class="rounded-full"
      />
    </div>
  
    <!-- Name and Position -->
    <p class="text-sm font-medium flex items-center justify-center gap-1 {position === 1 ? 'font-bold' : ''}">
        <span class="text-xs bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
            {position}
          </span>
      {user.name}
    </p>
  
    <!-- Sort Data -->
    <p class="text-sm text-blue-700 font-semibold">
        {user[selectedSort]} {selectedSort === "time" ? "s" : selectedSort === "temperature" ? "°C" : "L"}

    </p>
  </article>
  
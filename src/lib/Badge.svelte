<!-- <script>
    export let badge;
  </script>
  
  <div class="flex flex-col items-center p-2 bg-white shadow rounded-md">
    <div class="relative">
      <img
        src={badge.image}
        alt={badge.name}
        class="w-24 h-24 rounded-md border border-gray-300"
      />
      {#if badge.achieved}
        <div class="absolute bottom-0 right-0 bg-green-500 text-white text-xs px-1 rounded">
          ✔
        </div>
      {/if}
    </div>
    <div class="text-sm font-semibold text-gray-700 mt-2">{badge.name}</div>
    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
      <div
        class="bg-green-500 h-2 rounded-full"
        style="width: {Math.min((badge.progress / badge.total) * 100, 100)}%;"
      ></div>
    </div>
    <div class="text-xs text-gray-500 mt-1">
      {badge.progress}/{badge.total}
    </div>
  </div>
   -->
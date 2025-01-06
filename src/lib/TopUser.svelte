<script lang="ts">
  export let user;
  export let position;
  export let selectedSort;
  export let boxColor: string;
</script>

<article 
  class="text-center relative"
  style="background-color: {boxColor}; border-radius: 12px; padding: 20px 15px; margin-right: 0px; width: 120px;" 
>
  <!-- Crown for first place -->
  {#if position === 1}
    <img
      src="/crown.png"
      alt="Crown"
      class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-8"
    />
  {/if}

   <!-- Avatar Container -->
   <div
   class="flex justify-center items-center mx-auto mb-2 relative"
   style="width: {position === 1 ? '100px' : position === 2 ? '75px' : '55px'}; height: {position === 1 ? '100px' : position === 2 ? '75px' : '55px'}; border-radius: 50%;"
 >
   <img
     src='/Test_Image.png'
     alt="Avatar"
     class="rounded-full"
     style="width: 100%; height: 100%; object-fit: cover;"
   />
   <!-- Add Position Number Below Avatar -->
   <span 
     class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
     style="width: {position === 1 ? '30px' : position === 2 ? '25px' : '20px'}; height: {position === 1 ? '30px' : position === 2 ? '25px' : '20px'};"
   >
     {position}
   </span>
 </div>

  <!-- Name and Position -->
  <div 
    class="flex items-center justify-center gap-1"
    style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
  >
  
    <p 
      class="text-sm font-medium mt-2"
      style="font-size: calc(12px + (1rem - 12px) * min(1, 10 / {user.name.length}))"
    >
      {user.name}
    </p>
  </div>

  <!-- Sort Data -->
  <p class="text-sm text-blue-700 font-semibold">
    {user[selectedSort]} {selectedSort === "time" ? "s" : selectedSort === "temperature" ? "°C" : "L"}
  </p>
</article>

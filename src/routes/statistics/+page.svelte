<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let isLoggedIn = writable(false);

  onMount(() => {
    isLoggedIn.subscribe(value => {
      if (!value) {
        window.location.href = '/login';
      }
    });
  });
</script>

<h1>statistics</h1>

{#if $isLoggedIn}
  <p>Welcome!</p>
  <!-- Add more statistics related content here -->
{/if}

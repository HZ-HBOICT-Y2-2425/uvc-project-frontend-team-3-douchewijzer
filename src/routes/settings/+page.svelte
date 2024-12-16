<script>
  import { onMount } from 'svelte';
  import VerifyToken from '$lib/VerifyToken.svelte';
  import DecodeToken from '$lib/DecodeToken.svelte';
  
  let userID = '';
  let name = '';
</script>

<VerifyToken />
<DecodeToken bind:userID bind:name />

<p class="p-20">User ID: {userID}</p>
<p class="p-20">Name: {name}</p>

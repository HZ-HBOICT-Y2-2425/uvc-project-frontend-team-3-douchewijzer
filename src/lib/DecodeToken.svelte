<script>
  import { onMount } from 'svelte';
  import { jwtDecode } from "jwt-decode";

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  let token = '';
  export let userID = '';
  export let name = '';

  onMount(() => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (tokenCookie) {
      token = tokenCookie.split('=')[1];
      const decoded = jwtDecode(token);
      userID = decoded.userID;
      name = decoded.name;
    }
  });
</script>

<!-- This component does not render any HTML -->

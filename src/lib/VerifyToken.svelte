<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  async function verifyToken() {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (!token) {
      goto('/login');
      return;
    }

    const response = await fetch(`http://localhost:3010/users/verify-token`, {
      headers: {
        'Authorization': `Bearer ${token.split('=')[1]}`
      }
    });

    if (response.status !== 200) {
      document.cookie = 'jwt=; Max-Age=0; path=/;';
      localStorage.removeItem('userID');
      goto('/login');
    }
  }

  onMount(() => {
    verifyToken();
  });
</script>

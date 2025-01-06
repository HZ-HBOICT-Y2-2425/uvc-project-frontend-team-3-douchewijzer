<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { jwtDecode } from "jwt-decode";
  
  let email = '';
  let password = '';
  let isLoggedIn = writable(false);
  let token = '';
  let error = '';

  async function login() {
    try {
      const response = await fetch('http://localhost:3010/users/login?email=' + email + '&password=' + password, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      token = data.token;
      document.cookie = `jwt=${token}; path=/;`;
      window.location.href = '/';
    } catch (err) {
      error = err.message;
    }
  }

  onMount(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (token) {
      window.location.href = '/';
    }
  });

  function goToRegister() {
    goto('/register');
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
    {#if error}
      <div class="bg-red-100 text-red-700 p-4 mb-4 rounded">
        {error}
      </div>
    {/if}
    <form on:submit|preventDefault={login} class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" bind:value={email} placeholder="Email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" bind:value={password} placeholder="Password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
      </div>
    </form>
    <div class="mt-4 text-center">
      <button on:click={goToRegister} class="text-indigo-600 hover:underline">Register</button>
    </div>
  </div>
</div>
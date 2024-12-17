<script>
    import '../lib/app.css';
    import 'tailwindcss/tailwind.css';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let isLoggedIn = false;

    const goToHomePage = () => {
        goto('/');
    };

    const logout = () => {
        document.cookie = 'jwt=; Max-Age=0; path=/;';
        localStorage.removeItem('userID');
        goto('/login');
    };

    onMount(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        isLoggedIn = !!token;
    });
</script>

<!-- Terug-pijl knop -->
<button class="fixed top-2 left-2 bg-white text-blue-600 border-none px-4 py-2 text-lg rounded-md cursor-pointer shadow-md z-50 hover:bg-blue-100" on:click={goToHomePage} aria-label="Go to home page">
    <i class="fas fa-arrow-left text-xl"></i>
</button>

<!-- Logout knop -->
{#if isLoggedIn}
    <button class="fixed top-2 right-2 bg-white text-red-600 border-none px-4 py-2 text-lg rounded-md cursor-pointer shadow-md z-50 hover:bg-red-100" on:click={logout} aria-label="Logout">
        <i class="fas fa-sign-out-alt text-xl"></i>
    </button>
{/if}

<slot></slot>

<!-- Navigatiebalk -->
<nav class="fixed bottom-0 w-full bg-blue-100 flex justify-around py-2 border-t-2 border-gray-300 shadow-md">
    <a href="/badges" class="text-gray-700 text-2xl flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700" aria-label="Shop">
        <i class="fas fa-shopping-cart"></i>
    </a>
    <a href="/statistics" class="text-gray-700 text-2xl flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700" aria-label="Statistics">
        <i class="fas fa-chart-bar"></i>
    </a>
    <a href="/leaderboard" class="text-gray-700 text-2xl flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700" aria-label="Leaderboard">
        <i class="fas fa-trophy"></i>
    </a>
    <a href="/goals" class="text-gray-700 text-2xl flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700" aria-label="Goals">
        <i class="fas fa-bullseye"></i>
    </a>
    <a href="/settings" class="text-gray-700 text-2xl flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700" aria-label="Settings">
        <i class="fas fa-cog"></i>
    </a>
</nav>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<script>
    import '../lib/app.css';
    import 'tailwindcss/tailwind.css';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let isLoggedIn = false;
    let pageTitle = 'Leaderboard';

    // Definieer titels op basis van de routes
    const titles = {
        "/": "Dashboard",
        "/showerTimer": "Douche Timer",
        "/goals": "Doelen",
        "/leaderboard": "Leaderboard",
        "/statistics": "Statestieken",
        "/settings": "Settings",
        "/badges": "Jou badges",
    };

    onMount(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        isLoggedIn = !!token;
    });

    // Reageer op URL-wijzigingen
    $: {
        const currentPath = $page.url.pathname;
        pageTitle = titles[currentPath] || "login";
    }

    const goToHomePage = () => {
        goto('/');
    };

    const goToSettingsPage = () => {
        goto('/settings');
    };
</script>

<header class="bg-[#00A9FF] py-2 px-6 text-white text-center sticky top-0 z-10 flex items-center justify-between">
    <img src="/Douche_Wijzer_Logo.png" alt="Logo" class="h-16">
    <!-- Dynamische titel -->
    <h1 class="text-lg font-bold flex-grow text-center">{pageTitle}</h1>

    <button class="bg-white text-gray-700 border-none px-4 py-2 text-lg rounded-md cursor-pointer shadow-md z-50 hover:bg-gray-100" on:click={goToSettingsPage} aria-label="Settings">
        <i class="fas fa-cog text-xl"></i>
    </button>
</header>

<main class:mt-4={$page.url.pathname !== '/leaderboard'}>
    <slot></slot>
</main>

<nav class="fixed bottom-0 w-full bg-blue-100 flex justify-around py-2 border-t-2 border-gray-300 shadow-md">
    <a href="/" class="text-gray-700 text-2xl flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700" aria-label="Home">
        <i class="fas fa-home"></i>
    </a>
    <a href="/showerTimer" class="text-gray-700 text-2xl flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700" aria-label="Shower">
        <i class="fas fa-shower"></i>
    </a>
    <a href="/goals" class="text-gray-700 text-2xl flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700" aria-label="Goals">
        <i class="fas fa-bullseye"></i>
    </a>
    <a href="/leaderboard" class="text-gray-700 text-2xl flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700" aria-label="Leaderboard">
        <i class="fas fa-trophy"></i>
    </a>
    <a href="/statistics" class="text-gray-700 text-2xl flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-700" aria-label="Statistics">
        <i class="fas fa-chart-bar"></i>
    </a>
</nav>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
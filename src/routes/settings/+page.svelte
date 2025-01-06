<script>
    import { onMount } from 'svelte';
    import VerifyToken from '$lib/VerifyToken.svelte';
    import DecodeToken from '$lib/DecodeToken.svelte';
    import { goto } from '$app/navigation';

    let userID = '';
    let name = '';
    let leaderboardNotification = false;
    let uploadPreference = false;
    let timerSetting = 300;
    let email = '';
    let coins = 0;

    const fetchPreferences = async () => {
        try {
            const response = await fetch(`http://localhost:3010/users/${userID}/preferences`);
            const data = await response.json();
            leaderboardNotification = data.leaderbordNotificationPreference;
            uploadPreference = data.leaderbordUploadPreference;
            timerSetting = data.timerSetting;
        } catch (error) {
            console.error('Error fetching preferences:', error);
        }
    };

    const fetchAccount = async () => {
        try {
            const response = await fetch(`http://localhost:3010/users/${userID}`);
            const data = await response.json();
            email = data.email;
            coins = data.coins ?? 0;
        } catch (error) {
            console.error('Error fetching account:', error);
        }
    };

    const updatePreference = async (preference, value) => {
        try {
            await fetch(`http://localhost:3010/users/${userID}/preferences?${preference}=${preference === 'timerSetting' ? value : value ? 1 : 0}`, {
                method: 'PUT'
            });
        } catch (error) {
            console.error(`Error updating ${preference}:`, error);
        }
    };

    onMount(() => {
        fetchPreferences();
        fetchAccount();
    });

    const logout = () => {
        document.cookie = 'jwt=; Max-Age=0; path=/;';
        localStorage.removeItem('userID');
        goto('/login');
    };
</script>

<VerifyToken />
<DecodeToken bind:userID bind:name />

<div class="container mx-auto p-5">
    <p class="text-4xl font-semibold mb-4">Hallo {name}!</p>

    <h2 class="text-2xl font-bold mt-6 mb-4">Account</h2>
    <div class="my-4 p-6 border rounded-lg shadow-md bg-white">
        <div class="my-2">(insert image here)</div>
        <img src="" alt="it ain't here boss" class="my-2">
        <div class="my-2 text-lg">Email: {email}</div>
        <div class="my-2 text-lg">Coins: {coins}</div>
    </div>

    <h2 class="text-2xl font-bold mt-6 mb-4">Toestemming</h2>
    <div class="my-4 p-6 border rounded-lg shadow-md bg-white">
        <p class="mb-2 text-lg">Leaderboard updates</p>
        <label class="relative inline-block w-16 h-8">
            <input type="checkbox" class="opacity-0 w-0 h-0 peer" bind:checked={leaderboardNotification} on:change={() => updatePreference('leaderbordNotificationPreference', leaderboardNotification)}>
            <span class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-200 ease-in-out peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-500"></span>
            <span class="absolute left-1 bottom-1 bg-white h-6 w-6 rounded-full transition-transform duration-200 ease-in-out peer-checked:transform peer-checked:translate-x-8"></span>
        </label>
    </div>

    <h2 class="text-2xl font-bold mt-6 mb-4">Privacy</h2>
    <div class="my-4 p-6 border rounded-lg shadow-md bg-white">
        <p class="mb-2 text-lg">Uploaden naar leaderboard</p>
        <label class="relative inline-block w-16 h-8">
            <input type="checkbox" class="opacity-0 w-0 h-0 peer" bind:checked={uploadPreference} on:change={() => updatePreference('leaderbordUploadPreference', uploadPreference)}>
            <span class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-200 ease-in-out peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-500"></span>
            <span class="absolute left-1 bottom-1 bg-white h-6 w-6 rounded-full transition-transform duration-200 ease-in-out peer-checked:transform peer-checked:translate-x-8"></span>
        </label>
    </div>

    <h2 class="text-2xl font-bold mt-6 mb-4">Timer Setting</h2>
    <div class="my-4 p-6 border rounded-lg shadow-md bg-white">
        <input type="number" class="border rounded p-2 w-24 text-center" bind:value={timerSetting} on:change={() => updatePreference('timerSetting', timerSetting)} />
    </div>

    <button on:click={logout} class="bg-red-600 text-white px-4 py-2 rounded-md mt-6">Logout</button>
</div>
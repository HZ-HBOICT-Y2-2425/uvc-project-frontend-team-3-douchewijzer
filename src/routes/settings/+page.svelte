<script>
    import { onMount } from 'svelte';
    import VerifyToken from '$lib/VerifyToken.svelte';
    import DecodeToken from '$lib/DecodeToken.svelte';
    import { goto } from '$app/navigation';
    import LatestBadges from '$lib/LatestBadges.svelte';
    import EmojiConvertor from 'emoji-js';

    let userID = '';
    let name = '';
    let badges = [];
    let leaderboardNotification = false;
    let uploadPreference = false;
    let timerSetting = 300;
    let email = '';
    let coins = 0;
    let userImage = ''; // Add userImage variable
    let selectedEmoji = ''; // Add selectedEmoji variable
    let showEmojiPicker = false; // Add showEmojiPicker variable

    let minutes = Math.floor(timerSetting / 60);
    let seconds = timerSetting % 60;

    const emoji = new EmojiConvertor();
    emoji.img_set = 'apple';
    emoji.img_sets.apple.path = 'https://cdnjs.cloudflare.com/ajax/libs/emoji-datasource-apple/6.0.1/img/apple/64/';
    emoji.replace_mode = 'img'; // Ensures the output is <img>

    const fetchPreferences = async () => {
        try {
            const response = await fetch(`http://localhost:3010/users/${userID}/preferences`);
            const data = await response.json();
            leaderboardNotification = data.leaderbordNotificationPreference;
            uploadPreference = data.leaderbordUploadPreference;
            timerSetting = data.timerSetting;
            minutes = Math.floor(timerSetting / 60);
            seconds = timerSetting % 60;
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
            const emojiChar = String.fromCodePoint(parseInt(data.userImage, 16)); // Convert Unicode code point to emoji character
            userImage = emoji.replace_unified(emojiChar); // Convert emoji to HTML <img> tag
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

    const updateTimerSetting = () => {
        timerSetting = (parseInt(minutes) * 60) + parseInt(seconds);
        updatePreference('timerSetting', timerSetting);
    };

    const emojiToUnicode = (emoji) => {
        return emoji.codePointAt(0).toString(16);
    };

    const updateUserImage = async (emoji) => {
        const emojiUnicode = emojiToUnicode(emoji);
        try {
            await fetch(`http://localhost:3010/users/${userID}?userImage=${emojiUnicode}`, {
                method: 'PUT'
            });
            fetchAccount(); // Refresh account data
        } catch (error) {
            console.error('Error updating user image:', error);
        }
    };

    const handleEmojiSelect = (event) => {
        const emoji = event.detail.unicode;
        selectedEmoji = emoji;
        updateUserImage(emoji);
        showEmojiPicker = false; // Hide emoji picker after selection
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    onMount(async () => {
        fetchPreferences();
        fetchAccount();
        const { default: EmojiPickerElement } = await import('emoji-picker-element');
        customElements.define('emoji-picker', EmojiPickerElement);
    });

    $: if (showEmojiPicker) {
        const emojiPicker = document.querySelector('emoji-picker');
        if (emojiPicker) {
            emojiPicker.addEventListener('emoji-click', handleEmojiSelect);
        }
    }

    const logout = () => {
        document.cookie = 'jwt=; Max-Age=0; path=/;';
        localStorage.removeItem('userID');
        goto('/login');
    };
</script>

<VerifyToken />
<DecodeToken bind:userID bind:name />

<div class="container mx-auto p-5">
    <p class="text-4xl font-semibold mb-4">Hallo, {name}!</p>

    <h2 class="text-2xl font-bold mt-6 mb-4">Account</h2>
    <div class="my-4 p-6 border rounded-lg shadow-md bg-white">
        {@html userImage}
        <div class="my-2 text-lg">Email: {email}</div>
        <div class="my-2 text-lg">Punten: {coins}</div>
        <button on:click={() => showEmojiPicker = !showEmojiPicker} class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 mb-4">Select Emoji</button>
        {#if showEmojiPicker}
            <emoji-picker on:emoji-click={handleEmojiSelect} class="light emojiPicker" style="--emoji-font-family: 'Apple Color Emoji', sans-serif, --background: fff;"></emoji-picker>
        {/if}    
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

    <h2 class="text-2xl font-bold mt-6 mb-4">Timer basis tijd</h2>
    <div class="my-4 p-6 border rounded-lg shadow-md bg-white">
        <div class="flex items-center space-x-2">
            <input type="number" class="border rounded p-2 w-16 text-center" bind:value={minutes} min="0" on:change={updateTimerSetting} />
            <span class="text-lg">min</span>
            <input type="number" class="border rounded p-2 w-16 text-center" bind:value={seconds} min="0" max="59" on:change={updateTimerSetting} />
            <span class="text-lg">sec</span>
        </div>
    </div>

    <h2 class="text-2xl font-bold mt-6 mb-4">Badges</h2>
    <div class="my-4 p-6 border rounded-lg shadow-md bg-white">
        <LatestBadges {badges} />
    </div>
    <button on:click={logout} class="bg-red-600 text-white px-4 py-2 rounded-md mt-4 mb-16">Logout</button>
</div>

<style>
    .emoji {
        width: 32px;
        height: 32px;
        vertical-align: middle; 
    }
    emoji-picker {
        --emoji-font-family: "Apple Color Emoji";
}
</style>

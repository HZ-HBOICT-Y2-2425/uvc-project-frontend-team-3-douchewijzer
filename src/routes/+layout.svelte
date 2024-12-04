<script>
    import { goto } from '$app/navigation';
    const goToHomePage = () => {
        goto('/');
    };
</script>

<!-- Terug-pijl knop -->
<button class="back-button" on:click={goToHomePage} aria-label="Go to home page">
    <i class="fas fa-arrow-left"></i>
</button>

<slot></slot>

<!-- Navigatiebalk -->
<nav class="navbar">
    <a href="/shop" class="nav-item" aria-label="Shop">
        <i class="fas fa-shopping-cart"></i>
    </a>
    <a href="/statistics" class="nav-item" aria-label="Statistics">
        <i class="fas fa-chart-bar"></i>
    </a>
    <a href="/leaderboard" class="nav-item" aria-label="Leaderboard">
        <i class="fas fa-trophy"></i>
    </a>
    <a href="/goals" class="nav-item" aria-label="Goals">
        <i class="fas fa-bullseye"></i>
    </a>
    <a href="/settings" class="nav-item" aria-label="Settings">
        <i class="fas fa-cog"></i>
    </a>
</nav>

<style>
    @import '../lib/app.css';
</style>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
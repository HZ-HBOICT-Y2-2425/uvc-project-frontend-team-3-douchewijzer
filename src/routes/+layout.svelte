<script>
    import { goto } from '$app/navigation';
    const goToHomePage = () => {
        goto('/');
    };
</script>

<!-- Terug-pijl knop -->
<button class="back-button" on:click={goToHomePage}>
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
<style lang="postcss">
    :global(body) {
      background: #CDF5FD ;
    }
  
    .back-button {
        position: fixed;
        top: 10px;
        left: 10px;
        background-color: white;
        color: #5b8df8;
        border: none;
        padding: 10px 15px; /* Vergroot de padding */
        font-size: 18px; /* Vergroot de lettergrootte */
        border-radius: 8px;
        cursor: pointer;
        font-family: Arial, sans-serif;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        z-index: 1000; /* Zorg ervoor dat de knop boven andere elementen wordt weergegeven */
    }

    .back-button i {
        font-size: 24px; /* Vergroot de grootte van het icoon */
    }

    .back-button:hover {
        background-color: #d1e8ff;
    }

    .navbar {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #d1e8ff;
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
        border-top: 2px solid #aaa;
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    }

    .nav-item {
        color: #4a4a4a;
        text-decoration: none;
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .nav-item:hover {
        background-color: #b0d7ff;
        color: #0066cc;
    }

    .nav-item i {
        font-size: 24px;
    }
</style>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
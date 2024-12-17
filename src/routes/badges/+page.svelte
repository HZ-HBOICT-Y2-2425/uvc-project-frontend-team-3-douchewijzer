<script>
  import VerifyToken from '$lib/VerifyToken.svelte';
  import LatestBadges from '$lib/LatestBadges.svelte';

  // Inline the badge data
  let badges = [
    {
      id: 1,
      name: 'Voltooi 1 doel',
      progress: 1,
      total: 1,
      achieved: true,
      earnedAt: '2024-06-10T12:00:00Z',
      image: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      name: 'Voltooi 10 doelen',
      progress: 5,
      total: 10,
      achieved: false,
      image: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      name: 'Douche 1 minuut',
      progress: 1,
      total: 1,
      achieved: true,
      earnedAt: '2024-06-12T10:00:00Z',
      image: 'https://via.placeholder.com/40',
    },
    {
      id: 5,
      name: 'Bespaar 100 L',
      progress: 100,
      total: 100,
      achieved: true,
      earnedAt: '2024-06-14T08:30:00Z',
      image: 'https://via.placeholder.com/40',
    },
    {
      id: 6,
      name: 'Verminder je uitstoot met 5 kg',
      progress: 5,
      total: 5,
      achieved: true,
      earnedAt: '2024-06-15T09:15:00Z',
      image: 'https://via.placeholder.com/40',
    },
  ];
</script>

<!-- Header -->
<VerifyToken />

<header class="bg-[#00A9FF] py-4 px-6 text-white text-center sticky top-0 z-10 rounded">
  <h1 class="text-2xl font-bold">Badges</h1>
</header>

<!-- Badges Grid -->
<section class="p-4 bg-blue-100 grid grid-cols-2 gap-4">
  {#each badges.filter((badge) => badge.achieved) as badge}
    <div class="bg-white rounded-lg shadow-md overflow-hidden p-2 flex flex-col items-center">
      <img src={badge.image} alt={badge.name} class="w-16 h-16 object-cover mb-2" />
      <p class="text-sm font-semibold text-center">{badge.name}</p>
      <p class="text-xs text-gray-500">
        {badge.progress}/{badge.total}
      </p>
    </div>
  {/each}
</section>
<section class="bg-blue-100 py-4">
  <h2 class="text-center text-lg font-semibold mb-2">Recently Earned</h2>
  <LatestBadges {badges} />
</section>

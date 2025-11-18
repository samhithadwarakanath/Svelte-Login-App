<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Simple navbar shared across all pages -->
<nav style="display:flex; gap:1rem; background:#f3f3f3; padding:1rem;">
	<a href="/">Home</a>
	<a href="/login">Login</a>
	<a href="/auth/logout/google">Logout</a>
	<a href="/app">Dashboard</a>
</nav>

<main style="padding:1.5rem;">
	{@render children()}
</main>

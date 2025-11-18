<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
  
</script>

<h1>Dashboard</h1>
<p>Welcome! You have successfully logged in with Google.</p>
{#if data?.user}
	<p>Email: {data.user.email}</p>
{/if}
<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	// Local state for CRUD
	let catFacts = $state<{ id?: number; fact: string }[]>([]);
	let newFact = $state('');

	// Fetch facts from your backend (or proxy)
	async function loadFacts() {
		const res = await fetch('/api/cats');
		if (res.ok) {
			catFacts = await res.json();
		}
	}

	// Add a new cat fact
	async function addFact() {
		if (!newFact.trim()) return;
		await fetch('/api/cats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ fact: newFact })
		});
		newFact = '';
		await loadFacts();
	}

	// Delete a fact
	async function deleteFact(id: number) {
	await fetch(`/api/cats/${id}`, { method: 'DELETE' });
	await loadFacts();
}

</script>

<h1>Dashboard</h1>
<p>Welcome! You have successfully logged in with Google.</p>

{#if data?.user}
	<p>Email: {data.user.email}</p>
{/if}

<hr />

<h2>🐾 Cat Facts CRUD</h2>

<!-- Add New -->
<input
	type="text"
	placeholder="Enter a new cat fact"
	bind:value={newFact}
	onkeydown={(e) => e.key === 'Enter' && addFact()}
/>
<button onclick={addFact}>Add Fact</button>
<button onclick={loadFacts}>Load All Facts</button>


<ul>
	{#each catFacts as cat}
		<li>
			{cat.fact}
			<button onclick={() => cat.id && deleteFact(cat.id)}>❌</button>

		</li>
	{/each}
</ul>

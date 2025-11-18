// src/routes/api/cats/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

// 🐱 GET all cat facts
export const GET: RequestHandler = async () => {
	try {
		const res = await fetch('http://localhost:3000/api/cats'); // ✅ points to backend
		if (!res.ok) throw new Error('Backend GET failed');
		const data = await res.json();
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('GET /api/cats error:', err);
		return new Response(JSON.stringify({ error: 'Failed to fetch cats' }), { status: 500 });
	}
};

// 🐾 POST a new fact
export const POST: RequestHandler = async ({ request }) => {
	try {
		const newFact = await request.json();
		console.log('🆕 New fact received:', newFact);
		const res = await fetch('http://localhost:3000/api/cats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newFact)
		});
		const data = await res.json();
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('POST /api/cats error:', err);
		return new Response(JSON.stringify({ error: 'Failed to post fact' }), { status: 500 });
	}
};

// ❌ DELETE a fact
export const DELETE: RequestHandler = async ({ url }) => {
	try {
		const fact = url.searchParams.get('fact');
		if (!fact) throw new Error('Missing fact');
		const res = await fetch(`http://localhost:3000/api/cats?fact=${encodeURIComponent(fact)}`, {
			method: 'DELETE'
		});
		const data = await res.json();
		return new Response(JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('DELETE /api/cats error:', err);
		return new Response(JSON.stringify({ error: 'Failed to delete fact' }), { status: 500 });
	}
};

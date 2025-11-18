import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const id = params.id;
	if (!id) {
		return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
	}

	try {
		const res = await fetch(`http://localhost:3000/api/cats/${id}`, { method: 'DELETE' });
		if (!res.ok) {
			const err = await res.text();
			return new Response(JSON.stringify({ error: err }), { status: res.status });
		}

		return new Response(JSON.stringify({ message: 'deleted' }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to delete cat fact' }), { status: 500 });
	}
};

import { getContent } from '@builder.io/sdk-svelte';
import { BUILDER_PUBLIC_API_KEY } from '../apiKey';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	
	// fetch your Builder content
	const content = await getContent({
		model: 'header',
		apiKey: BUILDER_PUBLIC_API_KEY,
	});

	return { content };
}

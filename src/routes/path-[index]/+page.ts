import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { openApiStore } from '$lib';
import { get } from 'svelte/store';

export const load = (async (event) => {
	const index = Number(event.params.index);
	if (isNaN(index)) {
		console.error('Index is not a number', index);
		error(404, 'Not found');
	}
	const paths = get(openApiStore).paths;
	if (!paths) {
		console.error('No paths found in OpenAPI document');
		error(404, 'Not found');
	}

	const pathObjectName = Object.keys(paths)[index];

	if (!pathObjectName) {
		console.error('No path found in OpenAPI document');
		error(404, 'Not found');
	}
	return {
		pathName: pathObjectName
	};
}) satisfies PageLoad;

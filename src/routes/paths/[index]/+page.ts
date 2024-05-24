import type { PageLoad } from './$types';
import { openApiStore } from '$lib';
import { error } from '@sveltejs/kit';
import type { OpenAPIV3_1 } from '$lib/openAPITypes';

export const load = (async (event) => {
	// check if path param is an integer
	if (!/^\d+$/.test(event.params.index)) error(404, 'Invalid path index');
	const index = parseInt(event.params.index);
	let apiObject: OpenAPIV3_1.Document;
	openApiStore.subscribe((value) => (apiObject = value));
	let pathName: string | undefined;
	// @ts-expect-error - svelte stores populate the value
	if (apiObject && !apiObject.paths) error(404, 'No paths found in the OpenAPI document');

	const path = (() => {
		// @ts-expect-error - svelte stores populate the value
		const paths = Object.keys(apiObject.paths) || [];
		if (paths.length === 0) return;
		if (paths.length <= index) return;
		pathName = paths[index];
		// @ts-expect-error - svelte stores populate the value
		if (!apiObject || !apiObject.paths) return;
		return apiObject.paths[paths[index]];
	})();
	return {
		path,
		pathName
	};
}) satisfies PageLoad;

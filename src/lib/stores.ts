import { blankSpec } from '$lib';
import type { OpenAPIV3_1 } from 'openapi-types';
import { type Writable, writable, get } from 'svelte/store';

const store: Writable<OpenAPIV3_1.Document> = writable(blankSpec);

/// A store that also persists to the indexedDB
export const openApiStore: Writable<OpenAPIV3_1.Document> = {
	...store,
	set: (value: OpenAPIV3_1.Document) => {
		// TODO: update the database with the new value
		store.set(value);
	},
	update: (updater: (value: OpenAPIV3_1.Document) => OpenAPIV3_1.Document) => {
		store.update(updater);
		const updatedValue = get(store);
		// TODO: update the database with the updated value
	}
};

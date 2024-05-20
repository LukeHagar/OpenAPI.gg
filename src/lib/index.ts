import { persisted } from 'svelte-persisted-store';
import type { OpenAPIV3_1 } from './openAPITypes';
import { get } from 'svelte/store';

export const localStoragePrefix = 'openapigen-';

export const openApiStore = persisted<OpenAPIV3_1.Document>(`${localStoragePrefix}openApi`, {
	openapi: '3.0.0', // OpenAPI version
	info: {
		/** Title of the API (required) */
		title: '',
		/** Description of the API (optional) */
		description: '',
		/** Terms of service link (optional) */
		termsOfService: '',
		/** API Version (required) */
		version: '',
		/** Contact Information */
		contact: {
			/** Name of the contact person/organization. */
			name: '', // optional
			/** URL pointing to the contact information. MUST be in the format of a URL. */
			url: '', // optional
			/** Email address of the contact person/organization. MUST be in the format of an email address. */
			email: '' // optional
		},
		license: {
			name: '', // required if license is included
			url: '' // optional
		}
	},
	servers: [],
	paths: {},
	components: {},
	security: [],
	tags: [],
	externalDocs: {
		description: '',
		url: ''
	}
});

export const pathRegex = /\/([/]*[{]?[a-zA-Z]+[}]?)*/gm;

export const sortPathsAlphabetically = () => {
	const tempPathObject = {};
	const store = get(openApiStore);
	// @ts-expect-error - we are working with an initially empty object
	Object.keys(store.paths)
		.sort()
		.forEach((key) => {
			// @ts-expect-error - we are working with initially empty objects
			tempPathObject[key] = store.paths[key];
		});

	// update path object
	openApiStore.update((data) => {
		data.paths = tempPathObject;
		return data;
	});
};

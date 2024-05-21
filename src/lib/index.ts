import { persisted } from 'svelte-persisted-store';
import type { OpenAPIV3_1 } from './openAPITypes';

export const localStoragePrefix = 'openapigen-';

export const openApiStore = persisted<OpenAPIV3_1.Document>(`${localStoragePrefix}openApi`, {
	openapi: '3.1.0', // OpenAPI version
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

// export path handling functions
export * from './pathHandling';

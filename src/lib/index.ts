import type { OpenAPIV3_1 } from 'openapi-types';
import { writable, type Writable } from 'svelte/store';

export const localStoragePrefix = 'openapigen-';

export const blankSpec: OpenAPIV3_1.Document = {
	openapi: '3.1.0', // OpenAPI version
	jsonSchemaDialect: 'https://json-schema.org/draft/2020-12/schema', // JSON Schema version
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
	webhooks: {},
	components: {},
	security: [],
	tags: [],
	externalDocs: {
		description: '',
		url: ''
	}
};

export const operationCount = (openApiDoc: OpenAPIV3_1.Document) => {
	let count = 0;
	for (const path in openApiDoc.paths) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const method in openApiDoc.paths[path]) {
			count++;
		}
	}
	return count;
};

export const pathCount = (openApiDoc: OpenAPIV3_1.Document) => {
	let count = 0;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	for (const path in openApiDoc.paths) {
		count++;
	}
	return count;
};

export enum HttpMethods {
	GET = 'get',
	PUT = 'put',
	POST = 'post',
	DELETE = 'delete',
	OPTIONS = 'options',
	HEAD = 'head',
	PATCH = 'patch',
	TRACE = 'trace'
}

// export path handling functions
export * from './pathHandling';

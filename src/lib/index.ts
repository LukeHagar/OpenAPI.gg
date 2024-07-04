import type { OpenAPIV3_1 } from './openAPITypes';
import { writable, type Writable } from 'svelte/store';

export const localStoragePrefix = 'openapigen-';

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

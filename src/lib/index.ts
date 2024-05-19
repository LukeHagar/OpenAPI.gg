import type { OpenAPI } from './types';
import { persisted } from 'svelte-persisted-store';

export const localStoragePrefix = 'openapigen-';

export const openApiStore = persisted<OpenAPI>(`${localStoragePrefix}openApi`, {
	title: '',
	version: '',
	description: '',
	servers: [],
	securitySchemas: []
});

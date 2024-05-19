import type { OpenAPI } from './types';
import { persisted } from 'svelte-persisted-store';

export const openApiStore = persisted<OpenAPI>('openApi', {
	title: '',
	version: '',
	description: '',
	servers: []
});

import { get } from 'svelte/store';
import type { ModalSettings, ModalStore } from '@skeletonlabs/skeleton';
import { pathTemplate } from './pathTemplate';
import { openApiStore } from '$lib';

export const pathRegex = /\/([/]*[{]?[a-zA-Z]+[}]?)*/gm;

/// Adds a new path to the OpenAPI document
export const addPath = (modalStore: ModalStore, startingPoint: string = '/') => {
	let userPath: string = startingPoint.trim();

	const modal: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Enter Pathname',
		body: 'Wrap path parameters in curly braces. Example: /users/{userId}',
		// Populates the input value and attributes
		value: userPath,
		valueAttr: { type: 'text', minlength: 1, required: true },
		// Returns the updated response value
		response: (r: string | boolean | undefined) => {
			if (r === false) return;
			if (typeof r !== 'string') return;

			userPath = r;

			// Check if path already exists
			if (!pathExists(userPath)) {
				alert('Path already exists');
				return;
			}
			// Check if path is valid
			if (!isValidPath(userPath)) {
				alert('Invalid path');
				return;
			}

			// create path object
			const store = get(openApiStore);
			if (!store.paths) store.paths = {};
			store.paths[userPath] = pathTemplate;
			// add path to store
			openApiStore.set(store);

			// sort paths alphabetically
			sortPathsAlphabetically();
		}
	};

	modalStore.trigger(modal);
};

export const renamePath = (modalStore: ModalStore, oldPath: string) => {
	let userPath: string = oldPath;
	const modal: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Rename path',
		body: 'Wrap path parameters in curly braces. Example: /users/{userId}',
		// Populates the input value and attributes
		value: userPath,
		valueAttr: { type: 'text', minlength: 1, required: true },
		// Returns the updated response value
		response: (r: string | boolean | undefined) => {
			if (r === false) return;
			if (typeof r !== 'string') return;

			userPath = r;

			// Check if path already exists
			if (!pathExists(userPath)) {
				alert('Path already exists');
				return;
			}
			// Check if path is valid
			if (!isValidPath(userPath)) {
				alert('Invalid path');
				return;
			}

			// create path object
			const store = get(openApiStore);
			if (!store.paths) store.paths = {};

			// copy old path object to new path object
			store.paths[userPath] = store.paths[oldPath];
			// delete old path object
			delete store.paths[oldPath];

			// add path to store
			openApiStore.set(store);

			// sort paths alphabetically
			sortPathsAlphabetically();
		}
	};

	modalStore.trigger(modal);
};

/// Removes a path from the OpenAPI document
export const deletePath = (modalStore: ModalStore, path: string) => {
	const modal: ModalSettings = {
		type: 'confirm',
		// Data
		title: `Delete ${path}?`,
		body: 'Are you sure you wish to delete the path?',
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: (r: boolean) => {
			if (r === false) return;
			const store = get(openApiStore);
			// check if path exists
			if (!store.paths) return;
			if (!(path in store.paths)) return;
			delete store.paths[path];
			openApiStore.set(store);
		}
	};
	modalStore.trigger(modal);
};

/// checks if a given path already exists
export const pathExists = (path: string) => {
	const store = get(openApiStore);
	return !(path in store.paths!);
};

/// checks if a given path is valid
export const isValidPath = (path: string) => {
	// check if path variables aren't duplicated
	const variableRegex = /\{([^}]+)\}/gm;
	const variables = path.match(variableRegex);
	if (variables) {
		const uniqueVariables = new Set(variables);
		if (variables.length !== uniqueVariables.size) return false;
	}

	// check if path is a valid path
	const pathWithoutVariables = path.replace('{', '').replace('}', '');
	const pathRegex = /(\/[a-zA-Z-]+)+|\//gm;
	const pathParts = pathWithoutVariables.match(pathRegex);
	// the fallback is to return false if the pathParts array is null
	return pathParts?.length === 1 ? true : false;
};

/// sorts the paths in the OpenAPI document alphabetically
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

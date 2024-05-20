<script lang="ts">
	import { openApiStore } from '$lib';
	import { pathTemplate } from '$lib/pathTemplate';
	import PathListItem from '../atoms/PathListItem.svelte';

	// match path with parameters
	const pathRegex = /\/([\/]*[\{]?[a-zA-Z]+[\}]?)*/gm;

	// add path
	const addPath = () => {
		// prompt user to enter path
		const path = prompt(
			'Enter path. Wrap path parameters in curly braces. Example: /users/{userId}'
		);
		if (!path) return;
		// check if path is valid
		if (!pathRegex.test(path)) {
			alert('Invalid path');
			return;
		}

		// check if path already exists
		// @ts-expect-error - we are working with an initially empty object
		if ($openApiStore.paths[path]) {
			alert('Path already exists');
			return;
		}

		// create a temporary object to store paths
		let tempPathObject = {
			...$openApiStore.paths
		};

		tempPathObject[path] = pathTemplate;

		// update paths in store
		$openApiStore.paths = tempPathObject;

		// sort paths alphabetically
		sortPathsAlphabetically();
	};

	const sortPathsAlphabetically = () => {
		let tempPathObject = {};
		// @ts-expect-error - we are working with an initially empty object
		Object.keys($openApiStore.paths)
			.sort()
			.forEach((key) => {
				// @ts-expect-error - we are working with initially empty objects
				tempPathObject[key] = $openApiStore.paths[key];
			});
		$openApiStore.paths = tempPathObject;
	};
</script>

<div
	class="container mx-auto border-token rounded-container-token bg-surface-backdrop-token px-6 py-4 space-y-4"
>
	{#each Object.keys($openApiStore.paths) as pathName, index}
		<PathListItem {pathName} id={index} />
	{/each}
	<span class="w-full flex justify-center">
		<button type="button" class="btn variant-filled-primary" on:click={addPath}>Add Path</button>
	</span>
	<span class="w-full flex justify-center">
		<button
			type="button"
			class="btn btn-sm variant-filled-secondary"
			on:click={sortPathsAlphabetically}
		>
			Sort paths
		</button>
	</span>
</div>

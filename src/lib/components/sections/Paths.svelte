<script lang="ts">
	import { addPath } from '$lib';
	import { openApiStore, pathRegex, sortPathsAlphabetically } from '$lib';
	import { pathTemplate } from '$lib/pathTemplate';
	import PathListItem from '../atoms/PathListItem.svelte';
	import AddPathButtons from '../atoms/AddPathButtons.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	// match path with parameters

	// add path
	// const addPath = () => {
	// 	// prompt user to enter path
	// 	const path = prompt(
	// 		'Enter path. Wrap path parameters in curly braces. Example: /users/{userId}'
	// 	);
	// 	if (!path) return;
	// 	// check if path is valid
	// 	if (!pathRegex.test(path)) {
	// 		alert('Invalid path');
	// 		return;
	// 	}

	// 	// check if path already exists
	// 	// @ts-expect-error - we are working with an initially empty object
	// 	if ($openApiStore.paths[path]) {
	// 		alert('Path already exists');
	// 		return;
	// 	}

	// 	// create a temporary object to store paths
	// 	// add path to paths object
	// 	$openApiStore.paths = {
	// 		...$openApiStore.paths,
	// 		[path]: pathTemplate
	// 	};

	// 	// sort paths alphabetically
	// 	sortPathsAlphabetically();
	// };
</script>

<div
	class="container mx-auto border-token rounded-container-token bg-surface-backdrop-token px-6 py-4 space-y-3"
>
	{#if Object.keys($openApiStore.paths).length > 0}
		<AddPathButtons />
		<hr />
		{#each Object.keys($openApiStore.paths) as pathName, index}
			<PathListItem {pathName} id={index} />
		{/each}
		
		<AddPathButtons />
		{:else}
		<AddPathButtons justify="justify-center" sort={false} />
	{/if}
</div>

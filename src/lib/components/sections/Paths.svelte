<script lang="ts">
	import { addPath } from '$lib';
	import { openApiStore, sortPathsAlphabetically } from '$lib';
	import type { OpenAPIV3 } from '$lib/openAPITypes';
	import PathListItem from '../atoms/PathListItem.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	let paths: OpenAPIV3.PathsObject = {};
	// @ts-expect-error - working with a potentially empty object
	openApiStore.subscribe((store) => (paths = store.paths));

	const modalStore = getModalStore();
</script>

<div class="w-full flex flex-row justify-center">
	<div class="fixed flex flex-row gap-2 justify-center bg-surface-50-900-token rounded-full p-4">
		<span class="flex justify-center">
			<button
				type="button"
				class="btn variant-filled-primary"
				on:click={() => {
					addPath(modalStore);
				}}
			>
				Add Path
			</button>
		</span>
		<span class="flex justify-center">
			<button
				type="button"
				class="btn btn-sm variant-filled-secondary"
				on:click={sortPathsAlphabetically}
			>
				Sort paths
			</button>
		</span>
	</div>
</div>
<div
	class="mx-auto border-token rounded-container-token bg-surface-backdrop-token px-6 py-4 space-y-4"
>
	{#each Object.keys(paths) as pathName, index}
		<PathListItem {pathName} id={index} />
	{/each}
</div>

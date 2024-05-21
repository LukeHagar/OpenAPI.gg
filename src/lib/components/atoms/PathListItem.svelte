<script lang="ts">
	import { pathTemplate } from '$lib/pathTemplate';
	import {
		addPath,
		deletePath,
		openApiStore,
		pathRegex,
		renamePath,
		sortPathsAlphabetically
	} from '$lib';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	/** The actual pathname */
	export let pathName: string;
	/** The index of the pathname in the paths object */
	export let id: number;
</script>

<div class="flex justify-between">
	<h3 class="h3">{pathName}</h3>
	<div class="flex gap-4">
		<a href="/path-{id}" class="btn btn-sm variant-filled-primary">Edit</a>
		<button
			type="button"
			class="btn btn-sm variant-filled-warning"
			on:click={() => {
				renamePath(modalStore, pathName);
			}}
		>
			Rename
		</button>
		<button
			type="button"
			class="btn btn-sm variant-filled-secondary"
			on:click={() => {
				addPath(modalStore, pathName);
			}}
		>
			Add Sub-Route
		</button>
		<button
			type="button"
			class="btn btn-sm variant-ringed-error hover:variant-filled-error"
			on:click={() => {
				deletePath(modalStore, pathName);
			}}
		>
			Remove
		</button>
	</div>
</div>
<hr />

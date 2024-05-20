<script lang="ts">
	import { openApiStore } from '$lib';

	/** The actual pathname */
	export let pathName: string;
	/** The index of the pathname in the paths object */
	export let id: number;

	const removeRoute = () => {
		let tempPathObject = {
			...$openApiStore.paths
		};
		delete tempPathObject[pathName];
		$openApiStore.paths = tempPathObject;
	};
</script>

<div class="flex justify-between">
	<h3 class="h3">{pathName}</h3>
	<div class="flex gap-4">
		<a href="/path/{id}" class="btn btn-sm variant-filled-primary">Edit</a>
		<button type="button" class="btn btn-sm variant-filled-secondary"> Add SubRoute </button>
		<button
			type="button"
			class="btn btn-sm variant-ringed-error hover:variant-filled-error"
			on:click={removeRoute}
		>
			Remove
		</button>
	</div>
</div>
<hr />

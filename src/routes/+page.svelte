<script lang="ts">
	import CreateNewButton from '$lib/components/FileManagement/CreateNewButton.svelte';
	import DeleteButton from '$lib/components/FileManagement/DeleteButton.svelte';
	import Upload from '$lib/components/FileManagement/Upload.svelte';
	import { db, selectedSpec } from '$lib/db';
	import { liveQuery } from 'dexie';

	let apiSpecs = liveQuery(() => db.apiSpecs.toArray());
	$: console.log($apiSpecs);
</script>

<div class="grid place-content-center h-full gap-2 px-1">
	<label class="flex flex-col text-xs">
		<span>Select an API</span>
		<select bind:value={$selectedSpec} class="select w-64">
			{#if $apiSpecs}
				{#each $apiSpecs as spec (spec.id)}
					<option value={spec}>{spec.name}</option>
				{/each}
			{/if}
		</select>
	</label>
	<CreateNewButton />
	<Upload />
	<DeleteButton />
</div>
<!-- <div class="w-full h-full flex flex-col items-center justify-center grow">
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
		>
			Design.
		</span>
	</h1>
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
		>
			Build.
		</span>
	</h1>
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
		>
			Deploy.
		</span>
	</h1>
</div> -->

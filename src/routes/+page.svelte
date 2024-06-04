<script lang="ts">
	import CreateNewButton from '$lib/components/FileManagement/CreateNewButton.svelte';
	import DeleteAllButton from '$lib/components/FileManagement/DeleteAllButton.svelte';
	import DeleteButton from '$lib/components/FileManagement/DeleteButton.svelte';
	import LoadButton from '$lib/components/FileManagement/LoadButton.svelte';
	import SaveButton from '$lib/components/FileManagement/SaveButton.svelte';
	import SaveNewButton from '$lib/components/FileManagement/SaveNewButton.svelte';
	import Upload from '$lib/components/FileManagement/Upload.svelte';
	import { db, selectedSpec, setSpec } from '$lib/db';
	import { liveQuery } from 'dexie';

	let apiSpecs = liveQuery(() => db.apiSpecs.toArray());

	let loaded = false;
	apiSpecs.subscribe((specs) => {
		if (loaded) return;
		if (specs.length > 0) {
			setSpec(specs[0]);
		}
	});
	$: console.log($apiSpecs);
</script>

<div class="grid place-content-center h-full gap-2 px-1">
	<table class="table">
		<thead>
			<tr>
				<th class="text-left">Name</th>
				<th class="text-center">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#if $apiSpecs}
				{#each $apiSpecs as spec (spec.id)}
					<tr>
						<td>{spec.name}</td>
						<td>
							<LoadButton {spec} />
							<DeleteButton {spec} />
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
	{#if $selectedSpec}
		<input
			class="input"
			bind:value={$selectedSpec.name}
			type="text"
			placeholder="Enter the name for the API Spec"
		/>
	{/if}

	<SaveButton />
	<SaveNewButton />
	<CreateNewButton />
	<Upload />
	<DeleteAllButton />
</div>

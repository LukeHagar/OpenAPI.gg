<script lang="ts">
	import type { OpenAPIV3_1 } from 'openapi-types';
	import ServerInput from '../ServerInput.svelte';
	import ParameterInput from '../ParameterInput.svelte';
	import { version } from '$app/environment';

	export let path: OpenAPIV3_1.PathItemObject;

	export const editedPath: OpenAPIV3_1.PathItemObject = {
		summary: path.summary ?? '',
		description: path.description ?? '',
		servers: path.servers ?? [],
		parameters: path.parameters ?? [],
		get: path.get ?? undefined,
		put: path.put ?? undefined,
		post: path.post ?? undefined,
		delete: path.delete ?? undefined,
		options: path.options ?? undefined,
		head: path.head ?? undefined,
		patch: path.patch ?? undefined,
		trace: path.trace ?? undefined
	};

	const addServer = () => {
		if (!editedPath.servers) editedPath.servers = [];
		editedPath.servers.push({
			url: '',
			description: '',
			variables: {}
		});
		editedPath.servers = editedPath.servers;
	};

	const removeServer = (index: number) => {
		if (!editedPath.servers) return;
		editedPath.servers.splice(index, 1);
		editedPath.servers = editedPath.servers;
	};

	const removeParameter = (index: number) => {
		if (!editedPath.parameters) return;
		editedPath.parameters.splice(index, 1);
		editedPath.parameters = editedPath.parameters;
	};
</script>

<div class="flex flex-col gap-1">
	<p class="font-bold h5">Route Information</p>
	<label>
		<p class="font-bold">Summary</p>
		<input
			class="input"
			type="text"
			bind:value={editedPath.summary}
			placeholder="A short summary of the route"
		/>
	</label>
	<label>
		<p class="font-bold">Description</p>
		<textarea
			class="textarea"
			bind:value={editedPath.description}
			placeholder="A longer description of the route (supports markdown)"
		/>
	</label>
</div>
<hr />
<div class="flex flex-col gap-2">
	<p class="font-bold h5">Servers</p>
	{#if editedPath.servers}
		{#each editedPath.servers as server, i}
			<div class="ring-1 ring-surface-600-300-token rounded-container-token p-2 space-y-2">
				<ServerInput id={i} {server} />
				<button
					type="button"
					class="btn btn-sm variant-filled-error"
					on:click={() => {
						removeServer(i);
					}}
				>
					Remove Server
				</button>
			</div>
		{/each}
	{/if}
	<span>
		<button type="button" class="btn btn-sm variant-filled-primary" on:click={addServer}>
			Add Server
		</button>
	</span>
</div>
<hr />
<div class="flex flex-col gap-2">
	<p class="font-bold h5">Parameters</p>
	{#if editedPath.parameters}
		{#each editedPath.parameters as parameter, i}
			<div class="ring-1 ring-surface-600-300-token rounded-container-token p-2 space-y-2">
				<!-- If the parameter is a reference: show the reference link -->
				{#if '$ref' in parameter}
					<p class="text-sm">This parameter is a reference</p>
				{:else}
					<ParameterInput parameter={parameter} />
				{/if}
				<button
					type="button"
					class="btn btn-sm variant-filled-error"
					on:click={() => {
						removeParameter(i);
					}}
				>
					Remove Parameter
				</button>
			</div>
		{/each}
	{/if}
</div>

<script lang="ts">
	import { HttpMethods, openApiStore } from '$lib';
	import ParameterInput from '$lib/components/atoms/ParameterInput.svelte';
	import { getPathVariables } from '$lib/pathHandling';
	import type { OpenAPIV3 } from '$lib/openAPITypes';
	import type { PageData } from './$types';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let newParam: 'query' | 'header' | 'cookie' = 'query';
	let tempPath: OpenAPIV3.PathItemObject = {
		parameters: []
	};
	openApiStore.subscribe((store) => {
		if (!data.pathName) return;
		if (store.paths == undefined) tempPath = {};
		if (!store.paths!.hasOwnProperty(data.pathName)) tempPath = {};
		// @ts-expect-error - working with a known not empty object
		tempPath = store.paths[data.pathName] ?? {};

		if (!tempPath.hasOwnProperty('parameters')) tempPath.parameters = [];
	});

	const pathVariables = getPathVariables(data.pathName ?? '');

	pathVariables.forEach((variable) => {
		// push path variables to the parameters array
		// @ts-expect-error - working with a array thats loosely defined
		tempPath.parameters.push({
			name: variable,
			in: 'path',
			required: true
		});
	});
</script>

<div
	class="border-token border-surface-500 space-y-4 px-6 py-4 rounded-container-token variant-glass-surface"
>
	<h3 class="h3">
		{data.pathName}
	</h3>
	<hr />

	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="summary">
				<h4 class="h4">General</h4>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<label class="space-y-2">
					<p>Summary</p>
					<input
						type="text"
						class="input"
						bind:value={tempPath.summary}
						placeholder="Summary of the path"
					/>
				</label>
				<label class="space-y-2">
					<p>Description</p>
					<textarea
						class="textarea"
						bind:value={tempPath.description}
						placeholder="Description of the path. Supports markdown."
					/>
				</label>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">
				<h4 class="h4">Custom Servers</h4>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<p>Here you can add custom servers for this specific call.</p>
				{#if tempPath.servers && tempPath.servers.length > 0}
					{#each tempPath.servers as server, index}
						<label class="space-y-2">
							<p>Server {index + 1}</p>
							<input
								type="text"
								class="input"
								bind:value={server.url}
								placeholder="URL of the server"
							/>
						</label>
					{/each}
				{/if}

				<button type="button" class="btn variant-filled-primary"> Add Server </button>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">
				<h4 class="h4">Parameters</h4>
			</svelte:fragment>
			<svelte:fragment slot="content">
				{#each tempPath.parameters as param}
					<ParameterInput variableName={param.name} bind:value={param} location="path" />
				{/each}

				<span class="flex items-center gap-2">
					<select name="newParameter" bind:value={newParam} class="select w-min">
						<option value="query">Query</option>
						<option value="header">Header</option>
						<option value="cookie">Cookie</option>
					</select>
					<button type="button" class="btn variant-filled-primary">
						Add {newParam} Parameter
					</button>
				</span>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">
				<h4 class="h4">Operations</h4>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					Here you can add operations for this path. Select only the operations you want to support
				</p>

				<div class="flex gap-4">
					{#each Object.values(HttpMethods) as method}
						<label class="flex items-center gap-2">
							<input
								type="checkbox"
								class="checkbox"
								on:input={(event) => {
									if (event.target.checked) {
										tempPath[method] = {
											tags: [],
											summary: '',
											description: '',
											externalDocs: {
												description: '',
												url: ''
											},
											operationId: '',
											parameters: [],
											requestBody: {
												content: {},
												description: '',
												required: false
											},
											responses: {},
											callbacks: {},
											deprecated: false,
											security: [],
											servers: []
										};
									}
								}}
							/>
							{method.toUpperCase()}
						</label>
					{/each}
				</div>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>

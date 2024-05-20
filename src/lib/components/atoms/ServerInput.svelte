<script lang="ts">
	import { InputChip, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import Info from '../icons/Info.svelte';
	import type { OpenAPIV3 } from '$lib/openAPITypes';

	export let id: number;
	export let server: OpenAPIV3.ServerObject;

	const descriptionTooltip: PopupSettings = {
		event: 'click',
		target: `descriptionTooltip${id}`,
		placement: 'top'
	};

	const addVariable = () => {
		// if server has no variables, add a variable-object
		if (!server.variables) {
			const variable = prompt('Enter variable name');
			if (!variable) return;
			server.variables = {
				[variable]: {
					default: '',
					description: '',
					enum: []
				}
			};
		}
	};
</script>

<div class="space-y-4">
	<label class="space-y-2">
		<span>URL (required)</span>
		<p>You can add parameters using curly-braces like so: <code>&lbrace;id&rbrace;</code></p>
		<input
			class="input"
			name="url{id}"
			placeholder="https://&lbrace;id&rbrace;.api.example.com/v1"
			type="url"
			bind:value={server.url}
		/>
	</label>

	<label class="space-y-2">
		<span>
			Description (optional)
			<button type="button" use:popup={descriptionTooltip}>
				<Info />
			</button>
		</span>
		<textarea
			class="textarea"
			name="description {id}"
			placeholder="Optional multiline or single-line description. Supports Markdown."
			bind:value={server.description}
		/>
	</label>
	<div class="border-token rounded-container-token space-y-4 p-4">
		<div>
			<h4 class="h4">Variables (optional)</h4>
			<p>Define variables for the server URL.</p>
		</div>
		{#if server.variables}
			<table class="table">
				<tbody>
					{#each Object.keys(server.variables) as variable}
						<tr>
							<td class="text-center">
								<div class="flex justify-center items-center">
									<p class="text-xl">{variable}</p>
								</div>
							</td>
							<td>
								<input
									class="input"
									placeholder="default"
									type="text"
									bind:value={server.variables[variable].default}
								/>
							</td>
							<td>
								<input
									class="input"
									placeholder="description"
									type="text"
									bind:value={server.variables[variable].description}
								/>
							</td>
							<td class="!w-1/3">
								<div >
									<InputChip
										bind:value={server.variables[variable].enum}
										name="enum"
										placeholder="enum (optional)"
									/>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
		<span class="flex justify-center">
			<button type="button" class="btn btn-sm variant-filled-primary" on:click={addVariable}>
				Add Variable
			</button>
		</span>
	</div>
</div>

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

	const variableRegex = /\{([^}]+)\}/g;
</script>

<div class="space-y-4">
	<label class="space-y-2">
		<span>URL (required)</span>
		<input
			class="input"
			name="url{id}"
			placeholder="https://&lbrace;id&rbrace;.api.example.com/v1"
			type="url"
			bind:value={server.url}
			on:input={() => {
				if (!server.url) return;

				const matches = server.url.match(variableRegex);

				if (!matches) {
					server.variables = null;
					return;
				}

				server.variables = matches.reduce((variables, match) => {
					const variable = match.slice(1, -1);
					if (!variables[variable]) variables[variable] = { default: '', description: '' };
					return variables;
				}, {});
			}}
		
		/>
	</label>

	<label class="space-y-2">
		<span>
			Description
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
			<h4 class="h4">Variables</h4>
			<p class="text-sm">Define variables by adding them to the server URL using curly-braces like so: <code>&lbrace;id&rbrace;</code>.</p>
		</div>
		{#if server.variables}
			<table class="table">
				<tbody>
					{#each Object.keys(server.variables) as variable}
						<tr>
							<td class="text-center">
								<div class="flex justify-center items-center">
									<p class="text-lg">{variable}</p>
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
								<div>
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
	</div>
</div>

<script lang="ts">
	import type { OpenAPIV3 } from '$lib/openAPITypes';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import ExampleInput from '$lib/components/atoms/ExampleInput.svelte';

	export let parameter: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject;

	// if the parameter is a reference, we need to link to the reference
	let isReference = '$ref' in parameter;

	parameter = isReference
		? (parameter as OpenAPIV3.ReferenceObject)
		: (parameter as OpenAPIV3.ParameterObject);

	// if the parameter is a path parameter, we need to limit the editing options
	// @ts-expect-error parameter.in has to exist if the parameter is not a reference
	let isPathParameter = !isReference && parameter.in === 'path';
</script>

<div class="card py-6 px-4 flex flex-col gap-4 text-sm">
	{#if isReference}
		<p class="text-xs text-error">This parameter is a reference and cannot be edited here.</p>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
			{#if isPathParameter}
				<p class="h3 font-bold">{parameter.name}</p>
			{:else}
				<label>
					<p>Name</p>
					<input
						type="text"
						name="name"
						class="input"
						placeholder="Name"
						bind:value={parameter.name}
					/>
				</label>
			{/if}
			<label>
				<p>Location</p>
				<select name="in" class="select" bind:value={parameter.in} disabled={isPathParameter}>
					<option value="path">Path</option>
					<option value="query">Query</option>
					<option value="header">Header</option>
					<option value="cookie">Cookie</option>
				</select>
			</label>
			<label>
				<p>Description</p>
				<textarea
					name="description"
					class="textarea"
					bind:value={parameter.description}
					placeholder="Describe the parameter. Supports Markdown."
				/>
			</label>
		</div>
	{/if}
</div>

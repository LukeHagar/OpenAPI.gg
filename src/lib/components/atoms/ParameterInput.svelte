<script lang="ts">
	import type { OpenAPIV3 } from '$lib/openAPITypes';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import ExampleInput from '$lib/components/atoms/ExampleInput.svelte';

	export let parameter: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject;

	// if the parameter is a reference, we need to link to the reference
	let isReference = '$ref' in parameter;
	let multipleExamples = false;

	parameter = isReference
		? (parameter as OpenAPIV3.ReferenceObject)
		: (parameter as OpenAPIV3.ParameterObject);

	// if the parameter is a path parameter, we need to limit the editing options
	// @ts-expect-error parameter.in has to exist if the parameter is not a reference
	let isPathParameter = !isReference && parameter.in === 'path';
	(() => {
		if (isReference) return;
		// set default requirements
		if (isPathParameter) {
			parameter.required = true;
			parameter.style = 'simple';
		}
		if (parameter.in === 'query') {
			parameter.style = 'form';
		}
		if (parameter.in === 'header') {
			parameter.style = 'simple';
		}
		if (parameter.in === 'cookie') {
			parameter.style = 'form';
		}
		// if parameter.examples contains values, we need to set multipleExamples to true
		if (Object.keys(parameter.examples ?? {}).length > 0) {
			multipleExamples = true;
		}
	})();

	$: () => {
		if (isReference) return;
		if (parameter.style == 'form') {
			parameter.explode = true;
		} else {
			parameter.explode = false;
		}
	};

	// TODO: maybe needs validation for query-deepObject
	const styleOptions = [
		{
			style: 'matrix',
			description: 'Matrix',
			validFor: ['path']
		},
		{
			style: 'label',
			description: 'Label',
			validFor: ['path']
		},
		{
			style: 'form',
			description: 'Form',
			validFor: ['query', 'cookie']
		},
		{
			style: 'simple',
			description: 'Simple',
			validFor: ['header', 'path']
		},
		{
			style: 'spaceDelimited',
			description: 'Space Delimited',
			validFor: ['query']
		},
		{
			style: 'pipeDelimited',
			description: 'Pipe Delimited',
			validFor: ['query']
		},
		{
			style: 'deepObject',
			description: 'Deep Object',
			validFor: ['query']
		}
	];
</script>

<div class="py-6 px-4 flex flex-col gap-6 text-sm">
	{#if isReference}
		<p class="text-xs text-error">This parameter is a reference and cannot be edited here.</p>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
			{#if isPathParameter}
				<p class="h3 font-bold">"{parameter.name}" in: {parameter.in}</p>
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
		<div class="flex gap-3 divide-x">
			<div>
				<SlideToggle
					name="required"
					active="bg-primary-500"
					size="sm"
					disabled={isPathParameter}
					bind:checked={parameter.required}>Required</SlideToggle
				>
			</div>
			<div class="pl-2">
				<SlideToggle
					name="required"
					active="bg-primary-500"
					size="sm"
					bind:checked={parameter.deprecated}>Deprecated</SlideToggle
				>
			</div>
			<div class="pl-2">
				<SlideToggle
					name="required"
					active="bg-primary-500"
					size="sm"
					bind:checked={parameter.allowEmptyValue}
				>
					Allow empty value (Use of this property is NOT RECOMMENDED, as it is likely to be removed
					in a later revision.)
				</SlideToggle>
			</div>
		</div>
		<div class="flex gap-6 items-center">
			<label>
				<p>Style</p>
				<select name="style" class="select" bind:value={parameter.style}>
					{#each styleOptions as styleOption}
						{#if styleOption.validFor.includes(parameter.in)}
							<option value={styleOption.style}>{styleOption.description}</option>
						{/if}
					{/each}
				</select>
			</label>
			<SlideToggle
				name="explode"
				active="bg-primary-500"
				size="sm"
				bind:checked={parameter.explode}
			>
				Explode
			</SlideToggle>
			{#if parameter.in === 'query'}
				<SlideToggle
					name="allowReserved"
					active="bg-primary-500"
					size="sm"
					bind:checked={parameter.allowReserved}
				>
					Allow Reserved
				</SlideToggle>
			{/if}
			<pre>TODO: Schema selector</pre>
		</div>
		<div class="space-y-4">
			<div class="flex items-center gap-2">
				<label for="name"> Single Example </label>
				<SlideToggle
					name="multipleExamples"
					active="bg-primary-500"
					size="sm"
					bind:checked={multipleExamples}
				/>
				<label for="name"> Multiple Examples </label>
			</div>
			{#if multipleExamples}
				multiple examples editor
			{:else}
				<ExampleInput bind:example={parameter.example} />
			{/if}
		</div>
	{/if}
</div>

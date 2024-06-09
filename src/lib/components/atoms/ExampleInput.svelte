<script lang="ts">
	import type { OpenAPIV3 } from '$lib/openAPITypes';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let example: OpenAPIV3.ExampleObject;
	export let name: string = '';

	let exampleValue = example.value;
	let external = false;

	// initialize the component
	(() => {
		if (
			'value'! in example &&
			'externalValue' in example &&
			example.externalValue !== ('' || undefined)
		) {
			external = true;
			return;
		}
		external = false;
	})();

	$: {
		// make sure the exampleValue is a JSON-compatible string
		try {
			JSON.parse(exampleValue);
		} catch (e) {
			exampleValue = JSON.stringify(exampleValue);
		}
		// apply the changes to the example object
		example.value = exampleValue;
	}

	let schema = false;
</script>

<div class="ml-6 ring-1 p-4 rounded-container-token ring-surface-500 space-y-4">
	<SlideToggle name="schema" bind:checked={schema}>Schema</SlideToggle>
	<p class="-ml-2 font-bold">{name}</p>
	{#if schema}
		<select class="select" name="schemaSelect">
			<option value="schema">Schema not yet implemented</option>
		</select>
	{:else}
		<label>
			<p>Summary</p>
			<input
				type="text"
				class="input"
				name="summary"
				placeholder="A short summary"
				bind:value={example.summary}
			/>
		</label>
		<label>
			<p>Description</p>
			<textarea
				class="textarea"
				name="description"
				placeholder="A description of the example. Supports Markdown."
				bind:value={example.description}
			/>
		</label>
		<SlideToggle name="external" bind:checked={external} size="sm">External Value</SlideToggle>
		{#if !external}
			<label>
				<p>Value</p>
				<textarea
					class="textarea"
					name="value"
					placeholder="The example value."
					bind:value={exampleValue}
				/>
			</label>
		{:else}
			<label>
				<p>External Value</p>
				<input
					type="text"
					class="input"
					name="externalValue"
					placeholder="URL to external value."
					bind:value={example.externalValue}
				/>
			</label>
		{/if}
	{/if}
</div>

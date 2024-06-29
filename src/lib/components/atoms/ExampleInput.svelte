<script lang="ts">
	import type { OpenAPIV3_1 } from '$lib/openAPITypes';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let example: OpenAPIV3_1.ExampleObject | OpenAPIV3_1.ReferenceObject;
	export let name: string;

	let schema = false;
</script>

<div class="ml-6 ring-1 p-4 rounded-container-token ring-surface-500">
	<SlideToggle name="schema" bind:checked={schema}>Schema</SlideToggle>
	<p class="-ml-2 font-bold">{name}</p>
	{#if schema}
		<select class="select" name="schemaSelect">
			<option value="schema">Schema not yet implemented</option>
		</select>
	{:else}
		<label>
			<p>Summary</p>
			<input type="text" class="input" name="summary" bind:value={example.summary} />
		</label>
		<label>
			<p>Description</p>
			<textarea class="textarea" name="description" bind:value={example.description} />
		</label>
		{#if 'value' in example}
			<label>
				<p>Value</p>
				<input type="text" class="input" name="value" bind:value={example.value} />
			</label>
		{/if}
		{#if 'externalValue' in example}
			<label>
				<p>External Value</p>
				<input type="text" class="input" name="externalValue" bind:value={example.externalValue} />
			</label>
		{/if}
	{/if}
</div>

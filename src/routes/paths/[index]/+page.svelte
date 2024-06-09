<script lang="ts">
	import PathEditing from '$lib/components/atoms/paths/PathEditing.svelte';
	import type { OpenAPIV3_1 } from 'openapi-types';
	import type { PageData } from './$types';
	import { getPathVariables } from '$lib';

	export let data: PageData;
	let initialPath: OpenAPIV3_1.PathItemObject = (data.path as OpenAPIV3_1.PathItemObject) ?? {};
	let editedPath: OpenAPIV3_1.PathItemObject;

	// if initialPath has variables, that are not yet included, add them
	const pathVariables = getPathVariables(data.pathName ?? '');
	pathVariables.forEach((variable) => {
		// if a parameter with the same name does not exist, add it
		if (
			initialPath.parameters?.some((param) => {
				// if the parameter is a reference skip it
				if ('$ref' in param) return false;
				return param.name === variable;
			})
		) {
			return;
		}
		if (!initialPath.parameters) initialPath.parameters = [];
		initialPath.parameters.push({
			name: variable,
			in: 'path',
			description: '',
			required: false,
			deprecated: false,
			allowEmptyValue: false, // this SHOULD not be used, but it is a valid value
			allowReserved: false, // This property only applies to parameters with an in value of query. 
			style: 'simple',
			explode: false, // Defaults to true when style is form, otherwise false.
			schema: {},
			content: {},
			example: {}, // any -> Example and Examples are mutually exclusive
			examples: {},
		});
	});
</script>

<a
	href="/paths"
	class="btn variant-ringed-secondary hover:variant-glass-secondary my-2 gap-2 text-lg"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
	</svg>
	Back
</a>

<div
	class="border-token border-surface-500 space-y-2 px-4 py-2 rounded-container-token variant-glass-surface"
>
	<h3 class="h3">
		{data.pathName}
	</h3>
	<hr />
	<PathEditing path={initialPath} bind:editedPath />
	<hr />
	original:
	<pre>
{JSON.stringify(data, null, 2)}
	</pre>
	edited:
	<pre>
{JSON.stringify(editedPath, null, 2)}
	</pre>
</div>

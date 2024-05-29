<script lang="ts">
	import { openApiStore } from '$lib';
	import { db, selectedSpec, setSpec } from '$lib/db';
	import type { OpenAPIV3_1 } from '$lib/openAPITypes';
	import {
		FileButton,
		FileDropzone,
		getModalStore,
		type ModalSettings,
		type ModalStore
	} from '@skeletonlabs/skeleton';
	import { liveQuery } from 'dexie';
	import { parse } from 'yaml';

	let files: FileList | undefined;

	function onFileUpload(e: Event): void {
		console.log('onFileUpload');
		if (!files) return;
		const file = files[0];
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			const isJson = file.name.endsWith('.json');
			let content: OpenAPIV3_1.Document;
			try {
				if (isJson) {
					content = JSON.parse(result);
				} else {
					content = parse(result);
				}
				setSpec({ name: file.name, spec: content });
			} catch (error) {
				console.error(`Error parsing ${isJson ? 'json' : 'yaml'} file`, error);
			}
		};
		reader.readAsText(file);
	}
</script>

<FileDropzone
	bind:files
	label="upload"
	accept=".yml,.yaml,.json"
	on:dragover|once={() => {
		files = undefined;
	}}
	on:change={onFileUpload}
	type="file"
	name="openapispec"
>
	<svelte:fragment slot="lead">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6 mx-auto"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
			/>
		</svg>
	</svelte:fragment>
	<svelte:fragment slot="message">
		<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
			<span class="font-semibold">Click to upload</span> or drag and drop
		</p>
	</svelte:fragment>
	<svelte:fragment slot="meta">JSON, YAML</svelte:fragment></FileDropzone
>

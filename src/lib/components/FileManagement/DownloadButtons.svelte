<script lang="ts">
	import { localStoragePrefix, openApiStore } from '$lib';
	import filenamify from 'filenamify';
	import { stringify } from 'yaml';

	$: fileName = filenamify($openApiStore?.info?.title) || 'openapi';
</script>

<label class="flex flex-col text-xs">
	<span>Download</span>
	<button
		class="btn btn-sm grow variant-ghost-tertiary mb-1"
		on:click={() => {
			const openApiStorage = localStorage.getItem(`${localStoragePrefix}openApi`);
			if (!openApiStorage) return;
			const openApi = JSON.parse(openApiStorage);
			const blob = new Blob(
				[stringify(openApi, null, { indent: 2, aliasDuplicateObjects: false })],
				{ type: 'application/yaml' }
			);
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${fileName}.yaml`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
			/>
		</svg>
		YAML
	</button>
	<button
		class="btn btn-sm grow variant-ghost-tertiary"
		on:click={() => {
			const openApiStorage = localStorage.getItem(`${localStoragePrefix}openApi`);
			if (!openApiStorage) return;
			const openApi = JSON.parse(openApiStorage);
			const blob = new Blob([JSON.stringify(openApi, null, 2)], {
				type: 'application/json'
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${fileName}.json`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
			/>
		</svg>
		JSON
	</button>
</label>

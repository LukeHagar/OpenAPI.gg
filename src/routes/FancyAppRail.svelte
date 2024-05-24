<script lang="ts">
	import {
		AppRail,
		AppRailAnchor,
		AppRailTile,
		FileButton,
		FileDropzone,
		LightSwitch
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { localStoragePrefix } from '$lib';
	import { goto } from '$app/navigation';
	import { parse, stringify } from 'yaml';
	import { openApiStore } from '$lib';
	import filenamify from 'filenamify';

	let files: FileList | undefined;

	$: fileName = filenamify($openApiStore.info.title) || 'openapi';

	function onFileUpload(e: Event): void {
		console.log('onFileUpload', e);
		console.log('files', files);
		if (!files) return;
		console.log('files[0]', files[0]);
		const file = files[0];
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			const isJson = file.name.endsWith('.json');
			console.log('isJson', isJson);
			try {
				if (isJson) {
					openApiStore.set(JSON.parse(result));
				} else {
					openApiStore.set(parse(result));
				}
			} catch (error) {
				console.error(`Error parsing ${isJson ? 'json' : 'yaml'} file`, error);
			}
		};
		reader.readAsText(file);
	}
</script>

<AppRail width="w-28" aspectRatio="aspect-[3/2]" background="variant-ghost-surface" border="ring-0">
	<svelte:fragment slot="lead">
		<div class="my-4">
			<AppRailAnchor href="/">
				<p class="font-bold mb-1">OpenAPI</p>
				<p class=" mb-2">Generator</p>
				<code class="text-xs ml-2 variant-filled-success p-1 px-2 rounded-container-token">
					3.1.0
				</code>
			</AppRailAnchor>
		</div>
		<hr />
	</svelte:fragment>
	<AppRailAnchor href="/info" selected={$page.url.pathname === '/info'}>
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
				d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
			/>
		</svg>
		Info
	</AppRailAnchor>
	<AppRailAnchor href="/servers" selected={$page.url.pathname === '/servers'}>
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
				d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
			/>
		</svg>
		Servers
	</AppRailAnchor>
	<AppRailAnchor href="/authentication" selected={$page.url.pathname === '/authentication'}>
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
				d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
			/>
		</svg>
		Authentication
	</AppRailAnchor>
	<AppRailAnchor href="/paths" selected={$page.url.pathname === '/paths'}>
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
				d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
			/>
		</svg>
		Paths
	</AppRailAnchor>
	<svelte:fragment slot="trail">
		<FileButton
			bind:files
			accept=".yml,.yaml,.json"
			button="btn text-sm rounded-none text-wrap variant-soft-primary flex flex-col justify-center items-center h-20 w-full"
			on:change={onFileUpload}
			type="file"
			name="openapispec"
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
					d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
				/>
			</svg>
			Upload
		</FileButton>
		<button
			type="button"
			class="btn text-sm rounded-none text-wrap variant-soft-primary flex flex-col justify-center items-center h-20 w-full"
			on:click={() => {
				const openApiStorage = localStorage.getItem(`${localStoragePrefix}openApi`);
				if (!openApiStorage) return;
				const openApi = JSON.parse(openApiStorage);
				const blob = new Blob([JSON.stringify(openApi, null, 2)], { type: 'application/json' });
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
			Download JSON
		</button>
		<button
			type="button"
			class="btn text-sm rounded-none text-wrap variant-soft-primary flex flex-col justify-center items-center h-20 w-full"
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
			Download YAML
		</button>
		<button
			type="button"
			class="btn text-sm rounded-none text-wrap variant-soft-error hover:variant-soft-error flex justify-center items-center h-16 w-full"
			on:click={() => {
				if (confirm('Are you sure you want to reset ALL current inputs?')) {
					// remove `openApi` from localStorage
					localStorage.removeItem(`${localStoragePrefix}openApi`);
					window.location.pathname = '/';
				}
			}}
		>
			Clear all inputs
		</button>
		<div class="flex justify-center items-center h-10 w-full my-4">
			<LightSwitch />
		</div>
		<AppRailAnchor href="https://www.speakeasyapi.dev/openapi" target="_blank">
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
					d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
				/>
			</svg>
			API Reference
		</AppRailAnchor>
	</svelte:fragment>
</AppRail>

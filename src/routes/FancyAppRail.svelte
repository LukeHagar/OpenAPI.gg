<script lang="ts">
	import { AppRail, AppRailAnchor, LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { liveQuery } from 'dexie';
	import { db } from '$lib/db';

	import DownloadButtons from '$lib/components/FileManagement/DownloadButtons.svelte';

	let apiSpecs = liveQuery(() => db.apiSpecs.toArray());
	$: console.log($apiSpecs);
</script>

<AppRail width="w-28" aspectRatio="aspect-[3/2]" background="variant-ghost-surface" border="ring-0">
	<svelte:fragment slot="lead">
		<div>
			<AppRailAnchor href="/">
				<div class="flex flex-col gap-2 py-4">
					<p class="font-bold">OpenAPI</p>
					<p>Generator</p>
					<code
						class="mx-auto w-min text-xs variant-filled-success p-1 px-2 rounded-container-token"
					>
						3.1.0
					</code>
				</div>
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
	<AppRailAnchor href="/stats" selected={$page.url.pathname === '/stats'}>
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
				d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
			/>
		</svg>
		Stats
	</AppRailAnchor>

	<svelte:fragment slot="trail">
		<div class="p-2">
			<DownloadButtons />
		</div>
		<div class="flex justify-center my-4">
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

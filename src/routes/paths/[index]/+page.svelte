<script lang="ts">
	import ServerInput from '$lib/components/atoms/ServerInput.svelte';
	import { openApiStore } from '$lib';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { pathTemplate } from '$lib/pathTemplate';
	import type { PageData } from './$types';

	export let data: PageData;

	// create local path object to work with
	const localPathObject = (() => {
		// @ts-expect-error - damn those stolen types for their inaccuracy
		return $openApiStore.paths[data.pathName] ?? pathTemplate;
	})();

	let customServersEnabled: boolean = false;

	if (localPathObject.servers?.length > 0) {
		customServersEnabled = true;
	}

	const addCustomServer = () => {
		if (!Array.isArray(localPathObject.servers)) {
			localPathObject.servers = [];
		}
		localPathObject.servers.push({ url: '', description: '' });
		// yay svelte reactivity
		localPathObject.servers = localPathObject.servers;
	};

	const removeCustomServer = (index: number) => {
		if (!Array.isArray(localPathObject.servers)) {
			return;
		}
		localPathObject.servers.splice(index, 1);
		// yay svelte reactivity
		localPathObject.servers = localPathObject.servers;
	};
</script>

<div class="card p-4 space-y-4">
	<a href="/paths"> {`<-`} Back </a>
	<h1>{data.pathName}</h1>
	<label class="space-y-1">
		<h5 class="h5">Summary</h5>
		<p class="text-sm">A short summary of what the path item represents.</p>
		<input type="text" class="input" placeholder="Summary" bind:value={localPathObject.summary} />
	</label>
	<label class="space-y-1">
		<h5 class="h5">Description</h5>
		<p class="text-sm">A description of the path item. Supports Markdown.</p>
		<textarea class="textarea" placeholder="Description" bind:value={localPathObject.description} />
	</label>
	<div>
		<span class="flex flex-col gap-4">
			<h5 class="h5">Servers</h5>
			<SlideToggle name="slide" size="sm" bind:checked={customServersEnabled} />
			{#if customServersEnabled && Array.isArray(localPathObject.servers)}
				<ul class="list space-y-6">
					{#each localPathObject.servers as server, index}
						<li class="!block">
							<span class="flex w-full justify-end">
								<button
									type="button"
									class="btn btn-sm variant-ringed-error hover:variant-filled-error"
									on:click={() => removeCustomServer(index)}
								>
									Remove Server
								</button>
							</span>
							<ServerInput id={1} bind:server />
						</li>
						{#if index < localPathObject.servers.length - 1}
							<hr />
						{/if}
					{/each}
				</ul>
			{/if}
			{#if customServersEnabled}
				<span class="flex w-full justify-center">
					<button type="button" class="btn variant-filled-primary" on:click={addCustomServer}>
						Add Server
					</button>
				</span>
			{/if}
		</span>
	</div>
	<div>
		<h5 class="h5">Parameters</h5>
		<div class="ml-2">
			<div>
				<h6 class="h6">Path Parameters</h6>
			</div>
			<div>
				<h6 class="h6">Query Parameters</h6>
			</div>
			<div>
				<h6 class="h6">Header Parameters</h6>
			</div>
			<div>
				<h6 class="h6">Cookie Parameters</h6>
			</div>
		</div>
	</div>
	<div>
		<h5 class="h5">Operations</h5>
	</div>
</div>

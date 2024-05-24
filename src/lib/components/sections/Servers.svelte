<script lang="ts">
	import { openApiStore } from '$lib';
	import ServerInput from '../atoms/ServerInput.svelte';

	const addServer = () => {
		// check if the servers array is not undefined
		if (!$openApiStore.servers) {
			$openApiStore.servers = [];
		}
		let tempServers = [...$openApiStore.servers];
		tempServers.push({ url: '', description: '' });
		$openApiStore.servers = tempServers;
	};

	const removeServer = (index: number) => {
		// check if the servers array is not undefined
		if (!$openApiStore.servers) {
			$openApiStore.servers = [];
		}
		let tempServers = [...$openApiStore.servers];
		tempServers.splice(index, 1);
		$openApiStore.servers = tempServers;
	};
</script>

<form
	class=" mx-auto border-token rounded-container-token bg-surface-backdrop-token p-4 min-h-20 space-y-6"
>
	<!-- If openApiStore.servers isnt an array show add button -->
	{#if Array.isArray($openApiStore.servers)}
		<ul class="space-y-6">
			{#each $openApiStore.servers as server, index}
				<li class="!block">
					<span class="flex w-full justify-between">
						<span>Server {index + 1} </span>
						<button
							type="button"
							class="btn btn-sm variant-ringed-error hover:variant-filled-error"
							on:click={() => removeServer(index)}
						>
							Remove Server
						</button>
					</span>
					<ServerInput id={1} bind:server />
				</li>
				{#if index < $openApiStore.servers.length - 1}
					<hr />
				{/if}
			{/each}
		</ul>
		<span class="flex justify-center" class:!mt-0={$openApiStore.servers.length === 0}>
			<button type="button" class="btn text-sm variant-filled-primary" on:click={addServer}>
				Add Server
			</button>
		</span>
	{:else}
		<span class="flex justify-center mt-0">
			<button type="button" class="btn text-sm variant-filled-primary" on:click={addServer}>
				Add Server
			</button>
		</span>
	{/if}
</form>

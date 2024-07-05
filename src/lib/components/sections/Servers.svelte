<script lang="ts">
	import { selectedSpec } from '$lib/db';
	import ServerInput from '../atoms/ServerInput.svelte';

	const addServer = () => {
		// check if the servers array is not undefined
		if (!$selectedSpec.spec.servers) {
			$selectedSpec.spec.servers = [];
		}
		let tempServers = [...$selectedSpec.spec.servers];
		tempServers.push({ url: '', description: '' });
		$selectedSpec.spec.servers = tempServers;
	};

	const removeServer = (index: number) => {
		// check if the servers array is not undefined
		if (!$selectedSpec.spec.servers) {
			$selectedSpec.spec.servers = [];
		}
		let tempServers = [...$selectedSpec.spec.servers];
		tempServers.splice(index, 1);
		$selectedSpec.spec.servers = tempServers;
	};
</script>

<form
	class=" mx-auto border-token rounded-container-token bg-surface-backdrop-token p-4 min-h-20 space-y-6"
>
	<!-- If selectedSpec$selectedSpec.spec.servers isnt an array show add button -->
	{#if Array.isArray($selectedSpec.spec.servers)}
		<ul class="space-y-6">
			{#each $selectedSpec.spec.servers as server, index}
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
				{#if index < $selectedSpec.spec.servers.length - 1}
					<hr />
				{/if}
			{/each}
		</ul>
		<span class="flex justify-center" class:!mt-0={$selectedSpec.spec.servers.length === 0}>
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

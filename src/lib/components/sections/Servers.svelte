<script lang="ts">
	import { openApiStore } from '$lib';
	import ServerInput from '../atoms/ServerInput.svelte';

	const addServer = () => {
		let tempServers = [...$openApiStore.servers];
		tempServers.push({ url: '', description: '' });
		$openApiStore.servers = tempServers;
	};

	const removeServer = (index: number) => {
		let tempServers = [...$openApiStore.servers];
		tempServers.splice(index, 1);
		$openApiStore.servers = tempServers;
	};
</script>

<form class="container mx-auto card px-6 py-4 space-y-6">
	<ul class="list space-y-6">
		{#each $openApiStore.servers as server, index}
			<li class="!block">
				<span class="flex w-full justify-end">
					<button
						type="button"
						class="btn btn-sm variant-ringed-error hover:variant-filled-error"
						on:click={() => removeServer(index)}
					>
						Remove Server
					</button>
				</span>
				<ServerInput id={1} bind:url={server.url} bind:description={server.description} />
			</li>
			{#if index < $openApiStore.servers.length - 1}
				<hr />
			{/if}
		{/each}
	</ul>
	<!-- Add another Server Button -->
	<span class="flex justify-center" class:!mt-0={$openApiStore.servers.length === 0}>
		<button type="button" class="btn variant-filled-primary" on:click={addServer}>
			Add Server
		</button>
	</span>
</form>

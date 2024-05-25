<script lang="ts">
	import { openApiStore, operationCount, pathCount } from '$lib';

	const stats = [
		{
			title: 'Paths',
			value: pathCount($openApiStore)
		},
		{
			title: 'Operation IDs',
			value: operationCount($openApiStore)
		}
	];
</script>

<div class="flex flex-row gap-4 justify-center">
	{#each stats as stat}
		<div
			class="border-token rounded-container-token bg-surface-backdrop-token w-52 p-10 text-center flex flex-col gap-4"
		>
			<h2 class="text-lg">{stat.title}</h2>
			<p class="text-lg">
				{stat.value}
			</p>
		</div>
	{/each}
</div>

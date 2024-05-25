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

<div class="w-full h-full flex flex-col">
	<div class="flex flex-row gap-4 justify-center">
		{#each stats as stat}
			<div class="card w-52 p-10 text-center flex flex-col gap-4">
				<h2 class="text-lg">{stat.title}</h2>
				<p class="text-lg">
					{stat.value}
				</p>
			</div>
		{/each}
	</div>
	<div class="flex flex-col items-center justify-center grow">
		<h1 class="h1">
			<span
				class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
			>
				Design.
			</span>
		</h1>
		<h1 class="h1">
			<span
				class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
			>
				Build.
			</span>
		</h1>
		<h1 class="h1">
			<span
				class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
			>
				Deploy.
			</span>
		</h1>
	</div>
</div>

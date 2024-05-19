<script lang="ts">
	import type { Flows } from '$lib/types/auth';

	export let flow: Flows;

	const addScope = () => {
		flow.scopes = [...flow.scopes, [{ scope: '', description: '' }]];
	};
	const removeScope = (index: number) => {
		flow.scopes = flow.scopes.filter((_, i) => i !== index);
	};
</script>

<h4 class="h4">Scopes</h4>
<table class="table">
	<tbody>
		{#each flow.scopes as scope, index}
			{#each scope as item, i}
				<tr>
					<td class="px-4">
						<input
							type="text"
							name="scope{index}-{i}"
							class="input"
							placeholder="scope"
							bind:value={item.scope}
						/>
					</td>
					<td class="px-2">
						<input
							type="text"
							name="description{index}-{i}"
							class="input"
							placeholder="a short description of the scope (optional)"
							bind:value={item.description}
						/>
					</td>
					<td class="max-w-16 px-2">
						<button
							type="button"
							class="btn variant-ringed-error hover:variant-filled-error"
							on:click={() => {
								removeScope(index);
							}}
						>
							Remove Scope
						</button>
					</td>
				</tr>
			{/each}
		{/each}
	</tbody>
</table>
<span class="flex justify-center">
	<button type="button" class="btn variant-filled-primary" on:click={addScope}>Add Scope</button>
</span>

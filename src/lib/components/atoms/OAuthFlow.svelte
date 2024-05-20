<script lang="ts">
	export let type: 'implicit' | 'authorizationCode' | 'password' | 'clientCredentials';
	export let flow: Oauth2.Oauth2Flow | (Oauth2.Oauth2Flow & { tokenUrl: string });

	const addScope = () => {
		const name = prompt('Enter scope');
		if (!name) return;
		flow.scopes[name] = '';
	};
	const removeScope = (index: number) => {};
</script>

<div class="border-token rounded-container-token p-4">
	<div class="ml-4 flex flex-col gap-4">
		<label>
			<h5 class="h5">Authorization URL</h5>
			<p class="text-sm">The authorization URL to be used for this flow.</p>
			<input
				type="text"
				name="authorizationURL"
				class="input"
				placeholder="https://api.example.com/oauth2/authorize"
				bind:value={flow.authorizationUrl}
			/>
		</label>
		{#if type === 'authorizationCode'}
			<label>
				<h5 class="h5">Token URL</h5>
				<p class="text-sm">The token URL to be used for this flow.</p>
				<input
					type="text"
					name="tokenURL"
					class="input"
					placeholder="https://api.example.com/oauth2/token"
					bind:value={flow.tokenUrl}
				/>
			</label>
		{/if}
		<label>
			<h5 class="h5">Refresh URL</h5>
			<p class="text-sm">The refresh URL to be used for this flow. (optional)</p>
			<input
				type="text"
				name="refreshURL"
				class="input"
				placeholder="https://api.example.com/oauth2/refresh"
				bind:value={flow.refreshUrl}
			/>
		</label>
		<label>
			<h5 class="h5">Scopes</h5>
			<p class="text-sm">The available scopes for this flow.</p>
			<table class="table">
				<tbody>
					{#each Object.keys(flow.scopes) as scope, index}
						<tr>
							<td class="!text-lg">
								{scope}
							</td>
							<td class="w-full">
								<input
									type="text"
									name="scope"
									class="input"
									placeholder="description of the scope"
									bind:value={flow.scopes[scope]}
								/>
							</td>
							<td>
								<button
									type="button"
									class="btn variant-ringed-error hover:variant-filled-error"
									on:click={() => removeScope(index)}
								>
									Remove
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<span class="w-full flex justify-center">
				<button
					type="button"
					class="btn btn-sm variant-filled-primary"
					class:mt-2={Object.keys(flow.scopes).length !== 0}
					on:click={addScope}
				>
					Add Scope
				</button>
			</span>
		</label>
	</div>
</div>

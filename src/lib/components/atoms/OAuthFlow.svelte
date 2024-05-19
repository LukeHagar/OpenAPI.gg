<script lang="ts">
	import ScopeList from './ScopeList.svelte';

	import type { Flows } from '$lib/types/auth';

	export let flow: Flows;

	const addScope = () => {
		flow.scopes = [...flow.scopes, [{ scope: '', description: '' }]];
	};
	const removeScope = (index: number) => {
		flow.scopes = flow.scopes.filter((_, i) => i !== index);
	};
</script>

<div class="flex flex-col gap-4">
	{#if flow.name == 'authorizationCode'}
		<h3 class="h3">Authorization Code</h3>
		<label class="space-y-2">
			<h4 class="h4">Authorization URL</h4>
			<input
				type="text"
				name="authorizationURL"
				class="input"
				placeholder="https://api.example.com/oauth2/authorize"
				bind:value={flow.authorizationUrl}
			/>
		</label>
		<label class="space-y-2">
			<h4 class="h4">Token URL</h4>
			<input
				type="text"
				name="tokenURL"
				class="input"
				placeholder="https://api.example.com/oauth2/token"
				bind:value={flow.tokenUrl}
			/>
		</label>
		<ScopeList bind:flow />
	{:else if flow.name == 'implicit'}
		<h3 class="h3">Implicit</h3>
		<label class="space-y-2">
			<h4 class="h4">Authorization URL</h4>
			<input
				type="text"
				name="authorizationURL"
				class="input"
				placeholder="https://api.example.com/oauth2/authorize"
				bind:value={flow.authorizationUrl}
			/>
		</label>
		<ScopeList bind:flow />
	{:else if flow.name == 'password'}
		<h3 class="h3">Password</h3>
		<label class="space-y-2">
			<h4 class="h4">Token URL</h4>
			<input
				type="text"
				name="tokenURL"
				class="input"
				placeholder="https://api.example.com/oauth2/token"
				bind:value={flow.tokenUrl}
			/>
		</label>
		<ScopeList bind:flow />
	{:else if flow.name == 'clientCredentials'}
		<h3 class="h3">Client Credentials</h3>
		<label class="space-y-2">
			<h4 class="h4">Token URL</h4>
			<input
				type="text"
				name="tokenURL"
				class="input"
				placeholder="https://api.example.com/oauth2/token"
				bind:value={flow.tokenUrl}
			/>
		</label>
		<ScopeList bind:flow />
	{/if}
</div>

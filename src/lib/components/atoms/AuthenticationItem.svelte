<script lang="ts">
	import { oauth2FlowTemplates } from '$lib/authTemplates';
	import type { SecuritySchema } from '$lib/types';
	import OAuthFlow from './OAuthFlow.svelte';

	export let data: SecuritySchema;

	let oauthFlow: string;
	const addOAuthFlow = () => {
		if (!data.hasOwnProperty('flows')) {
			return;
		}
		const tempData = data;
		let newFlow;

		switch (oauthFlow) {
			case 'authorizationCode':
				newFlow = oauth2FlowTemplates.authorizationCode;
				break;
			case 'implicit':
				newFlow = oauth2FlowTemplates.implicit;
				break;
			case 'password':
				newFlow = oauth2FlowTemplates.password;
				break;
			case 'clientCredentials':
				newFlow = oauth2FlowTemplates.clientCredentials;
				break;
			default:
				newFlow = undefined;
				break;
		}

		if (newFlow) {
			// @ts-expect-error - this is only called when data.flows exists
			tempData.flows.push(newFlow);
			data = tempData;
		}
	};

	const removeFlow = (index: number) => {
		if (!data.hasOwnProperty('flows')) {
			return;
		}
		let tempData = data;
		// @ts-expect-error - this is only called when data.flows exists
		tempData.flows.splice(index, 1);
		data = tempData;
	};
</script>

<div class="flex flex-col gap-2"></div>
<div class="space-y-4">
	{#if data.type == 'http' && data.scheme == 'basic'}
		<h3 class="h3">Basic Auth</h3>
		<p>Basic authentication is a simple authentication scheme built into the HTTP protocol.</p>
		<label class="space-y-2">
			<h4 class="h4">Unique name for the security scheme</h4>
			<input class="input" type="text" placeholder="basicAuth" bind:value={data.identifier} />
		</label>
	{:else if data.type == 'http' && data.scheme == 'bearer'}
		<h3 class="h3">Bearer Auth</h3>
		<p>Basic authentication is a simple authentication scheme built into the HTTP protocol.</p>
		<label class="space-y-2">
			<h4 class="h4">Unique name for the security scheme</h4>
			<input class="input" type="text" placeholder="bearerAuth" bind:value={data.identifier} />
		</label>
		<label class="space-y-2">
			<h4 class="h4">Format: arbitrary string for documentation purposes</h4>
			<input class="input" type="text" placeholder="JWT" bind:value={data.identifier} />
		</label>
	{:else if data.type == 'apiKey' && data.in == 'header'}
		<!-- Cookie API Keys handled by CookieAuth -->
		<h3 class="h3">API Key</h3>
		<label class="space-y-2">
			<h4 class="h4">Unique name for the security scheme</h4>
			<input class="input" type="text" placeholder="apiKeyAuth" bind:value={data.identifier} />
		</label>
		<label class="space-y-2">
			<h4 class="h4">Location</h4>
			<select class="input">
				<option value="header" selected>Header</option>
				<option value="query">Query</option>
			</select>
		</label>
		<label class="space-y-2">
			<h4 class="h4">Name (required)</h4>
			<input class="input" type="text" placeholder="X-API-Key" />
		</label>
	{:else if data.type == 'openIdConnect'}
		<h3 class="h3">OpenID</h3>
		<label class="space-y-2">
			<h4 class="h4">Unique name for the security scheme</h4>
			<input class="input" type="text" placeholder="openIdAuth" bind:value={data.identifier} />
		</label>
		<label>
			<h4 class="h4">OpenID Connect URL</h4>
			<input
				class="input"
				type="url"
				placeholder="https://example.com/.well-known/openid-configuration"
			/>
		</label>
	{:else if data.type == 'oauth2'}
		<h3 class="h3">OAuth2</h3>
		<label class="space-y-2">
			<h4 class="h4">Unique name for the security scheme</h4>
			<input class="input" type="text" placeholder="oAuth" bind:value={data.identifier} />
		</label>
		<label class="space-y-2">
			<h4 class="h4">Description</h4>
			<textarea
				class="input rounded-container-token"
				placeholder="OAuth2 Authorization Description"
			/>
		</label>
		{#each data.flows as flow, index}
			<OAuthFlow bind:flow />
			<span class="flex justify-center">
				<button
					type="button"
					class="btn variant-ringed-error hover:variant-filled-error"
					on:click={() => {
						removeFlow(index);
					}}
				>
					Remove Flow
				</button>
			</span>
			<hr />
		{/each}
		<span class="flex justify-center items-center gap-2 max-w-md mx-auto">
			<select class="input" bind:value={oauthFlow}>
				<option value="authorizationCode">Authorization Code</option>
				<option value="implicit">Implicit</option>
				<option value="password">Password</option>
				<option value="clientCredentials">Client Credentials</option>
			</select>
			<button type="button" class="btn variant-filled-primary" on:click={addOAuthFlow}>
				Add OAuth2 Flow
			</button>
		</span>
	{:else if data.type == 'apiKey' && data.in == 'cookie'}
		<h3 class="h3">Cookie Auth</h3>
		<label class="space-y-2">
			<h4 class="h4">Unique name for the security scheme</h4>
			<input class="input" type="text" placeholder="cookieAuth" bind:value={data.identifier} />
		</label>
		<label class="space-y-2">
			<h4 class="h4">Cookie Name (required)</h4>
			<input class="input" type="text" placeholder="JSESSIONID" />
		</label>
	{/if}
</div>

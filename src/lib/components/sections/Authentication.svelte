<script lang="ts">
	import { openApiStore } from '$lib';
	import {
		apiKeyAuthTemplate,
		basicAuthTemplate,
		bearerAuthTemplate,
		oauth2AuthTemplate,
		openIdAuthTemplate
	} from '$lib/authTemplates';
	import AuthenticationItem from '../atoms/AuthenticationItem.svelte';

	let selectedSchema: string;
	const addSecuritySchema = () => {
		let tempSchemaList = $openApiStore.security;
		let newSchema;
		switch (selectedSchema) {
			case 'basicAuth':
				newSchema = basicAuthTemplate;
				break;
			case 'bearerAuth':
				newSchema = bearerAuthTemplate;
				break;
			case 'ApiKeyAuth':
				newSchema = apiKeyAuthTemplate;
				break;
			case 'openId':
				newSchema = openIdAuthTemplate;
				break;
			case 'oAuthSample':
				newSchema = oauth2AuthTemplate;
				break;
			default:
				newSchema = undefined;
				break;
		}

		if (newSchema) {
			tempSchemaList = [...tempSchemaList, newSchema];
			$openApiStore.security = tempSchemaList;
		}
	};
	const removeSecuritySchema = (index: number) => {
		let tempSchemaList = $openApiStore.security;
		tempSchemaList.splice(index, 1);
		$openApiStore.security = tempSchemaList;
	};
</script>

<form
	class="container mx-auto border-token rounded-container-token bg-surface-backdrop-token px-6 py-4 space-y-4"
>
	{#each $openApiStore.security as schema, index}
		<div class="card w-full p-4">
			<div class="flex flex-row-reverse w-full">
				<button
					type="button"
					class="btn btn-sm variant-ringed-error hover:variant-filled-error"
					on:click={() => {
						removeSecuritySchema(index);
					}}
				>
					Remove schema
				</button>
			</div>
			<AuthenticationItem bind:schema />
		</div>
		<hr />
	{/each}

	<span class="flex justify-center items-center gap-2 max-w-sm mx-auto">
		<select name="security-schema" bind:value={selectedSchema} class="input w-fit">
			<option value="basicAuth" selected>Basic Auth</option>
			<option value="bearerAuth">Bearer Auth</option>
			<option value="ApiKeyAuth">API Key Auth</option>
			<option value="openId">OpenID</option>
			<option value="oAuthSample">OAuth2</option>
		</select>
		<button type="button" class="btn variant-filled-primary" on:click={addSecuritySchema}>
			Add Security Schema
		</button>
	</span>
</form>

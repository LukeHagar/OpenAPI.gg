<!-- <script lang="ts">
	import { openApiStore } from '$lib';
	import {
		apiKeyAuthTemplate,
		basicAuthTemplate,
		bearerAuthTemplate,
		cookieAuthTemplate,
		oauth2AuthTemplate,
		openIdAuthTemplate
	} from '$lib/authTemplates';
	import AuthenticationItem from '../atoms/AuthenticationItem.svelte';

	let selectedSchema: string;
	const addSecuritySchema = () => {
		let tempSchemaList = $openApiStore.securitySchemas;
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
			case 'cookieAuth':
				newSchema = cookieAuthTemplate;
				break;
			default:
				newSchema = undefined;
				break;
		}

		if (newSchema) {
			tempSchemaList = [...tempSchemaList, newSchema];
			$openApiStore.securitySchemas = tempSchemaList;
		}
	};
	const removeSecuritySchema = (index: number) => {
		let tempSchemaList = $openApiStore.securitySchemas;
		tempSchemaList.splice(index, 1);
		$openApiStore.securitySchemas = tempSchemaList;
	};
</script>

<form class="container mx-auto card px-6 py-4 space-y-4">
	{#each $openApiStore.securitySchemas as schema, index}
		<AuthenticationItem bind:data={schema} />
		<span class="flex justify-center">
			<button
				type="button"
				class="btn variant-ringed-error hover:variant-filled-error"
				on:click={() => {
					removeSecuritySchema(index);
				}}
			>
				Remove Security Schema
			</button>
		</span>
		<hr />
	{/each}

	<span class="flex justify-center items-center gap-2 max-w-sm mx-auto">
		<select name="security-schema" bind:value={selectedSchema} class="input">
			<option value="basicAuth" selected>Basic Auth</option>
			<option value="bearerAuth">Bearer Auth</option>
			<option value="ApiKeyAuth">API Key Auth</option>
			<option value="openId">OpenID</option>
			<option value="oAuthSample">OAuth2</option>
			<option value="cookieAuth">Cookie Auth</option>
		</select>
		<button type="button" class="btn variant-filled-primary" on:click={addSecuritySchema}>
			Add Security Schema
		</button>
	</span>
</form> -->

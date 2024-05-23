<script lang="ts">
	import Info from '../icons/Info.svelte';
	import LicenseAtom from '../atoms/LicenseAtom.svelte';
	import { openApiStore } from '$lib';
</script>

<form class="container mx-auto card px-6 py-4 space-y-4">
	<label class="text-xl space-y-2">
		<span>Title (required)</span>
		<input
			class="input"
			name="title"
			placeholder="Sample API"
			type="text"
			bind:value={$openApiStore.info.title}
			required
		/>
	</label>
	<label class="text-xl space-y-2">
		<span> Description (optional) </span>
		<textarea
			class="textarea"
			name="description"
			placeholder="Optional multiline or single-line description. Supports Markdown."
			bind:value={$openApiStore.info.description}
		/>
	</label>
	<label class="text-xl space-y-2">
		<span>Version (required)</span>
		<input
			class="input"
			name="version"
			placeholder="0.1.0"
			type="text"
			bind:value={$openApiStore.info.version}
			required
		/>
	</label>
	<label class="text-xl space-y-2">
		<span>Terms of Service (optional)</span>
		<input
			class="input"
			name="termsOfService"
			placeholder="https://example.com/terms"
			type="url"
			bind:value={$openApiStore.info.termsOfService}
		/>
	</label>
	<div class="border-token rounded-container-token space-y-4 p-4">
		<h4 class="h4">Contact Information</h4>
		<label class="text-xl space-y-2">
			<span>Name (optional)</span>
			<input
				class="input"
				name="contactName"
				placeholder="John Doe"
				type="text"
				bind:value={$openApiStore.info.contact.name}
			/>
		</label>
		<label class="text-xl space-y-2">
			<span>Email (optional)</span>
			<input
				class="input"
				name="contactEmail"
				placeholder="email@example.com"
				type="email"
				bind:value={$openApiStore.info.contact.email}
			/>
		</label>
		<label class="text-xl space-y-2">
			<span>URL (optional)</span>
			<input
				class="input"
				name="contactUrl"
				placeholder="https://example.com"
				type="url"
				bind:value={$openApiStore.info.contact.url}
			/>
		</label>
	</div>
	<LicenseAtom />
</form>

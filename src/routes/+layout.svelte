<script lang="ts">
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { localStoragePrefix } from '$lib';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Modal
	import { initializeStores, Modal, LightSwitch } from '@skeletonlabs/skeleton';
	initializeStores();
</script>

<Modal />

<div class="w-full h-full">
	<AppBar padding="p-2">
		<svelte:fragment slot="lead">
			<h1>
				OpenAPI generator
				<code class="text-xs ml-2 variant-filled-success p-1 px-2 rounded-container-token"> 3.1.0 </code>
			</h1>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<LightSwitch />
			<a
				href="https://www.speakeasyapi.dev/openapi"
				target="_blank"
				class="btn variant-filled-surface btn-sm hover:variant-filled-primary"
			>
				Schema Reference
			</a>
			<button
				type="button"
				class="btn variant-ringed-error btn-sm hover:variant-filled-error"
				on:click={() => {
					if (confirm('Are you sure you want to reset ALL current inputs?')) {
						// remove `openApi` from localStorage
						localStorage.removeItem(`${localStoragePrefix}openApi`);
						window.location.reload();
					}
				}}
			>
				X
			</button>
		</svelte:fragment>
	</AppBar>
	<div class="mx-8 my-4">
		<slot />
	</div>
</div>

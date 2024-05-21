<script lang="ts">
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { localStoragePrefix } from '$lib';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div class="w-full h-full">
	<AppBar>
		<svelte:fragment slot="lead">
			<h4 class="h4">
				OpenAPI generator
				<code class="ml-2 variant-filled-success p-1 px-2 rounded-container-token"> 3.1.0 </code>
			</h4>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<a
				href="https://www.speakeasyapi.dev/openapi"
				target="_blank"
				class="btn variant-filled-surface"
			>
				Schema Reference
			</a>
			<button
				type="button"
				class="btn variant-ringed-error hover:variant-filled-error"
				on:click={() => {
					if (confirm('Are you sure you want to reset ALL current inputs?')) {
						// remove `openApi` from localStorage
						localStorage.removeItem(`${localStoragePrefix}openApi`);
						window.location.reload();
					}
				}}
			>
				Reset Inputs
			</button>
		</svelte:fragment>
	</AppBar>
	<div class="mx-8 my-4">
		<slot />
	</div>
</div>

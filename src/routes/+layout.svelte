<script lang="ts">
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div class="w-full h-full">
	<AppBar>
		<svelte:fragment slot="lead">
			<h4 class="h4">
				OpenAPI generator
				<code class="ml-2 variant-filled-success p-1 px-2 rounded-container-token"> 3.0.0 </code>
			</h4>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<a
				href="https://swagger.io/docs/specification/basic-structure/"
				target="_blank"
				class="btn variant-filled-surface"
			>
				Schema Reference
			</a>
		</svelte:fragment>
	</AppBar>
	<div class="mx-8 my-4">
		<slot />
	</div>
</div>

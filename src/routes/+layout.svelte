<script lang="ts">
	import FancyAppRail from './FancyAppRail.svelte';

	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';

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

<AppShell slotPageContent="px-6 py-4">
	<svelte:fragment slot="sidebarLeft">
		<FancyAppRail />
	</svelte:fragment>
	<slot />
</AppShell>

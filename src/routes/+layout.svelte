<script lang="ts">
	import FancyAppRail from './FancyAppRail.svelte';

	import { AppShell, type ModalComponent } from '@skeletonlabs/skeleton';
	import '../app.postcss';
// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
// Modal
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
	import UploadModal from '$lib/components/FileManagement/UploadModal.svelte';
	initializeStores();

	const components: Record<string, ModalComponent> = {
	// Set a unique modal ID, then pass the component reference
	uploadModal: { ref: UploadModal },
	// ...
};

</script>

<Modal {components} />

<AppShell slotPageContent="px-6 py-4">
	<svelte:fragment slot="sidebarLeft">
		<FancyAppRail />
	</svelte:fragment>
	<slot />
</AppShell>

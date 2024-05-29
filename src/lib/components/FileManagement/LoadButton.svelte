<script lang="ts">
	import { setSpec, type APISpec } from '$lib/db';

	export let spec: APISpec;

	function onLoad(e: Event): void {
		console.log('load button clicked');
		setSpec(spec);
	}
</script>

<button class="btn variant-ghost-warning" on:click={onLoad}> Load </button>

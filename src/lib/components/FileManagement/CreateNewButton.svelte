<script lang="ts">
	import { newSpec, loadSpec } from '$lib/db';
</script>

<button
	class="btn variant-ghost-success"
	on:click={() => {
		if (
			confirm(
				'This operation clears all the current values, unsaved data will be lost, are you sure?'
			)
		) {
			loadSpec(structuredClone(newSpec));
		}
	}}
>
	Create New
</button>

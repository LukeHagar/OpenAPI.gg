<script lang="ts">
	import { localStoragePrefix } from '$lib';
</script>

<button
	class="btn variant-ghost-success"
	on:click={() => {
		if (
			confirm(
				'This operation clears all the current values, unsaved data will be lost, are you sure?'
			)
		) {
			// remove `openApi` from localStorage
			localStorage.removeItem(`${localStoragePrefix}openApi`);
		}
	}}
>
	Create New
</button>

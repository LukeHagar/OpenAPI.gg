<script lang="ts">
	import { page } from '$app/stores';

	$: console.log($page.params.method);
</script>

<div
	class="border-token border-surface-500 space-y-4 px-6 py-4 rounded-container-token variant-glass-surface"
>
	<h3 class="h3 font-mono">
		Path: {$page.params.pathName}#{$page.params.method}
	</h3>
	<hr />
</div>

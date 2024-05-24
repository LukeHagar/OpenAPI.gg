<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="card max-w-lg">
		<header class="card-header">
			<enhanced:img src="./error.jpg" alt="stormy, grayscale seaside" />
		</header>
		<section class="p-4">
			<h3 class="h3">An unfortunate error occured.</h3>
		</section>
		<footer class="card-footer">
			{$page.status} - {$page.error?.message}
		</footer>
	</div>
</div>

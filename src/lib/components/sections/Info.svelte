<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import Info from '../icons/Info.svelte';
	import { openApiStore } from '$lib';

	const descriptionTooltip: PopupSettings = {
		event: 'click',
		target: 'descriptionTooltip',
		placement: 'top'
	};
</script>

<form class="container mx-auto card px-6 py-4 space-y-4">
	<label class="text-xl space-y-2">
		<span>Title (required)</span>
		<input
			class="input"
			name="title"
			placeholder="Sample API"
			type="text"
			bind:value={$openApiStore.title}
		/>
	</label>
	<label class="text-xl space-y-2">
		<span>
			Description (optional) <button type="button" use:popup={descriptionTooltip}>
				<Info />
			</button>
		</span>
		<textarea
			class="textarea"
			name="description"
			placeholder="Sample API description"
			bind:value={$openApiStore.description}
		/>
	</label>
	<label class="text-xl space-y-2">
		<span>Version (required)</span>
		<input
			class="input"
			name="version"
			placeholder="0.1.0"
			type="text"
			bind:value={$openApiStore.version}
		/>
	</label>
</form>

<!-- Description Tooltip -->
<div class="card px-4 py-2 variant-filled-primary" data-popup="descriptionTooltip">
	<p>Optional multiline or single-line description. Supports Markdown.</p>
	<div class="arrow variant-filled-primary" />
</div>

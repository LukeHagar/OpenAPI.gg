<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import Info from '../icons/Info.svelte';

	export let id: number;
	export let url: string;
	export let description: string = '';

	const descriptionTooltip: PopupSettings = {
		event: 'click',
		target: `descriptionTooltip${id}`,
		placement: 'top'
	};
</script>

<div class="space-y-4">
	<label class="space-y-2">
		<span>URL (required)</span>
		<input
			class="input"
			name="url {id}"
			placeholder="https://api.example.com"
			type="url"
			bind:value={url}
		/>
	</label>

	<label class="space-y-2">
		<span>
			Description (optional)
			<button type="button" use:popup={descriptionTooltip}>
				<Info />
			</button>
		</span>
		<textarea
			class="textarea"
			name="description {id}"
			placeholder="The main API server"
			bind:value={description}
		/>
	</label>
</div>

<!-- Description Tooltip -->
<div class="card px-4 py-2 variant-filled-primary" data-popup="descriptionTooltip{id}">
	<p>Optional multiline or single-line description. Supports Markdown.</p>
	<div class="arrow variant-filled-primary" />
</div>

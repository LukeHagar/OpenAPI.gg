<script lang="ts">
	import { addPath } from '$lib';
	import { sortPathsAlphabetically } from '$lib';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

    export let justify: string = 'justify-end';
    export let sort: boolean = true;
</script>

<div class={`flex flex-row ${justify}`}>
	<div class="flex flex-row w-40 gap-2">
		<span class="w-full flex justify-center">
			<button
				type="button"
				class="btn btn-sm variant-filled-primary"
				on:click={() => {
					addPath(modalStore);
				}}
			>
				Add Path
			</button>
		</span>
        {#if sort}
		<span class="w-full flex justify-center">
			<button
				type="button"
				class="btn btn-sm variant-filled-secondary"
				on:click={sortPathsAlphabetically}
			>
				Sort
			</button>
		</span>
        {/if}
	</div>
</div>

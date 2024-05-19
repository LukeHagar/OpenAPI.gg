<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	let tabSet: number = 0;
</script>

<TabGroup>
	<Tab bind:group={tabSet} name="info" value={0}>
		<h4 class="h4">Info</h4>
	</Tab>
	<Tab bind:group={tabSet} name="authentication" value={1}>
		<h4 class="h4">Authentication</h4>
	</Tab>
	<Tab bind:group={tabSet} name="servers" value={2}>
		<h4 class="h4">Servers</h4>
	</Tab>
	<Tab bind:group={tabSet} name="paths" value={3}>
		<h4 class="h4">Paths</h4>
	</Tab>
	<Tab bind:group={tabSet} name="components" value={4}>
		<h4 class="h4">Components</h4>
	</Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<p>Info</p>
		{/if}
		{#if tabSet === 1}
			<p>Authentication</p>
		{/if}
		{#if tabSet === 2}
			<p>Servers</p>
		{/if}
		{#if tabSet === 3}
			<p>Paths</p>
		{/if}
		{#if tabSet === 4}
			<p>Components</p>
		{/if}
	</svelte:fragment>
</TabGroup>

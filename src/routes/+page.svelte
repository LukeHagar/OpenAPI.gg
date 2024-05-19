<script lang="ts">
	import Servers from '$lib/components/sections/Servers.svelte';
	import Info from '$lib/components/sections/Info.svelte';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { persisted } from 'svelte-persisted-store';
	import Authentication from '$lib/components/sections/Authentication.svelte';

	// let tabSet: number = 0;
	const tabSet = persisted<number>('tabSet', 0);
</script>

<TabGroup>
	<Tab bind:group={$tabSet} name="info" value={0}>
		<h4 class="h4">Info</h4>
	</Tab>
	<Tab bind:group={$tabSet} name="authentication" value={1}>
		<h4 class="h4">Authentication Schemas</h4>
	</Tab>
	<Tab bind:group={$tabSet} name="servers" value={2}>
		<h4 class="h4">Servers</h4>
	</Tab>
	<Tab bind:group={$tabSet} name="paths" value={3}>
		<h4 class="h4">Paths</h4>
	</Tab>
	<Tab bind:group={$tabSet} name="components" value={4}>
		<h4 class="h4">Components</h4>
	</Tab>
	<svelte:fragment slot="panel">
		{#if $tabSet === 0}
			<Info></Info>
		{:else if $tabSet === 1}
			<Authentication />
		{:else if $tabSet === 2}
			<Servers />
		{:else if $tabSet === 3}
			<p>Paths</p>
		{:else if $tabSet === 4}
			<p>Components</p>
		{/if}
	</svelte:fragment>
</TabGroup>

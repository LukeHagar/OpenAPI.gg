<script lang="ts">
	import { openApiStore } from '$lib';
	import spdxLicenseList from 'spdx-license-list';

	const popularLicenses = ['MIT', 'Apache-2.0', 'GPL-3.0', 'Unlicense'];
</script>

<div class="border-token rounded-container-token space-y-1 p-4">
	<div class="flex flex-row justify-between">
		<h4 class="h4">License</h4>
		{#if $openApiStore.info.license}
			<label class="text-sm space-x-2">
				<span>Pick a license</span>
				<select
					class="select w-56 text-sm"
					bind:value={$openApiStore.info.license.identifier}
					on:change={() => {
						$openApiStore.info.license.name =
							spdxLicenseList[$openApiStore.info.license.identifier].name;
					}}
				>
					<optgroup label="Popular Licenses">
						{#each Object.keys(spdxLicenseList).filter( (entry) => popularLicenses.includes(entry) ) as license}
							<option value={license}>{spdxLicenseList[license].name}</option>
						{/each}
					</optgroup>
					<optgroup label="All Licenses">
						{#each Object.keys(spdxLicenseList).sort() as license}
							<option value={license}>{spdxLicenseList[license].name}</option>
						{/each}
					</optgroup>
				</select>
			</label>
		{/if}
	</div>

	{#if $openApiStore.info.license}
		<label class="text-sm space-y-1">
			<span>Name (required)</span>
			<input
				class="input text-sm"
				name="licenseName"
				placeholder="Apache 2.0"
				type="text"
				bind:value={$openApiStore.info.license.name}
			/>
		</label>
		<label class="text-sm space-y-1">
			<span>Identifer (optional)</span>
			<input
				class="input text-sm"
				name="licenseIdentifier"
				placeholder="Apache-2.0"
				type="text"
				bind:value={$openApiStore.info.license.identifier}
			/>
		</label>
		<label class="text-sm space-y-1">
			<span>URL (optional)</span>
			<input
				class="input text-sm"
				name="licenseUrl"
				placeholder="https://www.apache.org/licenses/LICENSE-2.0.html"
				type="url"
				bind:value={$openApiStore.info.license.url}
			/>
		</label>
	{:else}
		<button
			type="button"
			class="btn variant-filled-primary"
			on:click={() => {
				$openApiStore.info.license = {
					name: '',
					identifier: '',
					url: ''
				};
			}}
		>
			Add License
		</button>
	{/if}
</div>

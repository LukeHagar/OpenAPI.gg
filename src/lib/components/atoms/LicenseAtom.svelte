<script lang="ts">
	import { openApiStore } from '$lib';
	import spdxLicenseList from 'spdx-license-list';

	const popularLicenses = ['MIT', 'Apache-2.0', 'GPL-3.0', 'Unlicense'];
</script>

<div class="border-token rounded-container-token space-y-4 p-4">
	<div class="flex flex-row justify-between">
		<h4 class="h4">License</h4>
		<label class="text-sm flex flex-col space-y-2">
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
	</div>

	<label class="text-xl space-y-2">
		<span>Name (required)</span>
		<input
			class="input"
			name="licenseName"
			placeholder="Apache 2.0"
			type="text"
			bind:value={$openApiStore.info.license.name}
		/>
	</label>
	<label class="text-xl space-y-2">
		<span>Identifer (optional)</span>
		<input
			class="input"
			name="licenseIdentifier"
			placeholder="Apache-2.0"
			type="text"
			bind:value={$openApiStore.info.license.identifier}
		/>
	</label>
	<label class="text-xl space-y-2">
		<span>URL (optional)</span>
		<input
			class="input"
			name="licenseUrl"
			placeholder="https://www.apache.org/licenses/LICENSE-2.0.html"
			type="url"
			bind:value={$openApiStore.info.license.url}
		/>
	</label>
</div>

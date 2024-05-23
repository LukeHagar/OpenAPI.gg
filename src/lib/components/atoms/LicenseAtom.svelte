<script lang="ts">
    import { openApiStore } from '$lib';
    import spdxLicenseList from 'spdx-license-list';
</script>

<div class="border-token rounded-container-token space-y-4 p-4">
    <h4 class="h4">License</h4>
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
    <select class="select" on:change={(event)=>{
        $openApiStore.info.license.name = event.target.value;
        $openApiStore.info.license.url = spdxLicenseList[event.target.value].url;
    }}>
        {#each Object.keys(spdxLicenseList).sort() as license}
            <option value={license}>{spdxLicenseList[license].name}</option>
        {/each}
    </select>
</div>
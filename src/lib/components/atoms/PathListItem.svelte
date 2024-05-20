<script lang="ts">
	import { pathTemplate } from '$lib/pathTemplate';
	import { openApiStore, pathRegex, sortPathsAlphabetically } from '$lib';

	/** The actual pathname */
	export let pathName: string;
	/** The index of the pathname in the paths object */
	export let id: number;

	const removeRoute = () => {
		if (!confirm('Are you sure you want to delete this route?')) return;
		let tempPathObject = {
			...$openApiStore.paths
		};
		delete tempPathObject[pathName];
		$openApiStore.paths = tempPathObject;
	};

	const addSubRoute = () => {
		// prompt user to enter path
		const path = prompt(
			`Enter path. Wrap path parameters in curly braces.\nIs directly appended to "${pathName}".`
		);
		if (!path) return;
		let newPath = pathName + path;

		// check that path is valid
		if (!newPath.match(pathRegex)) {
			alert('Invalid path name');
			return;
		}

		// check if path already exists
		// @ts-expect-error - we are creating a new key
		if ($openApiStore.paths[newPath]) {
			alert('Path already exists');
			return;
		}
		// TODO: check if variables are duplicated
		// add path to paths object
		$openApiStore.paths = {
			...$openApiStore.paths,
			[newPath]: pathTemplate
		};

		// sort paths object
		sortPathsAlphabetically();
	};

	const renamePath = () => {
		const newName = prompt('Edit the path name', pathName);
		if (!newName) return;
		// check that path is valid
		if (!newName.match(pathRegex)) {
			alert('Invalid path name');
			return;
		}

		// check if path already exists
		// @ts-expect-error - we are creating a new key
		if ($openApiStore.paths[newName]) {
			alert('Path already exists');
			return;
		}

		// if pathName is empty, show error
		// @ts-expect-error - we are checking if the value is defined
		if (!$openApiStore.paths[pathName]) {
			alert('Previous value cannot be empty');
			return;
		}

		// create new object with new key and old value
		$openApiStore.paths = {
			...$openApiStore.paths,
			[newName]: $openApiStore.paths![pathName]
		};

		// delete old key
		delete $openApiStore.paths[pathName];
		$openApiStore.paths = {
			...$openApiStore.paths
		};

		// sort paths object
		sortPathsAlphabetically();
	};
</script>

<div class="flex justify-between">
	<h3 class="h3">{pathName}</h3>
	<div class="flex gap-4">
		<a href="/path-{id}" class="btn btn-sm variant-filled-primary">Edit</a>
		<button type="button" class="btn btn-sm variant-filled-warning" on:click={renamePath}
			>Rename</button
		>
		<button type="button" class="btn btn-sm variant-filled-secondary" on:click={addSubRoute}>
			Add Sub-Route
		</button>
		<button
			type="button"
			class="btn btn-sm variant-ringed-error hover:variant-filled-error"
			on:click={removeRoute}
		>
			Remove
		</button>
	</div>
</div>
<hr />

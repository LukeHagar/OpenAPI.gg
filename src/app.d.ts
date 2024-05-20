// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare namespace Oauth2 {
	interface Oauth2Flow {
		authorizationUrl: string;
		scopes: Record<string, string>;
		refreshUrl?: string;
	}

	interface Oauth2FlowTemplates {
		implicit: Oauth2Flow;
		password: Oauth2Flow;
		clientCredentials: Oauth2Flow;
		authorizationCode: Oauth2Flow & { tokenUrl: string };
	}
}

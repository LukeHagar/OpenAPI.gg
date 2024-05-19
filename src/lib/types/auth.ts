// Basic Auth
export interface BasicAuth extends Auth {
	type: 'http';
	scheme: 'basic';
}

// Bearer Token
export interface BearerAuth extends Auth {
	type: 'http';
	scheme: 'bearer';
	bearerFormat?: string; // arbitrary value for documentation purposes
}

// API Key
export interface ApiKeyAuth extends Auth {
	type: 'apiKey';
	in: 'header' | 'query' | 'cookie';
	name: string;
}

// OAuth2
export interface OAuth2Auth extends Auth {
	type: 'oauth2';
	description: string;
	flows: Flows[];
}

type Scope = [
	{
		scope: string;
		description?: string;
	}
];

export type Flows =
	| OAuth2AuchorizationCodeFlow
	| OAuth2ImplicitFlow
	| OAuth2PasswordFlow
	| OAuth2ClientCredentialsFlow;

interface OAuth2AuchorizationCodeFlow {
	name: 'authorizationCode';
	authorizationUrl: string;
	tokenUrl: string;
	scopes: Scope[];
}

interface OAuth2ImplicitFlow {
	name: 'implicit';
	authorizationUrl: string;
	scopes: Scope[];
}

interface OAuth2PasswordFlow {
	name: 'password';
	tokenUrl: string;
	scopes: Scope[];
}

interface OAuth2ClientCredentialsFlow {
	name: 'clientCredentials';
	tokenUrl: string;
	scopes: Scope[];
}

// OpenID Connect
export interface OpenIdConnectAuth extends Auth {
	type: 'openIdConnect';
	openIdConnectUrl: string;
}

// Cookie Auth
export interface CookieAuth extends Auth {
	type: 'apiKey';
	in: 'cookie';
	name: string;
}

interface Auth {
	identifier: string; // a unique name for the auth-configuration
}

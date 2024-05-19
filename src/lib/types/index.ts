import type {
	ApiKeyAuth,
	BasicAuth,
	BearerAuth,
	CookieAuth,
	OAuth2Auth,
	OpenIdConnectAuth
} from './auth';

export interface OpenAPI extends Info {
	servers: Server[];
	securitySchemas: SecuritySchema[];
}

export interface Info {
	title: string;
	version: string;
	description?: string;
}

export interface Server {
	url: string;
	description?: string;
}

export type SecuritySchema =
	| BasicAuth
	| BearerAuth
	| ApiKeyAuth
	| OAuth2Auth
	| OpenIdConnectAuth
	| CookieAuth;

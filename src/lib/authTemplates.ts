import type {
	ApiKeyAuth,
	BasicAuth,
	BearerAuth,
	CookieAuth,
	OAuth2Auth,
	OpenIdConnectAuth
} from './types/auth';

export const basicAuthTemplate: BasicAuth = {
	identifier: '',
	type: 'http',
	scheme: 'basic'
};

export const bearerAuthTemplate: BearerAuth = {
	identifier: '',
	type: 'http',
	scheme: 'bearer',
	bearerFormat: ''
};

export const apiKeyAuthTemplate: ApiKeyAuth = {
	identifier: '',
	type: 'apiKey',
	in: 'header',
	name: ''
};

export const openIdAuthTemplate: OpenIdConnectAuth = {
	identifier: '',
	type: 'openIdConnect',
	openIdConnectUrl: ''
};

export const oauth2AuthTemplate: OAuth2Auth = {
	identifier: '',
	type: 'oauth2',
	description: '',
	flows: []
};

export const cookieAuthTemplate: CookieAuth = {
	identifier: '',
	type: 'apiKey',
	in: 'cookie',
	name: ''
};

export const oauth2FlowTemplates = {
	authorizationCode: {
		name: 'authorizationCode',
		authorizationUrl: '',
		tokenUrl: '',
		scopes: []
	},
	implicit: {
		name: 'implicit',
		authorizationUrl: '',
		scopes: []
	},
	password: {
		name: 'password',
		tokenUrl: '',
		scopes: []
	},
	clientCredentials: {
		name: 'clientCredentials',
		tokenUrl: ''
	}
};

export interface OpenAPI extends Info {
	servers: Server[];
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

/** This file set's up dexie as an interface to the local indexedDB */

import Dexie, { type EntityTable } from 'dexie';
import type { OpenAPIV3_1 } from 'openapi-types';

export const db = new Dexie("openAPI") as Dexie & {
    document: EntityTable<OpenAPIV3_1.Document>;
}

db.version(1).stores({
    document: ''
});

import type { OpenAPIV3_1 } from "$lib/openAPITypes";
import Dexie, { type Table } from 'dexie';
import { persisted } from "svelte-persisted-store";

export const selectedSpec = persisted<APISpec | undefined>(`selectedSpec`, undefined)

export interface APISpec {
    id?: string;
    name: string;
    spec: OpenAPIV3_1.Document;
}

export class MySubClassedDexie extends Dexie {
    apiSpecs!: Table<APISpec>;

    constructor() {
        super('oasDesigner');
        this.version(1).stores({
            apiSpecs: '++id, name, spec', // Primary key and indexed props
        });
    }
}

export const db = new MySubClassedDexie();
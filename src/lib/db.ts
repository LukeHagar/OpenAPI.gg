import { openApiStore } from "$lib";
import type { OpenAPIV3_1 } from "$lib/openAPITypes";
import Dexie, { type Table } from 'dexie';
import { writable, type Writable } from "svelte/store";

export const selectedSpec: Writable<APISpec | undefined> = writable(undefined)

export const setSpec = (spec: APISpec) => {
    selectedSpec.set(spec);
    openApiStore.set(spec.spec);
}

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
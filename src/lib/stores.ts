import type { OpenAPIV3_1 } from "openapi-types";
import { get, writable, type Writable } from "svelte/store";
import { emptyDocument, updateDocument } from "./db/document";

const store: Writable<OpenAPIV3_1.Document> = writable(emptyDocument);

/// A store that also persists to the indexedDB
export const openApiStore: Writable<OpenAPIV3_1.Document> = {
    ...store,
    // Extend the store with database persistence
    set: (value: OpenAPIV3_1.Document) => {
        // Save the value to the database
        updateDocument(value);
        store.set(value);
    },
    update: (updater: (value: OpenAPIV3_1.Document) => OpenAPIV3_1.Document) => {
        store.update(updater);
        // Update the value in the database
        updateDocument(get(store));
    }
};
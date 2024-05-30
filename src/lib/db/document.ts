import type { OpenAPIV3_1 } from "openapi-types";
import { db } from ".";

export const emptyDocument: OpenAPIV3_1.Document = {
    openapi: '3.1.0', // OpenAPI version
    jsonSchemaDialect: 'https://json-schema.org/draft/2020-12/schema',
    info: {
        /** Title of the API (required) */
        title: '',
        /** Description of the API (optional) */
        description: '',
        /** Terms of service link (optional) */
        termsOfService: '',
        /** API Version (required) */
        version: '',
        /** Contact Information */
        contact: {
            /** Name of the contact person/organization. */
            name: '', // optional
            /** URL pointing to the contact information. MUST be in the format of a URL. */
            url: '', // optional
            /** Email address of the contact person/organization. MUST be in the format of an email address. */
            email: '' // optional
        },
        license: {
            name: '', // required if license is included
            url: '' // optional
        }
    },
    servers: [],
    paths: {},
    webhooks: {},
    components: {},
    security: [],
    tags: [],
    externalDocs: {
        description: '',
        url: ''
    }
};

/// Get the document from the database
export const getDocument = async () => {
    const document = await db.document.toArray();
    // if no document exists, return an empty object
    return document[0] || emptyDocument;
};

/// Update the document in the database
export const updateDocument = async (document: OpenAPIV3_1.Document) => {
    // delete the existing document
    await db.document.clear();
    // add the new document to the database
    await db.document.add(document);
};

/// Delete the document from the database
export const deleteDocument = async () => {
    // delete the existing document
    await db.document.clear();
    // add an empty document to the database
    await db.document.add(emptyDocument);
};

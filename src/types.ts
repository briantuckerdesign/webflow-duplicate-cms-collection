export interface WebflowSite {
  id: string;
  displayName: string;
  name: string;
  customDomains: Array<CustomDomain>;
}

export interface CustomDomain {
  id: string;
  url: string;
}

export interface WebflowCollection {
  id: string;
  displayName: string;
  singularName: string;
  slug: string;
  createdOn: string;
  lastUpdated: string;
}

export interface WebflowCollectionDetails {
  id: string;
  displayName: string;
  singularName: string;
  fields: Array<WebflowField>;
  slug: string;
  createdOn: string;
  lastUpdated: string;
}

export interface WebflowField {
  id: string;
  isEditable: boolean;
  isRequired: boolean;
  type: string;
  slug: string;
  displayName: string;
  helpText?: string | null;
  validations?: {
    collectionId: string;
  };
}

export function isWebflowSite(obj: any): obj is WebflowSite {
  return obj && obj.id && typeof obj.id === "string";
}

export function isWebflowCollection(obj: any): obj is WebflowCollection {
  return obj && obj.id && typeof obj.id === "string";
}

export interface Config {
  source: {
    apiKey: string;
    siteId: string;
    collections: Array<WebflowCollection>;
    collectionDetails: undefined | WebflowCollectionDetails;
  };
  destination: {
    apiKey: string;
    siteId: string;
    collections: Array<WebflowCollection>;
    collectionDetails: undefined | WebflowCollectionDetails;
  };
}

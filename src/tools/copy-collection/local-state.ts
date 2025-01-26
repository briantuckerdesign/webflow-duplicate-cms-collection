import { WebflowClient } from "webflow-api";
import type { Collection, CollectionItemList, Site } from "webflow-api/api";

export const localState: LocalState = {
  source: {
    webflow: undefined,
    site: undefined,
    collection: undefined,
    items: undefined,
    keyName: undefined,
    name: undefined,
  },
  destination: {
    webflow: undefined,
    site: undefined,
    collection: undefined,
    items: undefined,
    keyName: undefined,
    name: undefined,
    slug: undefined,
  },
  duplicateItems: false,
};

interface LocalState {
  source: {
    webflow: WebflowClient;
    site: Site;
    collection: Collection;
    items: CollectionItemList;
    keyName: string;
    name: string;
  };
  destination: {
    webflow: WebflowClient;
    site: Site;
    collection: Collection;
    items: CollectionItemList;
    keyName: string;
    name: string;
    slug: string;
  };
  duplicateItems: boolean;
}

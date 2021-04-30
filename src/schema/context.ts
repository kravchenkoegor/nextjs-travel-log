import { Collection } from 'mongodb';

export interface Context {
  userId: string | null;
  collection: Collection;
}

export interface AuthorizedContext extends Context {
  userId: string;
}

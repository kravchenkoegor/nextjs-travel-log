import 'reflect-metadata';
import { NextApiRequest } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { schema } from 'src/schema';
import { Context } from 'src/schema/context';
import { loadIdToken } from 'src/auth/firebaseAdmin';
import { Collection, MongoClient } from 'mongodb';

let client: MongoClient;
let collection: Collection;

async function getCollection(): Promise<Collection | undefined> {
  try {
    if (!client) {
      client = new MongoClient(process.env.MONGODB_URL ?? '', {
        useUnifiedTopology: true
      });
      await client.connect();
      console.log('Connected to MongoDB');
      const db = await client.db('travel-log');
      collection = db.collection('places');
      return collection;
    }

    return collection as Collection;
  } catch (error) {
    console.log('MongoDB connection error', error);
  }
}

const server = new ApolloServer({
  schema,
  context: async ({ req }: { req: NextApiRequest }): Promise<Context> => {
    const userId = await loadIdToken(req);
    if (!collection) {
      collection = (await getCollection()) as Collection;
    }

    return {
      userId,
      collection
    };
  },
  tracing: false // process.env.NODE_ENV === 'development'
});

const handler = server.createHandler({
  path: '/api/graphql'
});

// Disable Next.js body parser
export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;

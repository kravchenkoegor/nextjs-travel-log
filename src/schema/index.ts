import { buildSchemaSync } from 'type-graphql';
import { Context } from './context';
import { ImageResolver } from './image';
import { PlacesResolver } from './places';
// import { HouseResolver } from './house';

// const authChecker: AuthChecker<Context> = ({ context }) => {
//   return Boolean(context.userId);
// };

export const schema = buildSchemaSync({
  resolvers: [ImageResolver, PlacesResolver],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker({ context }: { context: Context }) {
    return Boolean(context.userId);
  }
});

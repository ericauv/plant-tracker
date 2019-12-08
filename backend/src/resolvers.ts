import { users } from './data/users';
import { plants } from './data/plants';
import { species } from './data/species';

type ResolverFn = (parent: any, args: any, ctx: any, info: any) => any;
interface ResolverMap {
  [field: string]: ResolverFn;
}

interface Resolvers {
  Query: ResolverMap;
}

const Resolvers = {
  Query: {
    user: (parent: any, args: { id: string }, ctx: any, info: any) => {
      return users.find(user => user.id === args.id);
    },
    users: (parent: any, args: any, ctx: any, info: any) => {
      return users;
    },
    species: (parent: any, args: { id: number }, ctx: any, info: any) => {
      return species;
    },
    plants: (parent: any, args: { id: number }, ctx: any, info: any) => {
      return plants;
    },
  },
  Mutation: {
    addPlant: (
      parent: any,
      args: { name: string; species: string; description: string },
      ctx: any,
      info: any
    ) => {
      return `added plant: ${args.name}`;
    },
  },
};

export default Resolvers;

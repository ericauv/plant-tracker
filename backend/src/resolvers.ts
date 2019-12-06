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
      // console.log(users);
      // const found = [
      //   users.find(user => {
      //     console.log(user);
      //     console.log(user.id);
      //     console.log(args.id);
      //     console.log(user.id === args.id);

      //     return user.id === args.id;
      //   }),
      // ];
      // console.log(found);
      // return found;
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
};

export default Resolvers;

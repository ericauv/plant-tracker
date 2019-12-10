import { addDays } from 'date-fns';
import { users } from './data/users';
import { plants, Plant } from './data/plants';
import { species } from './data/species';

let newPlants = [...plants];
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
      console.log('plants');
      const returnPlants = newPlants.map(plant => {
        plant.species = {
          ...species.find(species => species.id === plant.speciesId)
        };
        return plant;
      });
      console.log(returnPlants);

      return returnPlants;
    }
  },
  Mutation: {
    addPlant: (
      parent: any,
      args: { name: string; species: string; description: string },
      ctx: any,
      info: any
    ) => {
      console.log(`added plant: ${args.name}`);
      const newPlant: Plant = {
        id: `${Math.random()}-${args.name}`,
        name: args.name,
        speciesId: '2',
        photo: '',
        wateringInterval: Math.round(Math.random() * 7),
        lastWatered: new Date(2019, 11, 1),
        nextWatering: new Date(2019, 11, 10),
        description: 'Fiddle leaf fig!'
      };
      newPlants.push(newPlant);
      return newPlant;
    },
    waterPlant: (parent: any, args: { id: string }, ctx: any, info: any) => {
      const plantToWater: Plant | undefined = newPlants.find(
        (plant: Plant) => plant.id === args.id
      );
      if (plantToWater) {
        plantToWater.lastWatered = new Date();
        plantToWater.nextWatering = addDays(
          Date.now(),
          plantToWater.wateringInterval
        );
        console.log(`watered Plant: ${args.id}, aka: ${plantToWater.name}`);
        return plantToWater;
      } else {
        throw Error(`Plant with id: ${args.id} not found.`);
      }
    }
  }
};

export default Resolvers;

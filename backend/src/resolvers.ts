import { addDays, differenceInCalendarDays } from 'date-fns';
import { users } from './data/users';
import { plants, Plant } from './data/plants';
import { species, Species } from './data/species';

const populatePlantsWithSpecies = (plantsArray: Plant[]) =>
  [...plantsArray].map(plant => {
    plant.species = {
      ...species.find(species => species.id === plant.speciesId)
    };
    return plant;
  });
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
      return populatePlantsWithSpecies(plants);
    },
    plantsByCategory: (parent: any, args: any, ctx: any, info: any) => {
      const daysToNextWatering = (nextWatering: Date): number =>
        differenceInCalendarDays(nextWatering, Date.now());

      const overdue: Plant[] = populatePlantsWithSpecies(plants).filter(
        (plant: Plant) =>
          daysToNextWatering(plant.wateringInfo.nextWatering) < 0
      );
      const today: Plant[] = populatePlantsWithSpecies(plants).filter(
        (plant: Plant) =>
          daysToNextWatering(plant.wateringInfo.nextWatering) === 0
      );
      const future: Plant[] = populatePlantsWithSpecies(plants).filter(
        (plant: Plant) =>
          daysToNextWatering(plant.wateringInfo.nextWatering) > 0
      );
      const plantsCategorized = { nextWatering: { overdue, today, future } };

      return plantsCategorized;
    }
  },
  Mutation: {
    addPlant: (
      parent: any,
      args: { name: string; speciesName?: string; description?: string },
      ctx: any,
      info: any
    ) => {
      console.log(`added plant: ${args.name}`);
      const newPlant: Plant = {
        id: `${Math.random()}-${args.name}`,
        name: args.name,
        speciesId: '2', //  TODO:  create a Species object here
        image: {
          id: '',
          url: ''
        },
        wateringInfo: {
          wateringInterval: Math.round(Math.random() * 7),
          lastWatered: new Date(2019, 11, 1),
          nextWatering: new Date(2019, 11, 10)
        },
        description: 'Fiddle leaf fig!'
      };
      plants.push(newPlant);
      return newPlant;
    },
    waterPlant: (parent: any, args: { id: string }, ctx: any, info: any) => {
      const plantToWater: Plant | undefined = populatePlantsWithSpecies(
        plants
      ).find((plant: Plant) => plant.id === args.id);
      if (plantToWater) {
        plantToWater.wateringInfo.lastWatered = new Date();
        plantToWater.wateringInfo.nextWatering = addDays(
          Date.now(),
          plantToWater.wateringInfo.wateringInterval
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

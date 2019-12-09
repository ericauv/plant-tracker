import { Species } from './species';

export interface Plant {
  id: string;
  name: string;
  species?: Species | {};
  speciesId: string;
  photo: string;
  wateringInterval: number;
  lastWatered: Date;
  nextWatering: Date;
  description: string;
}

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Molly',
    speciesId: '1',
    photo: '',
    wateringInterval: 7,
    lastWatered: new Date(2019, 11, 1),
    nextWatering: new Date(2019, 11, 13),
    description: '15 years old monstera plant!',
  },
  {
    id: '2',
    name: 'Frank',
    speciesId: '2',
    photo: '',
    wateringInterval: 10,
    lastWatered: new Date(2019, 11, 1),
    nextWatering: new Date(2019, 11, 10),
    description: 'Fiddle leaf fig!',
  },
];

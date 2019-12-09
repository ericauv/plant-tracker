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
    photo:
      'https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
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

import { Species } from './species';

export interface Plant {
  id: string;
  name: string;
  species?: Species | {};
  speciesId: string;
  image: Image;
  wateringInfo: WateringInfo;
  description: String;
}

interface WateringInfo {
  wateringInterval: number;
  lastWatered: Date;
  nextWatering: Date;
}

interface Image {
  id: string;
  url: string;
}

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Molly',
    speciesId: '1',
    image: {
      id: '1',
      url:
        'https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    },
    wateringInfo: {
      wateringInterval: 7,
      lastWatered: new Date(2019, 11, 1),
      nextWatering: new Date(2019, 11, 13),
    },
    description: '15 years old monstera plant!',
  },
  {
    id: '2',
    name: 'Frank',
    speciesId: '2',
    image: {
      id: '2',
      url: '',
    },
    wateringInfo: {
      wateringInterval: 10,
      lastWatered: new Date(2019, 11, 1),
      nextWatering: new Date(2019, 11, 10),
    },
    description: 'Fiddle leaf fig!',
  },
];

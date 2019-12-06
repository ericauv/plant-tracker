enum waterAmount {
  'low',
  'medium',
  'high',
}

enum lightAmount {
  'low',
  'medium',
  'bright',
}

export interface Species {
  id: string;
  species: string;
  soilType: string;
  waterAmount: waterAmount;
  lightAmount: lightAmount;
  temperature: [number, number];
  description: string;
}

export const species: Species[] = [
  {
    id: '1',
    species: 'Monstera Delicioso',
    soilType: 'coarse',
    waterAmount: waterAmount.medium,
    lightAmount: lightAmount.medium,
    temperature: [18, 30],
    description: '',
  },
  {
    id: '2',
    species: 'Ficus lyrata',
    soilType: 'regular',
    waterAmount: waterAmount.medium,
    lightAmount: lightAmount.medium,
    temperature: [18, 30],
    description: '',
  },
];

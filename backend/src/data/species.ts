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
  name: string;
  soilType: string;
  waterAmount: waterAmount;
  lightAmount: lightAmount;
  temperature: [number, number];
  description: string;
}

export const species: Species[] = [
  {
    id: '1',
    name: 'Monstera Delicioso',
    soilType: 'coarse',
    waterAmount: waterAmount.medium,
    lightAmount: lightAmount.medium,
    temperature: [18, 30],
    description:
      'commonly called split-leaf philodendron, it is native to Central America. It is a climbing, evergreen perennial vine that is perhaps most noted for its large perforated leaves on thick plant stems and its long cord-like aerial roots.',
  },
  {
    id: '2',
    name: 'Ficus lyrata',
    soilType: 'regular',
    waterAmount: waterAmount.medium,
    lightAmount: lightAmount.medium,
    temperature: [18, 30],
    description:
      'commonly known as the fiddle-leaf fig, it is a species of flowering plant in the mulberry and fig family Moraceae. It is native to western Africa, from Cameroon west to Sierra Leone, where it grows in lowland tropical rainforest. It can grow up to 12–15 m (39–49 ft) tall',
  },
];

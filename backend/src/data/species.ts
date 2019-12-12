enum WaterAmount {
  'low',
  'medium',
  'high',
}

enum LightAmount {
  'low',
  'medium',
  'bright',
}

interface SpeciesPreferredConditions {
  soilType: string;
  waterAmount: WaterAmount;
  lightAmount: LightAmount;
  temperature: number[];
}

export interface Species {
  id: string;
  name: string;
  preferredConditions: SpeciesPreferredConditions;
  description: string;
}

export const species: Species[] = [
  {
    id: '1',
    name: 'Monstera Delicioso',
    preferredConditions: {
      soilType: 'coarse',
      waterAmount: WaterAmount.medium,
      lightAmount: LightAmount.medium,
      temperature: [18, 30],
    },
    description:
      'commonly called split-leaf philodendron, it is native to Central America. It is a climbing, evergreen perennial vine that is perhaps most noted for its large perforated leaves on thick plant stems and its long cord-like aerial roots.',
  },
  {
    id: '2',
    name: 'Ficus lyrata',
    preferredConditions: {
      soilType: 'regular',
      waterAmount: WaterAmount.medium,
      lightAmount: LightAmount.medium,
      temperature: [18, 30],
    },
    description:
      'commonly known as the fiddle-leaf fig, it is a species of flowering plant in the mulberry and fig family Moraceae. It is native to western Africa, from Cameroon west to Sierra Leone, where it grows in lowland tropical rainforest. It can grow up to 12–15 m (39–49 ft) tall',
  },
];

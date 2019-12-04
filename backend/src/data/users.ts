export interface User {
  id: number;
  name: string;
  plantIds: number[];
  climate: string;
}

export const users: User[] = [
  {
    id: 1,
    name: 'Shini',
    plantIds: [1, 2],
    climate: 'canadian winter',
  },
];

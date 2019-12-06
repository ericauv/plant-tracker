import { gql } from 'apollo-server';

const schema = gql`
  type User {
    id: ID!
    name: String
    plants: [Plant]
    climate: String
  }

  type Plant {
    id: ID!
    name: String
    species: Species
    photo: String
    wateringInterval: Int
    lastWatered: String
    nextWatering: String
    description: String
  }

  type Species {
    id: ID!
    species: String
    soilType: String
    waterAmount: String
    lightAmount: String
    temperature: [Int]
    description: String
  }

  type Query {
    user(id: ID): User
    users: [User]
    plants(userId: ID): [Plant]
    species(speciesName: String): [Species]
  }
`;

export default schema;

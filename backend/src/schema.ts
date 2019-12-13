import { gql } from 'apollo-server';

const schema = gql`
  type User {
    id: ID!
    name: String
    plants: [Plant]
    climate: Climate
  }

  type Plant {
    id: ID!
    name: String
    species: Species
    image: Image
    wateringInfo: WateringInfo
    description: String
  }

  type Species {
    id: ID!
    name: String
    preferredConditions: SpeciesPreferredConditions
    description: String
  }

  type WateringInfo {
    wateringInterval: Int # TODO: calculate watering interval based on the climate
    lastWatered: String
    nextWatering: String
  }

  type SpeciesPreferredConditions {
    soilType: String
    waterAmount: WaterAmount
    lightAmount: LightAmount
    temperature: [Int]
  }

  type Climate {
    id: ID!
    # TODO: determine how to best define it
  }

  type Image {
    id: ID!
    url: String
  }

  enum WaterAmount {
    LOW
    MEDIUM
    HIGH
  }

  enum LightAmount {
    LOW
    MEDIUM
    HIGH
  }

  type PlantsCategorized {
    nextWatering: PlantsCategorizedByNextWatering
  }

  type PlantsCategorizedByNextWatering {
    overdue: [Plant]
    today: [Plant]
    future: [Plant]
  }

  type Query {
    user(id: ID): User
    users: [User]
    plants(userId: ID): [Plant]
    plantsByCategory: PlantsCategorized
    species(speciesName: String): [Species]
  }

  type Mutation {
    addPlant(name: String!, speciesName: String, description: String): Plant
    waterPlant(id: ID!): Plant
  }
`;

export default schema;

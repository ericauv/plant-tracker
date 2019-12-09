import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PlantCard from './PlantCard';

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

enum waterAmount {
  'low',
  'medium',
  'high'
}

enum lightAmount {
  'low',
  'medium',
  'bright'
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

const PLANTS_QUERY = gql`
  query PLANTS_QUERY {
    plants {
      id
      name
      species {
        name
      }
      description
      lastWatered
      nextWatering
      photo
    }
  }
`;

const WATER_PLANT_MUTATION = gql`
  mutation WATER_PLANT_MUTATION($id: ID!) {
    waterPlant(id: $id) {
      id
      lastWatered
      nextWatering
    }
  }
`;

const PlantList = () => {
  const { loading, error, data } = useQuery(PLANTS_QUERY);
  const [plants, setPlants] = useState();
  const [waterPlantMutation] = useMutation(WATER_PLANT_MUTATION);

  const waterPlant = async (plantId: string) => {
    console.log(plantId);

    const wateredPlant = await waterPlantMutation({
      variables: { id: plantId }
    });

    // todo: handle error, loading
    if (wateredPlant) {
      updateAfterWatering(wateredPlant);
    }
  };
  // Update the plants list after one is watered
  const updateAfterWatering = wateredPlant => {
    const updatedPlants = [...plants];
    const wateredPlantIndex = updatedPlants.findIndex(
      (plant: Plant) => plant.id === wateredPlant.id
    );
    if (wateredPlantIndex >= 0) {
      updatedPlants[wateredPlantIndex].lastWatered = wateredPlant.lastWatered;
      updatedPlants[wateredPlantIndex].nextWatering = wateredPlant.nextWatering;

      setPlants(updatedPlants.sort((a, b) => a.nextWatering > b.nextWatering));
    }
  };

  // todo: call query on navigation
  useEffect(() => {
    const onCompleted = data => {
      setPlants(data.plants.sort((a, b) => a.nextWatering > b.nextWatering));
    };
    const onError = error => {};
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, data, error]);
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error.message}</Text>
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <Text style={{ fontSize: 32 }}>Plant List</Text>
          )}
          ListFooterComponent={() => <Text style={{ fontSize: 32 }}>End</Text>}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          data={plants}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
          renderItem={({ item }) => (
            <PlantCard
              id={item.id}
              name={item.name}
              species={item.species.name}
              nextWatering={item.nextWatering}
              photo={item.photo}
              waterPlant={waterPlant}
            ></PlantCard>
          )}
        ></FlatList>
      )}
    </View>
  );
};

export default PlantList;

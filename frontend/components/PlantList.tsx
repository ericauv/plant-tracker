import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import gql from 'graphql-tag';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { withNavigation } from 'react-navigation';
import PlantCard from './PlantCard';

export interface Plant {
  id: string;
  name: string;
  species?: Species | {};
  speciesId: string;
  photo: string | null;
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
const sortPlants = (plants: Plant[]) => {
  return plants.sort((a, b) => a.nextWatering > b.nextWatering);
};

const PlantList = props => {
  const [getPlants, { loading, error, data }] = useLazyQuery(PLANTS_QUERY, {
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      setRefreshing(false);
      setPlants(sortPlants(data.plants));
    }
  });
  const [plants, setPlants] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // fire query on mount
    getPlants();
    const { navigation } = props;
    // add listener on mount
    const focusListener = navigation.addListener('didFocus', () => {
      getPlants();
    });
    // remove listener on unmount
    return () => focusListener.remove();
  }, []);

  // WATERING
  const [waterPlantMutation] = useMutation(WATER_PLANT_MUTATION);

  const waterPlant = async (plantId: string) => {
    const wateredPlant = await waterPlantMutation({
      variables: { id: plantId }
    });

    // todo: handle error, loading
    if (wateredPlant) {
      updateAfterWatering(wateredPlant.data.waterPlant);
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

      setPlants(sortPlants(updatedPlants));
    }
  };

  // SWIPE TO REFRESH
  const refreshList = () => {
    getPlants();
    if (loading) {
      setRefreshing(true);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={() => <Text style={{ fontSize: 32 }}>Plants</Text>}
        ListFooterComponent={() => <Text style={{ fontSize: 32 }}>End</Text>}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        data={plants}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
        onRefresh={() => refreshList()}
        refreshing={refreshing}
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
    </View>
  );
};

export default withNavigation(PlantList);

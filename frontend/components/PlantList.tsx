import React from 'react';
import { View, FlatList, Text } from 'react-native';
import PlantCard from './PlantCard';
const DATA = [
  {
    name: 'Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 5)
  },
  {
    name: 'Victoria',
    species: 'Lemon Basil',
    nextWatering: new Date(2019, 11, 6)
  },
  {
    name: 'Rubber',
    species: 'Rubber Tree',
    nextWatering: new Date(2019, 11, 4)
  },
  {
    name: 'Big Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 3)
  },
  {
    name: 'Money',
    species: 'Money Tree',
    nextWatering: new Date(2019, 11, 2)
  },
  {
    name: 'Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 5)
  },
  {
    name: 'Rubber',
    species: 'Rubber Tree',
    nextWatering: new Date(2019, 11, 4)
  },
  {
    name: 'Big Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 3)
  },
  {
    name: 'Big Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 3)
  },
  {
    name: 'Money',
    species: 'Money Tree',
    nextWatering: new Date(2019, 11, 2)
  },
  {
    name: 'Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 5)
  },
  {
    name: 'Victoria',
    species: 'Lemon Basil',
    nextWatering: new Date(2019, 11, 6)
  },
  {
    name: 'Rubber',
    species: 'Rubber Tree',
    nextWatering: new Date(2019, 11, 4)
  },
  {
    name: 'Big Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 3)
  },
  {
    name: 'Cash',
    species: 'Money Tree',
    nextWatering: new Date(2019, 11, 2)
  }
];

const PlantList = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 32 }}>Plant List</Text>
        )}
        ListFooterComponent={() => <Text style={{ fontSize: 32 }}>End</Text>}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        data={DATA.sort((a, b) => a.nextWatering > b.nextWatering)}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
        renderItem={({ item }) => (
          <PlantCard
            name={item.name}
            species={item.species}
            nextWatering={item.nextWatering.getTime()}
          ></PlantCard>
        )}
      ></FlatList>
    </View>
  );
};

export default PlantList;

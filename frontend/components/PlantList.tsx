import React, { useState } from 'react';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
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
  }
];

const PlantList = () => {
  const [species, setspecies] = useState('species');
  return (
    <FlatList
      keyExtractor={(item, index) => `${item.name}-${item.index}`}
      data={DATA}
      renderItem={({ item, index, separators }) => (
        <PlantCard
          key={index}
          name={item.name}
          species={item.species}
          nextWatering={item.nextWatering}
        ></PlantCard>
      )}
    ></FlatList>
  );
};

export default PlantList;

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PlantCard from './PlantCard';

const DATA = [
  {
    name: 'Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 5),
    photo:
      'https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  },
  {
    name: 'Victoria',
    species: 'Lemon Basil',
    nextWatering: new Date(2019, 11, 6),
    photo: '',
  },
  {
    name: 'Rubber',
    species: 'Rubber Tree',
    nextWatering: new Date(2019, 11, 4),
    photo: '',
  },
  {
    name: 'Big Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 3),
    photo:
      'https://bloomscape.com/wp-content/uploads/2019/04/bloomscape_peopleplants_monstera.jpg',
  },
  {
    name: 'Money',
    species: 'Money Tree',
    nextWatering: new Date(2019, 11, 2),
    photo: '',
  },
  {
    name: 'Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 5),
    photo: '',
  },
  {
    name: 'Rubber',
    species: 'Rubber Tree',
    nextWatering: new Date(2019, 11, 4),
    photo: '',
  },
  {
    name: 'Big Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 3),
    photo: '',
  },
  {
    name: 'Big Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 3),
    photo: '',
  },
  {
    name: 'Money',
    species: 'Money Tree',
    nextWatering: new Date(2019, 11, 2),
    photo: '',
  },
  {
    name: 'Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 5),
    photo: '',
  },
  {
    name: 'Victoria',
    species: 'Lemon Basil',
    nextWatering: new Date(2019, 11, 6),
    photo: '',
  },
  {
    name: 'Rubber',
    species: 'Rubber Tree',
    nextWatering: new Date(2019, 11, 4),
    photo: '',
  },
  {
    name: 'Big Monty',
    species: 'Monstera',
    nextWatering: new Date(2019, 11, 3),
    photo: '',
  },
  {
    name: 'Cash',
    species: 'Money Tree',
    nextWatering: new Date(2019, 11, 2),
    photo: '',
  },
];

const PLANTS_QUERY = gql`
  query PLANTS_QUERY {
    plants {
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

const PlantList = () => {
  const { loading, error, data } = useQuery(PLANTS_QUERY);
  const [plants, setPlants] = useState();
  useEffect(() => {
    const onCompleted = data => {
      console.log(data.plants[0]);

      setPlants(data.plants.sort((a, b) => a.nextWatering > b.nextWatering));
    };
    const onError = error => {
      console.log(error.message);
    };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, data, error]);
  console.log(plants);
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
              name={item.name}
              species={item.species.name}
              nextWatering={item.nextWatering}
              photo={item.photo}
            ></PlantCard>
          )}
        ></FlatList>
      )}
    </View>
  );
};

export default PlantList;

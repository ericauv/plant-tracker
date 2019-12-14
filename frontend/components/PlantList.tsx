import React, { useEffect, useState } from 'react';
import { View, SectionList, Text } from 'react-native';
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
const PLANTS_BY_CATEGORY_QUERY = gql`
  query PLANTS_BY_CATEGORY_QUERY {
    plantsByCategory {
      nextWatering {
        overdue {
          id
          name
          image {
            url
          }
          species {
            name
          }
          description
          wateringInfo {
            lastWatered
            nextWatering
          }
        }
        today {
          id
          name
          image {
            url
          }
          species {
            name
          }
          description
          wateringInfo {
            lastWatered
            nextWatering
          }
        }
        future {
          id
          name
          image {
            url
          }
          species {
            name
          }
          description
          wateringInfo {
            lastWatered
            nextWatering
          }
        }
      }
    }
  }
`;

const WATER_PLANT_MUTATION = gql`
  mutation WATER_PLANT_MUTATION($id: ID!) {
    waterPlant(id: $id) {
      id
      wateringInfo {
        lastWatered
        nextWatering
      }
    }
  }
`;
const plantsSortedByNextWatering = (plants: Plant[]) => {
  return plants.sort(
    (a: Plant, b: Plant) =>
      a.wateringInfo.nextWatering > b.wateringInfo.nextWatering
  );
};

const PlantList = props => {
  const [plants, setPlants] = useState([
    { section: 'Overdue', data: [] },
    { section: 'Today', data: [] },
    { section: 'Soon', data: [] }
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [getPlants, { loading, error, data }] = useLazyQuery(
    PLANTS_BY_CATEGORY_QUERY,
    {
      fetchPolicy: 'cache-and-network',
      onCompleted: () => {
        setRefreshing(false);

        setPlants([
          {
            title: 'Overdue',
            data: plantsSortedByNextWatering(
              data.plantsByCategory.nextWatering.overdue
            )
          },
          {
            title: 'Today',
            data: plantsSortedByNextWatering(
              data.plantsByCategory.nextWatering.today
            )
          },
          {
            title: 'Future',
            data: plantsSortedByNextWatering(
              data.plantsByCategory.nextWatering.future
            )
          }
        ]);
      }
    }
  );

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
      // update plants after watering
      getPlants();
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
      <SectionList
        sections={plants}
        ListHeaderComponent={() => <Text style={{ fontSize: 32 }}>Plants</Text>}
        keyExtractor={(_, index) => `plant list-${index}`}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        ItemSeparatorComponent={() => <View style={{ height: 30 }}></View>}
        onRefresh={() => refreshList()}
        refreshing={refreshing}
        renderSectionHeader={({ section }) =>
          section.data && section.data.length ? (
            <Text style={{ fontSize: 24 }}>{section.title}</Text>
          ) : null
        }
        renderItem={({ item }) => (
          <PlantCard
            id={item.id}
            name={item.name}
            species={item.species.name}
            nextWatering={item.wateringInfo.nextWatering}
            photo={item.image.url}
            waterPlant={waterPlant}
          ></PlantCard>
        )}
      ></SectionList>
    </View>
  );
};

export default withNavigation(PlantList);

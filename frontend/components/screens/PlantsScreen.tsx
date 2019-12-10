import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import styled from 'styled-components';
import PlantList from '../PlantList';

const PlantsView = styled.SafeAreaView`
  /* background: green; */
  flex: 1;
  height: 100%;
  width: 100%;
`;

const PlantsScreen = props => {
  return (
    <PlantsView>
      <Text style={{ marginLeft: 10, fontSize: 32 }}>
        {props.navigation.isFocused()}
      </Text>
      <PlantList></PlantList>
    </PlantsView>
  );
};

export default PlantsScreen;

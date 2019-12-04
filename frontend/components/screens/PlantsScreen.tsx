import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const PlantsView = styled.View`
  background: green;
  height: 100%;
  width: 100%;
`;

const PlantsScreen = () => {
  return (
    <PlantsView>
      <Text>This is the Plantscreen</Text>
    </PlantsView>
  );
};

export default PlantsScreen;

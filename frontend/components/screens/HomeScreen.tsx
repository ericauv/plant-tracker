import React from 'react';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components';
const HomeView = styled.View`
  background: blue;
  height: 100%;
  width: 100%;
`;

const HomeScreen = props => {
  return (
    <HomeView>
      <Text>This is the Homescreen</Text>
      <Button
        title="Go to Plants"
        onPress={() => props.navigation.navigate('Plants')}
      />
    </HomeView>
  );
};

export default HomeScreen;

import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import styled from 'styled-components';
const HomeView = styled.SafeAreaView`
  flex: 1;
  background: white;
  height: 100%;
  width: 100%;
`;

const HomeScreen = props => {
  return (
    <HomeView>
      <Text>This is the Homescreen</Text>
    </HomeView>
  );
};

export default HomeScreen;

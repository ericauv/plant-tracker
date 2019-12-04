import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components';

const Example = styled.View`
  background: blue;
  height: 1000px;
  width: 100%;
`;
const Card = () => {
  return (
    <ScrollView>
      <Example>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
        <Text>I'm in a blue View :)</Text>
      </Example>
    </ScrollView>
  );
};

export default Card;

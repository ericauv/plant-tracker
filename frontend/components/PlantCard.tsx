import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import NextWatering from './NextWatering';

interface PropsInterface {
  name: string;
  species: string;
  nextWatering: number;
}

const PlantCardStyles = styled.View`
  background: whitesmoke;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 5;
  border: 1px solid black;
  shadow-color: black;
  shadow-offset: 0px 3px;
  shadow-radius: 5px;
  shadow-opacity: 0.8;
  elevation: 2;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

const PlantCard = (props: PropsInterface) => {
  return (
    <PlantCardStyles>
      <Text>{props.name}</Text>
      <Text>{props.species}</Text>
      <NextWatering nextWatering={props.nextWatering}></NextWatering>
    </PlantCardStyles>
  );
};

export default PlantCard;

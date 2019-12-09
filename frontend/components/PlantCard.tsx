import React from 'react';
import styled from 'styled-components';
import { View, Text, Image, Button } from 'react-native';
import NextWatering from './NextWatering';
import plantImage from '../assets/leaf.png';

interface PropsInterface {
  id: string;
  name: string;
  species: string;
  photo: string;
  nextWatering: number;
  waterPlant: any;
}

const PlantCardStyles = styled.View`
  flex-direction: row;
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
  padding-left: 5px;
  padding-right: 10px;
`;

const PlantDetailsStyles = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
`;

const PlantCard = (props: PropsInterface) => {
  const photo = props.photo ? { uri: props.photo } : plantImage;
  return (
    <PlantCardStyles>
      <Image style={{ width: 100, height: 100 }} source={photo} />
      <PlantDetailsStyles>
        <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
        <Text style={{ fontStyle: 'italic' }}>{props.species}</Text>
        <NextWatering nextWatering={props.nextWatering}></NextWatering>
      </PlantDetailsStyles>
      <Button
        title="Water Me!"
        onPress={() => props.waterPlant(props.id)}
      ></Button>
    </PlantCardStyles>
  );
};

export default PlantCard;

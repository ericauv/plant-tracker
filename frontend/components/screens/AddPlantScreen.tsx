import React, { useState } from 'react';
import { Text, Button, TextInput, Alert } from 'react-native';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const AddPlantView = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const Input = styled.TextInput`
  height: 40;
  border-color: gray;
  border-width: 1;
`;

const ADD_PLANT_MUTATUION = gql`
  mutation AddPlant($name: String!, $species: String, $description: String) {
    addPlant(name: $name, species: $species, description: $description)
  }
`;

const AddPlantScreen = () => {
  const [name, setName] = useState('give the plant a name');
  const [species, setSpecies] = useState('plant species');
  const [description, setDescription] = useState('description');
  const [addPlant] = useMutation(ADD_PLANT_MUTATUION);
  const onSubmit = () => {
    addPlant({
      variables: { name: name, species: species, description: description },
    });
    Alert.alert(`Add ${name}`);
  };

  return (
    <AddPlantView>
      <Input value={name} onChangeText={text => setName(text)}></Input>
      <Input value={species} onChangeText={text => setSpecies(text)}></Input>
      <Input
        value={description}
        onChangeText={text => setDescription(text)}
      ></Input>
      {/* <Mutation mutation={ADD_PLANT_MUTATUION}> */}
      <Button title="Submit Plant" onPress={() => onSubmit()} />
      {/* </Mutation> */}
    </AddPlantView>
  );
};

export default AddPlantScreen;

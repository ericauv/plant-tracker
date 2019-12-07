import React, { useState } from 'react';
import { Text, Button, TextInput, Alert } from 'react-native';
import styled from 'styled-components';

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

const AddPlantScreen = () => {
  const [name, setName] = useState('give the plant a name');
  const [species, setSpecies] = useState('plant species');
  const [description, setDescription] = useState('description');
  const onSubmit = () => {
    Alert.alert('Add Plant');
  };

  return (
    <AddPlantView>
      <Input value={name} onChangeText={text => setName(text)}></Input>
      <Input value={species} onChangeText={text => setSpecies(text)}></Input>
      <Input
        value={description}
        onChangeText={text => setDescription(text)}
      ></Input>
      <Button title="Submit Plant" onPress={() => onSubmit()} />
    </AddPlantView>
  );
};

export default AddPlantScreen;

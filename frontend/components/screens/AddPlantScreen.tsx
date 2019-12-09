import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  Button,
  SafeAreaView,
  Text,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const AddPlantView = styled.SafeAreaView`
  flex: 1;
`;

const Input = styled.TextInput`
  height: 40;
  border-color: gray;
  border-width: 1;
`;

const ADD_PLANT_MUTATION = gql`
  mutation ADD_PLANT_MUTATION(
    $name: String!
    $species: String
    $description: String
  ) {
    addPlant(name: $name, species: $species, description: $description) {
      id
      name
    }
  }
`;

const AddPlantScreen = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [description, setDescription] = useState('');
  const [added, setAdded] = useState('');
  const [addPlant] = useMutation(ADD_PLANT_MUTATION);
  const onSubmit = () => {
    addPlant({
      variables: { name: name, species: species, description: description }
    });
    Keyboard.dismiss();
    setAdded(`Added ${name}`);
    setName('');
    setSpecies('');
    setDescription('');
    setTimeout(() => setAdded(''), 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <AddPlantView>
        <Input
          value={name}
          placeholder={'Enter a name'}
          onChangeText={text => setName(text)}
        ></Input>
        <Input
          value={species}
          placeholder={'Enter a species'}
          onChangeText={text => setSpecies(text)}
        ></Input>
        <Input
          placeholder={'Enter a description'}
          value={description}
          onChangeText={text => setDescription(text)}
        ></Input>
        <Button title="Add Plant" onPress={() => onSubmit()} />
        {added ? (
          <SafeAreaView
            style={{
              marginTop: 'auto',
              backgroundColor: 'green',
              width: '100%',
              height: '6.66%'
            }}
          >
            <Text
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                marginLeft: '2%'
              }}
            >
              {added}
            </Text>
          </SafeAreaView>
        ) : null}
      </AddPlantView>
    </TouchableWithoutFeedback>
  );
};

export default AddPlantScreen;

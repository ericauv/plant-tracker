import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Card from './components/Card';
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4001/'
});

const client = new ApolloClient({
  cache,
  link
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>Test</Text>
        <Card></Card>
      </View>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;

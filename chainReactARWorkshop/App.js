
import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity,StatusBar, Text, View} from 'react-native';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Shop from './src/components/Shop'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

const GRAPHQL_ENDPOINT = "https://chain-react-workshop.herokuapp.com/v1/graphql"


const mkWsLink = (uri) => {
  const splitUri = uri.split('//');
  const subClient = new SubscriptionClient(
    'wss://' + splitUri[1],
    { reconnect: true }
  );
  return new WebSocketLink(subClient);
}


const wsLink = mkWsLink(GRAPHQL_ENDPOINT)
const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

// Creating a client instance
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false
  })
});

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#161637' }}>
    <TouchableOpacity onPress={() => navigation.navigate('Shop')}><Text style={{color: '#ffffff', fontSize: 24, textAlign: 'center'}}>Welcome to Chain React AR Workshop app</Text>
    </TouchableOpacity>
  </View>
)

HomeScreen.navigationOptions = {
  header: null
}

const AppNavigator = createSwitchNavigator({
  Home: {
    screen: HomeScreen
  },
  Shop: Shop
})


const AppContainer = createAppContainer(AppNavigator)

const App = () => (
  <View style={{flex: 1}}>
  <ApolloProvider client={client}>
    <StatusBar barStyle="light-content"/>
    <AppContainer />
  </ApolloProvider>
  </View>
)


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

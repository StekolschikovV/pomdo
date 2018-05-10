import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Constants from './src/constants.json';

import { Provider } from 'mobx-react';
import Store from './src/store.js';
import Screens from './src/screens';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <Screens/>
      </Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

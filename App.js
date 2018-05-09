import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timer from './src/screens/timer'
import Constants from './src/constants.json';

import { Provider } from 'mobx-react';
import Store from './src/store.js';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <View style={styles.container}>
          <Timer/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.color.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});




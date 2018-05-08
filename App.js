import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timer from './src/screens/timer'
import Constants from './src/constants.json';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Timer/>
      </View>
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




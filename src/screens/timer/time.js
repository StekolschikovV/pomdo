import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from '../../constants.json';

export default class Time extends React.Component {
  render() {
    return (
        <View style={{
          flex: 7,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            color: Constants.color.active,
            fontSize: Constants.size.big,
          }}>25:00</Text>
        </View>
    );
  }
}

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from '../../constants.json';
import {inject, observer} from "mobx-react/native";

@inject('store') @observer
export default class Time extends React.Component {
  render() {

    let store = this.props.store;
    let min = Number.parseInt(store.timerTime / 60);
    let sec = store.timerTime % 60 < 10 ? `0${store.timerTime % 60}` : store.timerTime % 60;

    return (
        <View style={{
          flex: 7,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            color: Constants.color.active,
            fontSize: Constants.size.big,
          }}>
            { min }:{ sec }
          </Text>
        </View>
    );
  }
}

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Time from './time';
import Constants from '../../constants.json';
import KeepAwake from 'react-native-keep-awake';
import {inject, observer} from "mobx-react/native";

@inject('store') @observer
export default class Timer extends React.Component {

  constructor(props) {
    super(props);
  }

  changeKeepAwake = () =>{
    this.state.keepawake = true;
  }

  render() {

    let store = this.props.store;
    var btnUrl = store.timerStatus ? require('./../../../assets/icons/stop.png') : require('./../../../assets/icons/play.png');
    
    return (
      <View >
        <Time/>
        <TouchableHighlight 
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={ () => store.timerStatusToggler() }
        >
          <Image source={btnUrl} />
        </TouchableHighlight >
      </View>
    );
  }

}

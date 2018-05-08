import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Time from './time';
import Constants from '../../constants.json';
// import play_icons from './../../../assets/icons/play.png';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      status: true
    };
  }
  render() {
    var btnUrl = this.state.status ? require('./../../../assets/icons/play.png') : require('./../../../assets/icons/stop.png');
    return (
      <View >
        <Time/>
        <TouchableHighlight style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
          onPress={ () => {this.setState({ status: !this.state.status })} }
        >
          <Image source={btnUrl} />
        </TouchableHighlight >
      </View>
    );
  }
}



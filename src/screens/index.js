import React from 'react'
import Swiper from 'react-native-swiper'
import {StyleSheet, Text, View, StatusBar, TouchableHighlight} from 'react-native';
import Timer from './timer'
import Task from './task'
import Constants from './../constants.json';
import {inject, observer} from "mobx-react/native";


@inject('store') @observer
export default class Screens extends React.Component {

    constructor(props) {
        super(props);
    }

    changeIndex(newIndex) {
        if (newIndex !== this.props.store.screenIndex) {
            if (newIndex < this.props.store.screenIndex) {
                this.props.store.screenIndex = this.props.store.screenIndex - 1;
                this._swiper.scrollBy(-1, true)
            } else {
                this.props.store.screenIndex = this.props.store.screenIndex + 1;
                this._swiper.scrollBy(1, true)
            }
            setTimeout(() => {
                this.changeIndex(newIndex);
            }, 0);
        }
    }

    setIndex(newIndex) {
        this.props.store.screenIndex = newIndex;
    }

    render() {

        let SI = this.props.store.screenIndex;
        let bg = Constants.color.bg;
        let passive = Constants.color.passive;

        return (
            <View style={styles.container}>
                <View style={styles.menuContainer}>
                    <TouchableHighlight
                        style={
                            [styles.menuBtn, styles.menuBtnLeft, [{backgroundColor: SI == 0 ? bg : passive}]
                            ]} onPress={() => this.changeIndex(0)}>
                        <Text style={{color: SI !== 0 ? bg : passive}}>Task</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.menuBtn, styles.menuBtnRight, [{backgroundColor: SI == 1 ? bg : passive}]]}
                        onPress={() => this.changeIndex(1)}>
                        <Text style={{color: SI !== 1 ? bg : passive}}>Timer</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.containerContent}>
                    <Swiper
                        ref={(swiper) => this._swiper = swiper}
                        onIndexChanged={this.setIndex.bind(this)}
                        horizontal={false}
                        loop={false}
                        showsPagination={false}
                        index={0}>
                        <Task/>
                        <Timer/>
                    </Swiper>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menuContainer: {
        marginTop: StatusBar.currentHeight,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: Constants.color.bg,
    },
    menuBtn: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2.5,
        borderColor: Constants.color.passive
    },
    menuBtnLeft: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    menuBtnRight: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    containerContent: {
        flex: 1
    },
    container: {
        flex: 1
    },
});


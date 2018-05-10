import React, { Component } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';

const window = Dimensions.get('window');

export default class Task extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    image: 'https://placekitten.com/200/240',
                    text: 'Chloe1',
                },
                {
                    image: 'https://placekitten.com/200/240',
                    text: 'Chloe2',
                }
            ]
        }

        setInterval(() => {
            let d= this.state.data;
            d.push({
                image: 'https://placekitten.com/200/240',
                text: 'Chloe3',
            })
            this.setState({
                data: d
            })
        }, 1500)

    }

    render() {

        return (
            <View style={styles.container}>
                {/*<Text style={styles.title}>React Native Sortable List</Text>*/}
                <SortableList
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    data={this.state.data}
                    renderRow={this._renderRow} />
            </View>
        );
    }

    _renderRow = ({data, active}) => {
        console.log({data, active})
        return <Row data={data} active={active} />
    }
}

class Row extends Component {

    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);

        this._style = {
            ...Platform.select({
                ios: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                        }),
                    }],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },


                android: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.07],
                        }),
                    }],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    render() {
        const {data, active} = this.props;

        return (
            <Animated.View style={[
                styles.row,
                this._style,
            ]}>
                <Image source={{uri: data.image}} style={styles.image} />
                <Text style={styles.text}>{data.text}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',

        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },

    title: {
        fontSize: 20,
        paddingVertical: 20,
        color: '#999999',
    },

    list: {
        flex: 1,
    },

    contentContainer: {
        // width: window.width,
        width: window.width,
        flex: 1,
        flexDirection:'column',

        // ...Platform.select({
        //     ios: {
        //         paddingHorizontal: 30,
        //     },
        //
        //     android: {
        //         paddingHorizontal: 0,
        //     }
        // })
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,

        ...Platform.select({
            ios: {
                width: window.width - 30 * 2,
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: {height: 2, width: 2},
                shadowRadius: 2,
            },

            android: {
                width: window.width - 30 * 2,
                elevation: 0,
                marginHorizontal: 30,
            },
        })
    },

    image: {
        width: 50,
        height: 50,
        marginRight: 30,
        borderRadius: 25,
    },

    text: {
        fontSize: 24,
        color: '#222222',
    },
});

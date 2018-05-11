import React, {Component} from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    Keyboard,
    View,
    Dimensions,
    Platform,
    TextInput,
    ScrollView,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import Constants from './../../constants';
import CheckBox from 'react-native-check-box';
import simpleStore from 'react-native-simple-store';

const window = Dimensions.get('window');

export default class Task extends Component {

    constructor(props) {
        super(props);

        this.state = {
            foo: '',
            scrollEnabled: true,
            scrollMap: null,
            text: '',
            data: [
                {
                    text: 'test'
                }
            ]
        }

        this.onChangeText = this.onChangeText.bind(this);
        this.scrollEnabled = this.scrollEnabled.bind(this);
        this.rmTask = this.rmTask.bind(this);
        this.savePosition = this.savePosition.bind(this);


    }

    componentDidMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));

        simpleStore.get('data').then((data) => {
            console.log(data)
            this.setState({data:JSON.parse(data)})
        });
    }


    _keyboardDidHide() {
        if (this.state.text.length > 0) {
            let d = this.state.data;
            const newRecord = {text: this.state.text};
            this.setState({data: [newRecord, ...d]});
            this.setState({text: ''});
            this.savePosition();
        }
    }

    onChangeText(text) {
        if(text.trim()) {
            this.setState({text});
        }
    }

    rmTask(text) {
        if(this.state.data){
            const result = this.state.data.filter(obj => obj.text !== text && obj.text != '');
            this.setState({data: result});
            this.savePosition();
        }

    }

    savePosition() {

        setTimeout(()=>{

            if(this.state.scrollMap){

                let SM = this.state.scrollMap;
                let res = [];

                for(let i = 0; i < SM.length; i++) {
                    SM[i]
                    res.push(this.state.data[SM[i]])
                }

                simpleStore.delete('data');
                simpleStore.update('data', JSON.stringify(res));

            } else {
                simpleStore.delete('data');
                simpleStore.update('data', JSON.stringify(this.state.data));
            }
        },0)
    }

    render() {

        return (
            <View style={styles.container}>


                <ScrollView scrollEnabled={this.state.scrollEnabled}>

                    <TextInput
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        style={styles.input}
                        placeholder={'+ enter new task...'}
                        onChangeText={(text) => this.onChangeText(text)}
                        value={this.state.text}/>

                    <SortableList
                        scrollEnabled={false}
                        onChangeOrder={(scrollMap)=>this.setState({scrollMap})}
                        style={styles.list}
                        contentContainerStyle={styles.contentContainer}
                        data={this.state.data}
                        renderRow={this._renderRow}/>

                </ScrollView>

            </View>
        );
    }

    scrollEnabled() {
        this.setState({
            scrollEnabled: !this.state.scrollEnabled
        })
    }

    _renderRow = ({data, active}) => {
        return <Row savePosition={this.savePosition} rmTask={this.rmTask} scrollEnabled={this.scrollEnabled} data={data} active={active}/>
    }

}

class Row extends Component {

    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);
        this.onCheck = this.onCheck.bind(this);

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

        this.state = {
            scroll: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
            this.props.scrollEnabled()
            if(!nextProps.active) {
                this.props.savePosition();
            }
        }
    }

    onCheck(data) {
        try {
            this.props.rmTask(data.text);
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const {data, active} = this.props;
        let text = '';
        if(!data)
            text = ''
        else
            text = data.text


        return (
            <Animated.View
                style={[
                    styles.row,
                    this._style,
                ]}
            >
                <CheckBox
                    style={{paddingRight: 5}}
                    onClick={() => this.onCheck(data)}
                />
                <Text style={styles.text}>{text}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Constants.color.bg,

        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },


    input: {
        color: Constants.color.active,
        width: window.width - 30,
        marginHorizontal: 15,
        padding: 10,
        borderColor: Constants.color.passive,
        // borderWidth: 1,
        // underlineColorAndroid: 'rgba(0,0,0,0)'
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
        width: window.width,
        flex: 1,
        flexDirection: 'column',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Constants.color.active,
        padding: 10,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                width: window.width - 30 * 2,
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: {height: 2, width: 2},
                shadowRadius: 2,
            },

            android: {
                width: window.width - 30,
                elevation: 0,
                marginHorizontal: 15,
            },
        })


    },

    text: {
        fontSize: 24,
        color: Constants.color.bg,
    },

});


import React, { Component } from 'react';
import {
    Text,
    FlatList,
}   from 'react-native';
import { connect } from 'react-redux'
import { Slide } from '../../parents/Slide.js';

class LobbyActivityLogView extends Component {

    _renderItem(item){
        return <Slide>
            <Text style = {styles.playerList}>{item.message}</Text>
        </Slide>
    }

    render() {

        return <FlatList
            data={this.props.log}
            renderItem={({item}) => this._renderItem(item)}
            initialNumToRender={15}
            keyExtractor={item => item.key}
        />

    }
}

const styles = {
    playerList: {
        fontSize: 16,
        fontFamily: 'FredokaOne-Regular',
        alignSelf:'center',
        margin:5,
        opacity:0.7,
    },
}

export default connect(
    state => ({
        log: state.lobby.log
    })
)(LobbyActivityLogView)
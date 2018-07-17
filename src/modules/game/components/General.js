import React, { Component } from 'react'
import { 
    View, 
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native'

import { TextHandler, Styler } from '@common'
import { Message } from '@components'

const { height, width } = Dimensions.get('window')

class General extends Component {
    state = {
        visible: false
    }

    //TODO VERY inefficient rendering
    _renderList() {
        const { messageContainer, message } = styles
        const { news } = this.props
        
        let itemArr = []
        for (var i in news) {
            itemArr.push(
                <Message key={i} style={messageContainer}>
                    <Text style={message}>
                        {TextHandler.processString(news[i].message)}
                    </Text>
                </Message>
            )
        }
        return itemArr
    }

    _showNews = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        const { visible } = this.state
        const { headerStyle, newsContainerStyle } = styles

        if (!visible) {
            return (
                <TouchableOpacity
                    style={styles.headerStyle}
                    onPress={this._showNews}
                >
                    
                </TouchableOpacity>
            )
        }

        return (
            <View style = {newsContainerStyle}>
                {this._renderList()}
            </View>
        )
    }
}

const styles = {
    headerStyle: {
        position: 'absolute',
        top: 15,
        left: 10,
        right: 10,
        height: 0.1*height,
        backgroundColor: Styler.color.light,
        borderRadius: 15
    },
    newsContainerStyle: {
        position: 'absolute',
        top: 15,
        left: 10,
        right: 10,
        height: 0.5*height,
        backgroundColor: Styler.color.light,
        borderRadius: 15
    },
    message: {
        fontSize: 15,
        fontFamily: Styler.fontFamily.Regular,
        color: Styler.color.dark,
        marginTop:5,
        marginBottom:5,
    },
    messageContainer: {
        margin:5,
    },
}

export default General
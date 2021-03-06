import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    Animated,
    Dimensions,
}   from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Button from './Button.js';
import Modal from '../parents/Modal.js';
import { Desc } from './Desc.js';

import { Roles } from '@library';


export class RoleView extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            townlist:       [],
            mafialist:      [],

            roleId:         'a',
            desc:           false,

            showtown:       true,
            showpool:       false,

            info:           true,
            change:         true,
        }

        this.height         = Dimensions.get('window').height;
        this.width          = Dimensions.get('window').width;
    }

    componentWillMount() {

        var keys = Object.keys(Roles).sort()
        
        var townlist = [];
        var mafialist = [];

        keys.forEach(function(key){
            if(Roles[key].type == 1){
                mafialist.push({
                    name:           Roles[key].name,
                    index:          Roles[key].index,
                    key:            key,
                })
            } else if (Roles[key].type == 2) {
                townlist.push({
                    name:           Roles[key].name,
                    index:          Roles[key].index,
                    key:            key,
                })
            }
        })
        this.setState({
            mafialist:mafialist,
            townlist:townlist,
        })  
    }

    _rolePress(key){
        if(this.state.info){
            this.setState({desc:true, roleId:key})
        } else {
            this.props.rolepress(key,this.state.change)
        }
    }

    _renderItem(item){
        return <Button
            flex = {0.35}
            horizontal = {0.9}
            margin = {10}
            onPress = {() => this._rolePress(item.key)}
        ><Text numberOfLines = {1} style = {styles.charfont}>{item.name}</Text>
        </Button>
    }

    render(){
        return <View style = {{flex:1}}>

            <View style = {{ marginBottom:10, justifyContent:'center', flexDirection:'row' }}>
                
                <Button
                    flex = {0.16}
                    horizontal = {1}
                    style = {{
                        borderBottomRightRadius:0,
                        borderTopRightRadius:0,
                    }}
                    opacity={this.state.showtown?1:0.6}
                    onPress = {()=>{ this.setState({ showtown:true }) }}
                >
                    <Foundation name='shield'
                        style={{fontSize:25,alignSelf:'center',margin:3}}/>
                </Button>
                
                <Button
                    flex = {0.16}
                    horizontal = {1}
                    style = {{
                        borderRadius:0
                    }}
                    opacity={this.state.showtown?0.6:1}
                    onPress = {()=>{ this.setState({ showtown:false }) }}
                >
                    <Foundation name='skull'
                        style={{fontSize:25,alignSelf:'center',margin:3}}/>
                </Button>

                <Button
                    flex = {0.16}
                    horizontal = {1}
                    style = {{
                        borderBottomLeftRadius:0,
                        borderTopLeftRadius:0,
                    }}
                    opacity={this.state.showpool?1:0.6}
                    onPress = {()=>{ this.setState({ showpool:!this.state.showpool }) }}
                >
                    <Foundation name='star'
                        style={{fontSize:25,alignSelf:'center',margin:3}}/>
                </Button>
            </View>

            <View>
                <FlatList
                    data={this.state.showtown?this.state.townlist:this.state.mafialist}
                    renderItem={({item}) => this._renderItem(item)}
                    showsflexScrollIndicator = {false}
                    columnWrapperStyle = {{alignSelf:'center'}}
                    numColumns={2}
                    keyExtractor={item => item.key}/>
            </View>

            <View style = {{ position:'absolute', width:this.width*0.14, right:0, top:0, bottom:0 ,
                justifyContent:'center'}}>
                

                <Button
                    flex = {0.14}
                    horizontal = {1}
                    margin = {10}
                    style = {{
                        borderBottomRightRadius:0,
                        borderTopRightRadius:0,
                    }}
                    opacity={this.state.info?1:0.6}
                    onPress = {()=> this.setState({ info:true })}
                >
                    <Foundation name='info'
                        style={{fontSize:25,alignSelf:'center',margin:3}}/>
                </Button>

                <View style = {{flex:0.03}}/>

                <Button
                        flex = {0.14}
                        horizontal = {1}
                        margin = {10}
                        style = {{
                            borderBottomRightRadius:0,
                            borderTopRightRadius:0,
                        }}
                        opacity={!this.state.info && this.state.change?1:0.6}
                        onPress = {()=> this.setState({ info:false, desc:false, change:true }) }
                    >
                        <FontAwesome name='plus'
                            style={{fontSize:25,alignSelf:'center',margin:3}}/>
                </Button>

                <Button
                    flex = {0.14}
                    horizontal = {1}
                    margin = {10}
                    style = {{
                        borderBottomRightRadius:0,
                        borderTopRightRadius:0,
                    }}
                    opacity={!this.state.info && !this.state.change?1:0.6}
                    onPress = {()=> this.setState({ info:false, desc:false, change:false }) }
                >
                    <FontAwesome name='minus'
                        style={{fontSize:25,alignSelf:'center',margin:3}}/>
                </Button>
                
                <View style = {{flex:0.03}}/>

                <Button
                    flex = {0.14}
                    horizontal = {1}
                    margin = {10}
                    style = {{
                        borderBottomRightRadius:0,
                        borderTopRightRadius:0,
                    }}
                    opacity={this.state.desc?1:0.6}
                    onPress = {()=> this.setState({ desc:false }) }
                    disabled = {!this.state.desc}
                >
                    <FontAwesome name='eye-slash'
                        style={{fontSize:25,alignSelf:'center',margin:3}}/>
                </Button>

            </View>
            
            <Modal visible = {this.state.desc} flex = {0.2} style = {{bottom:10}}>
                <Desc
                    roleId = {this.state.roleId}
                    close = {() => this.setState({desc:false})}
                />
            </Modal>

        </View>

    }
}

const styles = {
    charfont: {
        fontSize: 17,
        fontFamily: 'FredokaOne-Regular',
        textAlign:'center',
        margin:4,
    },
}
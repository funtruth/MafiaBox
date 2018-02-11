
import React from 'react';
import {
    View,
    Image,
    AsyncStorage,
    Text,
    Keyboard,
    Animated,
    Dimensions,
    TouchableOpacity
}   from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const AnimatedOpacity = Animated.createAnimatedComponent(TouchableOpacity)

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import randomize from 'randomatic';

const QUICK_ANIM    = 400;
const MED_ANIM      = 600;
const SLOW_ANIM     = 1000;

const MARGIN = 10;

import { CustomButton } from '../components/CustomButton.js';
import { Alert } from '../components/Alert.js';
import { Join1 } from '../tutorials/RoomJoin.js';
import Menu from './ListsScreen.js';

import colors from '../misc/colors.js';
import styles from '../misc/styles.js';
import Rolesheet from '../misc/roles.json';

//Firebase
import firebase from '../firebase/FirebaseController.js';

export class Home extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            nav: new Animated.Value(0),
            wiggle: new Animated.Value(0),

            join: false
        }

        this.width = Dimensions.get('window').width
        this.height = Dimensions.get('window').height
        
    }

    _joinRoom() {
        this.setState({
            join:true
        })
    }

    _bounce(){
        const animation = Animated.timing(
            this.state.wiggle, {
                toValue:1,
                duration:5000
            }
        )
        
        Animated.loop(animation).start()
    }

    _stop(){
        const animation = Animated.timing(
            this.state.wiggle, {
                toValue:1,
                duration:5000
            }
        )
        
        Animated.loop(animation).stop()
    }

    _nav(nav){
        Animated.timing(
            this.state.nav, {
                toValue:nav?1:0,
                duration:500
            }
        ).start()
    }

    _createRoom() {

        var flag = false
        var roomname = null

        firebase.database().ref('rooms').once('value',snap=>{
            while(!flag){
                roomname = randomize('0',4);
                if(!snap.val()[roomname]){
                    flag = true
                }
            }

            AsyncStorage.setItem('ROOM-KEY', roomname);
            
            firebase.database().ref('rooms/').child(roomname).set({
                owner: firebase.auth().currentUser.uid,
                counter:1,
            }).then(()=>{
                this.props.screenProps.navigateP('CreationTutorial',roomname)
            })
        })

        
    }

    componentWillMount(){
        this._bounce()
    }

    _renderIcon(){
        return <Animated.View style = {{
            bottom:this.state.wiggle.interpolate({
                inputRange: [0,0.5,1],
                outputRange: [this.height*0.02,-this.height*0.01,this.height*0.02]
            }),
            height:this.height/9, width:this.height/9, 
            borderRadius:this.height/18, backgroundColor: colors.font,
            alignItems:'center', justifyContent:'center'
        }}>
            <FontAwesome name='user-secret' 
                style={{ color:colors.background, fontSize: this.height/1.8/9 }}/>
        </Animated.View>
    }

    _renderMain(){
        return <Animated.View style = {{
            bottom:this.state.wiggle.interpolate({
                inputRange: [0,0.5,1],
                outputRange: [this.height*0.02,-this.height*0.02,this.height*0.02]
            }),
            height:this.state.nav.interpolate({
                inputRange: [0,0.5,1],
                outputRange: [0,this.height*0.1,this.height*0.3]
            }),
            opacity:this.state.nav,
            width:this.width,
            marginBottom:MARGIN,
        }}>
            <Menu/>
        </Animated.View>
    }

    _renderNav(){
        return <Animated.View style = {{
            height:this.height*0.1, flexDirection:'row', justifyContent:'center'}}>
    
            <AnimatedOpacity style = {{
                bottom:this.state.wiggle.interpolate({
                    inputRange: [0,0.5,1],
                    outputRange: [MARGIN,-0.5*MARGIN,MARGIN]
                }),
                transform: [{
                    scale:this.state.wiggle.interpolate({
                        inputRange: [0,0.5,1],
                        outputRange: [1,1.1,1]
                    })
                }],
                justifyContent:'center', alignItems:'center', flex:0.2}}
                onPress = {()=> this._createRoom() }>
                <FontAwesome name='cloud'
                    style={{color:colors.font,fontSize:30,textAlign:'center'}}/>
                <Text style = {{color:colors.font,fontFamily:'FredokaOne-Regular'}}>Create</Text>
            </AnimatedOpacity>
    
            <AnimatedOpacity style = {{
                bottom:this.state.wiggle.interpolate({
                    inputRange: [0,0.5,1],
                    outputRange: [0.5*MARGIN,-1.5*MARGIN,0.5*MARGIN]
                }),
                transform: [{
                    scale:this.state.wiggle.interpolate({
                        inputRange: [0,0.5,1],
                        outputRange: [1,1.1,1]
                    })
                }],
                justifyContent:'center', alignItems:'center', flex:0.25}}
                onPress = {()=> this._joinRoom() }>
                <FontAwesome name='key'
                    style={{color:colors.font,fontSize:40,textAlign:'center'}}/>
                <Text style = {{color:colors.font,fontFamily:'FredokaOne-Regular'}}>Join</Text>
            </AnimatedOpacity>
    
            <AnimatedOpacity style = {{
                bottom:this.state.wiggle.interpolate({
                    inputRange: [0,0.5,1],
                    outputRange: [MARGIN,-0.5*MARGIN,MARGIN]
                }),
                transform: [{
                    scale:this.state.wiggle.interpolate({
                        inputRange: [0,0.5,1],
                        outputRange: [1,1.1,1]
                    })
                }],
                justifyContent:'center', alignItems:'center', flex:0.2}}
                onPress = {()=> this._nav(true) }>
                <FontAwesome name='book'
                    style={{color:colors.font,fontSize:30,textAlign:'center'}}/>
                <Text style = {{color:colors.font,fontFamily:'FredokaOne-Regular'}}>Menu</Text>
            </AnimatedOpacity>

        </Animated.View>
    }

    render() {

        return <View style = {{position:'absolute', left:0, right:0, bottom:0, top:0,
            justifyContent:'center', alignItems:'center', backgroundColor:colors.background}}>

            {this._renderIcon()}
            {this._renderMain()}
            {this._renderNav()}

            <Alert
                visible = {this.state.join}
            >
                <Join1 
                    close = {()=>this.setState({join:false})}
                />
            </Alert>

        </View>
    }
}

export class Loading extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.screenProps.passNavigation(this.props.navigation)

        AsyncStorage.getItem('GAME-KEY',(error,result)=>{
            if(result != null){
                this.props.screenProps.navigateP('MafiaRoom',result)
            } else {
                if(firebase.auth().currentUser){
                    this.props.screenProps.navigate('Home')
                } else {
                    firebase.auth().signInAnonymously().then(() => {
                        this.props.screenProps.navigate('Home')
                    }).catch(function(error){alert(error)})
                }
            }
        })
    }

    render() {
        return <View/>
    }
}
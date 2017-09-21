
import React from 'react';
import {
    View,
    Image,
    AsyncStorage,
    BackHandler,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Keyboard,
    FlatList,
    ListView
}   from 'react-native';

import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import ModalPicker from 'react-native-modal-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';

import { Button, List, ListItem, FormInput } from "react-native-elements";
import ProfileButton from '../components/ProfileButton.js';
import HeaderButton from '../components/HeaderButton.js';
import ToggleListItem from '../components/ToggleListItem.js';

//Firebase
import firebase from '../firebase/FirebaseController.js';

class FindGroups_Screen extends React.Component {

static navigationOptions = {
  headerTitle: 'Search for Group',
  headerTintColor: 'white',
  headerStyle: {
      backgroundColor: '#b18d77',
  }
}

  constructor(props) {
    super(props);
    this.state = {
        invitationcode: '',
    }
  }

componentWillMount() {

}

  render(){
    return <View style={{
        flex: 1,
        backgroundColor: '#e6ddd1',
    }}>

        <View style = {{ flex: 1}}></View>
        <View style = {{
            flex: 1.4,
            flexDirection: 'row',
            justifyContent: 'center',
        }}>

            <FormInput
                value={this.state.roomname}
                placeholder="Invitation Code ..."
                onChangeText={invitationcode => this.setState({ invitationcode })}
                style={{
                    width: 180,
                    alignSelf: 'center',
                    textAlign: 'center',
                }}
            />

            <ProfileButton title="Go" 
                icon={{name: 'done', size: 16}}
                onPress={() => {
                    alert('yo')
            }}/>

        </View>
    </View>
}};

class ActiveGroup_Screen extends React.Component {

static navigationOptions = ({navigation}) => ({
    headerTitle: 'Active Group',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: '#b18d77',
    },
})

constructor(props) {
    super(props);

    this.state = {
    };

}


render() {
    return <View style = {{
        backgroundColor: '#e6ddd1',
        flex: 1,
    }}>

    
    <ActionButton
        buttonColor="rgba(222, 207, 198, 1)"
        degrees={30}
        useNativeFeedback = {false} 
        icon={<MaterialIcons name="menu" style={styles.actionButtonIcon }/>}>
        
        <ActionButton.Item
            buttonColor='#b18d77' 
            title="Find Group" 
            hideShadow
            onPress={() => {
                this.props.navigation.navigate('FindGroups_Screen')}}>
            <MaterialIcons name="search" style={styles.actionButtonItem} />
        </ActionButton.Item>

        <ActionButton.Item
            buttonColor='#b18d77' 
            title="My Groups" 
            hideShadow
            onPress={() => {
                this.props.navigation.navigate('MyGroups_Screen')}}>
            <MaterialIcons name="group" style={styles.actionButtonItem} />
        </ActionButton.Item>

        <ActionButton.Item
            buttonColor='#b18d77' 
            title="Create a Group" 
            hideShadow
            onPress={() => {
                this.props.navigation.navigate('CreateGroup_Screen')
            }}>
            <MaterialIcons name="group-add" style={styles.actionButtonItem} />
        </ActionButton.Item>
    </ActionButton>

    </View>
}

}

class MyGroups_Screen extends React.Component {

static navigationOptions = ({navigation}) => ({
  headerTitle: 'My Groups',
  headerTintColor: 'white',
  headerStyle: {
      backgroundColor: '#b18d77',
  },
})

constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
        loading: false,
        data: dataSource,

        activedisplayname: '',
        activetype: '',
        activeowner: '',
        active_key: '',

    };

    this.ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/groups');
}

_pullGroupDataDB() {
    
    this.setState({ loading: true });

    this.ref.on('value', (snapshot) => {
        const groups = [];
        snapshot.forEach((child) => {
            groups.push({
                groupname: child.val(),
                groupid: child.key,
            })
        });

        this.setState({data:groups,})
    });
};

componentWillMount() {
    this._pullGroupDataDB();
}

componentWillUnmount() {
    if(this.ref) {
        this.ref.off();
    }
}

render() {
  return <View style = {{
      backgroundColor: '#e6ddd1',
      flex: 1,
  }}>

    <List style={{ borderTopWidth:0, borderBottomWidth:0, backgroundColor:'#b18d77' }}>
        <FlatList
            data={this.state.data}
            renderItem={({item}) => (
                <ToggleListItem 
                    title={item.groupid}
                    subtitle={item.groupname}
                />
            )}
            keyExtractor={item => item.groupid}
        />
    </List>

  </View>
}}

class CreateGroup_Screen extends React.Component {
    
static navigationOptions = ({navigation}) => ({
    headerTitle: 'Create a Group',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: '#b18d77',
    },
})

constructor(props){
    super(props);
    this.state = {
        groupid: '',

        groupdisplayname: '',
        groupowner: '',
        grouptype: '',           //Security
    }
    this.ref = null;
}

componentWillMount() {
    this.ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid)
    this.ref.once('value',snapshot => {
        this.setState({
            groupowner: snapshot.val().username
        })
    })
}

_makeGroupDB(displayname,id,type,owner) {

    //Create the group and add the owner
    firebase.database().ref('groups/' + id).set({
        displayname: displayname,
        type:type,
        owner:owner,
    })
    firebase.database().ref('groups/' + id + '/' + owner).set(owner)

    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/groups/' + id).set(displayname)
}

render() {
    return <View style = {{
        backgroundColor: '#e6ddd1',
        justifyContent: 'center',
        flex: 1,
    }}>
        <FormInput
            value={this.state.groupdisplayname}
            placeholder="Name of Group ..."
            onChangeText={groupdisplayname => this.setState({ groupdisplayname })}
            style={{
                width: 180,
                alignSelf: 'center',
                textAlign: 'center'
            }}/>

        <FormInput
            value={this.state.groupid}
            placeholder="Group id"
            onChangeText={groupid => this.setState({ groupid })}
            style={{
                width: 180,
                alignSelf: 'center',
                textAlign: 'center'
            }}/>

        <FormInput
            value={this.state.grouptype}
            placeholder="Public or Private"
            onChangeText={grouptype => this.setState({ grouptype })}
            style={{
                width: 180,
                alignSelf: 'center',
                textAlign: 'center'
            }}/>

        <Button
            backgroundColor='#b18d77'
            borderRadius={15}
            color='white'
            title="Create Group"
            onPress={() => {
                this._makeGroupDB(this.state.groupdisplayname,this.state.groupid,
                    this.state.grouptype,this.state.groupowner)
                this.props.navigation.dispatch(NavigationActions.reset(
                 {index: 1,
                    actions: [
                      NavigationActions.navigate({ routeName: 'ActiveGroup_Screen'}),
                      NavigationActions.navigate({ routeName: 'MyGroups_Screen'})
                    ]
                  }));
                Keyboard.dismiss()
            }}
            style={{
                width: 200,
                alignSelf: 'center'
            }}
        />
    </View>
}

}


export default stackNav = StackNavigator(
  {
      ActiveGroup_Screen: {
          screen: ActiveGroup_Screen,
      },
      FindGroups_Screen: {
          screen: FindGroups_Screen,
      },
      MyGroups_Screen: {
          screen: MyGroups_Screen,
      },
      CreateGroup_Screen: {
          screen: CreateGroup_Screen,
      },
  },
      {
          headerMode: 'screen',
          initialRouteName: 'ActiveGroup_Screen',
      }
  );


  const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: '#8b6f4b',
    },
    actionButtonItem: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

});
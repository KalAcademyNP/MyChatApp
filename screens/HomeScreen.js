import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  Image,
} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Chats',
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../images/user.png')}
            style={{width: 32, height: 32, marginRight: 7}}
          />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    users: [],
  };

  componentWillMount() {
    let dbRef = firebase.database().ref('users');
    dbRef.on('child_added', newUser => {
      let person = newUser.val();
      person.phone = newUser.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }

  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  renderRow = ({item}) => {
    if (item.phone !== User.phone) {
      return (
        <TouchableOpacity
          style={styles.userContainer}
          onPress={() => this.props.navigation.navigate('Chat', item)}>
          <Text style={{fontsize: 20}}>{item.name}</Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
        />
        <TouchableOpacity onPress={this._logout} style={styles.button}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

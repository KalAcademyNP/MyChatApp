import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    name: User.name,
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('Error', 'Please enter valid name');
    } else if (User.name !== this.state.name) {
      firebase
        .database()
        .ref('users')
        .child(User.phone)
        .set({name: this.state.name});
      User.name = this.state.name;
      Alert.alert('Success', 'Name changed successfully');
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{User.phone}</Text>
        <Text>{User.name}</Text>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.changeName}>
          <Text style={styles.btnText}>Change Name</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

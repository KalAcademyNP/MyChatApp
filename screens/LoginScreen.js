import React, {Component} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
  AsyncStorage,
} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    phone: '',
    name: '',
  };

  componentWillMount() {
    AsyncStorage.getItem('userPhone', (err, val) => {
      if (val) {
        this.setState({phone: val});
      }
    });
  }

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  submitForm = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Invalid Phone number');
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Invalid name');
    } else {
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      //Write to firebase
      firebase
        .database()
        .ref('users/' + User.phone)
        .set({
          name: this.state.name,
        });

      this.props.navigation.navigate('App');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.submitForm}>
          <Text>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginScreen;

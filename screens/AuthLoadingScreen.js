import React from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, View} from 'react-native';
import User from '../User';
import firebase from 'firebase';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    var firebaseConfig = {
      apiKey: 'AIzaSyDt0kq25xUw0Oc_FOTavz3Vfp9TlDKTR1M',
      authDomain: 'mychatapp-e6cf0.firebaseapp.com',
      databaseURL: 'https://mychatapp-e6cf0.firebaseio.com',
      projectId: 'mychatapp-e6cf0',
      storageBucket: 'mychatapp-e6cf0.appspot.com',
      messagingSenderId: '638726754804',
      appId: '1:638726754804:web:c063e2f8ce3b85237ba9a1',
    };
    firebase.initializeApp(firebaseConfig);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;

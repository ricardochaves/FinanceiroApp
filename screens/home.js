import React from 'react';
import { Button, View, DatePickerAndroid } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  test = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button title="Sessão de fotos" onPress={() => navigate('Photo')} />
        <Button title="Total diário" onPress={() => navigate('Rel1')} />
        <Button title="Total categoria" onPress={() => navigate('Category')} />
        <Button title="teste" onPress={() => this.test()} />
      </View>
    );
  }
}

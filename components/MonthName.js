import React from 'react';
import { Text, View } from 'react-native';

export class MonthName extends React.PureComponent {
  _month_text = m => {
    months = {
      '0': 'Janeiro',
      '1': 'Fevereiro',
      '2': 'Março',
      '3': 'Abril',
      '4': 'Maio',
      '5': 'Junho',
      '6': 'Julho',
      '7': 'Agosto',
      '8': 'Setembro',
      '9': 'Outubro',
      '10': 'Novembro',
      '11': 'Dezembro',
    };
    return months[m];
  };

  render() {
    return (
      <View>
        <Text>{this._month_text(this.props.m)}</Text>
      </View>
    );
  }
}

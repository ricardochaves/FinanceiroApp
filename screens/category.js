import React from 'react';
import { FlatList, View, ActivityIndicator, Text, Button, DatePickerAndroid } from 'react-native';
import { SecureStore } from 'expo';

export default class Category extends React.Component {
  static navigationOptions = {
    title: 'Valor por categoria',
  };

  constructor(props) {
    super(props);
    let d = new Date();
    this.state = {
      isLoading: true,
      month: d.getMonth(),
      year: d.getFullYear(),
      statusCode: 0,
      data: [],
    };
  }

  _selectDate = async () => {
    const { action, year, month, day } = await DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: new Date(),
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      // Selected year, month (0-11), day

      this.setState({
        month: month,
        year: year,
      });
      this._start();
    }
  };

  _getApiData = async () => {
    const token = await SecureStore.getItemAsync('secure_token');

    let headers = { 'Content-Type': 'application/json', Authorization: 'JWT ' + token };

    year = this.state.year;
    month = this.state.month;

    endDate = new Date();
    endDate.setFullYear(year);
    endDate.setMonth(month + 1, 0);
    firstDate = new Date(year, month, 1);

    stringEndDate =
      endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();
    stringFirstDate = year + '-' + (month + 1) + '-01';

    url =
      'http://www.iluvatar.com.br/api/v1/records/?format=json&create_date_time_after=' +
      stringFirstDate +
      '&create_date_time_before=' +
      stringEndDate;

    let response = await fetch(url, { headers });
    let json_data = await response.json();

    this.setState({
      statusCode: response.status,
      data: json_data,
    });
  };

  _build_data_list = () => {
    function formatdate(stingdate) {
      return stingdate.split('T')[0].split('-')[2];
    }

    data = this.state.data;
    new_data = {};

    data.forEach(element => {
      if (new_data[element.category.name]) {
        new_data[element.category.name] = new_data[element.category.name] + +element.debit;
      } else {
        new_data[element.category.name] = +element.debit;
      }
    });

    new_a = [];
    Object.keys(new_data).forEach(function(key) {
      o = {
        category: key,
        debit: new_data[key],
      };

      new_a.push(o);
    });

    this.setState({
      isLoading: false,
      dataSource: new_a,
    });
  };

  _start = () => {
    this._getApiData().then(() => {
      statusCode = this.state.statusCode;

      if (statusCode == 401) {
        const { navigate } = this.props.navigation;
        navigate('Login');
        return;
      }

      if (statusCode != 200) {
        console.log('erro');
        console.log(statusCode);
        return;
      }
      this._build_data_list();
    });
  };

  componentDidMount() {
    this._start();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Button title="Selecione a Data" onPress={() => this._selectDate()} />
        <Text>{this.state.month + 1}</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <Text>
              {item.category} - {item.debit}
            </Text>
          )}
          keyExtractor={item => {
            return item.category; // Não usar número, não sei porque ainda...
          }}
        />
      </View>
    );
  }
}

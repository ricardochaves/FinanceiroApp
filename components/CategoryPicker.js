import React from 'react';
import { Picker } from 'react-native';

export class CategoryPicker extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _get_categorys = () => {
    categorys = [
      {
        name: 'Ricardo',
        value: 'oi',
        id: '1',
      },
      {
        name: 'Isabele',
        value: 'oi2',
        id: '2',
      },
    ];
    return categorys;
  };

  render() {
    return (
      <Picker
        selectedValue={this.props.selectedValue}
        style={{ height: 50, width: 300 }}
        //onValueChange={(itemValue, itemIndex) => this.setState({ value: itemValue })}
        onValueChange={this.props.onValueChange}
      >
        <Picker.Item label="Todos" value="all" key="0" />
        {this._get_categorys().map(key => {
          return <Picker.Item label={key.name} value={key.value} key={key.id} />;
        })}
      </Picker>
    );
  }
}

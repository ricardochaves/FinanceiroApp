import React from 'react';
import { View, Label } from 'react-native';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: true,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{ height: 150 }}>
        <Label style={{ height: 50 }} />
        <Label style={{ height: 0 }} />
      </View>
    );
  }
}

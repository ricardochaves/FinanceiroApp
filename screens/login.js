import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  View,
  TextInput
} from "react-native";
import { SecureStore } from "expo";

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };
  constructor(props) {
    super(props);
    this.state = {
      press: false,
      user: "",
      pass: "",
      token: "",
      error: "mensagem"
    };
  }

  executeLogin(user, pass) {
    function processResponse(response) {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]).then(res => ({
        statusCode: res[0],
        data: res[1]
      }));
    }

    const { navigate } = this.props.navigation;
    let headers = { "Content-Type": "application/json" };
    data = { username: user, password: pass };

    return fetch("http://www.iluvatar.com.br/api/v1/api-token-auth/", {
      method: "POST",
      body: JSON.stringify(data),
      headers
    })
      .then(processResponse)
      .then(res => {
        const { statusCode, data } = res;
        if (statusCode == 200) {
          this.setState(
            {
              isLoading: false,
              dataSource: data
            },
            function() {}
          );
          return data.token;
        } else {
          this.setState({ error: data.detail });
          throw new Exception();
        }
      })
      .then(token => {
        SecureStore.setItemAsync("secure_token", token);
      })
      .then(() => {
        navigate("Home");
      })
      .catch(e => {
        console.error(e);
        this.state.error = e;
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TextInput
            style={{
              height: 40,
              width: 100,
              borderColor: "gray",
              borderWidth: 1
            }}
            onChangeText={user => this.setState({ user })}
            value={this.state.user}
          />
          <TextInput
            style={{
              height: 40,
              width: 100,
              borderColor: "gray",
              borderWidth: 1
            }}
            onChangeText={pass => this.setState({ pass })}
            value={this.state.pass}
          />
          <Text style={{ height: 40, width: 100 }}>{this.state.error}</Text>
          <Button
            title="Login"
            onPress={() => this.executeLogin(this.state.user, this.state.pass)}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 193
  },
  container: {
    flex: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  red: {
    color: "red"
  },
  blue: {
    color: "blue"
  },
  green: {
    color: "green"
  },
  btnEye: {
    position: "absolute",
    top: 55,
    right: 28
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: "rgba(0,0,0,0.2)"
  }
});

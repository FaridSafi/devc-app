import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import React from "react";

const uniqueId = require("react-native-unique-id");

export default class Profile extends React.Component {
  state = {
    id: null,
    name: "",
    job: "",
    search: "",
    findMe: ""
  };
  componentDidMount() {
    uniqueId()
      .then(id =>
        this.setState({
          id
        })
      )
      .catch(error => alert(error));
  }
  render() {
    if (this.state.id) {
      return (
        <ScrollView style={{ marginHorizontal: 10 }}>
          <TextInput
            underlineColorAndroid="transparent"
            maxLength={20}
            placeholder="Nom"
            style={styles.textInput}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
          <TextInput
            underlineColorAndroid="transparent"
            maxLength={50}
            placeholder="Job"
            style={styles.textInput}
            value={this.state.job}
            onChangeText={job => this.setState({ job })}
          />
          <TextInput
            underlineColorAndroid="transparent"
            maxLength={160}
            placeholder="Ma recherche"
            style={styles.textInput}
            value={this.state.search}
            onChangeText={search => this.setState({ search })}
          />
          <TextInput
            underlineColorAndroid="transparent"
            maxLength={160}
            placeholder="Comment me trouver"
            style={[
              styles.textInput,
              { marginBottom: Platform.OS === "ios" ? 5 : 10 }
            ]}
            value={this.state.findMe}
            onChangeText={findMe => this.setState({ findMe })}
          />

          <Button
            title="Sauvegarder"
            onPress={() => {
              const user = {
                id: this.state.id,
                name: this.state.name,
                job: this.state.job,
                search: this.state.search,
                findMe: this.state.findMe
              };

              fetch("https://devcparis1.now.sh", {
                method: "POST",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(user)
              })
                .then(response => response.json())
                .then(response => {
                  alert(response.msg);
                })
                .catch(err => {
                  alert(err);
                });
            }}
          />
        </ScrollView>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    height: 40,
    marginTop: 10,
    paddingHorizontal: 10
  }
});

import { FlatList, StyleSheet, Text, View } from "react-native";

import React from "react";

class List extends React.Component {
  state = {
    refreshing: true,
    users: []
  };
  getData = () => {
    fetch("https://devcparis1.now.sh")
      .then(response => response.json())
      .then(response => {
        this.setState({
          refreshing: false,
          users: response
        });
      })
      .catch(err => {
        this.setState({
          refreshing: false
        });
        // alert(err);
      });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <FlatList
        onRefresh={() => {
          this.setState({ refreshing: true }, () => {
            this.getData();
          });
        }}
        style={{
          flex: 1,
          backgroundColor: "#F6F6F6"
        }}
        data={this.state.users}
        refreshing={this.state.refreshing}
        renderItem={({ item }) => (
          <View
            style={{
              borderBottomColor: "#FFF000",
              borderBottomWidth: 1,
              padding: 10,
              backgroundColor: "white"
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.job}</Text>
            <Text>{item.search}</Text>
            <Text>{item.findMe}</Text>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  }
});

export default List;

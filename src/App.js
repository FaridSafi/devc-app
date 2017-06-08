import { Platform, StyleSheet, View } from "react-native";
import React, { PureComponent } from "react";
import { SceneMap, TabBar, TabViewAnimated } from "react-native-tab-view";

import List from "./List";
import Profile from "./Profile";

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: "#F6F6F6" }]}>
    <Profile />
  </View>
);
const SecondRoute = () => <View style={[styles.container]}><List /></View>;

export default class TabViewExample extends PureComponent {
  state = {
    index: 0,
    routes: [{ key: "1", title: "Profil" }, { key: "2", title: "Liste" }]
  };

  _handleChangeTab = index => this.setState({ index });

  _renderHeader = props => (
    <TabBar
      {...props}
      style={{ paddingTop: Platform.OS === "ios" ? 15 : 25 }}
    />
  );

  _renderScene = SceneMap({
    "1": FirstRoute,
    "2": SecondRoute
  });

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

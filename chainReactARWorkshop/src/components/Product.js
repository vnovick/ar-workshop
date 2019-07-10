import React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
export const Product = ({
  title,
  description,
  price,
  photo,
  showModel
}) => (
  <View
    style={{
      ...styles.panel,
      width: Dimensions.get("window").width
    }}
  >
    <Text style={styles.panelTitle}>{title}</Text>
    <Text style={styles.panelSubtitle}>
      {description}
    </Text>
    <Text style={styles.panelTitle}>{price}</Text>
    <TouchableOpacity onPress={showModel}>
      <Image
        style={styles.photo}
        source={photo}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => alert("Buy")}
      style={styles.panelButton}
    >
      <Text style={styles.panelButtonTitle}>
        Buy
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: "#f7f5eee8"
  },
  header: {
    backgroundColor: "#f7f5eee8",
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  cartNotifications: {
    backgroundColor: "red",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  cartNotificationsText: {
    color: "#ffffff"
  },
  panelTitle: {
    fontSize: 27,
    height: 35
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#318bfb",
    alignItems: "center",
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white"
  },
  photo: {
    width: "100%",
    height: 225,
    marginTop: 30
  }
});

import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "reanimated-bottom-sheet";
import {
  ScrollView,
  TouchableOpacity
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";

export default class Example extends React.Component {
  renderInner = () => (
    <ScrollView horizontal pagingEnabled>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>
          Product No 1
        </Text>
        <Text style={styles.panelSubtitle}>
          This is my awesome product
        </Text>
        <Text style={styles.panelTitle}>20$</Text>
        <TouchableOpacity
          onPress={() => {
            alert("Load model");
          }}
        >
          <Image
            style={styles.photo}
            source={require("./assets/airport-photo.jpg")}
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
    </ScrollView>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <BottomSheet
          ref={this.bs}
          snapPoints={[500, 200, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
        />
        <TouchableWithoutFeedback
          onPress={() =>
            this.bs.current.snapTo(2)
          }
        >
          <View style={{ flex: 1 }}>
            <View style={styles.screenHeader}>
              <TouchableOpacity>
                <View>
                  <Icon
                    name="cart-outline"
                    size={40}
                    style={{ color: "#FFFFFF" }}
                  />
                  <View
                    style={
                      styles.cartNotifications
                    }
                  >
                    <Text
                      style={
                        styles.cartNotificationsText
                      }
                    >
                      3
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161637"
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  panel: {
    height: 600,
    width: 380,
    padding: 20,
    backgroundColor: "#f7f5eee8"
  },
  screenHeader: {
    position: "absolute",
    top: 0,
    zIndex: 2,
    bottom: 0,
    right: 10,
    backgroundColor: "transparent"
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
  panelHeader: {
    alignItems: "center"
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10
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
  },
  map: {
    height: "100%",
    width: "100%"
  }
});

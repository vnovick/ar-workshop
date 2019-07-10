import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { ViroARSceneNavigator } from "react-viro";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "reanimated-bottom-sheet";
import {
  ScrollView,
  TouchableOpacity
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import { ARScene } from "../ARScene";
import { Product } from "./Product";
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo'

const GET_PRODUCTS = gql`
subscription getProducts {
  products {
    id
    title
    description
    price
    photo
    model {
      url,
      resources {
        url
        type
      }
    }
  }
}
`;

const productList = [
  {
    id: "12312-12312-312-31-23-135345",
    title: "Product 1",
    description: "bla bla bla",
    price: "20$",
    photo: require("./assets/airport-photo.jpg"),
    model:
      "https://s3-us-west-2.amazonaws.com/ar-files-vnovick/Lamborghini_Aventador.obj",
    resources: [
      {
        type: "roughnessTexture",
        uri:
          "https://s3-us-west-2.amazonaws.com/ar-files-vnovick/Lamborginhi+Aventador_gloss.jpeg"
      },
      {
        type: "metalnessTexture",
        uri:
          "https://s3-us-west-2.amazonaws.com/ar-files-vnovick/Lamborginhi+Aventador_spec.jpeg"
      },
      {
        type: "diffuseTexture",
        uri:
          "https://s3-us-west-2.amazonaws.com/ar-files-vnovick/Lamborginhi+Aventador_diffuse.jpeg"
      }
    ]
  },
  {
    id: "12312-12312-312-31-23-345345345",
    title: "Product 2",
    description: "bla bla bla",
    price: "20$",
    photo: require("./assets/airport-photo.jpg"),
    model:
      "https://ar-files-vnovick.s3-us-west-2.amazonaws.com/Sofa+GM+Plutone_OBJ.obj",
    resources: [
      {
        type: "roughnessTexture",
        uri:
          "https://ar-files-vnovick.s3-us-west-2.amazonaws.com/Cloth_Sofa+GM+Plutone_Bump.jpg"
      },
      {
        type: "diffuseTexture",
        uri:
          "https://ar-files-vnovick.s3-us-west-2.amazonaws.com/Cloth_Sofa+GM+Plutone_Dif.jpg"
      }
    ]
  }
];

export default class Example extends React.Component {
  renderInner = ({ products }) => () => (
    <ScrollView horizontal pagingEnabled>
      {products.map(product => (
        <Product
          key={product.id}
          {...product}
          showModel={() => {
            if (this.arSelectorRef.current) {
              this.arSelectorRef.current.reset();
            }
            this.setState({
              productId: product.id
            });
          }}
        />
      ))}
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

  state = {
    productId: null
  };

  arSelectorRef = React.createRef();

  render() {
    return (
      <SafeAreaView style={styles.container}>
       <Subscription subscription={GET_PRODUCTS}>
       {({ data, loading, error}) => {
         if (data) {
           return (
             <>
                <BottomSheet
                  ref={this.bs}
                  snapPoints={[500, 200, 0]}
                  renderContent={this.renderInner(data)}
                  renderHeader={this.renderHeader}
                  initialSnap={1}
                />
                  <View style={styles.container}>
                    <ViroARSceneNavigator
                      apiKey="1839C275-6929-45AF-B638-EF2DEE44C1D9"
                      initialScene={{
                        scene: ARScene
                      }}
                      viroAppProps={{
                        product: data.products.filter(
                          product =>
                            product.id ===
                            this.state.productId
                        ),
                        arSelectorRef: this.arSelectorRef
                      }}
                    />
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
          </>
           )
         }
         if (error) {
           return <View><Text>{JSON.stringify(error)}</Text></View>
         }
         return <View style={styles.loader}><ActivityIndicator size="large"/></View>
       }}
       </Subscription>
      </SafeAreaView>
    );
  }
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute', height: '100%', justifyContent: 'center', alignItems: 'center', top: 0, right: 0, left: 0, bottom: 0, zIndex: 3
  },
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

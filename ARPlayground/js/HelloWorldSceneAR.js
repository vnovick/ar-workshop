"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroARScene,
  ViroARPlaneSelector,
  ViroText,
  ViroConstants,
  ViroQuad,
  ViroBox,
  ViroMaterials,
  ViroDirectionalLight,
  ViroAmbientLight
} from "react-viro";

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(
      this
    );
  }

  render() {
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
      >
        <ViroDirectionalLight
          intensity={3000}
          color="#ffffff"
          direction={[-5, -2, -1]}
        />
        <ViroARPlaneSelector>
          <ViroText
            text={this.state.text}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            style={styles.helloWorldTextStyle}
          />
          <ViroBox
            dragType="FixedToWorld"
            onDrag={() => {}}
            materials={["box"]}
            scale={[0.5, 0.5, 0.5]}
            position={[1, -1, -1]}
            physicsBody={{
              type: "dynamic",
              mass: 1
            }}
          />
          <ViroBox
            dragType="FixedToWorld"
            onDrag={() => {}}
            materials={["box"]}
            scale={[0.5, 0.5, 0.5]}
            position={[0, -1, -1]}
            physicsBody={{
              type: "dynamic",
              mass: 1
            }}
          />
          <ViroBox
            dragType="FixedToWorld"
            onDrag={() => {}}
            materials={["box"]}
            scale={[0.5, 0.5, 0.5]}
            position={[-1, -1, -1]}
            physicsBody={{
              type: "Dynamic",
              mass: 1
            }}
          />
          <ViroQuad
            rotation={[90, 0, 0]}
            position={[0, -3, -1]}
            width={15}
            height={15}
            materials={["quad"]}
            physicsBody={{
              type: "Static"
            }}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (
      state == ViroConstants.TRACKING_NONE
    ) {
      // Handle loss of tracking
    }
  }
}

ViroMaterials.createMaterials({
  box: {
    shininess: 5.0,
    diffuseColor: "#ffffff",
    lightingModel: "Blinn"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.2)"
  }
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldSceneAR;

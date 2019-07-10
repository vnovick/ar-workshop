import React, {
  useEffect,
  useState,
  useRef
} from "react";
import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroDirectionalLight,
  ViroSpotLight,
  ViroQuad,
  ViroARPlaneSelector
} from "react-viro";

export const ARScene = ({
  arSceneNavigator: { viroAppProps }
}) => {
  let productResources;

  // Set initial rotation
  const [rotation, setRotation] = useState([
    0,
    0,
    0
  ]);

  // Set initial scale
  const [scale, setScale] = useState([
    0.001,
    0.001,
    0.001
  ]);

  //Set ref for 3dobject
  const ar3dModelRef = useRef(null);

  const onPinch = (
    pinchState,
    scaleFactor,
    source
  ) => {
    const newScale = scale.map(x => {
      return x * scaleFactor;
    });

    //pinch state 3 is the end of pinch
    if (pinchState == 3) {
      setScale(newScale);
      return;
    }

    //Ref will always be on current obj prop
    ar3dModelRef.current.setNativeProps({
      scale: newScale
    });
  };

  const onRotate = (
    rotateState,
    rotationFactor,
    source
  ) => {
    const newRotation = scale.map((x, index) => {
      return index === 1 ? x - rotationFactor : x;
    });

    if (rotateState == 3) {
      setRotation(newRotation);
      return;
    }
    //update rotation using setNativeProps
    ar3dModelRef.current.setNativeProps({
      rotation: newRotation
    });
  };

  useEffect(() => {
    const isProductExist =
      viroAppProps.product &&
      viroAppProps.product.length > 0;
    if (isProductExist) {
      const materials = viroAppProps.product[0].resources.reduce(
        (acc, resource) => ({
          ...acc,
          [resource.type]: {
            uri: resource.uri
          }
        }),
        {}
      );
      ViroMaterials.createMaterials({
        modelMaterial: {
          lightingModel: "Lambert",
          ...materials
        }
      });

      productResources = viroAppProps.product[0].resources.map(
        resource => resource.uri
      );
    }
  }, [viroAppProps]);
  const isProductExist =
    viroAppProps.product &&
    viroAppProps.product.length > 0;
  return (
    <ViroARScene>
      <ViroDirectionalLight
        color="#ffffff"
        direction={[0, -1, -2]}
        shadowOrthographicPosition={[0, 8, -2]}
        shadowOrthographicSize={5}
        shadowNearZ={1}
        shadowFarZ={4}
        castsShadow={true}
      />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={25}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#ffffff"
        castsShadow={true}
        shadowMapSize={2048}
        shadowNearZ={2}
        shadowFarZ={5}
        shadowOpacity={0.7}
      />
      {isProductExist && (
        <ViroARPlaneSelector
          ref={viroAppProps.arSelectorRef}
        >
          <Viro3DObject
            ref={ar3dModelRef}
            source={{
              uri: viroAppProps.product[0].model
            }}
            resources={productResources}
            onLoadEnd={data => {
              alert("Model Loaded");
            }}
            materials={["modelMaterial"]}
            onError={event => {
              alert("Some error");
            }}
            onDrag={() => {}}
            onPinch={onPinch}
            onRotate={onRotate}
            scale={scale}
            position={[0, 0, 0]}
            rotation={rotation}
            dragType="FixedToWorld"
            type="OBJ"
            castsShadow={true}
          />
          <ViroQuad
            arShadowReceiver={true}
            rotation={[-90, 0, 0]}
            position={[0, -0.01, 0]}
            width={10}
            height={10}
          />
        </ViroARPlaneSelector>
      )}
    </ViroARScene>
  );
};

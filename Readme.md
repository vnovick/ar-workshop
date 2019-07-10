# Welcome to React Native AR and GraphQL workshop

In this workshop, taught at ChainReact2019 and will walk through creating basic Ikea like Store app where we will be able to see products in Augmented Reality, scale them, rotate, them, move around in real world and interact with them. 

### Topics that we will cover include

- Getting started with AR for React Native
- 3D coordinate systems
- Lighting and textures fundamentals
- Creating dedicated AR views in your React Native apps
- Creating AR content and positioning it in the real world
- Working with 3d models
- Working with UI in AR
- AR Portals
- User inputs and animations
- Applying Physics
- Getting AR data from GraphQL endpoint and rendering in your app
- Adding real time capabilities to your AR apps with GraphQL subscriptions

## Step0 - Having your machine ready before workshop

You'll be able to write AR in React Native for either iOS, Android, or both. Let's make sure your machine is ready to get rolling.

It's important that you are able to run a ["Hello World" AR app using ViroReact](https://docs.viromedia.com/docs/quick-start) **BEFORE** this workshop, even if you're not familiar with the steps.

We'll go over all the installation at the very beginning, but it's crucial you will have a basic setup, so you can focus on creating an app.



## Step1 - Understanding AR

In this section you will put to test various AR capabilities

- Create 3 boxes and position them in pyramid in front of the viewer (`ViroBox`)

- Add Directional light (`ViroDirectionalLight`)

- Create 3 different materials with different lighting models and colors (`ViroCreateMaterials`)

- Use `ARPlaneSelector` and `Portal` to create walkable portal

- Create surface plane and add physics to these boxes

- Add reset `ARPlaneSelector` functionality

  

  

## Step2 - Integrating Viro into existing React Native app

- Install latest **ViroMedia** app from AppStore or PlayStore

- Init react native with latest compatible release version from Viro [docs](https://docs.viromedia.com/docs/releases)

- ```bash
  react-native init chainReactARWorkshop --version react-native@0.59.3
  ```

- For this workshop we will be using [osdnk/reanimated-bottom-sheet](https://github.com/osdnk/react-native-reanimated-bottom-sheet)

  ```bash
  yarn add react-native-vector-icons
  yarn add react-navigation
  yarn add reanimated-bottom-sheet
  yarn add react-native-reanimated
  yarn add react-native-gesture-handler
  react-native link react-native-reanimated
  react-native link react-native-vector-icons
  react-native link react-native-gesture-handler
  ```

- Take [Map](https://github.com/osdnk/react-native-reanimated-bottom-sheet/blob/master/Example/Map.js) example from **reanimated-bottom-sheet** and convert it to look according to our requirements. 

  - Our app should have two screens - `Home screen` and `Shop` screen
  - Shop screen should show a view with cart on the top right corner with notifications 
  - It will have reanimated-bottom-sheet for our store navigation

###  Add Viro to existing app.

https://docs.viromedia.com/docs/integrating-with-react-native-projects

`yarn add react-viro@2.14.0`

#### iOS

create Podfile under ios folder with:

```
platform :ios, '9.3'
target 'chainReactARWorkshop' do
  use_frameworks!
  pod 'ViroReact', :path => '../node_modules/react-viro/ios/'
  pod 'ViroKit', :path => '../node_modules/react-viro/ios/dist/ViroRenderer/'
end
```

```bash
cd ios
pod install
```

- sign your app with valid AppleDeveloper account

- change ios target in `Xcode` to `9.3`
- Fix `GVRSDK` error
- Build

### Android

https://docs.viromedia.com/docs/integrating-with-react-native-projects

 

## Step 3 - add obj 3d models to your scene

- Create  `Viro3dObject` to the scene when user clicks on model picker. Model should be draggable

  > Remember that you need to set textures in materials - there is no mtl supplied here.

Car:

| type             | url                                                          | Scale                                             |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------- |
| model            | https://s3-us-west-2.amazonaws.com/ar-files-vnovick/Lamborghini_Aventador.obj | {"scaleZ":0.0001,"scaleX":0.0001,"scaleY":0.0001} |
| roughnessTexture | https://s3-us-west-2.amazonaws.com/ar-files-vnovick/Lamborginhi+Aventador_gloss.jpeg |                                                   |
| metalnessTexture | https://s3-us-west-2.amazonaws.com/ar-files-vnovick/Lamborginhi+Aventador_spec.jpeg |                                                   |
| diffuseTexture   | https://s3-us-west-2.amazonaws.com/ar-files-vnovick/Lamborginhi+Aventador_diffuse.jpeg |                                                   |

Sofa:

| type            | url                                                          | Scale                                       |
| --------------- | ------------------------------------------------------------ | ------------------------------------------- |
| model           | https://ar-files-vnovick.s3-us-west-2.amazonaws.com/Sofa+GM+Plutone_OBJ.obj | {"scaleZ":0.01,"scaleX":0.01,"scaleY":0.01} |
| bumpnessTexture | https://ar-files-vnovick.s3-us-west-2.amazonaws.com/Cloth_Sofa+GM+Plutone_Bump.jpg |                                             |
| diffuseTexture  | https://ar-files-vnovick.s3-us-west-2.amazonaws.com/Cloth_Sofa+GM+Plutone_Dif.jpg |                                             |

- Add functionality - when different model is picked (Reset ARPlaneSelector or use manual  Anchoring)

  >Bonus: Add scaling capabilities:

  `OnPinch`

  ```react
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
  ```

  `onRotate`

  ```react
  const onRotate = (
      rotateState,
      rotationFactor,
      source
    ) => {
      const newRotation = scale.map(x => {
        return x - rotationFactor;
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
  
  ```

  



## Step 4 - Model GraphQL server

- model database. There should be products, price, description, 3d model for every product and it's scale, resources etc.

```json
const productList = [
  {
    id: "12312-12312-312-31-23-135345",
    title: "Product 1",
    description: "bla bla bla",
    price: "20$",
    photo: 'photo-url',
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
    photo: 'photo-url',
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
```



## Step 5 - Finalize our store (Homework)

- create a screen with list of products that are in cart
- when clicking Buy, product will change it's state to in-cart
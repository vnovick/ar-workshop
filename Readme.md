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



## Step1 - Integrating Viro into existing React Native app

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

- Add Viro to existing app.

- 

  




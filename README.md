This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Assumptions Considered During Development

### User Input
- Users will enter valid data (e.g., numbers for duration, non-empty names).

### Timer Accuracy
- `setInterval` will work accurately without delays.

### Local Storage
- `AsyncStorage` will always function correctly without errors.

### Progress Bar
- The progress bar will update smoothly without lag.

### History Log
- The history log will only store completed timers.

### Customizable Alerts
- Only halfway alerts (50%) are supported.

### Navigation
- The application consists of three screens:
  1. Home
  2. History
  3. New Timer

### Third-Party Libraries
- The following libraries will function as expected:
  - React Navigation
  - AsyncStorage
  - Vector Icons

### UI/UX
- The interface is intuitive and does not require additional instructions.

### Themes
- Only a light theme is used.

### Export Timer Data
- Export functionality is included and allows sharing as a message.

### Permissions
- No special permissions are required.



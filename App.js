// ============================================================================
// FILE: App.js
// ============================================================================
//
// PURPOSE:
// This is the root entry point of the React Native application. It sets up the
// core navigation structure and wraps the entire app with necessary providers
// like SafeAreaView and NavigationContainer.
//
// WHAT IT DOES:
// - Imports React and navigation components
// - Creates the main App component that renders first
// - Wraps navigation in SafeAreaView for notch/status bar safety
// - Provides navigation context to the entire app
// - Renders the RootNavigator (bottom tab navigation)
//
// WHY IT'S NEEDED:
// Every React Native app needs an entry point that initializes the app structure.
// This file establishes navigation, handles safe area insets for modern devices,
// and serves as the foundation upon which all other screens and components are built.
//
// ============================================================================

import React from 'react';

// Explanation: This line imports the React library, which is the core framework
// for building user interfaces in React Native. React provides the fundamental
// tools for creating components, managing their state and lifecycle, and
// transforming JSX syntax into JavaScript. Even though we don't directly
// reference React in modern code, it's required for JSX to work because JSX gets
// transformed into React.createElement() calls behind the scenes by Babel. This
// import makes React available in the current file's scope so the JSX
// transformation can access it.

import { SafeAreaView } from 'react-native';

// Explanation: This line imports SafeAreaView, a built-in React Native component
// that automatically adds padding to your content to avoid rendering under
// device-specific UI elements like notches, status bars, rounded corners, and
// home indicators. Modern smartphones have irregular screen shapes (like iPhone's
// notch or Android's camera cutouts), and without SafeAreaView, your content
// could be partially hidden behind these elements. We use curly braces { }
// because SafeAreaView is a named export from the react-native package, not the
// default export.

import { NavigationContainer } from '@react-navigation/native';

// Explanation: This line imports NavigationContainer from the React Navigation
// library, which is the required root wrapper for all navigation functionality in
// your app. NavigationContainer manages the entire navigation state tree (which
// screens are active, navigation history, passed parameters), provides navigation
// context to all child components through React's Context API, handles device
// integration like the Android back button and iOS swipe gestures, and enables
// deep linking. You must use NavigationContainer exactly once in your app,
// wrapping all navigators at the root level.

import RootNavigator from './src/navigation/RootNavigator';

// Explanation: This line imports our custom RootNavigator component from the file
// located at ./src/navigation/RootNavigator.js (the .js extension is optional
// when importing). RootNavigator is where we define our app's navigation
// structure, including which screens exist, how they're organized (in our case,
// using bottom tabs with nested stacks), and their configuration options. By
// separating navigation logic into its own file, we keep App.js clean and focused
// on app-level setup, following the principle of separation of concerns.

const App = () => {

// Explanation: This line declares a functional component named App using ES6
// arrow function syntax and assigns it to a constant variable. Functional
// components are the modern, preferred way to create React components because
// they're simpler, more concise, easier to test, and work seamlessly with React
// Hooks for managing state and side effects. The empty parentheses () indicate
// this component doesn't accept any props (input parameters). This App component
// serves as the root of our entire application's component tree.

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/* Explanation: This line renders SafeAreaView as the outermost container of our
      app, with a style prop set to flex: 1. The style prop accepts an object
      (created with double curly braces: outer braces for JSX expressions, inner
      braces for the JavaScript object). The flex: 1 property is crucial because it
      tells SafeAreaView to expand and fill all available screen space using Flexbox
      layout. Without flex: 1, SafeAreaView would only be as tall as its content,
      causing the tab bar to not position at the bottom and navigation to not fill
      the entire screen properly. */}

      <NavigationContainer>

        {/* Explanation: This line wraps our navigation structure with NavigationContainer,
        which is absolutely required for React Navigation to function.
        NavigationContainer creates and manages the navigation state (current screen,
        history stack, parameters passed between screens), provides navigation and
        route objects to all screen components through React Context, handles
        platform-specific behaviors (like Android's hardware back button automatically
        navigating back), manages the navigation lifecycle, and enables deep linking to
        specific screens via URLs. All navigators and screens must be descendants of
        NavigationContainer. */}

        <RootNavigator />

        {/* Explanation: This line renders our custom RootNavigator component, which
        contains the actual navigation configuration for our app. RootNavigator defines
        a Bottom Tab Navigator with two tabs: a Home tab (containing a nested Stack
        Navigator with HomeScreen, DetailsScreen, and SettingsScreen) and a Profile tab
        (containing ProfileScreen). This demonstrates nested navigation, where each tab
        maintains its own independent navigation history. Even though we don't pass
        navigation as a prop here, RootNavigator and all screens inside it will
        automatically receive navigation and route props from NavigationContainer's
        context. */}

      </NavigationContainer>

      {/* Explanation: This closing tag ends the NavigationContainer component. In JSX,
      every opening tag must have a corresponding closing tag (or be self-closing
      like RootNavigator). NavigationContainer wraps only the RootNavigator,
      establishing the boundary of our navigation system. Everything inside
      NavigationContainer can access navigation functionality, while anything outside
      cannot. */}

    </SafeAreaView>
  );

// Explanation: This closing parenthesis and semicolon end the return statement.
// Everything between the opening return ( and this closing ); is what the App
// component renders. The semicolon is technically optional in JavaScript (due to
// automatic semicolon insertion), but it's good practice to include it for code
// clarity and to avoid potential bugs in certain edge cases.

};

// Explanation: This closing curly brace ends the App component's function
// definition. Everything between const App = () => { and this closing }; is the
// body of the App function component. When React renders App, it executes this
// function and uses the returned JSX to create the user interface. The component
// stays mounted throughout the app's lifecycle, rarely re-rendering since it has
// no props or state.

export default App;

// Explanation: This line exports the App component as the default export of this
// file, making it available for import in other files. The "default" keyword
// means other files can import it using any name (though by convention we use
// "App"), like: import App from './App' or import MyApp from './App'. This export
// is critical because index.js imports this component and registers it with
// AppRegistry, which bridges our JavaScript code to the native iOS and Android
// rendering engines. Without this export, the app wouldn't have an entry point
// and couldn't launch.

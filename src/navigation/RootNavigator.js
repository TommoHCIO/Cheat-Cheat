// ============================================================================
// FILE: src/navigation/RootNavigator.js
// ============================================================================
//
// PURPOSE:
// This file configures the bottom tab navigator that serves as the main
// navigation structure of the app, providing tabs for Home and Profile screens.
//
// WHAT IT DOES:
// - Creates a bottom tab navigator with two tabs
// - Configures tab bar icons using Ionicons
// - Sets up the HomeTab (which contains a stack navigator)
// - Sets up the ProfileTab (which renders ProfileScreen directly)
// - Customizes tab bar appearance and behavior
//
// WHY IT'S NEEDED:
// Most mobile apps use bottom tab navigation as the primary way users move
// between major sections. This file establishes that structure, making it easy
// for users to switch between browsing products (Home) and viewing their profile
// with a simple tap on the tab bar.
//
// ============================================================================

import React from 'react';

// Explanation: This imports the React library which is required for creating
// React components and using JSX syntax (the HTML-like code you'll see later).
// React is the foundation of React Native applications - it provides the
// component system, state management, and rendering logic. Without this import,
// you couldn't write functional components or use JSX tags like <Tab.Navigator>.

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Explanation: This imports a factory function from the React Navigation
// library that creates a Bottom Tab Navigator. When you call this function, it
// returns an object with two components: Navigator (the container) and Screen
// (for registering individual tabs). A Bottom Tab Navigator creates that
// familiar tab bar you see at the bottom of apps like Instagram, Twitter, or
// Facebook - it allows users to quickly switch between main sections of your
// app with a single tap. This is one of the most common navigation patterns in
// mobile apps.

import { Ionicons } from '@expo/vector-icons';

// Explanation: This imports the Ionicons icon library that comes pre-packaged
// with Expo projects. Ionicons provides over 1,300 beautiful, scalable vector
// icons that you can use throughout your app. These icons are rendered as
// vectors (not images), which means they scale perfectly to any size without
// losing quality and can be colored dynamically. We'll use this library to
// display the home and profile icons in our tab bar. You can browse all
// available icons at https://ionic.io/ionicons.

import HomeStackNavigator from './HomeStackNavigator';

// Explanation: This imports our custom HomeStackNavigator component from
// another file in the same directory (the './' means "current folder").
// HomeStackNavigator is a Stack Navigator that contains multiple screens:
// HomeScreen (product list), DetailsScreen (product details), and
// SettingsScreen (app settings). By importing a navigator as a component for
// our Home tab, we enable nested navigation - users can drill down through
// multiple screens in the Home section while the tab bar stays visible at the
// bottom. This is a powerful pattern that combines hierarchical navigation
// (Stack) with lateral navigation (Tabs).

import ProfileScreen from '../screens/ProfileScreen';

// Explanation: This imports the ProfileScreen component from the screens
// directory. The '../' means "go up one directory level" (from navigation/ to
// src/) then into screens/. Unlike the Home tab which uses a Stack Navigator
// with multiple screens, the Profile tab is just a single screen component.
// This is more efficient when you only need one screen - there's no point in
// creating a Stack Navigator wrapper if there's nothing to stack. If later you
// need to add more screens to the Profile section (like Edit Profile or Change
// Password), you could create a ProfileStackNavigator and replace this import.

const Tab = createBottomTabNavigator();

// Explanation: This line calls the createBottomTabNavigator function and
// stores the result in a constant called Tab. The function returns an object
// with two properties: Tab.Navigator (the container component that manages tabs
// and renders the tab bar) and Tab.Screen (the component for registering
// individual tabs). We use a factory function instead of importing pre-made
// components because each navigator needs its own isolated state and context -
// this ensures that if you have multiple navigators in your app, they don't
// interfere with each other. Think of this as creating a new instance of a tab
// navigation system specifically for this file.

const RootNavigator = () => {

// Explanation: This declares a functional React component named RootNavigator
// using arrow function syntax. In React, components are JavaScript functions
// that return JSX (HTML-like code that describes what should appear on screen).
// This particular component is called "Root" because it sits at the top level
// of our navigation hierarchy - it's the first navigator that gets rendered by
// App.js. The empty parentheses () mean this component doesn't receive any
// props (parameters). The arrow (=>) is modern JavaScript syntax equivalent to
// writing "function RootNavigator()". The component will return our tab
// navigator structure.

  // Explanation: The return statement specifies what this component should render
  // (display) on screen. Everything between the parentheses is JSX - a syntax
  // extension that lets you write HTML-like code in JavaScript. The parentheses
  // allow us to write the JSX on multiple lines for better readability. When
  // React renders this component, it will execute all the code inside return()
  // and display the resulting UI. Without a return statement, a React component
  // wouldn't render anything visible.
  return (
    // Explanation: This is the opening tag for the Tab Navigator container
    // component. Tab.Navigator is the main component that manages all the tab
    // navigation logic - it keeps track of which tab is currently active, renders
    // the active tab's content in the main area, displays the tab bar at the bottom
    // with icons and labels, and provides navigation context to all child screens.
    // Think of it as the stage manager of your tab-based navigation - it
    // orchestrates everything. This component must wrap all your Tab.Screen
    // components (the actual tabs). The visual structure it creates has the active
    // screen's content on top and the tab bar fixed at the bottom.
    <Tab.Navigator
      // Explanation: The screenOptions prop allows you to configure options that
      // apply to ALL tabs in this navigator, keeping your code DRY (Don't Repeat
      // Yourself). Instead of passing a simple object, we pass a function that
      // receives parameters and returns an options object. The function signature is
      // ({ route }) => ({ ...options }) - we're using destructuring to extract the
      // 'route' object from the parameters. The 'route' object contains information
      // about the current tab being rendered, including route.name (like 'Home' or
      // 'Profile'), route.key (unique identifier), and route.params (any data passed
      // to this route). We need access to route.name to determine which icon to show
      // for each tab. This function gets called once for each tab when the navigator
      // initializes and whenever the configuration needs to update.
      screenOptions={({ route }) => ({
        // Explanation: The tabBarIcon option is a function that React Navigation calls
        // to render the icon for each tab in the tab bar. This function is executed
        // once per tab every time the tab bar needs to re-render (for example, when
        // switching between tabs). The function receives three parameters automatically
        // from React Navigation: 'focused' (boolean indicating if this tab is currently
        // active), 'color' (the color to use for the icon, automatically set based on
        // whether the tab is active or not), and 'size' (recommended icon size in
        // pixels, usually 24-26). We use destructuring syntax ({ focused, color, size
        // }) to extract these three values from the parameter object. This function
        // must return a React component - in our case, an Ionicons icon component.
        tabBarIcon: ({ focused, color, size }) => {
          // Explanation: This declares a variable called 'iconName' using the 'let'
          // keyword, which means it's a variable whose value can be changed (mutable). We
          // initialize it without a value (undefined) because we'll set its value in the
          // conditional logic below based on which tab is being rendered. We need to
          // determine the correct icon name for this tab before we return the icon
          // component. The variable is scoped to this function, meaning it only exists
          // inside the tabBarIcon function and is recreated each time the function runs.
          // We use 'let' instead of 'const' because we'll be assigning different values
          // to iconName depending on the route.name.
          let iconName;

          // Explanation: This is a conditional statement that checks if the current tab's
          // name is 'Home'. The route.name property contains the string identifier we set
          // in the Tab.Screen's name prop. The === operator checks for strict equality
          // (both value and type must match). This if statement starts a decision tree
          // that determines which icon to display based on which tab is being rendered.
          // Since the tabBarIcon function is called once for each tab, route.name will be
          // 'Home' when rendering the Home tab's icon and 'Profile' when rendering the
          // Profile tab's icon. This pattern allows us to use one function for all tabs
          // while customizing the icon for each.
          if (route.name === 'Home') {
            // Explanation: This line uses a ternary operator (a shorthand if-else
            // statement) to set the iconName variable. The syntax is: condition ?
            // valueIfTrue : valueIfFalse. Here we're checking the 'focused' boolean: if
            // true (the Home tab is currently active), we set iconName to 'home' (a filled
            // home icon); if false (the Home tab is inactive), we set iconName to
            // 'home-outline' (a hollow/outlined home icon). This creates a visual pattern
            // seen in popular apps like Instagram and Twitter - the active tab shows a
            // solid icon while inactive tabs show outlined icons. This provides clear
            // visual feedback to users about which section they're currently viewing. Both
            // 'home' and 'home-outline' are valid icon names from the Ionicons library.
            iconName = focused ? 'home' : 'home-outline';
          // Explanation: This is the second part of our conditional logic that handles
          // the Profile tab. The 'else if' means "if the previous condition was false,
          // check this condition". Since we already handled the 'Home' case above, this
          // block only executes when route.name is NOT 'Home'. We check if route.name
          // equals 'Profile' using the strict equality operator (===). If this condition
          // is true, the code in the block below will execute to set the appropriate icon
          // for the Profile tab. If you add more tabs later (like Search or Settings),
          // you would add more 'else if' blocks here to handle those tabs' icons.
          } else if (route.name === 'Profile') {
            // Explanation: Similar to the Home tab's icon logic, this ternary operator sets
            // the iconName for the Profile tab. If 'focused' is true (the Profile tab is
            // currently active), we use 'person' (a filled person icon). If 'focused' is
            // false (the Profile tab is inactive), we use 'person-outline' (a hollow person
            // silhouette). The person icon is a universal symbol for user profiles, account
            // settings, and personal information - users immediately recognize it. The
            // outline/filled pattern provides the same visual feedback as the Home tab:
            // solid icon = you're here, outlined icon = you can go here. This consistent
            // pattern across tabs helps users build a mental model of the interface.
            iconName = focused ? 'person' : 'person-outline';
          }

          // Explanation: This closing brace ends the if-else conditional block that
          // determined which icon name to use. At this point, the iconName variable has
          // been set to one of four possible values: 'home', 'home-outline', 'person', or
          // 'person-outline', depending on which tab is being rendered and whether it's
          // currently active. Now we can use this iconName value to render the actual
          // icon component.

          // Explanation: This line returns the actual icon component that will be
          // displayed in the tab bar. We create an Ionicons component and pass it three
          // props: 'name' is set to the iconName variable we determined above (this tells
          // Ionicons which icon to render), 'size' is the size value provided by React
          // Navigation (usually 24-26 pixels), and 'color' is the color value
          // automatically provided by React Navigation based on whether the tab is active
          // or inactive (will be 'tomato' for active tabs and 'gray' for inactive tabs,
          // as we define later). The curly braces {} allow us to insert JavaScript
          // expressions into JSX. This return statement is required because the tabBarIcon
          // function must return a React component to be rendered in the tab bar.
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Explanation: This closing brace and comma end the tabBarIcon function
        // definition. The comma is necessary because we're defining multiple properties
        // in the screenOptions object, and we need to separate them with commas (just
        // like in a regular JavaScript object). After the comma, we'll define more
        // options like tabBarActiveTintColor and tabBarInactiveTintColor that configure
        // other aspects of the tab bar's appearance.

        // Explanation: This option sets the color applied to the icon and label of the
        // currently active tab. The value 'tomato' is a CSS named color (a reddish-
        // orange color, hex value #FF6347). This color is automatically passed to the
        // tabBarIcon function as the 'color' parameter when a tab is focused. In a
        // production app, you would typically use your brand's primary color here
        // instead of 'tomato'. The word "tint" refers to the color overlay applied to
        // tab elements. Common choices include iOS blue ('#007AFF'), Material Design
        // purple ('#6200EE'), or any brand color. When choosing this color, ensure it
        // has adequate contrast against the tab bar background for accessibility - WCAG
        // AA standard requires at least 4.5:1 contrast ratio for text and icons.
        tabBarActiveTintColor: 'tomato',

        // Explanation: This option sets the color applied to tabs that are NOT
        // currently selected. Gray is a universally used color for inactive UI elements
        // because it's neutral, doesn't compete for attention, and helps the active tab
        // stand out by contrast. The color psychology here is important: the active tab
        // "pops" with a vibrant color (tomato) while inactive tabs recede into the
        // background with a muted color (gray). This naturally draws the user's eye to
        // the currently active section. This color is passed to the tabBarIcon function
        // as the 'color' parameter when a tab is not focused. You could use any neutral
        // color like '#999999', '#8E8E93' (iOS default gray), or '#666666', as long as
        // it's distinguishable from the background but clearly less prominent than the
        // active color.
        tabBarInactiveTintColor: 'gray',

        // Explanation: This option hides the header (the top navigation bar) for all
        // tabs in this Tab Navigator. Setting it to false is crucial in our app to
        // avoid having double headers stacked on top of each other. Here's why: our
        // Home tab uses HomeStackNavigator, which is a Stack Navigator that shows its
        // own headers with titles and back buttons. If we set headerShown to true here,
        // we'd have two headers: one from the Tab Navigator and one from the Stack
        // Navigator, which wastes screen space and confuses users. By hiding the Tab
        // Navigator's header, only the Stack Navigator's header shows, creating a
        // clean, single-header interface. The tab bar itself already provides context
        // about which section you're in, so we don't need a redundant header from the
        // Tab Navigator. This is a common pattern in modern app design.
        headerShown: false,
      })}
      // Explanation: This closing brace and parentheses end the screenOptions
      // function and its function call. Let's break down the syntax: the inner brace
      // } closes the object we're returning from the function (the object containing
      // tabBarIcon, tabBarActiveTintColor, etc.), the outer parentheses ) close the
      // arrow function we passed to screenOptions, and the final brace } closes the
      // function call. The syntax might look confusing, but it's: screenOptions=
      // {function returning object}. All the options we defined (icon rendering,
      // active color, inactive color, header visibility) are now configured and will
      // apply to every tab in this navigator unless a specific tab overrides them.
    >
      {/* Explanation: This closing angle bracket completes the opening Tab.Navigator
      tag. In JSX, components can be self-closing like Component or have
      children like Component with children, closing Component tag. Since our Tab.Navigator
      contains children (the Tab.Screen components for our Home and Profile tabs),
      we use the opening tag format with the closing bracket on its own line.
      Everything between this bracket and the closing Tab.Navigator tag will be
      children of the Tab.Navigator component - specifically, our Tab.Screen
      components that define the individual tabs. */}

      {/* Explanation: This creates the first tab in our tab bar - the Home tab.
      Tab.Screen is a special component that registers a screen (or in this case, a
      nested navigator) with the Tab Navigator. The 'name' prop sets the unique
      identifier for this tab as 'Home' - this is used for navigation
      (navigation.navigate('Home')), for route identification in the tabBarIcon
      function (route.name === 'Home'), and as the default tab label if you don't
      specify a custom one. The 'component' prop specifies what to render when this
      tab is active - we're passing HomeStackNavigator, which is itself a Stack
      Navigator containing multiple screens (HomeScreen, DetailsScreen,
      SettingsScreen). This is nested navigation: a Tab Navigator containing a
      Stack Navigator. The Stack Navigator allows hierarchical drill-down
      navigation within the Home tab while keeping the tab bar visible. This is
      self-closing (ends with />) because Tab.Screen doesn't need children. */}
      <Tab.Screen name="Home" component={HomeStackNavigator} />

      {/* Explanation: This creates the second tab in our tab bar - the Profile tab.
      Like the Home tab, we use Tab.Screen to register it with the Tab Navigator.
      The 'name' prop is set to 'Profile', making this tab's unique identifier. The
      key difference from the Home tab is the 'component' prop: instead of a nested
      navigator, we pass ProfileScreen, which is a single screen component. This is
      simpler and more efficient because the Profile section only needs one screen.
      We don't need a Stack Navigator if there's no additional screens to navigate
      to. If later you need to add screens to the Profile section (like Edit
      Profile, Change Password, etc.), you could create ProfileStackNavigator and
      replace ProfileScreen here. The flexibility of Tab.Screen's component prop
      allows you to pass either a single screen component or a nested navigator. */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    // Explanation: This closing tag completes the Tab.Navigator component. It
    // matches the opening Tab.Navigator tag we wrote earlier. Everything between
    // the opening and closing Tab.Navigator tags (the two Tab.Screen components)
    // are children of the Tab Navigator. React Navigation processes these children,
    // extracts their props (name, component, options), registers them in the
    // navigator's route configuration, and uses this information to render the
    // active screen's content and the tab bar with icons and labels. The closing
    // tag is required - forgetting it would cause a JSX syntax error.
  );
  // Explanation: This closing parenthesis ends the return statement that started
  // earlier. The semicolon is optional in JavaScript but is good practice for
  // clarity and preventing potential issues with automatic semicolon insertion.
  // Everything between return ( and ); is the JSX code that defines what this
  // RootNavigator component renders on screen. When React renders this component,
  // it will create a tab navigation interface with two tabs (Home and Profile),
  // custom icons that change appearance based on active state, and colored tint
  // for visual feedback.

};

// Explanation: This closing brace and semicolon end the RootNavigator
// functional component definition. The brace closes the arrow function we
// started with "const RootNavigator = () => {". At this point, the component is
// fully defined but not yet exported, meaning other files can't import and use
// it yet. The semicolon is optional but recommended for consistency and
// clarity. Everything between the opening brace and this closing brace is the
// component's implementation - in this case, a return statement that renders
// our Tab Navigator structure.

export default RootNavigator;

// Explanation: This line exports the RootNavigator component as the default
// export of this file, making it available for import in other files. The
// 'export' keyword makes something available outside this module, and 'default'
// means this is the main thing this file exports (you can have only one default
// export per file). In App.js, we can now import this component with "import
// RootNavigator from './navigation/RootNavigator'" and use it inside the
// NavigationContainer. The default export syntax allows importing with any name
// (though by convention we use the same name), while named exports require
// exact name matching. This line is essential - without it, App.js couldn't
// access and render our navigation structure, and the app wouldn't work.

// ============================================================================
// FILE: src/navigation/HomeStackNavigator.js
// ============================================================================
//
// PURPOSE:
// This file configures the stack navigator for the Home tab, managing the
// hierarchical navigation between the home screen and product detail screen.
//
// WHAT IT DOES:
// - Creates a native stack navigator using React Navigation
// - Defines two screens: HomeScreen (product list) and ProductDetailScreen
// - Configures screen options like header titles and back buttons
// - Enables push/pop navigation patterns for viewing product details
//
// WHY IT'S NEEDED:
// Mobile apps need hierarchical navigation where users can drill down into
// details and navigate back. Stack navigation provides this pattern - when you
// tap a product, you "push" the detail screen onto the stack, and the back
// button "pops" it off to return to the list.
//
// ============================================================================

import React from 'react';

// Explanation: This imports React, the core library needed to create React
// components. React allows us to build user interfaces using components, which
// are reusable pieces of code that define what appears on the screen. Even
// though we don't directly use "React" in this file, it's required for JSX
// syntax (the XML-like syntax used to define UI elements).

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Explanation: This imports the createNativeStackNavigator function from the
// React Navigation Native Stack library. This function creates a stack navigator
// that uses native iOS and Android navigation APIs for better performance. A
// stack navigator manages screens like a stack of cards - when you navigate to a
// new screen, it's placed on top of the stack, and when you go back, the top
// screen is removed. The curly braces mean we're importing a named export (not
// the default export) from the module.

import HomeScreen from '../screens/HomeScreen';

// Explanation: This imports the HomeScreen component from the screens directory.
// The HomeScreen is the main screen users see when they open the Home tab. It
// displays a list of products. The '../' means we go up one directory level from
// the current navigation folder to access the screens folder. This is a default
// export, so we don't need curly braces.

import ProductDetailScreen from '../screens/ProductDetailScreen';

// Explanation: This imports the ProductDetailScreen component, which displays
// detailed information about a specific product when a user taps on a product
// from the HomeScreen. This screen receives a product ID as a parameter through
// navigation and uses it to fetch and display comprehensive product information
// including images, description, and price.

const Stack = createNativeStackNavigator();

// Explanation: This line calls the createNativeStackNavigator function and
// stores the result in the Stack constant. The function returns an object
// containing two special React components: Stack.Navigator (the container for
// all screens) and Stack.Screen (used to define individual screens). We use
// "const" because this value never changes. The Stack object provides the
// building blocks we need to create our stack navigation structure.

const HomeStackNavigator = () => {

// Explanation: This declares a functional React component named
// HomeStackNavigator using an arrow function syntax. This component is
// responsible for setting up all the screens in the Home tab's navigation stack.
// The empty parentheses "()" mean this component doesn't accept any props (input
// parameters). The "const" keyword declares a constant variable that holds this
// function. This component will be used in the root tab navigator to handle all
// navigation within the Home tab.

  return (
    // Explanation: The return statement specifies what JSX (JavaScript XML) this
    // component will render. The opening parenthesis allows us to write the JSX
    // across multiple lines for better readability. Everything between "return ("
    // and the closing ");" defines the structure of our navigation stack that will
    // be displayed to users.

    // Stack.Navigator: This renders the Stack.Navigator component, which is the
    // container that manages all the screens in our stack. Think of it as the stage
    // manager that controls which screen is currently visible, handles transitions
    // between screens, and maintains the navigation history. All Stack.Screen
    // components must be direct children of Stack.Navigator. The self-closing tag
    // format isn't used here because we have child components (the screens) to add
    // inside.
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}
    >
      {/* This closing angle bracket completes the opening Stack.Navigator
      tag and indicates that child elements (the screen definitions) will follow.
      Everything between this and the closing Stack.Navigator tag will be the
      screens in our navigation stack. */}

      {/* Stack.Screen: This defines the first screen in our stack navigator. Stack.Screen
      is a special component that registers a screen with the navigator. It doesn't
      render anything visible itself - instead, it tells the navigator "this screen
      exists and here's how to configure it." Each Stack.Screen requires at minimum
      a "name" prop (the identifier) and a "component" prop (what to render). */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />

      {/* This self-closing tag completes the Stack.Screen definition for
      the Home screen. The "/>" syntax indicates this component has no children and
      closes in one tag. Since Stack.Screen is just a configuration component, it
      doesn't need child elements. */}

      {/* Stack.Screen: This defines the second screen in our stack navigator - the
      product detail screen. This screen will be navigated to from the HomeScreen
      when a user taps on a specific product. Like the previous Stack.Screen, this is
      a configuration component that tells the navigator about this screen's
      existence and how to set it up. */}
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          title: 'Product Details',
        }}
      />

      {/* This self-closing tag completes the Stack.Screen definition for
      the ProductDetail screen. With this, we've defined all screens in our Home
      stack: a list screen (Home) and a detail screen (ProductDetail). */}

    </Stack.Navigator>
    // Explanation: This closing tag completes the Stack.Navigator component, ending
    // the definition of our navigation stack. All the screens defined between the
    // opening Stack.Navigator and this closing Stack.Navigator tag are now registered with the
    // navigator and ready to be navigated between. The Stack.Navigator will handle
    // rendering the appropriate screen, managing transitions, and maintaining the
    // navigation history.
  );

// Explanation: This closes the return statement that began earlier. The semicolon
// ends the return statement. Everything between "return (" and ");" is what the
// HomeStackNavigator component renders - in this case, a complete stack
// navigation structure with two screens.

};

// Explanation: This closing curly brace and semicolon end the HomeStackNavigator
// function component definition. At this point, we've completely defined a
// functional React component that sets up a stack navigator containing the Home
// and ProductDetail screens.

export default HomeStackNavigator;

// Explanation: This exports the HomeStackNavigator component as the default
// export of this file, making it available to be imported in other files. The
// "default" keyword means when another file imports from this file without using
// curly braces (like: import HomeStackNavigator from './HomeStackNavigator'), it
// will get this component. This navigator will be imported in the root tab
// navigator file to handle all navigation within the Home tab of the application.

// # Additional Context: What is a Stack Navigator?

// Explanation: A Stack Navigator manages screens in a last-in-first-out (LIFO)
// stack structure, similar to a deck of cards. When you navigate to a new screen,
// it's "pushed" onto the top of the stack. When you go back, the top screen is
// "popped" off, revealing the previous screen underneath. This creates a
// hierarchical navigation pattern perfect for drilling down into details. For
// example: [HomeScreen] → navigate to product → [HomeScreen, ProductDetailScreen]
// → go back → [HomeScreen]. The stack maintains your navigation history, allowing
// users to retrace their steps.

// # Additional Context: Stack Navigator vs Tab Navigator

// Explanation: Stack Navigators handle hierarchical (parent → child → grandchild)
// navigation where screens stack on top of each other with slide animations, back
// buttons automatically appear, and navigation history is maintained (example:
// Product List → Product Details → Reviews). Tab Navigators handle lateral
// navigation between main app sections where screens exist side-by-side as tabs,
// a tab bar enables switching between sections, there's no back button between
// tabs, and no navigation history between tabs (example: Home | Search | Profile
// tabs at the bottom). Our app uses both: a Tab Navigator as the root with Stack
// Navigators nested inside each tab, allowing users to switch between major
// sections while maintaining independent navigation history within each section.

// # Additional Context: createNativeStackNavigator() Explained

// Explanation: The createNativeStackNavigator() function creates a Native Stack
// Navigator that uses platform-specific native iOS (UINavigationController) and
// Android (Fragment) navigation APIs for optimal performance and native
// look-and-feel. It returns an object containing two React components: Navigator
// (the container that manages the screen stack and handles transitions) and
// Screen (used to define each individual screen in the stack). Native Stack
// Navigator differs from the regular JavaScript Stack Navigator in that it
// provides better performance, smoother animations, native platform gestures
// (like iOS swipe-from-left-edge-to-go-back), and platform-specific styling,
// though it offers less customization. The native version is recommended for most
// apps unless you need advanced customization or completely consistent
// cross-platform behavior.

// # Additional Context: Navigation Hierarchy in This App

// Explanation: The complete navigation structure of our app is:
// NavigationContainer (root, in App.js) → RootNavigator (Tab Navigator) →
// branches into Home Tab (HomeStackNavigator - THIS FILE) containing HomeScreen
// (initial, shows product list) and ProductDetailScreen (shows individual product
// details), and Profile Tab (ProfileStackNavigator) containing ProfileScreen.
// This nested structure enables: tab switching at the root level (Home ↔
// Profile), independent stack navigation within each tab (Home → Product Details
// within Home tab), and preserved stack state when switching tabs (if you're
// viewing a product detail in Home tab and switch to Profile, returning to Home
// tab brings you back to that product detail, not the home screen).

// # Additional Context: initialRouteName Prop Explained

// Explanation: The initialRouteName prop specifies which screen displays first
// when this navigator renders for the first time. The value must exactly match
// the "name" prop of one of the Stack.Screen components. While the first
// Stack.Screen is the default initial route, explicitly setting initialRouteName
// makes your code's intention clear, prevents bugs if you reorder screens, and
// allows for dynamic initial screens based on app state (example:
// initialRouteName={isFirstTimeUser ? 'Onboarding' : 'Home'} or
// initialRouteName={userLoggedIn ? 'Home' : 'Login'}). This only affects the
// initial render - after users navigate, the stack state is maintained.

// # Additional Context: screenOptions Prop Explained

// Explanation: The screenOptions prop provides default configuration that applies
// to ALL screens in this Stack Navigator, reducing code duplication and ensuring
// consistent styling and behavior. Common screenOptions include: headerShown
// (show/hide header bar), headerStyle (background style for header),
// headerTintColor (color of back button and title text), headerTitleStyle (text
// style for title), headerBackTitleVisible (show/hide back button text on iOS),
// animation ('slide', 'fade', 'none', 'flip', etc.), gestureEnabled
// (enable/disable swipe-to-go-back), and presentation ('card', 'modal',
// 'transparentModal'). Individual screens override these with their own options
// prop. Can be an object or function: screenOptions={({ route, navigation }) =>
// ({ headerShown: route.name !== 'Welcome' })} for dynamic configuration based on
// the current screen.

// # Additional Context: headerShown Option Explained

// Explanation: The headerShown option controls whether the navigation header bar
// appears at the top of screens. When true (default), the header displays the
// screen title (centered), a back button with back arrow icon and optionally
// previous screen name (left side, automatically on non-initial screens), optional
// custom buttons or components (right side using headerRight option), and
// platform-specific native styling (large titles on iOS, smaller on Android).
// Headers are shown to provide navigation context (users know where they are),
// enable intuitive back navigation, follow mobile platform conventions, and offer
// space for actions. Headers are hidden for: custom header implementations,
// full-screen immersive content (maps, videos, games), minimal UI apps, or
// splash/welcome screens. Individual screens override this: options={{
// headerShown: false }}.

// # Additional Context: Stack.Screen Components and Props

// Explanation: Each Stack.Screen component defines a single screen in the
// navigator and requires these essential props: (1) name - the unique identifier
// used in code for navigation (must be unique within this navigator,
// case-sensitive where 'Home' ≠ 'home', used in navigation.navigate('Home')); (2)
// component - the React component to render for this screen (pass as reference
// {HomeScreen} not JSX {<HomeScreen />}, automatically receives navigation and
// route props); (3) options - screen-specific configuration overriding
// screenOptions (can be static object options={{ title: 'Details' }} or dynamic
// function options={({ route, navigation }) => ({ title: route.params?.name ||
// 'Default' })}, common options include title, headerRight, headerLeft,
// headerBackVisible, headerStyle, animation). Optional props include initialParams
// (default params if none passed during navigation) and getId (custom ID for
// screen instance).

// # Additional Context: Navigation and Route Props Explained

// Explanation: Every screen component automatically receives two crucial props
// from React Navigation. The navigation prop provides methods for navigating:
// navigate(screenName, params) goes to another screen, goBack() returns to
// previous screen, push(screenName, params) pushes new screen even if already in
// stack, pop(count) removes specified number of screens from stack, popToTop()
// jumps back to initial screen, setOptions(options) updates screen options
// dynamically, and setParams(params) updates current screen's params. The route
// prop provides information about the current screen: route.name is the screen
// name (e.g., 'Home'), route.params contains parameters passed during navigation,
// and route.key is unique identifier for this screen instance. Usage example:
// const HomeScreen = ({ navigation, route }) => { return <Button onPress={() =>
// navigation.navigate('ProductDetail', { productId: 5 })} title="View Details"
// />; };

// # Additional Context: HomeScreen - Initial Screen Explanation

// Explanation: The HomeScreen is the initial (first) screen users see when
// entering the Home tab, serving as the root of this Stack Navigator. It displays
// the product catalog list where users can browse available products. As the
// initial screen: no back button appears in the header (there's nowhere to go
// back to), it's first in the stack when the tab is opened, it can navigate
// forward to ProductDetailScreen but cannot go back further, and returning to
// this tab always brings the stack to this screen's state. Navigation from
// HomeScreen typically looks like: navigation.navigate('ProductDetail', {
// productId: 123, productName: 'Cool Product' }). This screen is responsible for
// fetching product data from an API, displaying products in a scrollable list or
// grid, and handling user taps to navigate to details.

// # Additional Context: ProductDetailScreen - Detail Screen Explanation

// Explanation: The ProductDetailScreen displays comprehensive information about a
// single selected product. It's accessed by navigating from HomeScreen with a
// productId parameter that identifies which product to show. This follows the
// classic master-detail navigation pattern: master (HomeScreen) shows
// overview/list, detail (ProductDetailScreen) shows individual item. Navigation to
// this screen includes parameters: navigation.navigate('ProductDetail', {
// productId: 5, productName: 'Widget' }). The screen accesses these parameters
// using: const ProductDetailScreen = ({ route }) => { const { productId,
// productName } = route.params; /* fetch and display product using productId */ }.
// As a child screen: a back button automatically appears in the header, tapping
// back returns to HomeScreen, users can also swipe from left edge on iOS or use
// Android back button, and navigation.goBack() programmatically returns to
// previous screen. This screen typically fetches detailed product data, displays
// images in a carousel, shows description and specifications, provides add-to-cart
// functionality (in e-commerce apps), and might offer navigation to related
// products.

// # Additional Context: Screen Options - title Explained

// Explanation: The title option sets the text displayed in the navigation header.
// By default, React Navigation uses the screen's "name" prop as the title, but
// you can customize it for better user-facing presentation. Static title:
// options={{ title: 'Product Details' }} shows fixed text. Dynamic title:
// options={({ route }) => ({ title: route.params?.productName || 'Product
// Details' })} shows parameter-based text, falling back to default if parameter
// is missing. The key difference: "name" is the technical identifier used in code
// ('ProductDetail'), while "title" is the user-facing text shown in the header
// ('Product Details'). Additional title options include: headerTitleAlign
// ('left', 'center') controls title position, headerTitleStyle controls text
// styling (fontSize, fontWeight, color), and headerTitleAllowFontScaling
// enables/disables font scaling for accessibility.

// # Additional Context: Navigation Methods Comparison

// Explanation: React Navigation provides several navigation methods with different
// behaviors. navigate(name, params) is the most common, navigating to a screen by
// name; if the screen exists in the stack, it pops back to it; if it doesn't
// exist, it pushes it; this prevents duplicate screens and is ideal for most
// navigation. push(name, params) always pushes a new screen onto the stack even if
// it already exists, useful for repeated screens like Product A → Related Product
// B → Related Product C where users can back through the entire history. goBack()
// pops the current screen from stack and returns to the previous screen; does
// nothing if already on the initial screen; equivalent to back button. pop(count)
// pops specified number of screens where pop() goes back one, pop(2) goes back
// two screens. popToTop() pops all screens except the initial one, jumping to the
// beginning of the stack; useful for "Home" buttons that reset navigation.
// replace(name, params) replaces current screen with new one without adding to
// history; useful for login flows where you don't want users going back to login
// screen after logging in.

// # Additional Context: Passing and Accessing Parameters

// Explanation: Parameters allow you to pass data between screens during
// navigation. Passing parameters during navigation:
// navigation.navigate('ProductDetail', { productId: 5, productName: 'Cool
// Product', price: 99.99, inStock: true }). Accessing parameters in the target
// screen component: const ProductDetailScreen = ({ route }) => { const {
// productId, productName, price, inStock } = route.params; /* use these values to
// fetch and display product data */ }. Handling undefined parameters with default
// values: const price = route.params?.price ?? 0; const productName =
// route.params?.productName || 'Unknown Product'; const inStock =
// route.params?.inStock ?? true;. Updating parameters from within the screen:
// navigation.setParams({ price: 79.99 }) updates only the price parameter while
// keeping others unchanged. Accessing parameters in options: options={({ route })
// => ({ title: route.params?.productName || 'Product' })} allows dynamic header
// titles. Parameters are serializable (strings, numbers, booleans, arrays, plain
// objects) but cannot include functions, class instances, or complex objects.

// # Additional Context: Navigation Between Tabs

// Explanation: From any screen within HomeStackNavigator, you can navigate to
// screens in other tabs at the root level. Navigating to another tab:
// navigation.navigate('Profile') switches to the Profile tab and shows its current
// screen (ProfileScreen or wherever the user left off in that tab). What happens
// during tab navigation: the active tab switches (Home → Profile), the target
// tab's top screen displays, the Home tab's stack state is preserved in background
// (if you were on ProductDetailScreen, you'll return there when switching back to
// Home tab), the tab bar remains visible at the bottom, and each tab's navigation
// history is independent. Navigating deep into another tab's stack:
// navigation.navigate('Profile', { screen: 'Settings', params: { section:
// 'notifications' } }) switches to Profile tab and navigates within it to a
// specific screen with parameters. This nested navigation power means each tab
// maintains its own complete navigation state independently, allowing seamless
// multitasking.

// # Additional Context: Best Practices for Stack Navigation

// Explanation: Follow these best practices for effective stack navigation: (1)
// Make the initial screen the most commonly accessed (HomeScreen, Dashboard, not
// Settings or About); (2) Limit stack depth - avoid deep hierarchies like Home →
// A → B → C → D where users feel lost and overwhelmed; aim for 2-3 levels
// maximum; (3) Ensure every screen has a clear way back - back button in header,
// cancel button for modals, close button for overlays, or clear call-to-action to
// exit; (4) Use parameters for dynamic content - create one ProductDetailScreen
// that receives a productId parameter rather than creating separate screens for
// each product (scalable and maintainable); (5) Handle edge cases gracefully -
// missing or invalid parameters, network failures during data fetching, navigation
// attempted during loading states, and deep linking from external sources; (6) Use
// modals for temporary focused tasks - forms, confirmations, filters using
// options={{ presentation: 'modal' }} which displays screen as overlay instead of
// pushing onto stack; (7) Test all navigation flows including forward navigation,
// backward navigation, tab switching with preserved state, deep linking, and
// navigation during async operations.

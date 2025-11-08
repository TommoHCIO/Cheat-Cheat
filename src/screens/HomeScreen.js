// ============================================================================
// FILE: src/screens/HomeScreen.js
// ============================================================================
//
// PURPOSE:
// This is the main product listing screen that displays all products with
// advanced filtering, sorting, and search capabilities. It's the primary screen
// users see when opening the app.
//
// WHAT IT DOES:
// - Fetches and displays products using FlashList for optimal performance
// - Implements real-time search with search bar and clear/trigger buttons
// - Provides category filtering (all, smartphones, laptops, etc.)
// - Offers sorting options (price, rating, name)
// - Shows scroll-to-top button when scrolled down
// - Handles loading states, empty states, and navigation to product details
//
// WHY IT'S NEEDED:
// This is the core user interface where browsing happens. It combines multiple
// features (search, filter, sort, scroll) to create an intuitive product
// browsing experience. It demonstrates complex state management, list rendering
// optimization, and user interaction patterns essential for e-commerce apps.
//
// ============================================================================

import React, { useState, useRef } from 'react';

// Explanation: Import React and two essential hooks. React is the core library
// for building UI components. useState is a hook that lets us add state
// variables to functional components - when state changes, the component
// re-renders automatically. useRef creates a persistent reference that doesn't
// trigger re-renders when changed, perfect for accessing DOM elements or
// storing values that don't affect the UI directly.

import {

// Explanation: Begin importing built-in React Native components from the
// 'react-native' package. These are the fundamental building blocks for
// creating mobile interfaces that work on both iOS and Android.

  StyleSheet,

// Explanation: StyleSheet is an API for defining styles using JavaScript
// objects. It provides CSS-like styling but optimized for mobile - it validates
// properties, converts them to native platform styles once (not on every
// render), and enables code completion in your editor. This improves
// performance compared to inline styles.

  View,

// Explanation: View is the most fundamental container component in React
// Native, similar to a div in HTML. It's used for layout, styling, and grouping
// other components. Views support flexbox layout, touch handling, accessibility
// features, and can be styled with colors, borders, shadows, and more.

  Text,

// Explanation: Text is the component for displaying text. Unlike HTML where you
// can put text anywhere, React Native requires all text to be wrapped in Text
// components. Text supports styling (color, font size, weight), touch events,
// accessibility labels, and text selection. It cannot have View children.

  TextInput,

// Explanation: TextInput is the component for user text input, similar to HTML
// input or textarea. It provides a native keyboard, supports placeholder text,
// autocomplete, secure text entry (passwords), and fires events when text
// changes. Controlled inputs (value + onChangeText) are recommended for
// predictable behavior.

  ActivityIndicator,

// Explanation: ActivityIndicator displays a circular spinning loader to
// indicate that content is loading or an operation is in progress. It's a
// platform-specific component - shows a spinner on iOS and a circular progress
// indicator on Android. You can customize the size (small/large) and color to
// match your app's design.

  TouchableOpacity,

// Explanation: TouchableOpacity makes any component touchable with visual
// feedback. When pressed, it reduces the opacity (makes it slightly
// transparent) to show the user their touch was registered. It's one of several
// touchable components in React Native, chosen here for its smooth, iOS-style
// feedback. Supports onPress events and activeOpacity customization.

  Image,

// Explanation: Image displays images from local files or remote URLs. It
// supports various resize modes (cover, contain, stretch), loading indicators,
// caching, and error handling. For network images, always provide a source prop
// like { uri: 'https://...' }. Images are automatically optimized for the
// platform (WebP on Android, native formats on iOS).

} from 'react-native';

// Explanation: Close the import statement for all the React Native components
// we need. These are now available to use in our component without the
// 'react-native.' prefix (e.g., we can write <View> instead of
// <react-native.View>).

import { FlashList } from '@shopify/flash-list';

// Explanation: Import FlashList, a high-performance alternative to React
// Native's FlatList. It's 10x faster because it uses cell recycling - instead
// of creating thousands of components for a large list, it creates only enough
// to fill the screen and reuses them as you scroll. This dramatically reduces
// memory usage and improves scroll smoothness, especially for lists with
// hundreds or thousands of items.

import useProducts from '../hooks/useProducts';

// Explanation: Import our custom hook that fetches product data from an API.
// Custom hooks are functions that start with 'use' and can call other hooks.
// This hook encapsulates all the data fetching logic, loading states, and error
// handling, keeping our component clean and focused on UI. It likely uses
// useEffect for the API call and useState for managing the data, loading, and
// error states.

const HomeScreen = ({ navigation }) => {

// Explanation: Define the HomeScreen functional component. It receives a
// navigation prop from React Navigation, which provides methods like navigate()
// to move between screens. The arrow function syntax (=>) is modern JavaScript
// (ES6+). In React Navigation, every screen component automatically receives the
// navigation prop when registered in a navigator.

  const [searchQuery, setSearchQuery] = useState('');

// Explanation: Create a state variable for the search input text. useState('')
// initializes it as an empty string. It returns an array with two elements:
// searchQuery (the current value) and setSearchQuery (a function to update it).
// When setSearchQuery is called, React re-renders the component with the new
// value. This pattern is called "array destructuring" and follows React naming
// conventions: [value, setValue].

  const [sortBy, setSortBy] = useState('name-asc');

// Explanation: Create a state variable to track the current sort order.
// Initialized to 'name-asc' meaning products will be sorted alphabetically by
// name in ascending order (A to Z). Other possible values handled later are
// 'price-asc' (cheapest first) and 'price-desc' (most expensive first).
// Changing this state will trigger a re-render and resort the product list.

  const [filterCategory, setFilterCategory] = useState('all');

// Explanation: Create a state variable for category filtering. Starting with
// 'all' means we show products from all categories initially. Users can change
// this to 'smartphones' or 'laptops' to see only products in that category.
// This demonstrates how multiple state variables work together - we can search,
// filter, and sort simultaneously, and React efficiently updates the UI when
// any state changes.

  const [showScrollTop, setShowScrollTop] = useState(false);

// Explanation: Create a state variable to control visibility of the "scroll to
// top" button. Initially false (hidden). We'll set it to true when the user
// scrolls down more than 300 pixels, giving them a quick way to jump back to
// the top. This improves UX on long lists by preventing endless scrolling to
// get back to the search bar.

  const flashListRef = useRef(null);

// Explanation: Create a ref (reference) to the FlashList component.
// useRef(null) creates a mutable object with a .current property initialized to
// null. Once the FlashList renders, React will set flashListRef.current to
// point to the actual FlashList instance. We can then call methods on it like
// scrollToOffset(). Unlike useState, changing a ref doesn't trigger re-renders,
// making it perfect for imperative operations.

  const { products, loading, error } = useProducts();

// Explanation: Call our custom hook to fetch product data. Object
// destructuring extracts three values: products (the array of product objects),
// loading (boolean indicating if data is still being fetched), and error
// (string with error message if fetch failed, or null if successful). This hook
// likely runs a useEffect that calls fetch() or axios on component mount and
// manages these three states automatically.

  const filterProducts = (productList) => {

// Explanation: Define a function to filter products based on the search query.
// It takes productList as a parameter (the array of products to filter) and
// returns a new filtered array. This is a pure function - it doesn't modify the
// original array, it creates a new one with only matching products. Pure
// functions are easier to test and reason about because they don't have side
// effects.

    if (!productList || !Array.isArray(productList)) {

// Explanation: Guard clause to prevent errors if productList is null,
// undefined, or not an array. The !productList checks for null/undefined (falsy
// values), and !Array.isArray() checks if it's not an array. JavaScript's ||
// operator means if either condition is true, we enter the if block. This
// defensive programming prevents "Cannot read property 'filter' of undefined"
// errors.

      return [];

// Explanation: Return an empty array if the input is invalid. This ensures our
// function always returns an array (never null or undefined), making it safe to
// use in other array operations like .map() or .sort(). Consistent return types
// make code more predictable and prevent crashes.

    }

// Explanation: Close the if block. Execution continues here if productList is valid.

    if (!searchQuery.trim()) {

// Explanation: Check if the search query is empty. trim() removes whitespace
// from both ends of the string - this means "   " (spaces only) is treated as
// empty. If there's no search query, there's nothing to filter by, so we should
// return all products. The ! negates the result, so this is true when
// searchQuery is empty or only whitespace.

      return productList;

// Explanation: Return the entire product list unchanged if there's no search
// query. This is more efficient than filtering when the filter would match
// everything anyway. Early returns like this simplify code by handling special
// cases first, reducing nesting levels.

    }

// Explanation: Close the if block. Execution reaches here only if there's a non-empty search query.

    return productList.filter((product) => {

// Explanation: Use the array filter() method to create a new array containing
// only products that match our criteria. filter() calls the provided function
// once for each product in the array. If the function returns true, that
// product is included in the new array; if false, it's excluded. The original
// array is never modified.

      const titleLower = product.title.toLowerCase();

// Explanation: Convert the product title to lowercase for case-insensitive
// comparison. For example, "iPhone" becomes "iphone". We store this in a
// variable to avoid calling toLowerCase() multiple times. toLowerCase() is
// necessary because "iPhone" doesn't match "iphone" in JavaScript string
// comparison by default.

      const queryLower = searchQuery.toLowerCase();

// Explanation: Convert the user's search query to lowercase for case-
// insensitive matching. Now when comparing, "iPhone" in the title will match
// "iphone" typed by the user. This provides a better user experience - users
// shouldn't have to know the exact capitalization to find products.

      return titleLower.includes(queryLower);

// Explanation: Check if the lowercase title contains the lowercase query as a substring.
// includes() returns true if the string contains the search term anywhere (beginning,
// middle, or end). For example, searching "phone" would match "iPhone", "smartphone", and
// "phone case". This is more user-friendly than exact matching but less precise than
// fuzzy search or full-text search algorithms.

    });

// Explanation: Close the filter function and return the filtered array. The result
// contains only products whose title includes the search query (case-insensitive).

  };

// Explanation: Close the filterProducts function definition. This function is now ready
// to be called with any product array.

  const filterByCategory = (productList) => {

// Explanation: Define a function to filter products by category (smartphones, laptops, or
// all). Like filterProducts, this is a pure function that takes an array and returns a
// new filtered array without modifying the original. We use separate functions for search
// and category filtering to follow the Single Responsibility Principle - each function
// does one thing well.

    if (!productList || !Array.isArray(productList)) {

// Explanation: Same guard clause as before - check if productList is valid before trying
// to use array methods on it. This defensive programming prevents runtime errors and
// makes the function safe to use with any input. It's good practice to validate inputs at
// the start of every function, especially when working with external data.

      return [];

// Explanation: Return empty array if input is invalid, ensuring consistent return type.

    }

// Explanation: Close the guard clause if block.

    if (filterCategory === 'all') {

// Explanation: Check if the filter is set to 'all'. The === operator checks for strict
// equality (value and type). If true, we shouldn't filter anything - just return all
// products. This short-circuit optimization is important for performance because we avoid
// iterating through the entire array when filtering isn't needed.

      return productList;

// Explanation: Return the full product list without filtering when 'all' is selected.
// This early return makes the code more efficient and easier to read than using an
// if/else structure.

    }

// Explanation: Close the if block. Code here runs only when filtering by a specific category.

    return productList.filter((product) => product.category === filterCategory);

// Explanation: Filter the products to only include those whose category matches the
// selected filterCategory state. This uses a concise arrow function with implicit return
// - the expression after => is automatically returned. For example, if filterCategory is
// 'smartphones', only products with category: 'smartphones' will be included in the
// result.

  };

// Explanation: Close the filterByCategory function. This function is pure, testable, and reusable.

  const sortProducts = (productList) => {

// Explanation: Define a function to sort products based on the sortBy state. Sorting
// rearranges array elements based on comparison logic. Unlike filter() which may return
// fewer items, sort() returns an array with the same length but in a different order.

    if (!productList || !Array.isArray(productList)) {

// Explanation: Same defensive guard clause to validate input before attempting array operations.

      return [];

// Explanation: Return empty array for invalid input to maintain consistent return type.

    }

// Explanation: Close guard clause if block.

    const sorted = [...productList];

// Explanation: Create a shallow copy of the product array using the spread operator
// (...). This is crucial because sort() modifies the array in place. Without copying,
// we'd mutate the original products array, which violates React's principle of not
// modifying props or state directly. The spread operator creates a new array with the
// same elements, so we can safely sort it.

    switch (sortBy) {

// Explanation: Use a switch statement to handle different sorting options. Switch is more
// readable than multiple if/else when comparing a single value against multiple options.
// The sortBy state (set by the user clicking sort buttons) determines which case
// executes.

      case 'name-asc':

// Explanation: Handle the case when products should be sorted alphabetically by name in
// ascending order (A to Z).

        return sorted.sort((a, b) => a.title.localeCompare(b.title));

// Explanation: Sort alphabetically by title using localeCompare(), which properly handles
// international characters, accents, and locale-specific sorting rules. sort() takes a
// comparison function that receives two elements (a and b). If the function returns
// negative, a comes before b; if positive, b comes before a; if 0, order is unchanged.
// localeCompare() returns -1, 0, or 1, making it perfect for alphabetical sorting.

      case 'price-asc':

// Explanation: Handle the case when products should be sorted by price from lowest to highest.

        return sorted.sort((a, b) => a.price - b.price);

// Explanation: Sort numerically by price in ascending order. The comparison function
// a.price - b.price returns a negative number if a is cheaper (so a comes first),
// positive if b is cheaper (so b comes first), or 0 if prices are equal. This simple
// arithmetic comparison is perfect for numeric sorting. For example, if a.price is 10 and
// b.price is 20, the result is -10 (negative), so a comes before b.

      case 'price-desc':

// Explanation: Handle the case when products should be sorted by price from highest to lowest.

        return sorted.sort((a, b) => b.price - a.price);

// Explanation: Sort numerically by price in descending order. Notice we reversed the
// subtraction (b.price - a.price instead of a.price - b.price). This makes more expensive
// items come first. For example, if a.price is 10 and b.price is 20, the result is 10
// (positive), so b comes before a.

      default:

// Explanation: The default case handles any unexpected sortBy values. This is defensive
// programming - if somehow sortBy is set to an unhandled value (like due to a bug), we
// don't crash, we just return the unsorted array.

        return sorted;

// Explanation: Return the copied array without sorting if sortBy doesn't match any known case.

    }

// Explanation: Close the switch statement. One of the cases (or default) will have
// already returned, so execution never actually reaches here, but JavaScript requires the
// closing brace.

  };

// Explanation: Close the sortProducts function. This function demonstrates the switch
// pattern for handling multiple sorting strategies.

  const getProcessedProducts = () => {

// Explanation: Define a function that applies all processing steps (category filter,
// search filter, sort) in sequence to create the final product list for display. This
// function orchestrates the entire data pipeline. It's a pure function with no parameters
// because it reads from closures (products, filterCategory, searchQuery, sortBy states).

    if (!products) {

// Explanation: Guard clause to check if products data has been loaded yet. On first
// render, useProducts() returns null/undefined for products while loading is true. We
// need to handle this case to prevent errors from trying to filter/sort null.

      return [];

// Explanation: Return empty array if products haven't loaded yet. This means the list
// will be empty during loading, and the loading indicator (rendered elsewhere) will show
// instead.

    }

// Explanation: Close the guard clause. Code here runs only when products exist.

    let processed = filterByCategory(products);

// Explanation: First processing step: filter by category. We start with the full products
// array and narrow it down to the selected category (or all). Using 'let' because we'll
// reassign this variable in the next lines. The pipeline starts broad (category) because
// filtering by category typically removes the most items, making subsequent operations
// faster.

    processed = filterProducts(processed);

// Explanation: Second processing step: filter by search query. We take the
// category-filtered results and further narrow them based on what the user typed in the
// search box. This two-level filtering allows users to search within a specific category,
// providing powerful filtering capabilities.

    processed = sortProducts(processed);

// Explanation: Third and final processing step: sort the filtered results. Sorting
// happens last because it's O(n log n) complexity - more expensive than filtering. By
// filtering first, we sort fewer items. For example, if filtering reduces 1000 products
// to 100, we sort 100 instead of 1000, saving significant computation.

    return processed;

// Explanation: Return the fully processed product array (filtered by category, filtered
// by search, and sorted). This is the exact array that will be displayed in the list.

  };

// Explanation: Close the getProcessedProducts function. This pipeline architecture
// (filter → filter → sort) is clean, testable, and performs well.

  const displayedProducts = getProcessedProducts();

// Explanation: Call the processing function to get the final array of products to
// display. This runs on every render, which means the list updates immediately when the
// user types in the search box, changes category, or changes sort order. For large lists
// (10,000+ items), you might wrap this in useMemo() to avoid recalculating if
// dependencies haven't changed.

  const handleProductPress = (product) => {

// Explanation: Define an event handler function that runs when a user taps on a product
// card. Event handlers in React conventionally start with 'handle' to distinguish them
// from callback props (which start with 'on'). This function receives the product object
// that was tapped.

    navigation.navigate('ProductDetail', {

// Explanation: Use React Navigation's navigate method to switch to the ProductDetail
// screen. The first argument 'ProductDetail' is the screen name (must match the name used
// when defining routes). The second argument is an object of parameters to pass to that
// screen.

      productId: product.id,

// Explanation: Pass only the product ID to the detail screen, not the entire product
// object. This is a best practice because: 1) it keeps the navigation params small, 2) it
// ensures the detail screen fetches fresh data (in case the product changed), 3) it
// avoids potential issues with non-serializable data in navigation params. The detail
// screen will use this ID to fetch the full product data.

    });

// Explanation: Close the navigate function call. Navigation happens immediately - the new
// screen slides in from the right (iOS) or fades in (Android).

  };

// Explanation: Close the handleProductPress function. This will be passed to
// TouchableOpacity components in the list.

  const handleScrollToTop = () => {

// Explanation: Define a function to programmatically scroll the list back to the top.
// This will be called when the user taps the floating "scroll to top" button that appears
// when scrolled down.

    if (flashListRef.current) {

// Explanation: Check if the ref is populated before trying to use it. On first render,
// flashListRef.current is null because the FlashList hasn't mounted yet. Once mounted,
// React sets current to the FlashList instance. Always check refs before using them to
// prevent "Cannot read property 'scrollToOffset' of null" errors.

      flashListRef.current.scrollToOffset({ offset: 0, animated: true });

// Explanation: Call the scrollToOffset method on the FlashList instance. This is an
// imperative command (directly calling a method) rather than declarative (setting props).
// offset: 0 means scroll to the very top (0 pixels from the start). animated: true makes
// it scroll smoothly rather than jumping instantly. The animation takes about 300-500ms
// depending on distance.

    }

// Explanation: Close the if block. If the ref wasn't ready, we simply do nothing (fail silently).

  };

// Explanation: Close the handleScrollToTop function. This demonstrates the ref pattern
// for calling imperative methods on React components.

  const handleClearSearch = () => {

// Explanation: Define a function to clear the search input. This provides a quick way for
// users to remove their search query and see all products again, improving UX.

    setSearchQuery('');

// Explanation: Reset the searchQuery state to an empty string. This triggers a re-render,
// the TextInput becomes empty (because it's controlled by this state), and
// displayedProducts recalculates without search filtering. In one line, we've cleared the
// input and shown all products. This demonstrates the power of controlled components and
// reactive state.

  };

// Explanation: Close the handleClearSearch function. Simple but essential for good user experience.

  const handleScroll = (event) => {

// Explanation: Define a function that runs while the user scrolls. The event parameter
// contains information about the scroll position. This runs frequently (throttled to ~60
// times per second by scrollEventThrottle), so it must be lightweight to avoid jank
// (stuttering).

    const offsetY = event.nativeEvent.contentOffset.y;

// Explanation: Extract the vertical scroll position from the event object.
// contentOffset.y is the number of pixels scrolled from the top. For example, if the user
// has scrolled down 500 pixels, offsetY will be 500. event.nativeEvent is the raw event
// from the native platform (iOS/Android), giving us access to lower-level details.

    if (offsetY > 300 && !showScrollTop) {

// Explanation: Check if we should show the scroll-to-top button. The conditions are: 1)
// offsetY > 300 means user has scrolled more than 300 pixels down, and 2) !showScrollTop
// means the button is currently hidden. The second check is crucial - without it, we'd
// call setShowScrollTop(true) on every scroll event even when already true, causing
// unnecessary re-renders.

      setShowScrollTop(true);

// Explanation: Show the scroll-to-top button by setting state to true. This triggers a
// re-render, and the conditional rendering logic (at the bottom of the component) will
// render the button. The button appears with whatever styling and animation we've defined
// in styles.scrollToTopButton.

    } else if (offsetY <= 300 && showScrollTop) {

// Explanation: Check if we should hide the scroll-to-top button. Conditions: 1) offsetY
// <= 300 means user scrolled back up to near the top, and 2) showScrollTop is true
// meaning button is currently visible. Again, the second check prevents unnecessary
// setState calls.

      setShowScrollTop(false);

// Explanation: Hide the scroll-to-top button by setting state to false. The conditional
// rendering won't render the button, making it disappear from the screen. This provides
// clean UX - the button appears only when needed, not cluttering the interface when
// you're already near the top.

    }

// Explanation: Close the else if block. This if/else structure efficiently handles
// showing and hiding the button based on scroll position.

  };

// Explanation: Close the handleScroll function. This demonstrates how to react to scroll
// events and manage UI based on scroll position.

  if (loading) {

// Explanation: Check if data is still being fetched. The loading boolean comes from our
// useProducts hook. This is the first of three render paths - handling the loading state
// before the main UI. React components should handle all possible states: loading, error,
// and success.

    return (
      // Explanation: Return JSX for the loading state. This immediately exits the function, so
      // the main UI code below never runs while loading. Early returns for different states
      // keep code clean and avoid deeply nested conditions.

      <View style={styles.centerContainer}>

{/* Explanation: Render a View container styled to center its children both horizontally
and vertically. styles.centerContainer uses flex: 1 to fill the screen, and
justifyContent/alignItems: 'center' to center content. This creates a nice loading
screen where the spinner appears in the middle. */}

        <ActivityIndicator size="large" color="#007AFF" />

{/* Explanation: Render a spinning loading indicator. size="large" makes it more visible
(about 36x36 pixels). color="#007AFF" is iOS blue, a common choice for loading
indicators. This is a native component - it renders as UIActivityIndicatorView on iOS
and ProgressBar on Android, giving platform-appropriate appearance. */}

        <Text style={styles.loadingText}>Loading products...</Text>

{/* Explanation: Show explanatory text below the spinner so users know what's loading. Good
UX practice - don't make users guess why they're waiting. The style makes it gray and
slightly smaller than regular text. numberOfLines isn't needed here because this text
won't wrap. */}

      </View>
      // Explanation: Close the View container for the loading state.
    );

// Explanation: Close the return statement. This JSX is what renders while data is being fetched.

  }

// Explanation: Close the loading if block. If we reach this point, loading is false, so
// we check for errors next.

  if (error) {

// Explanation: Check if an error occurred during data fetching. The error variable comes
// from useProducts and contains an error message string if the fetch failed, or null if
// successful. This is the second render path - showing a helpful error state rather than
// a blank screen or crash.

    return (
      // Explanation: Return JSX for the error state, immediately exiting the function. This
      // prevents trying to render products when they failed to load.

      <View style={styles.centerContainer}>

{/* Explanation: Use the same centered container as the loading state for visual
consistency. The error message and retry button will be centered on screen. */}

        <Text style={styles.errorText}>Error: {error}</Text>

{/* Explanation: Display the error message in red text. The curly braces {} embed the error
variable (a string) into the JSX. For example, if error is "Network request failed",
this renders "Error: Network request failed". This helps users and developers
understand what went wrong. The errorText style makes it red, centered, and properly
sized. */}

        {/* Explanation: Render a touchable button that will trigger a retry action.
        TouchableOpacity provides visual feedback (opacity change) when pressed. */}
        <TouchableOpacity
          // Explanation: Apply styling to make this look like a proper button - blue background,
          // rounded corners, padding, and shadow for depth.
          style={styles.retryButton}
          onPress={() => {
            // Explanation: Define what happens when the button is pressed. This uses an arrow
            // function directly in the prop (inline function). For this simple case, it's fine; for
            // functions with more logic or used in lists, you'd define them outside and use
            // useCallback for performance.
            console.log('Retry pressed');
            // Explanation: Log to the console for debugging. In a complete implementation, this would
            // call a retry function from useProducts to re-fetch data. Currently it's a placeholder
            // showing where retry logic would go. Console.log is invaluable for debugging - check
            // these in React Native Debugger or Chrome DevTools.
          }}
          // Explanation: Close the onPress arrow function definition.
        >

{/* Explanation: Close the opening TouchableOpacity tag. The text below is the button's content. */}

          <Text style={styles.retryButtonText}>Retry</Text>

{/* Explanation: Render the button label in white text. This is wrapped in Text because all
text must be in Text components in React Native. The style makes it white, bold, and
properly sized to contrast with the blue button background. */}

        </TouchableOpacity>

{/* Explanation: Close the TouchableOpacity button component. */}

      </View>
      // Explanation: Close the centered View container for the error state.
    );

// Explanation: Close the return statement for the error state. This is what users see if
// the API call fails.

  }

// Explanation: Close the error if block. If we reach this point, both loading and error
// are false, meaning we have data and can render the main UI.

  return (
    // Explanation: Begin the main return statement for the success state. This renders the
    // full-featured product list UI with search, filters, sorting, and the scrollable list.
    // This is the third and final render path.

    <View style={styles.container}>

{/* Explanation: Render the outermost container View that fills the screen.
styles.container uses flex: 1 to take all available space and sets a light gray
background color. This View contains all the UI elements: search bar, sort buttons,
filter buttons, and the product list. */}

      <View style={styles.searchContainer}>

{/* Explanation: Render a container for the search input and buttons. This View is styled
with margin and position: 'relative', which allows child elements (clear and search
buttons) to use position: 'absolute' to overlay on the input field. */}

        <TextInput
          style={styles.searchInput}
          // Explanation: Set placeholder text that appears when the input is empty. This guides
          // users on what to type. Placeholders should be descriptive but concise. They disappear
          // when the user starts typing.
          placeholder="Search products..."
          // Explanation: Bind the input value to the searchQuery state. This makes it a "controlled
          // component" - React state is the single source of truth. The input always displays
          // what's in searchQuery. If you tried to type without onChangeText, nothing would appear
          // because state wouldn't update.
          value={searchQuery}
          // Explanation: Set up the handler that updates state when text changes. setSearchQuery is
          // called with the new text on every keystroke. This updates the state, triggers a
          // re-render, displayedProducts recalculates with the new search query, and the list
          // updates. This creates real-time search - results filter as you type.
          onChangeText={setSearchQuery}
          // Explanation: Customize the keyboard's return key to show "Search" instead of "Return"
          // (iOS) or "Enter" (Android). This provides a visual hint about the input's purpose. The
          // user can tap this key to dismiss the keyboard (though it doesn't trigger a search
          // action in this implementation).
          returnKeyType="search"
        />

{/* Explanation: Close the TextInput component. It's self-closing (no children) because
text inputs don't contain other components. */}

        {/* Explanation: Conditional rendering - only render the clear button if there's text in
        the search box. The && operator is a React pattern: if the left side is true, render
        the right side; if false, render nothing. This makes the clear button appear/disappear
        based on whether there's something to clear. */}
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            // Explanation: Connect the button press event to our handleClearSearch function, which
            // sets searchQuery to empty string. When tapped, the search clears, the list shows all
            // products, and this button disappears (because searchQuery.length is now 0).
            onPress={handleClearSearch}
            // Explanation: Set how much the opacity reduces when pressed. Default is 0.2 (very
            // faded), but 0.7 gives subtler feedback - the button becomes 70% opaque instead of 20%.
            // This value is personal preference based on your design aesthetics.
            activeOpacity={0.7}
          >

{/* Explanation: Close the opening TouchableOpacity tag. The text below is the button's content. */}

            <Text style={styles.clearButtonText}>✕</Text>

{/* Explanation: Render an X symbol as the button content. The multiplication symbol (✕) is
commonly used for close/clear actions. The style makes it gray and medium-sized. When
users see this X, they intuitively understand it will clear the input. */}

          </TouchableOpacity>
          // Explanation: Close the TouchableOpacity clear button.
        )}
        {/* Explanation: Close the conditional rendering expression for the clear button. The
        parentheses group the JSX as a single expression. */}

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            // Explanation: Define the press handler inline. Currently it just logs to console, but in
            // a full implementation it might trigger a search, analytics event, or keyboard
            // dismissal.
            console.log('Search triggered for:', searchQuery);
            // Explanation: Log the current search query to the console for debugging. This helps
            // developers verify the search button works and see what users are searching for. In
            // production, you might send this to analytics.
          }}
          // Explanation: Close the onPress handler function.
          // Explanation: Use the same opacity feedback as the clear button for consistent
          // interaction feel across both buttons.
          activeOpacity={0.7}
        >

{/* Explanation: Close the opening TouchableOpacity tag for the search button. */}

          <Text style={styles.searchButtonText}>🔍</Text>

{/* Explanation: Render a magnifying glass emoji as the search icon. The style makes it
small and white to contrast with the blue button background. Emojis are a quick way to
add icons without importing icon libraries, though they may render differently across
platforms. */}

        </TouchableOpacity>

{/* Explanation: Close the search button TouchableOpacity. */}

      </View>

{/* Explanation: Close the search container View. The search UI is now complete. */}

      <View style={styles.sortContainer}>

{/* Explanation: Render a container for the sorting buttons. This View uses flexDirection:
'row' to arrange the label and buttons horizontally, and has horizontal padding/margin
for spacing. */}

        <Text style={styles.sectionLabel}>Sort by:</Text>

{/* Explanation: Render a label explaining what these buttons do. Good UX practice - don't
assume users understand unlabeled buttons. The style makes it bold and dark gray. */}

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === 'name-asc' && styles.selectedButton
          ]}
          // Explanation: When pressed, update the sortBy state to 'name-asc'. This triggers a
          // re-render, displayedProducts recalculates with the new sort order (products sorted
          // A-Z), and the list updates. The button also becomes visually selected because sortBy
          // now matches this button's value.
          onPress={() => setSortBy('name-asc')}
        >

{/* Explanation: Close the opening TouchableOpacity tag for the alphabetical sort button. */}

          <Text style={[
            styles.sortButtonText,
            sortBy === 'name-asc' && styles.selectedButtonText
          ]}>
            Name A-Z

{/* Explanation: The button label text. Clear and descriptive - users know this will sort
products alphabetically from A to Z. */}

          </Text>

{/* Explanation: Close the Text component for the button label. */}

        </TouchableOpacity>

{/* Explanation: Close the alphabetical sort button. */}

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === 'price-asc' && styles.selectedButton
          ]}
          // Explanation: Update sortBy state to 'price-asc' when pressed, sorting products from
          // cheapest to most expensive.
          onPress={() => setSortBy('price-asc')}
        >

{/* Explanation: Close opening TouchableOpacity tag. */}

          <Text style={[
            styles.sortButtonText,
            sortBy === 'price-asc' && styles.selectedButtonText
          ]}>
            Price Low-High

{/* Explanation: Button label indicating this sorts from lowest to highest price. Clear and
matches user expectations. */}

          </Text>

{/* Explanation: Close button label Text. */}

        </TouchableOpacity>

{/* Explanation: Close the price low-to-high sort button. */}

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === 'price-desc' && styles.selectedButton
          ]}
          // Explanation: Update sortBy state to 'price-desc' when pressed, sorting products from
          // most expensive to cheapest.
          onPress={() => setSortBy('price-desc')}
        >

{/* Explanation: Close opening TouchableOpacity tag. */}

          <Text style={[
            styles.sortButtonText,
            sortBy === 'price-desc' && styles.selectedButtonText
          ]}>
            Price High-Low

{/* Explanation: Button label for descending price sort. Clear and matches e-commerce
conventions where users often want to see premium options first. */}

          </Text>

{/* Explanation: Close button label Text. */}

        </TouchableOpacity>

{/* Explanation: Close the price high-to-low sort button. */}

      </View>

{/* Explanation: Close the sort container View. All three sort buttons are now complete,
arranged horizontally with their label. */}

      <View style={styles.filterContainer}>

{/* Explanation: Render a container for the category filter buttons. Styled identically to
sortContainer for visual consistency - horizontal layout with padding and margin. */}

        <Text style={styles.sectionLabel}>Filter:</Text>

{/* Explanation: Render a label explaining these buttons filter by category. Consistent
labeling helps users understand the interface. */}

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterCategory === 'all' && styles.selectedButton
          ]}
          // Explanation: Update filterCategory state to 'all' when pressed. This triggers
          // re-render, displayedProducts recalculates without category filtering (shows all
          // products), and the list updates to show all categories.
          onPress={() => setFilterCategory('all')}
        >

{/* Explanation: Close opening TouchableOpacity tag. */}

          <Text style={[
            styles.filterButtonText,
            filterCategory === 'all' && styles.selectedButtonText
          ]}>
            All

{/* Explanation: Button label. Simple and clear - this shows all products regardless of category. */}

          </Text>

{/* Explanation: Close button label Text. */}

        </TouchableOpacity>

{/* Explanation: Close the "All" filter button. */}

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterCategory === 'smartphones' && styles.selectedButton
          ]}
          // Explanation: Update filterCategory to 'smartphones' when pressed, filtering the list to
          // show only products with category: 'smartphones'.
          onPress={() => setFilterCategory('smartphones')}
        >

{/* Explanation: Close opening TouchableOpacity tag. */}

          <Text style={[
            styles.filterButtonText,
            filterCategory === 'smartphones' && styles.selectedButtonText
          ]}>
            Smartphones

{/* Explanation: Button label for the smartphones category filter. */}

          </Text>

{/* Explanation: Close button label Text. */}

        </TouchableOpacity>

{/* Explanation: Close the "Smartphones" filter button. */}

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterCategory === 'laptops' && styles.selectedButton
          ]}
          // Explanation: Update filterCategory to 'laptops' when pressed, filtering the list to
          // show only products with category: 'laptops'.
          onPress={() => setFilterCategory('laptops')}
        >

{/* Explanation: Close opening TouchableOpacity tag. */}

          <Text style={[
            styles.filterButtonText,
            filterCategory === 'laptops' && styles.selectedButtonText
          ]}>
            Laptops

{/* Explanation: Button label for the laptops category filter. */}

          </Text>

{/* Explanation: Close button label Text. */}

        </TouchableOpacity>

{/* Explanation: Close the "Laptops" filter button. */}

      </View>

{/* Explanation: Close the filter container View. All filter buttons are now complete. */}

      <FlashList
        ref={flashListRef}
        // Explanation: Provide the array of products to display. This is the fully processed
        // array (filtered by category and search, then sorted). When this array changes (user
        // searches, filters, or sorts), FlashList automatically updates the visible items.
        // FlashList is smart about detecting changes - it uses the keyExtractor to identify which
        // items changed, moved, or were added/removed.
        data={displayedProducts}
        // Explanation: Connect the scroll event handler. This function is called repeatedly as
        // the user scrolls, receiving an event object with scroll position data. We use this to
        // show/hide the scroll-to-top button based on scroll position. Important: combine with
        // scrollEventThrottle to avoid performance issues.
        onScroll={handleScroll}
        // Explanation: Throttle scroll events to fire at most every 16 milliseconds, which equals
        // approximately 60 frames per second (1000ms / 60fps ≈ 16ms). Without throttling, scroll
        // events could fire 120+ times per second, wasting CPU and causing performance issues.
        // 16ms is a sweet spot - frequent enough for smooth UI updates (like our scroll-to-top
        // button) but not so frequent that it causes jank.
        scrollEventThrottle={16}
        // Explanation: Define how to render each product in the list. FlashList calls this
        // function for each visible item, passing an object with the item data. We destructure {
        // item } to get just the product object. This function returns JSX describing what a
        // single list item looks like. The function must be fast because it runs many times
        // during scrolling.
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            // Explanation: When this card is tapped, call handleProductPress with this product. That
            // function navigates to the detail screen, passing the product ID. We use an arrow
            // function here to pass the item parameter - without it, we couldn't pass the specific
            // product that was tapped.
            onPress={() => handleProductPress(item)}
            // Explanation: Set opacity to 80% when pressed, giving subtle visual feedback. This value
            // is higher (less fade) than the default 0.2 because we want the product image to remain
            // visible during the press animation.
            activeOpacity={0.8}
          >

{/* Explanation: Close the opening TouchableOpacity tag. Everything below until the closing
tag is the card's content. */}

            <Image
              source={{ uri: item.thumbnail }}
              // Explanation: Apply styling: fixed width and height (100x100 pixels), rounded corners,
              // gray background (shows while loading), and margin on the right to separate from the
              // text. Fixed dimensions are important for FlashList's cell recycling - consistent sizing
              // improves performance.
              style={styles.productImage}
              // Explanation: Set how the image fits its container. 'cover' scales the image to fill the
              // 100x100 box while maintaining aspect ratio, cropping if necessary. This ensures the
              // image fills the space even if it's not square. Other options: 'contain' (fit inside
              // without cropping), 'stretch' (distort to fill), 'center' (no scaling).
              resizeMode="cover"
            />

{/* Explanation: Close the Image component. It's self-closing because images don't have children. */}

            <View style={styles.productInfo}>

{/* Explanation: Render a container for all the product text information (title, category,
price, rating). This View uses flex: 1 to take all remaining space after the image, and
justifyContent: 'space-between' to spread its children evenly from top to bottom. */}

              <Text style={styles.productTitle} numberOfLines={2}>

{/* Explanation: Render the product title. numberOfLines={2} limits the text to 2 lines
maximum. If the title is longer, it's truncated with an ellipsis (...). This prevents
long titles from breaking the card layout and ensures all cards have consistent height,
which is important for FlashList's performance. */}

                {item.title}

{/* Explanation: Display the actual product title text from the product object. The curly
braces embed the JavaScript variable into JSX. */}

              </Text>

{/* Explanation: Close the product title Text component. */}

              <Text style={styles.productCategory}>

{/* Explanation: Render the product category (e.g., "smartphones", "laptops"). */}

                {item.category}

{/* Explanation: Display the category text from the product object. The style makes this
smaller and gray to distinguish it from the title, and uses textTransform: 'capitalize'
to capitalize the first letter. */}

              </Text>

{/* Explanation: Close the category Text component. */}

              <View style={styles.productFooter}>

{/* Explanation: Render a container for the price and rating at the bottom of the card.
This View uses flexDirection: 'row' to arrange price and rating horizontally, and
justifyContent: 'space-between' to push them to opposite ends (price left, rating
right). */}

                <Text style={styles.productPrice}>

{/* Explanation: Render the product price text. */}

                  ${item.price.toFixed(2)}

{/* Explanation: Display the price with a dollar sign and two decimal places. toFixed(2)
formats the number to always show 2 decimals (e.g., 19.99, 5.00). This is standard for
currency display. If item.price is 19.999, this shows $20.00. The style makes this
large, bold, and blue to emphasize the price. */}

                </Text>

{/* Explanation: Close the price Text component. */}

                <View style={styles.ratingContainer}>

{/* Explanation: Render a container for the rating. This View has a light orange background
and padding, creating a small pill/badge effect that makes the rating stand out. */}

                  <Text style={styles.productRating}>

{/* Explanation: Render the product rating text. */}

                    ⭐ {item.rating.toFixed(1)}

{/* Explanation: Display a star emoji followed by the rating number with one decimal place
(e.g., ⭐ 4.5). toFixed(1) ensures consistent formatting even if the API returns varying
precision. The style makes this orange/amber to match the star color. */}

                  </Text>

{/* Explanation: Close the rating Text component. */}

                </View>

{/* Explanation: Close the rating container View. */}

              </View>

{/* Explanation: Close the product footer View (containing price and rating). */}

            </View>

{/* Explanation: Close the product info View (containing title, category, and footer). */}

          </TouchableOpacity>
        )}

        // Explanation: Close the TouchableOpacity wrapper for the entire product card. This
        // completes the renderItem function - everything above defines what one product card
        // looks like.

        // Explanation: Close the renderItem prop and function. FlashList now knows how to render
        // each product.

        // Explanation: Tell FlashList the approximate height of each item in pixels. This is
        // critical for performance - FlashList uses this to calculate how many items fit on
        // screen, where to position items, and how big the scrollable area is. 130 pixels
        // accounts for the 100px image height + padding + margins. If this is inaccurate by more
        // than 20%, you'll see blank spaces during scrolling or wasted memory. Measure your items
        // and provide an accurate estimate.
        estimatedItemSize={130}

        // Explanation: Define how FlashList identifies each item uniquely. This function receives
        // an item and must return a unique string. We use the product's ID converted to a string
        // (React keys must be strings). Unique keys are essential - they let React track which
        // items changed, moved, or were added/removed. Never use array indexes as keys when the
        // list can be filtered/sorted, as items change positions and React will update the wrong
        // items.
        keyExtractor={(item) => item.id.toString()}

        // Explanation: Apply styling to the scrollable content container (not the FlashList
        // itself). This adds paddingBottom: 20 to create space below the last item, preventing it
        // from being hidden behind the scroll-to-top button or screen edge.
        contentContainerStyle={styles.listContainer}
      />

      {/* Explanation: Close the FlashList component. This is the main content of the screen -
      the scrollable list of products. */}

      {/* Explanation: Conditionally render the scroll-to-top button only when showScrollTop
      state is true (when scrolled down more than 300 pixels). The && operator renders the
      right side only if the left side is true, otherwise renders nothing. */}
      {showScrollTop && (
        <TouchableOpacity
          style={styles.scrollToTopButton}
          // Explanation: When tapped, call handleScrollToTop which uses the ref to scroll the
          // FlashList back to the top with animation. This provides quick navigation back to the
          // search bar without manual scrolling.
          onPress={handleScrollToTop}
          // Explanation: Set opacity to 80% when pressed for visual feedback.
          activeOpacity={0.8}
        >
          {/* Explanation: Close the opening TouchableOpacity tag. */}

          <Text style={styles.scrollToTopText}>↑</Text>

          {/* Explanation: Render an up arrow (↑) as the button content. The style makes it large,
          white, and bold so it's clearly visible against the blue button background. The up
          arrow is universally understood to mean "scroll to top" or "go up". */}

        </TouchableOpacity>
      )}

      {/* Explanation: Close the scroll-to-top button and the conditional rendering expression. */}

    </View>
    // Explanation: Close the main container View for the entire screen. This completes the
    // main UI render.
  );

// Explanation: Close the return statement for the success state (when we have data to display).

};

// Explanation: Close the HomeScreen component function. The component definition is now complete.

const styles = StyleSheet.create({

// Explanation: Define all styles for this component using StyleSheet.create(). This API
// takes an object where each property is a style object (similar to CSS). StyleSheet
// validates property names, converts styles to native platform styles once (performance
// optimization), and enables type checking and autocomplete in editors. Always define
// styles outside the component function so they're created once, not on every render.

  container: {

// Explanation: Define styles for the main screen container View.

    flex: 1,

// Explanation: Make this View take all available screen space. flex: 1 is like CSS
// flex-grow: 1 - it fills the parent container. In a screen component, this typically
// means filling the entire viewport from status bar to bottom of screen.

    backgroundColor: '#F8F9FA',

// Explanation: Set a light gray background color using hex notation. This provides a
// subtle background that makes white cards stand out. Always consider color contrast for
// readability and accessibility.

  },

// Explanation: Close the container style object.

  centerContainer: {

// Explanation: Define styles for the centered container used in loading and error states.

    flex: 1,

// Explanation: Fill the entire screen, same as container.

    justifyContent: 'center',

// Explanation: Center children vertically along the main axis. In the default column
// layout, this moves children to the vertical center of the screen.

    alignItems: 'center',

// Explanation: Center children horizontally along the cross axis. Combined with
// justifyContent: 'center', this centers content both vertically and horizontally -
// perfect for loading spinners and error messages.

    backgroundColor: '#FFFFFF',

// Explanation: Use white background for loading/error states, creating a clean, focused
// appearance without distraction.

  },

// Explanation: Close the centerContainer style object.

  listContainer: {

// Explanation: Define styles for the FlashList's content container (the scrollable area).

    paddingBottom: 20,

// Explanation: Add 20 pixels of padding at the bottom of the list. This creates space
// below the last item so it's not hidden behind the scroll-to-top button or cut off at
// the screen edge. Improves UX by making all content clearly visible.

  },

// Explanation: Close the listContainer style object.

  searchContainer: {

// Explanation: Define styles for the container holding the search input and buttons.

    position: 'relative',

// Explanation: Set position to relative, making this a positioning context for absolutely
// positioned children (the clear and search buttons). This is similar to CSS position:
// relative. Without this, the absolutely positioned buttons would position relative to
// the nearest positioned ancestor or the screen.

    margin: 16,

// Explanation: Add 16 pixels of margin on all sides (top, right, bottom, left). This
// creates space between the search bar and screen edges, preventing it from touching the
// status bar or screen sides. This margin value establishes consistent spacing used
// throughout the app.

  },

// Explanation: Close the searchContainer style object.

  searchInput: {

// Explanation: Define styles for the search TextInput component.

    height: 52,

// Explanation: Set a fixed height of 52 pixels, making the input comfortably tappable.
// Apple's Human Interface Guidelines recommend minimum tap targets of 44x44 pixels, and
// 52 provides even more comfort. Fixed height also ensures layout consistency.

    paddingHorizontal: 18,

// Explanation: Add 18 pixels of padding on left and right sides. This creates space
// between the text and the input borders, improving readability. Text shouldn't touch
// edges.

    paddingRight: 90,

// Explanation: Override the right padding to 90 pixels to make room for the clear and
// search buttons positioned on the right. Without this, text would appear under the
// buttons and be unreadable.

    backgroundColor: '#FFFFFF',

// Explanation: Set white background so the input stands out against the gray page
// background and clearly indicates it's an interactive element.

    borderRadius: 12,

// Explanation: Round the corners with 12 pixel radius. This creates a modern, friendly
// appearance. Border radius softens sharp corners, making UI feel more approachable.

    borderWidth: 1.5,

// Explanation: Add a 1.5 pixel border. This defines the input boundaries clearly. The .5
// provides a subtle border that's visible but not heavy.

    borderColor: '#E0E0E0',

// Explanation: Set border to light gray. This provides subtle definition without harsh
// contrast. The border becomes more prominent when users focus on the input (though we
// haven't implemented focus styles here).

    fontSize: 16,

// Explanation: Set text size to 16 pixels. This is the recommended minimum for input text
// on iOS to prevent automatic zoom when focusing. Smaller text triggers iOS to zoom in,
// which can be disorienting.

    color: '#1A1A1A',

// Explanation: Set text color to very dark gray (almost black). This provides excellent
// contrast against the white background for readability while being slightly softer than
// pure black (#000000).

    shadowColor: '#000',

// Explanation: Set shadow color to black. Shadows create depth and make elements appear
// elevated above the background, improving visual hierarchy.

    shadowOffset: { width: 0, height: 1 },

// Explanation: Position the shadow 0 pixels horizontally and 1 pixel down vertically.
// This creates a subtle drop shadow below the input, mimicking light from above (natural
// lighting). The small offset creates subtle depth without dramatic shadow.

    shadowOpacity: 0.05,

// Explanation: Set shadow opacity to 5%. This makes the shadow very subtle and soft. High
// opacity shadows can look harsh and dated, while low opacity creates modern, gentle
// depth.

    shadowRadius: 3,

// Explanation: Set shadow blur radius to 3 pixels. This controls how blurred/spread the
// shadow is. Larger values create softer, more diffuse shadows. 3 pixels gives a subtle,
// professional appearance.

    elevation: 2,

// Explanation: Set Android elevation to 2. Elevation is Android's shadow system - higher
// numbers create stronger shadows. iOS uses the shadow* properties above, Android uses
// elevation. Set both for cross-platform consistency. Low elevation values (1-4) create
// subtle depth.

  },

// Explanation: Close the searchInput style object.

  clearButton: {

// Explanation: Define styles for the clear (X) button inside the search input.

    position: 'absolute',

// Explanation: Position this button absolutely relative to the searchContainer (which has
// position: 'relative'). Absolute positioning removes the element from normal document
// flow and positions it relative to its nearest positioned ancestor.

    right: 52,

// Explanation: Position 52 pixels from the right edge of the searchContainer. This places
// it inside the input (which has paddingRight: 90) and leaves room for the search button
// on its right.

    top: 0,

// Explanation: Position at the top edge of the searchContainer, aligning vertically with the input.

    height: 52,

// Explanation: Match the input height so the button spans the full vertical space, making
// it easier to tap.

    width: 40,

// Explanation: Set width to 40 pixels, providing a comfortable tap target for the X icon.

    justifyContent: 'center',

// Explanation: Center the X icon vertically within the button area.

    alignItems: 'center',

// Explanation: Center the X icon horizontally within the button area. Combined with
// justifyContent, this centers the X perfectly.

    backgroundColor: 'transparent',

// Explanation: Make the button background transparent so only the X icon is visible. This
// creates a clean appearance - the button doesn't compete visually with the input.

  },

// Explanation: Close the clearButton style object.

  clearButtonText: {

// Explanation: Define styles for the X text inside the clear button.

    fontSize: 20,

// Explanation: Make the X icon 20 pixels tall, large enough to be clearly visible and
// easily tappable.

    color: '#718096',

// Explanation: Use medium gray color for the X. Not too dark (wouldn't look like a
// secondary action) and not too light (wouldn't be visible). This gray indicates the
// button is available but not the primary action.

    fontWeight: '600',

// Explanation: Make the X semi-bold (600 on the scale from 100-900). This ensures the X
// is substantial enough to see clearly despite being a thin symbol.

  },

// Explanation: Close the clearButtonText style object.

  searchButton: {

// Explanation: Define styles for the search button with the magnifying glass icon.

    position: 'absolute',

// Explanation: Position absolutely, like the clear button, to overlay on the search input.

    right: 8,

// Explanation: Position 8 pixels from the right edge, placing it at the far right of the input.

    top: 0,

// Explanation: Align with the top of the searchContainer.

    height: 20,

// Explanation: Set height to 20 pixels for the button.

    width: 22,

// Explanation: Set width to 22 pixels. The button is small and compact, just large enough
// for the icon.

    justifyContent: 'center',

// Explanation: Center the icon vertically.

    alignItems: 'center',

// Explanation: Center the icon horizontally.

    backgroundColor: '#5E72E4',

// Explanation: Set background to purple-blue. This makes the button stand out as the
// primary action in the search area. Blue is commonly associated with search and primary
// actions in UI design.

    borderRadius: 10,

// Explanation: Round corners with 10 pixel radius, making the button appear as a small
// rounded rectangle or pill shape.

    marginTop: 16,

// Explanation: Push the button down 16 pixels from the top. This vertically centers it
// within the 52px tall input (leaving 16px above, 16px below, and 20px for the button
// itself).

    marginRight: 16,

// Explanation: Add 16 pixels of margin on the right, creating space between the button
// and the input's right edge.

    shadowColor: '#5E72E4',

// Explanation: Use the button's blue color for the shadow instead of black. This creates
// a colored glow effect that makes the button appear to emit light, drawing attention to
// it as an interactive element.

    shadowOffset: { width: 0, height: 2 },

// Explanation: Position shadow 2 pixels down. Larger offset than the input's shadow
// (1px), making the button appear more elevated.

    shadowOpacity: 0.3,

// Explanation: Set shadow opacity to 30%. Much stronger than the input's shadow (5%),
// creating a prominent blue glow that makes the button pop off the page.

    shadowRadius: 3,

// Explanation: Blur radius of 3 pixels for a soft shadow edge.

    elevation: 2,

// Explanation: Android elevation of 2 for cross-platform consistency with the shadow styling.

  },

// Explanation: Close the searchButton style object.

  searchButtonText: {

// Explanation: Define styles for the magnifying glass emoji inside the search button.

    fontSize: 9,

// Explanation: Make the icon 9 pixels tall. This is very small, but the emoji renders
// larger than text typically would at this size, and it needs to fit comfortably within
// the 20x22 pixel button.

    color: '#FFFFFF',

// Explanation: Set icon color to white for contrast against the blue button background,
// ensuring it's clearly visible.

  },

// Explanation: Close the searchButtonText style object.

  scrollToTopButton: {

// Explanation: Define styles for the floating scroll-to-top button.

    position: 'absolute',

// Explanation: Position absolutely so it floats over the content rather than taking up
// space in the layout.

    right: 20,

// Explanation: Position 20 pixels from the right edge of the screen.

    bottom: 20,

// Explanation: Position 20 pixels from the bottom of the screen. This places the button
// in the bottom-right corner, a common location for floating action buttons that doesn't
// obscure important content.

    width: 50,

// Explanation: Set width to 50 pixels, making it large enough to tap easily.

    height: 50,

// Explanation: Set height to 50 pixels, matching width to create a perfect square.

    borderRadius: 25,

// Explanation: Round corners with 25 pixel radius. Since width and height are 50,
// borderRadius of half (25) creates a perfect circle. Circular buttons are commonly used
// for floating action buttons.

    backgroundColor: '#5E72E4',

// Explanation: Use the same purple-blue as the search button for visual consistency. This
// color indicates an interactive element.

    justifyContent: 'center',

// Explanation: Center the up arrow vertically.

    alignItems: 'center',

// Explanation: Center the up arrow horizontally. The arrow will be perfectly centered in
// the circle.

    shadowColor: '#000',

// Explanation: Use black shadow for this button (unlike the search button's colored
// shadow) to create more traditional depth perception.

    shadowOffset: { width: 0, height: 4 },

// Explanation: Position shadow 4 pixels down. This larger offset creates more dramatic
// elevation, making the button appear to float well above the content. Floating action
// buttons typically have strong shadows to emphasize their importance and elevated
// nature.

    shadowOpacity: 0.3,

// Explanation: Set shadow opacity to 30%, creating a visible but not overwhelming shadow.

    shadowRadius: 6,

// Explanation: Blur radius of 6 pixels creates a softer, more diffuse shadow that spreads
// further, enhancing the floating effect.

    elevation: 8,

// Explanation: High Android elevation (8) creates a strong shadow, matching the iOS
// shadow styling. This is much higher than other elements (which use 1-2), emphasizing
// that this button is at the highest layer of the UI hierarchy.

  },

// Explanation: Close the scrollToTopButton style object.

  scrollToTopText: {

// Explanation: Define styles for the up arrow text inside the scroll-to-top button.

    fontSize: 24,

// Explanation: Make the arrow 24 pixels tall. Large enough to be clearly visible and
// convey "this is a button you can tap".

    color: '#FFFFFF',

// Explanation: White color provides strong contrast against the blue button background.

    fontWeight: 'bold',

// Explanation: Make the arrow bold (700 weight), ensuring it's thick and prominent. The
// arrow is the sole content of the button, so it needs to be visually strong.

  },

// Explanation: Close the scrollToTopText style object.

  sortContainer: {

// Explanation: Define styles for the container holding sort buttons.

    flexDirection: 'row',

// Explanation: Arrange children horizontally instead of the default vertical. This places
// the "Sort by:" label and all buttons in a horizontal row.

    paddingHorizontal: 16,

// Explanation: Add 16 pixels of horizontal padding (left and right), matching the search
// bar's margin for visual alignment.

    marginBottom: 6,

// Explanation: Add 6 pixels of space below the sort buttons, separating them from the
// filter buttons below.

    alignItems: 'center',

// Explanation: Align children to the center of the cross axis (vertical center in row
// layout). This ensures the label and buttons align horizontally even if they have
// different heights.

  },

// Explanation: Close the sortContainer style object.

  sortButton: {

// Explanation: Define base styles for sort option buttons (applied to all three sort buttons).

    paddingVertical: 5,

// Explanation: Add 5 pixels of padding top and bottom, creating space between the text
// and button borders.

    paddingHorizontal: 8,

// Explanation: Add 8 pixels of padding left and right. The horizontal padding is larger
// than vertical to accommodate button text width.

    backgroundColor: '#FFFFFF',

// Explanation: White background for unselected state, making buttons stand out against
// the gray page background.

    borderRadius: 12,

// Explanation: Round corners with 12 pixel radius, matching the search input for visual
// consistency.

    borderWidth: 1.5,

// Explanation: Add a 1.5 pixel border, matching the search input's border thickness.

    borderColor: '#E0E0E0',

// Explanation: Light gray border color, also matching the search input for consistency.

    marginLeft: 6,

// Explanation: Add 6 pixels of space to the left of each button, creating gaps between
// buttons. The first button will have space from the label, and subsequent buttons will
// have space from each other.

    shadowColor: '#000',

// Explanation: Black shadow for subtle depth.

    shadowOffset: { width: 0, height: 1 },

// Explanation: Position shadow 1 pixel down, matching the search input's subtle elevation.

    shadowOpacity: 0.05,

// Explanation: Very subtle shadow (5% opacity), matching the search input.

    shadowRadius: 2,

// Explanation: Small blur radius (2 pixels) for a tight, subtle shadow.

    elevation: 1,

// Explanation: Minimal Android elevation (1) for subtle depth, matching iOS shadow styling.

  },

// Explanation: Close the sortButton style object.

  selectedButton: {

// Explanation: Define styles for selected state (applied conditionally to sort and filter
// buttons when active).

    backgroundColor: '#5E72E4',

// Explanation: Change background to purple-blue when selected, providing strong visual
// feedback about which option is active.

    borderColor: '#5E72E4',

// Explanation: Change border to the same blue. This creates a solid blue button with no
// contrasting border, making the selected state more prominent.

    shadowColor: '#5E72E4',

// Explanation: Use blue shadow instead of black, creating a colored glow effect like the
// search button.

    shadowOffset: { width: 0, height: 2 },

// Explanation: Increase shadow offset to 2 pixels (from 1 in base style), making selected
// buttons appear more elevated than unselected ones.

    shadowOpacity: 0.3,

// Explanation: Dramatically increase shadow opacity to 30% (from 5%), creating a
// prominent blue glow that makes selected buttons stand out.

    shadowRadius: 4,

// Explanation: Increase blur radius to 4 pixels (from 2), spreading the blue glow further
// for more emphasis.

    elevation: 3,

// Explanation: Increase Android elevation to 3 (from 1), making selected buttons appear
// more elevated than unselected ones on Android devices.

  },

// Explanation: Close the selectedButton style object.

  sortButtonText: {

// Explanation: Define base text styles for sort button labels.

    fontSize: 11,

// Explanation: Use small text (11 pixels) to fit multiple buttons in the horizontal row
// without wrapping. Small but still readable.

    color: '#4A5568',

// Explanation: Use dark gray text for unselected state. Darker than the clear button's
// gray (#718096), making button text more readable.

    fontWeight: '600',

// Explanation: Use semi-bold weight (600) to make small text more legible and give
// buttons substance.

  },

// Explanation: Close the sortButtonText style object.

  selectedButtonText: {

// Explanation: Define text styles for selected button state.

    color: '#FFFFFF',

// Explanation: Change text to white when button is selected (blue background), ensuring
// readability with proper contrast. White on blue provides excellent readability.

    fontWeight: '600',

// Explanation: Keep the same semi-bold weight as unselected state for consistency.

  },

// Explanation: Close the selectedButtonText style object.

  filterContainer: {

// Explanation: Define styles for the filter buttons container.

    flexDirection: 'row',

// Explanation: Arrange children horizontally, same as sortContainer.

    paddingHorizontal: 16,

// Explanation: Add 16 pixels horizontal padding, matching sortContainer for vertical alignment.

    marginBottom: 8,

// Explanation: Add 8 pixels of space below filter buttons, separating them from the
// product list. Slightly more than sortContainer's 6px to indicate filters are the last
// controls before content.

    alignItems: 'center',

// Explanation: Vertically center children in the row.

  },

// Explanation: Close the filterContainer style object.

  filterButton: {

// Explanation: Define styles for filter buttons. These are identical to sortButton - we
// could have reused sortButton, but separate styles allow future customization.

    paddingVertical: 5,

// Explanation: Same vertical padding as sort buttons.

    paddingHorizontal: 8,

// Explanation: Same horizontal padding as sort buttons.

    backgroundColor: '#FFFFFF',

// Explanation: White background for unselected state.

    borderRadius: 12,

// Explanation: Rounded corners matching sort buttons.

    borderWidth: 1.5,

// Explanation: Border thickness matching sort buttons.

    borderColor: '#E0E0E0',

// Explanation: Light gray border matching sort buttons.

    marginLeft: 6,

// Explanation: Left margin creating gaps between buttons.

    shadowColor: '#000',

// Explanation: Black shadow for subtle depth.

    shadowOffset: { width: 0, height: 1 },

// Explanation: 1 pixel down shadow offset.

    shadowOpacity: 0.05,

// Explanation: Very subtle 5% opacity shadow.

    shadowRadius: 2,

// Explanation: Small 2 pixel blur radius.

    elevation: 1,

// Explanation: Minimal Android elevation.

  },

// Explanation: Close the filterButton style object.

  filterButtonText: {

// Explanation: Define text styles for filter button labels. Identical to sortButtonText
// for visual consistency.

    fontSize: 11,

// Explanation: Small 11 pixel text to fit buttons in row.

    color: '#4A5568',

// Explanation: Dark gray text for unselected state.

    fontWeight: '600',

// Explanation: Semi-bold weight for legibility.

  },

// Explanation: Close the filterButtonText style object.

  sectionLabel: {

// Explanation: Define styles for the "Sort by:" and "Filter:" labels.

    fontSize: 15,

// Explanation: Slightly larger than button text (11px), making labels stand out as
// headings for their sections.

    fontWeight: '700',

// Explanation: Bold weight (700) makes labels prominent, clearly indicating what the
// following buttons do.

    color: '#2D3748',

// Explanation: Very dark gray, darker than button text, emphasizing labels as section headings.

    marginRight: 12,

// Explanation: Add 12 pixels of space to the right of labels, separating them from the
// first button in each row.

    letterSpacing: 0.3,

// Explanation: Add 0.3 pixels of space between letters. This subtle spacing makes labels
// more refined and easier to read, especially at smaller sizes.

  },

// Explanation: Close the sectionLabel style object.

  productCard: {

// Explanation: Define styles for each product card in the list.

    flexDirection: 'row',

// Explanation: Arrange card content horizontally - image on left, text on right.

    backgroundColor: '#FFFFFF',

// Explanation: White background makes cards stand out against the gray page background.

    marginHorizontal: 16,

// Explanation: Add 16 pixels of horizontal margin, creating space between cards and
// screen edges. This aligns cards with search and filter buttons.

    marginVertical: 6,

// Explanation: Add 6 pixels of vertical margin (top and bottom), creating space between
// cards. This produces a comfortable list with clear separation between items.

    padding: 12,

// Explanation: Add 12 pixels of padding inside the card, creating space between card
// edges and content (image and text).

    borderRadius: 16,

// Explanation: Round corners with 16 pixel radius. More rounded than buttons (12px),
// giving cards a softer, more prominent appearance as the main content elements.

    borderWidth: 0,

// Explanation: No border. Cards rely on shadows for definition rather than borders,
// creating a modern, floating appearance.

    shadowColor: '#000',

// Explanation: Black shadow to create depth.

    shadowOffset: {

// Explanation: Begin shadow offset configuration object.

      width: 0,

// Explanation: No horizontal offset - shadow appears directly below card.

      height: 3,

// Explanation: Position shadow 3 pixels down, more than buttons (1-2px), making cards
// appear more elevated. Cards are the primary content, so stronger shadows are
// appropriate.

    },

// Explanation: Close shadow offset object.

    shadowOpacity: 0.12,

// Explanation: Set shadow opacity to 12%, stronger than buttons (5%) but still subtle.
// This makes cards appear to float above the background without overwhelming the design.

    shadowRadius: 8,

// Explanation: Large blur radius (8 pixels) creates a soft, diffuse shadow that spreads
// widely, enhancing the floating card effect.

    elevation: 4,

// Explanation: Android elevation of 4, higher than buttons (1-2) to emphasize cards as
// primary content. This matches the iOS shadow styling for cross-platform consistency.

  },

// Explanation: Close the productCard style object.

  productImage: {

// Explanation: Define styles for product thumbnail images.

    width: 100,

// Explanation: Fixed width of 100 pixels. Consistent image size is important for list
// performance and clean layout. All images display at this width regardless of original
// dimensions.

    height: 100,

// Explanation: Fixed height of 100 pixels, matching width to create square images. Square
// images are predictable and align well in horizontal layouts.

    borderRadius: 12,

// Explanation: Round image corners with 12 pixel radius, matching button border radius.
// Rounded images feel friendlier than sharp corners.

    backgroundColor: '#F0F0F0',

// Explanation: Light gray background shows while the image loads or if loading fails.
// This prevents blank white spaces and indicates where the image should appear.

    marginRight: 14,

// Explanation: Add 14 pixels of space to the right of the image, separating it from the
// text content. This white space improves readability.

  },

// Explanation: Close the productImage style object.

  productInfo: {

// Explanation: Define styles for the container holding product text (title, category,
// price, rating).

    flex: 1,

// Explanation: Take all remaining horizontal space after the image. This ensures text
// uses all available width, maximizing space for product information.

    justifyContent: 'space-between',

// Explanation: Distribute children evenly with space between them. This pushes title to
// the top and price/rating to the bottom, with category in between. This creates a
// well-balanced card layout.

  },

// Explanation: Close the productInfo style object.

  productFooter: {

// Explanation: Define styles for the container holding price and rating at the bottom of the card.

    flexDirection: 'row',

// Explanation: Arrange price and rating horizontally.

    justifyContent: 'space-between',

// Explanation: Push price to the left and rating to the right, using all available width.
// This creates a balanced bottom row.

    alignItems: 'center',

// Explanation: Vertically center price and rating. Important because the rating has a
// background container that might be taller than the price text.

    marginTop: 8,

// Explanation: Add 8 pixels of space above the footer, separating it from the category
// text. This white space improves layout clarity.

  },

// Explanation: Close the productFooter style object.

  ratingContainer: {

// Explanation: Define styles for the container wrapping the rating text, creating a
// pill/badge effect.

    backgroundColor: '#FFF4E6',

// Explanation: Very light orange/amber background (nearly white with slight warmth). This
// subtle background creates a badge effect and associates the rating with the star color
// scheme.

    paddingHorizontal: 8,

// Explanation: Add 8 pixels of horizontal padding, creating space between the rating text
// and badge edges.

    paddingVertical: 4,

// Explanation: Add 4 pixels of vertical padding. Less than horizontal because text height
// provides natural padding. This creates an oval/pill shape.

    borderRadius: 8,

// Explanation: Round corners with 8 pixel radius, creating a pill/badge shape that makes
// the rating stand out as a distinct element.

  },

// Explanation: Close the ratingContainer style object.

  productTitle: {

// Explanation: Define styles for product title text.

    fontSize: 16,

// Explanation: Use 16 pixel font, same as search input. This is large enough to be the
// most prominent text on the card, appropriate for the main identifier.

    fontWeight: '700',

// Explanation: Bold weight (700) makes titles stand out clearly. Product names should be
// the most visually prominent text on cards.

    color: '#1A202C',

// Explanation: Very dark blue-gray, nearly black. This provides excellent readability
// while being slightly softer than pure black. The subtle blue tint coordinates with the
// app's blue accent color.

    marginBottom: 6,

// Explanation: Add 6 pixels of space below the title, separating it from the category text below.

    lineHeight: 20,

// Explanation: Set line height to 20 pixels. Since fontSize is 16, this adds 4 pixels of
// spacing between lines if the title wraps to two lines (numberOfLines={2}). Appropriate
// line height improves readability for multi-line text.

  },

// Explanation: Close the productTitle style object.

  productPrice: {

// Explanation: Define styles for product price text.

    fontSize: 20,

// Explanation: Large font (20 pixels) makes the price highly visible. Price is critical
// information for shopping apps, so it should be prominent.

    fontWeight: '800',

// Explanation: Extra bold weight (800) - the heaviest weight in the entire design. This
// emphasizes price as the most important piece of information on each card.

    color: '#5E72E4',

// Explanation: Use the app's purple-blue accent color for price. This draws attention and
// creates visual association with interactive elements (buttons use the same color).
// Colored prices stand out more than black/gray.

  },

// Explanation: Close the productPrice style object.

  productCategory: {

// Explanation: Define styles for product category text.

    fontSize: 13,

// Explanation: Small text (13 pixels), smaller than title (16) and price (20),
// de-emphasizing it as secondary information. Users can see the category but it doesn't
// compete with more important information.

    color: '#718096',

// Explanation: Medium gray color - darker than placeholders but lighter than primary
// text. This visually indicates the category is informational but not critical.

    textTransform: 'capitalize',

// Explanation: Automatically capitalize the first letter of each word. If the API returns
// "smartphones" in lowercase, this displays "Smartphones". This polishes the UI without
// requiring data transformation logic.

    marginBottom: 2,

// Explanation: Add 2 pixels of space below category text. This is minimal spacing, but it
// prevents the text from touching the price/rating row directly.

  },

// Explanation: Close the productCategory style object.

  productRating: {

// Explanation: Define styles for product rating text.

    fontSize: 13,

// Explanation: Same size as category (13 pixels), treating rating as secondary
// information equal in importance to category.

    color: '#D97706',

// Explanation: Amber/orange color that matches the star emoji. This creates visual
// cohesion - the number and star appear related. The warm color also associates ratings
// with gold/quality.

    fontWeight: '600',

// Explanation: Semi-bold weight (600) makes the rating substantial without competing with
// the price's extra bold weight (800).

  },

// Explanation: Close the productRating style object.

  loadingText: {

// Explanation: Define styles for the "Loading products..." text shown during data fetching.

    marginTop: 16,

// Explanation: Add 16 pixels of space above the text, separating it from the
// ActivityIndicator spinner above it.

    fontSize: 16,

// Explanation: Medium text size (16 pixels), large enough to read comfortably as the only
// text on screen.

    color: '#718096',

// Explanation: Medium gray color - not too prominent since loading text is temporary and
// informational.

    fontWeight: '500',

// Explanation: Medium weight (500), heavier than normal (400) but lighter than semi-bold
// (600). This makes the text substantial enough to read at a glance.

  },

// Explanation: Close the loadingText style object.

  errorText: {

// Explanation: Define styles for error message text.

    fontSize: 16,

// Explanation: Use 16 pixel font for comfortable reading of error messages, which may be
// longer than loading text.

    color: '#E53E3E',

// Explanation: Red color universally signals errors and problems. This color immediately
// communicates that something went wrong.

    marginBottom: 20,

// Explanation: Add 20 pixels of space below the error text, separating it from the retry
// button below.

    textAlign: 'center',

// Explanation: Center-align text horizontally. This creates a balanced, professional
// error screen, especially important if the error message spans multiple lines.

    paddingHorizontal: 24,

// Explanation: Add 24 pixels of horizontal padding to prevent error text from touching
// screen edges if it wraps to multiple lines.

    fontWeight: '500',

// Explanation: Medium weight (500) makes error text substantial and noticeable without
// being as bold as titles.

  },

// Explanation: Close the errorText style object.

  retryButton: {

// Explanation: Define styles for the retry button shown in error state.

    paddingVertical: 14,

// Explanation: Add 14 pixels of vertical padding, making the button tall enough to tap
// comfortably (at least 44 pixels total with text).

    paddingHorizontal: 32,

// Explanation: Add 32 pixels of horizontal padding, creating a button wide enough to
// comfortably contain the "Retry" text with breathing room.

    backgroundColor: '#5E72E4',

// Explanation: Use the app's purple-blue accent color, making this clearly an interactive
// button and the primary action on the error screen.

    borderRadius: 12,

// Explanation: Round corners with 12 pixel radius, matching other buttons in the app for
// consistency.

    shadowColor: '#5E72E4',

// Explanation: Use colored shadow (blue instead of black), creating a glow effect that
// draws attention to the retry action.

    shadowOffset: { width: 0, height: 3 },

// Explanation: Position shadow 3 pixels down, making the button appear elevated and clickable.

    shadowOpacity: 0.3,

// Explanation: Set shadow opacity to 30%, creating a visible blue glow that emphasizes
// this is an interactive element.

    shadowRadius: 6,

// Explanation: Use 6 pixel blur radius for a soft, spread shadow that enhances the
// button's prominence.

    elevation: 4,

// Explanation: Set Android elevation to 4, matching the iOS shadow styling and making the
// button appear elevated on Android devices.

  },

// Explanation: Close the retryButton style object.

  retryButtonText: {

// Explanation: Define styles for the "Retry" text inside the retry button.

    color: '#FFFFFF',

// Explanation: White text provides strong contrast against the blue button background,
// ensuring readability.

    fontSize: 16,

// Explanation: Use 16 pixel font, large enough to read easily and indicating this is an
// important action.

    fontWeight: '700',

// Explanation: Bold weight (700) makes the button text prominent and clearly indicates
// this is the primary action on the error screen.

  },

// Explanation: Close the retryButtonText style object.

});

// Explanation: Close the StyleSheet.create() call. All styles are now defined and
// optimized for performance.

export default HomeScreen;

// Explanation: Export the HomeScreen component as the default export from this module.
// This allows other files to import it with "import HomeScreen from './HomeScreen'".
// Default exports are common for files that contain a single primary component. The
// component is now complete and ready to be used in a React Navigation stack or other
// navigation system.

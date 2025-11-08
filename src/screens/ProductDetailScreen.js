// ============================================================================
// FILE: src/screens/ProductDetailScreen.js
// ============================================================================
//
// PURPOSE:
// This screen displays comprehensive details about a single product, including
// images, description, price, rating, stock, and brand information.
//
// WHAT IT DOES:
// - Receives productId from navigation route parameters
// - Uses useProductDetail hook to fetch product data
// - Displays loading spinner while fetching
// - Shows error message if fetch fails
// - Renders detailed product information in a scrollable layout
// - Provides a button to return to the product list
//
// WHY IT'S NEEDED:
// Users need to see full product details before making decisions. This screen
// provides that detailed view, showing all available information about a product.
// It demonstrates conditional rendering, data fetching, error handling, and
// navigation patterns common in mobile apps.
//
// ============================================================================

import React, { useEffect } from 'react';

// Explanation: This line imports two essential tools from the React library.
// React is the core library that lets us create user interface components,
// while useEffect is a special function called a "hook" that allows us to
// perform side effects like logging or data fetching when our component mounts
// or updates. Think of useEffect as a way to run code at specific times in a
// component's lifecycle.

import {

// Explanation: This line begins importing multiple components from React
// Native's core library. The curly braces indicate we're importing specific
// named exports rather than a default export. React Native provides these
// pre-built components that translate to native iOS and Android UI elements,
// giving us the building blocks to create mobile app interfaces.

  View,

// Explanation: View is the most fundamental container component in React
// Native, similar to a <div> in web development. It's used to wrap and
// organize other components, and serves as the foundation for layout using
// flexbox. Every visual element typically sits inside a View or nested Views
// that control positioning, spacing, and arrangement.

  Text,

// Explanation: Text is the only component allowed to display text in React
// Native. Unlike web development where text can go anywhere, React Native
// requires all text content to be wrapped in <Text> components. This component
// handles font styling, color, size, and text-specific properties like
// numberOfLines or ellipsizeMode for truncating long text.

  ScrollView,

// Explanation: ScrollView is a scrollable container that allows content taller
// than the screen to be scrolled vertically or horizontally. It renders all
// its children at once (unlike FlatList which only renders visible items),
// making it perfect for detail screens with moderate amounts of content. When
// content exceeds the screen height, ScrollView automatically enables
// scrolling behavior.

  Image,

// Explanation: Image is the component that displays images from various
// sources including network URLs, local files, or base64 encoded data. It
// handles loading states, caching, and different sizing modes automatically.
// For network images, you must provide explicit width and height dimensions or
// the image won't render properly.

  ActivityIndicator,

// Explanation: ActivityIndicator is a native loading spinner that provides
// visual feedback while data is being fetched or processed. It automatically
// uses the platform-appropriate spinner style (circular on iOS and Android)
// and can be customized with size ("small" or "large") and color properties to
// match your app's design.

  StyleSheet,

// Explanation: StyleSheet is a React Native API that optimizes style
// definitions by converting JavaScript style objects into efficient references
// that are sent to native code only once. Using StyleSheet.create() instead of
// inline styles improves performance, provides style validation, and makes
// styles reusable across your component.

} from 'react-native';

// Explanation: This closing line completes the import statement that began
// above, specifying that all these components come from the 'react-native'
// package. The semicolon marks the end of this import declaration, following
// JavaScript syntax conventions for statement termination.

import useProductDetail from '../hooks/useProductDetail';

// Explanation: This imports our custom hook that encapsulates all the logic
// for fetching a single product's details from the API. The '../' means go up
// one directory from 'screens' to 'src', then into the 'hooks' folder. Custom
// hooks like this one let us reuse data fetching logic across multiple
// components and keep our component code clean and focused on rendering.

const ProductDetailScreen = ({ route }) => {

// Explanation: This declares a functional component named ProductDetailScreen
// using an arrow function. The component receives a 'route' prop that's
// automatically provided by React Navigation when this screen is navigated to.
// This route object contains parameters passed during navigation, like the
// productId we need to fetch and display the correct product details.

  const { productId } = route.params;

// Explanation: This uses destructuring to extract the productId from the route
// parameters object. When navigating to this screen, code like
// navigation.navigate('ProductDetail', { productId: 5 }) passes the ID as a
// parameter. Destructuring with curly braces is shorthand for writing: const
// productId = route.params.productId, making the code cleaner and more
// readable.

  const { product, loading, error } = useProductDetail(productId);

// Explanation: This line calls our custom hook, passing in the productId, and
// destructures the three values it returns. The 'product' object contains all
// product data once loaded, 'loading' is a boolean that's true while fetching
// data, and 'error' contains any error object if the request fails. This
// pattern separates data fetching concerns from UI rendering logic.

  useEffect(() => {

// Explanation: This begins a useEffect hook that runs side effects in our
// component. The arrow function passed to useEffect contains code that will
// execute after the component renders. Effects are used for operations that
// interact with systems outside of React, like logging, subscriptions, timers,
// or manual DOM manipulations in web apps.

    console.log(`ProductDetailScreen mounted with productId: ${productId}`);

// Explanation: This logs a message to the console when the component mounts
// (appears on screen). The backticks (`) enable template literals, allowing us
// to embed the productId variable directly in the string using ${productId}
// syntax. This logging helps developers debug navigation flow and verify the
// correct product ID is being passed to the screen.

    return () => {

// Explanation: This return statement inside useEffect defines a cleanup
// function that runs before the component unmounts (when the user navigates
// away) or before the effect runs again if dependencies change. Cleanup
// functions are crucial for canceling subscriptions, clearing timers, or
// aborting API requests to prevent memory leaks and unwanted behavior after
// the component is gone.

      console.log(`ProductDetailScreen unmounted for productId: ${productId}`);

// Explanation: This logs when the component is about to unmount or before the
// effect re-runs. It helps developers track component lifecycle events during
// debugging. In production apps, you might use cleanup functions to cancel
// ongoing API requests, remove event listeners, or clear intervals to prevent
// "memory leaks" where resources aren't properly released.

    };

// Explanation: This closes the cleanup function with a semicolon, completing
// the function definition. The cleanup function doesn't take any parameters
// but has access to the component's variables through closure, which is why it
// can reference productId even though that variable was defined outside this
// function.

  }, [productId]);

// Explanation: This is the dependency array for useEffect, containing
// productId. It tells React to only re-run this effect when productId changes.
// Without this array, the effect would run after every render. An empty array
// [] would mean run only once on mount. Including productId ensures the effect
// runs again if the user navigates to a different product while staying on
// this screen.

  if (loading) {

// Explanation: This conditional statement checks if data is still being
// fetched. Since useProductDetail initially sets loading to true when it
// starts fetching, this condition will be true on first render. Using early
// returns for different states (loading, error, success) is a clean pattern
// that prevents nested conditional rendering and makes the component logic
// easier to follow.

    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        {/* Explanation: ActivityIndicator displays a native spinning loader. The size
        prop accepts "small" or "large", determining the spinner's dimensions. The
        color prop "#007AFF" is iOS's standard blue color, providing visual
        consistency with native iOS apps. On Android, this component automatically
        adapts to Material Design guidelines while respecting the color you specify. */}

        <Text style={styles.loadingText}>Loading product details...</Text>
        {/* Explanation: This Text component displays a message below the spinner to
        inform users what's happening. The loadingText style applies gray color and
        spacing to make it visually subordinate to the spinner. Providing loading
        messages improves user experience by setting expectations and reducing
        perceived wait time, especially on slower connections. */}

      </View>
    );

// Explanation: This closes the return statement that began four lines above,
// completing the JSX expression we're returning when loading is true. The
// parentheses around the JSX are optional but improve readability when
// returning multi-line JSX expressions and prevent automatic semicolon
// insertion issues that can occur with unparenthesized returns.

  }

// Explanation: This closes the if (loading) block. Once this closing brace is
// reached, if loading was true, the function has already returned and no
// further code executes. If loading is false, execution continues to the next
// conditional check below, demonstrating how multiple early returns create a
// clean flow through different UI states.

  if (error) {

// Explanation: This checks if the useProductDetail hook encountered an error
// during the API request. The error variable will be null/undefined if
// everything succeeded, but if the fetch fails due to network issues, server
// errors, or invalid responses, it will contain an error object. Checking for
// errors before trying to render product data prevents crashes and provides
// better user experience.

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading product</Text>
        {/* Explanation: This displays a user-friendly error heading. The errorText
        style makes it larger, bold, and red to clearly communicate that something
        went wrong. Notice we're not showing technical error details in this
        heading—that comes next—which follows the UX principle of progressive
        disclosure: show the essential message first, with details available but not
        overwhelming. */}

        <Text style={styles.errorDetail}>{error.message}</Text>
        {/* Explanation: This displays the actual error message from the error object.
        JavaScript error objects have a 'message' property containing error details
        like "Network request failed" or "Timeout exceeded". Showing this helps
        users understand what went wrong and helps developers debug issues in
        production. In production apps, you might log errors to a service like
        Sentry while showing generic messages to users. */}

      </View>
    );

// Explanation: This closes the return statement for the error state,
// completing the JSX being returned when an error exists. After this early
// return, if error was truthy, the function exits and subsequent code never
// executes.

  }

// Explanation: This closes the if (error) block. If we've reached this point
// in the code, it means loading is false and error is null/undefined, so the
// API request succeeded. Now we need one more check before rendering: making
// sure the product data actually exists.

  if (!product) {

// Explanation: This defensive check handles the edge case where loading
// finished, no error occurred, but the product is still null or undefined.
// This can happen if the API returns a successful response with no data, or if
// the product ID doesn't exist in the database. The exclamation mark (!) is
// the "not" operator, making this true when product is null, undefined, or any
// other falsy value.

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        {/* Explanation: This displays a clear message that the requested product
        doesn't exist. We reuse errorText style for visual consistency with other
        error states, using red color and bold weight to communicate that
        something's wrong. This helps users understand the issue isn't loading but
        rather the product simply doesn't exist. */}

      </View>
    );

// Explanation: This closes the return statement for the null product case.
// This is the last early return in our component. If we get past this point,
// we know for certain that loading is false, error is null, and product
// exists, so it's safe to render the actual product details.

  }

// Explanation: This closes the if (!product) block. Having passed all three
// guards (loading, error, null product), we can now confidently render the
// main UI knowing we have valid product data available. This pattern of early
// returns for edge cases is much cleaner than deeply nested if-else
// statements.

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.productImage}
        resizeMode="contain"
      />
      {/* Explanation: This closes the Image component with a self-closing tag. The
      forward slash before the angle bracket indicates this component doesn't
      have children and closes itself, similar to img in HTML or br for
      line breaks. */}

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        {/* Explanation: This displays the product name in large, bold text. The curly
        braces around product.title embed the JavaScript variable's value into the
        JSX. The title style makes this text 24px, bold, and dark gray, creating
        clear visual hierarchy as the most prominent text element after the image. */}

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        {/* Explanation: This displays the price with formatting. The dollar sign is
        literal text, while product.price.toFixed(2) ensures exactly two decimal
        places (19.99 instead of 19.9 or 19.999), professional formatting users
        expect. The price style uses 28px bold blue text, making it visually
        prominent since price is often a key decision factor. The toFixed() method
        returns a string, which is why we can concatenate it with the $ symbol. */}

        <View style={styles.detailRow}>
          <Text style={styles.label}>Category:</Text>
          {/* Explanation: This displays the "Category:" label in bold, gray text. The
          label style gives it 16px font size and bold weight to distinguish it from
          the actual value, creating visual hierarchy within each row. The colon and
          space are included in the text content itself. */}

          <Text style={styles.value}>{product.category}</Text>
          {/* Explanation: This displays the actual category name from the product data.
          The value style makes it the same size as the label (16px) but uses darker
          gray to make it more prominent than the label, drawing the eye to the actual
          information rather than the label. The flex: 1 style property makes this
          text take up remaining space, allowing it to wrap if the category name is
          long. */}

        </View>
        {/* Explanation: This closes the category detail row View. Each piece of product
        information follows this same label-value row pattern, creating consistency
        and making the code easy to maintain. If we need to add more product
        details, we can copy this structure. */}

        <View style={styles.detailRow}>
          <Text style={styles.label}>Brand:</Text>
          {/* Explanation: This displays the "Brand:" label using the same label style as
          the category row above. Consistent styling across similar elements creates
          visual harmony and helps users quickly scan and find the information they
          need. */}

          <Text style={styles.value}>{product.brand}</Text>
          {/* Explanation: This shows the product's brand name using the value style.
          Brand information helps users make purchasing decisions, especially for
          products where brand reputation matters (electronics, clothing, etc.). The
          consistent label-value pattern makes the interface predictable and easy to
          understand. */}

        </View>
        {/* Explanation: This closes the brand detail row View, completing the second
        specification row in our product details section. */}

        <View style={styles.detailRow}>
          <Text style={styles.label}>Rating:</Text>
          {/* Explanation: This displays the "Rating:" label in the same style as other
          labels, maintaining the consistent pattern that helps users quickly identify
          what each piece of information represents. */}

          <Text style={styles.value}>{product.rating.toFixed(1)} / 5</Text>
          {/* Explanation: This displays the rating formatted to one decimal place (4.5,
          not 4.53 or 4) followed by "/ 5" to indicate the scale. Using toFixed(1)
          ensures consistent display width—ratings always show as "X.X / 5"—which
          prevents layout shifting and looks more professional than varying decimal
          places. */}

        </View>
        {/* Explanation: This closes the rating detail row View, completing the third
        specification in our product information section. */}

        <View style={styles.detailRow}>
          <Text style={styles.label}>Stock:</Text>
          {/* Explanation: This displays the "Stock:" label using our standard label
          styling. Stock availability is critical information that affects whether a
          user can buy the product, so it deserves prominent display. */}

          <Text
            style={[
              styles.value,
              product.stock === 0 && styles.outOfStock,
              product.stock > 0 && product.stock <= 10 && styles.lowStock,
            ]}>
            {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
          </Text>

        </View>
        {/* Explanation: This closes the stock detail row View, completing the stock
        availability section with its conditional color-coded styling. */}

        <View style={styles.descriptionSection}>
          <Text style={styles.label}>Description:</Text>
          {/* Explanation: This displays the "Description:" label using our standard label
          style. Even though the description is longer and separated, maintaining the
          same label style creates consistency and helps users recognize the
          label-value pattern throughout the screen. */}

          <Text style={styles.description}>{product.description}</Text>
          {/* Explanation: This displays the full product description text. The
          description style uses lineHeight: 24 (1.5 times the 16px font size) to add
          vertical spacing between lines, making multiple lines of text easier to
          read. The slightly lighter gray color (compared to specifications) indicates
          this is supplementary information rather than critical specs. */}

        </View>
        {/* Explanation: This closes the description section View, completing the main
        product description display with its enhanced spacing and visual separation. */}

        {product.warrantyInformation && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Warranty:</Text>
            <Text style={styles.value}>{product.warrantyInformation}</Text>
          </View>
        )}

        {product.shippingInformation && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Shipping:</Text>
            <Text style={styles.value}>{product.shippingInformation}</Text>
          </View>
        )}

        {product.returnPolicy && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Returns:</Text>
            <Text style={styles.value}>{product.returnPolicy}</Text>
          </View>
        )}

        {product.minimumOrderQuantity && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Minimum Order:</Text>
            <Text style={styles.value}>{product.minimumOrderQuantity} units</Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );

// Explanation: This closes the main return statement with its parentheses,
// completing the JSX expression that defines what the ProductDetailScreen
// component renders when it has valid product data to display.

};

// Explanation: This closes the ProductDetailScreen component function with a
// semicolon. Everything between "const ProductDetailScreen = ({ route }) => {"
// and this closing brace is the component's definition, including all its
// logic for handling loading states, errors, and rendering product details.

const styles = StyleSheet.create({

// Explanation: This begins defining our component's styles using
// StyleSheet.create(). This method converts JavaScript style objects into
// optimized references that React Native sends to native code once rather than
// on every render. StyleSheet.create() also validates style properties,
// warning you if you use invalid property names or values, and enables better
// performance than inline style objects.

  container: {

// Explanation: This defines the style object for the ScrollView's scrollable
// content area (via contentContainerStyle prop). Using a semantic name like
// "container" makes the code self-documenting—when you see styles.container,
// you know it's styling a container element.

    padding: 16,

// Explanation: This adds 16 pixels of padding on all four sides of the content
// area (top, right, bottom, left). Padding prevents content from touching the
// screen edges, which would look cramped and be harder to read. 16px is a
// common baseline spacing unit in mobile design that provides comfortable
// breathing room.

    backgroundColor: '#fff',

// Explanation: This sets the background color to white using hexadecimal color
// notation. '#fff' is shorthand for '#ffffff' (full white). Having an explicit
// white background ensures the content area looks clean even if the device
// theme or parent component has a different background color.

  },

// Explanation: This closes the container style object with a comma. In
// JavaScript objects, each property except the last needs a comma separator,
// though trailing commas (after the last property) are allowed and often
// preferred in modern JavaScript for easier git diffs when adding properties.

  centerContainer: {

// Explanation: This defines styles for centering content on screen, used for
// the loading, error, and not-found states. Having a reusable style for
// centered fallback states reduces code duplication and ensures these states
// have consistent appearance.

    flex: 1,

// Explanation: Setting flex to 1 makes this container expand to fill all
// available space in its parent. In React Native's flexbox system, flex: 1
// means "take up all remaining space", so this container will stretch from top
// to bottom of the screen, giving us a full canvas for centering content.

    justifyContent: 'center',

// Explanation: This vertically centers children within the container (along
// the main axis, which is vertical by default since flexDirection defaults to
// 'column'). The ActivityIndicator and error messages will be positioned in
// the middle of the screen height rather than at the top.

    alignItems: 'center',

// Explanation: This horizontally centers children within the container (along
// the cross axis, perpendicular to the main axis). Combined with
// justifyContent: center, this creates perfect centering both horizontally and
// vertically, making loading and error messages appear right in the middle of
// the screen.

    padding: 20,

// Explanation: This adds 20 pixels of padding around the centered content,
// ensuring that even if error messages are long and wrap to multiple lines,
// they won't touch the screen edges. This creates comfortable spacing even for
// centered content.

  },

// Explanation: This closes the centerContainer style object. This versatile
// style is used for three different states (loading, error, product not
// found), demonstrating how well-named reusable styles reduce code and
// maintain consistency.

  productImage: {

// Explanation: This defines styles specifically for the product image that
// appears at the top of the detail view. Separating image styles from other
// component styles makes them easy to find and modify later.

    width: '100%',

// Explanation: This makes the image fill the full width of its container (the
// ScrollView with 16px padding, so effectively screen width minus 32px total
// horizontal padding). Percentage widths are relative to the parent container,
// making the layout responsive to different screen sizes without hardcoding
// pixel widths.

    height: 300,

// Explanation: This sets a fixed height of 300 pixels for the image. Unlike
// width which is percentage-based for responsiveness, using fixed height
// ensures consistent layout across different screen sizes while maintaining a
// reasonable aspect ratio for most product photos. Combined with resizeMode:
// contain, images will scale to fit within these dimensions.

    marginBottom: 16,

// Explanation: This adds 16 pixels of space between the product image and the
// information below it. Consistent margin values (16px matches the container
// padding) create visual rhythm and prevent the interface from feeling
// cluttered or cramped.

    backgroundColor: '#f0f0f0',

// Explanation: This sets a light gray background color that shows while the
// image is loading from the network. Without this, there would be an awkward
// white rectangle while waiting for the image, but with a subtle gray
// background, the loading state is less jarring and users can see where the
// image will appear.

    borderRadius: 8,

// Explanation: This rounds the corners of the image container by 8 pixels,
// creating a softer, more polished appearance than sharp corners. Border
// radius is a common design technique in modern mobile apps that makes
// interfaces feel friendlier and more refined. The value 8 provides noticeable
// rounding without making the image look like a button or pill.

  },

// Explanation: This closes the productImage style object, completing all the
// styling needed to make product images display attractively with proper
// dimensions, spacing, loading states, and rounded corners.

  infoContainer: {},

// Explanation: This defines an empty style object for the View that wraps all
// product information. While currently empty, having this defined makes future
// styling easier—you might later add padding, background colors, borders, or
// shadows to the info section without changing the component code. Empty style
// objects have no performance impact and serve as styling extension points.

  title: {

// Explanation: This defines styles for the product title text, which should be
// the most prominent text element after the image to establish clear
// information hierarchy.

    fontSize: 24,

// Explanation: This sets the title text to 24 pixels, significantly larger
// than body text (typically 14-16px). Large font size immediately draws
// attention and communicates importance, helping users quickly identify what
// product they're viewing. Mobile design often uses larger type than web
// design since phones are viewed from closer distances.

    fontWeight: 'bold',

// Explanation: This makes the title text bold, further emphasizing its
// importance in the visual hierarchy. Bold text stands out when scanning and
// is processed faster by readers. The combination of large size and bold
// weight makes the title impossible to miss.

    marginBottom: 8,

// Explanation: This adds 8 pixels of space below the title, separating it from
// the price below. Using smaller margins (8px) between closely related items
// and larger margins (16px) between distinct sections creates visual grouping
// that helps users understand which pieces of information relate to each
// other.

    color: '#333',

// Explanation: This sets the text color to dark gray (#333 instead of pure
// black #000). Dark gray is easier on the eyes than pure black, especially on
// bright white backgrounds, reducing eye strain during extended reading. This
// is a common best practice in modern UI design for body and heading text.

  },

// Explanation: This closes the title style object, completing the styling that
// makes product titles large, bold, prominent, and readable.

  price: {

// Explanation: This defines styles for the price display, which needs to be
// visually prominent since price is a critical factor in purchase decisions.
// Good price styling makes this information immediately scannable.

    fontSize: 28,

// Explanation: This makes the price text 28 pixels, even larger than the title
// (24px), giving it maximum visual prominence. The price being the largest
// text element on screen reflects its importance in purchasing decisions—users
// often check the price first or return to it repeatedly while reading
// details.

    fontWeight: 'bold',

// Explanation: This makes the price bold, adding to its visual weight and
// importance. Combined with the large font size and blue color applied next,
// the price becomes the most attention-grabbing text element on the screen.

    color: '#007AFF',

// Explanation: This colors the price text using #007AFF, which is iOS's
// standard blue color for interactive and important elements. Blue is
// universally associated with information and action in digital interfaces.
// Using a distinct color (blue vs gray for other text) makes the price stand
// out and easy to locate when scanning the screen.

    marginBottom: 16,

// Explanation: This adds 16 pixels of space below the price, creating clear
// separation between pricing and the specification rows below. Using a larger
// margin here (16px vs 8px below title) creates a visual pause that groups the
// title and price together while separating them from the detailed
// specifications section.

  },

// Explanation: This closes the price style object, completing the styling that
// makes prices maximally prominent through size, weight, color, and spacing.

  detailRow: {

// Explanation: This defines the layout style for specification rows that
// contain label-value pairs (category, brand, rating, etc.). This reusable
// style creates consistent spacing and layout for all product attributes.

    flexDirection: 'row',

// Explanation: This changes the flex direction from the default 'column'
// (vertical stacking) to 'row' (horizontal arrangement). This makes children
// arrange side-by-side instead of top-to-bottom, allowing the label
// ("Category:") and value ("Electronics") to appear on the same line.

    marginBottom: 12,

// Explanation: This adds 12 pixels of vertical space below each row, creating
// breathing room between different specifications. The value is slightly less
// than the 16px used for major sections, indicating these rows are more
// closely related to each other than to other major sections like the
// description.

    flexWrap: 'wrap',

// Explanation: This allows content to wrap to the next line if it's too wide
// for the screen, preventing horizontal overflow. Without this, long category
// names or values would get cut off on narrow screens. With flexWrap: wrap,
// the value text can wrap to a second line while maintaining the row layout
// when possible, making the interface responsive to different screen sizes and
// text lengths.

  },

// Explanation: This closes the detailRow style object, completing the
// flexible, wrappable horizontal layout used for all specification rows.

  label: {

// Explanation: This defines styles for the labels in specification rows (the
// "Category:", "Brand:", "Rating:" parts). Labels need to be visually distinct
// from values while remaining readable and aligned.

    fontSize: 16,

// Explanation: This sets label text to 16 pixels, which is a standard
// comfortable reading size for mobile interfaces. At 16px, text is easily
// readable without zooming while not being so large that it takes up excessive
// space or looks childish.

    fontWeight: 'bold',

// Explanation: This makes labels bold to distinguish them from the values that
// follow. The bold weight creates visual hierarchy within each row, helping
// users quickly scan and find specific information by looking for the bold
// labels.

    marginRight: 8,

// Explanation: This adds 8 pixels of space between the label and its value,
// preventing them from running together. This small gap clearly separates
// "Category:" from "Electronics" while keeping them visually connected as a
// pair on the same row.

    color: '#666',

// Explanation: This colors labels medium gray (#666), lighter than the dark
// gray (#333) used for values. This color hierarchy makes values more
// prominent than labels, directing attention to the actual information rather
// than the descriptive text. Users naturally focus on the darker text (values)
// while still being able to identify what each value represents from the
// lighter labels.

  },

// Explanation: This closes the label style object, completing the styling that
// makes specification labels identifiable through bold weight and medium gray
// color while maintaining readability.

  value: {

// Explanation: This defines styles for the actual data values in specification
// rows (the product category name, brand name, rating number, etc.). Values
// need to be more prominent than labels since they're the information users
// are seeking.

    fontSize: 16,

// Explanation: This sets value text to 16 pixels, matching the label size.
// Using the same size for labels and values maintains consistency and
// readability while letting other properties (color, weight) create the
// distinction between them.

    color: '#333',

// Explanation: This colors values in dark gray (#333), noticeably darker than
// the label color (#666). This darker color draws the eye to the actual
// information, making values the focal point of each row while labels remain
// visible but less prominent.

    flex: 1,

// Explanation: This makes the value text take up all remaining space in the
// row after the label. Combined with flexWrap: wrap on the parent, this means
// values can be as wide as needed and will wrap to multiple lines on small
// screens or with long text. Without flex: 1, long values might get cut off or
// overflow the screen. This makes the layout responsive and prevents text
// truncation.

  },

// Explanation: This closes the value style object, completing the styling that
// makes specification values prominent, readable, and flexible enough to
// handle varying text lengths.

  descriptionSection: {

// Explanation: This defines styles for the description section that needs
// visual separation from the brief specification rows above. Longer text
// benefits from its own clearly defined section.

    marginTop: 16,

// Explanation: This adds 16 pixels of space above the description section,
// creating separation from the specifications above. This larger margin
// (compared to 12px between spec rows) signals that the description is a
// distinct section rather than another specification row.

    paddingTop: 16,

// Explanation: This adds 16 pixels of internal padding at the top of the
// description section, in addition to the margin. While margin creates
// external space between elements, padding creates internal space within the
// element. Having both margin and padding, along with the border below,
// creates substantial visual separation that clearly distinguishes this
// section.

    borderTopWidth: 1,

// Explanation: This adds a 1-pixel border line at the top of the description
// section. The border creates a visual separator that clearly indicates "new
// section begins here", helping users understand the content structure.
// Borders are more explicit than spacing alone for section division.

    borderTopColor: '#e0e0e0',

// Explanation: This colors the top border in very light gray (#e0e0e0),
// providing subtle visual separation without harsh contrast. A subtle border
// is enough to delineate sections without creating visual heaviness or making
// the interface feel cluttered. The light gray complements the white
// background while remaining visible.

  },

// Explanation: This closes the descriptionSection style object, completing the
// styling that visually separates the longer description text from the brief
// specifications through spacing, padding, and a subtle border.

  description: {

// Explanation: This defines styles specifically for the description text
// content, which is typically multiple sentences or paragraphs and needs
// different formatting than single-line specifications for optimal
// readability.

    fontSize: 16,

// Explanation: This sets description text to 16 pixels, the same as
// specifications. Consistency in font size across the interface creates
// harmony, and 16px is the sweet spot for mobile reading—large enough to read
// comfortably without zooming, small enough to fit adequate text on screen.

    lineHeight: 24,

// Explanation: This sets the vertical spacing between lines of text to 24
// pixels, which is 1.5 times the fontSize (16px). This additional spacing
// prevents lines from feeling cramped when text wraps to multiple lines,
// significantly improving readability for paragraph text. Without adequate
// line height, multiple lines would be hard to read because your eye would
// jump to the wrong line. 1.5x is a standard best practice for body text
// readability.

    color: '#666',

// Explanation: This colors the description in medium gray (#666), the same as
// labels, making it visually de-emphasized compared to specifications. Since
// descriptions are supplementary information (the "nice to know" vs "need to
// know"), the lighter color appropriately signals their secondary importance
// while remaining fully readable.

    marginTop: 8,

// Explanation: This adds 8 pixels of space above the description text,
// separating it from its "Description:" label. This small margin groups the
// label and text together as a unit while providing enough breathing room that
// they don't feel cramped.

  },

// Explanation: This closes the description style object, completing the
// typography and spacing that makes longer product descriptions comfortable to
// read with proper line spacing and visual hierarchy.

  loadingText: {

// Explanation: This defines styles for the "Loading product details..." text
// that appears below the ActivityIndicator spinner. Loading messages should be
// visible but not prominent since they're temporary states.

    marginTop: 16,

// Explanation: This adds 16 pixels of space above the loading text, separating
// it from the spinner above. This spacing prevents the text from feeling
// crowded against the ActivityIndicator while keeping them visually grouped as
// a loading state unit.

    fontSize: 16,

// Explanation: This sets the loading message to 16 pixels, matching other body
// text throughout the app for consistency. Using standard font size for
// loading messages maintains visual harmony and keeps the temporary state from
// calling unnecessary attention to itself.

    color: '#666',

// Explanation: This colors the loading text medium gray (#666), making it
// secondary to the animated spinner above it. The gray indicates this is
// status information rather than critical content, appropriately de-emphasizing
// temporary state messages compared to actual product information.

  },

// Explanation: This closes the loadingText style object, completing the subtle
// styling for loading state messages that remain visible without being
// distracting.

  errorText: {

// Explanation: This defines styles for error heading messages like "Error
// loading product" or "Product not found". Error messages need to be
// immediately noticeable so users understand why content isn't displaying.

    fontSize: 18,

// Explanation: This makes error messages 18 pixels, larger than body text
// (16px) but smaller than titles (24px). The slightly larger size draws
// attention and communicates importance without overwhelming the interface,
// appropriate for error states that need to be noticed but aren't the primary
// content.

    color: '#d32f2f',

// Explanation: This colors error text in red (#d32f2f), a color universally
// associated with errors, warnings, and problems. Red immediately signals that
// something went wrong, leveraging users' learned color associations from
// traffic lights, warning signs, and other interfaces. This specific shade of
// red (Material Design red 700) is strong enough to convey urgency without
// being aggressive or hard to look at.

    fontWeight: 'bold',

// Explanation: This makes error messages bold, further emphasizing their
// importance and ensuring they stand out even for users who might not
// immediately notice the red color (including users with color vision
// deficiencies). Combining red color, bold weight, and larger size creates
// multiple visual cues that something requires attention.

    marginBottom: 8,

// Explanation: This adds 8 pixels of space below the error heading, separating
// it from the detailed error message that follows. This creates a two-level
// error hierarchy: the bold red heading grabs attention, then the smaller
// detail text provides specific information about what went wrong.

  },

// Explanation: This closes the errorText style object, completing the
// prominent styling that makes error headings immediately noticeable through
// color, size, and weight.

  errorDetail: {

// Explanation: This defines styles for the detailed error message text that
// appears below the error heading, providing specific information about the
// error like "Network request failed" or the actual error message from the
// API.

    fontSize: 14,

// Explanation: This makes error details 14 pixels, smaller than the body text
// (16px) and error heading (18px), creating clear hierarchy. The smaller size
// indicates this is supplementary information—useful for understanding or
// debugging the error but secondary to the main "an error occurred" message.

    color: '#666',

// Explanation: This colors error details in medium gray (#666) instead of red,
// de-emphasizing them compared to the error heading. While the heading needs
// to grab attention with red, the details are better served by neutral gray
// that's easy to read. Using gray for details also prevents the entire error
// state from being a wall of red, which could feel aggressive or alarming.

    textAlign: 'center',

// Explanation: This centers the error detail text horizontally, matching the
// centering of the error heading (achieved via the centerContainer's
// alignItems: center). Centered text creates visual harmony for error and
// loading states, making them feel balanced and polished even though they're
// temporary fallback states. Center alignment also works well for messages of
// varying length.

  },

// Explanation: This closes the errorDetail style object, completing the subtle
// styling that makes detailed error information readable without overwhelming
// users with alarming red text.

  outOfStock: {

// Explanation: This defines a conditional style applied to stock text when a
// product has zero inventory. This style is combined with the base value style
// using an array, so it only needs to specify the properties that differ from
// the base.

    color: '#d32f2f',

// Explanation: This changes the text color to red (#d32f2f, the same red used
// for errors), creating visual alarm when products are unavailable. Red is
// universally understood as a stop/problem signal, so out-of-stock items
// immediately stand out, preventing users from going through the purchase
// process only to discover the item can't be bought.

    fontWeight: 'bold',

// Explanation: This makes out-of-stock text bold, providing an additional
// visual cue beyond color. Bold weight ensures the unavailability message
// stands out even for users with color vision deficiencies who might not
// distinguish red from gray. Multiple visual indicators (color and weight)
// make interfaces more accessible.

  },

// Explanation: This closes the outOfStock style object, completing the
// prominent styling that makes product unavailability immediately obvious
// through red color and bold weight.

  lowStock: {

// Explanation: This defines a conditional style applied when stock is low
// (between 1 and 10 units). Low stock creates urgency without the alarm of
// out-of-stock, potentially motivating faster purchase decisions.

    color: '#f57c00',

// Explanation: This changes text color to orange (#f57c00, Material Design
// orange 700), a color that signals caution and urgency without the hard stop
// of red. Orange is associated with warnings and alerts, creating a sense of
// "hurry but don't panic", perfect for low inventory that's still available
// but might run out soon.

    fontWeight: '600',

// Explanation: This makes the text semi-bold (600 weight, between normal 400
// and bold 700), providing visual emphasis between normal stock and
// out-of-stock. The medium weight makes low stock stand out without being as
// alarming as the full bold used for out-of-stock. This creates a three-level
// visual hierarchy: normal weight for adequate stock, semi-bold orange for low
// stock, bold red for out-of-stock.

  },

// Explanation: This closes the lowStock style object, completing the
// cautionary styling that creates urgency for low inventory items through
// orange color and medium-bold weight.

  bottomSpacer: {

// Explanation: This defines a style for an empty View at the bottom of the
// content that creates extra scrollable space. This purely functional style
// solves a common mobile UI problem where the last content gets hidden or is
// hard to reach.

    height: 40,

// Explanation: This creates a 40-pixel tall empty space at the bottom of the
// scrollable content. On modern phones with gesture navigation (swipe up to go
// home), floating action buttons, or tab bars, the very bottom of scrollable
// content can be obscured or difficult to reach. This spacer ensures users can
// scroll enough to comfortably view the last piece of information without
// straining to reach it or having it partially hidden behind UI elements. The
// 40-pixel value is enough to provide comfortable scrolling without being so
// much that it feels like broken empty space.

  },

// Explanation: This closes the bottomSpacer style object, completing the
// purely functional spacing style that improves usability on modern mobile
// devices with various UI elements at screen bottom.

});

// Explanation: This closes the StyleSheet.create() call, completing all style
// definitions for the component. Everything between StyleSheet.create({ and
// this closing has been converted into optimized style references that React
// Native can efficiently apply to components. The semicolon marks the end of
// this const styles declaration.

export default ProductDetailScreen;

// Explanation: This exports the ProductDetailScreen component as the default
// export of this file, making it available to import in other files with
// statements like "import ProductDetailScreen from
// './screens/ProductDetailScreen'". Default exports mean you can import the
// component with any name you choose, though conventionally you use the same
// name as defined here. This export statement is what makes the component
// usable by the navigation system to display when users navigate to the
// product detail screen.

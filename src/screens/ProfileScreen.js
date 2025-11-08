// ============================================================================
// FILE: src/screens/ProfileScreen.js
// ============================================================================
//
// PURPOSE:
// This screen displays user profile information including avatar, name, email,
// and a brief bio. It demonstrates flexbox layout patterns in React Native.
//
// WHAT IT DOES:
// - Renders a scrollable profile screen with user information
// - Displays a circular avatar image
// - Shows user name, email, and about text in a card layout
// - Uses flexbox for responsive layout that adapts to different screen sizes
// - Implements console logging on component mount for debugging
//
// WHY IT'S NEEDED:
// Most apps need a profile or settings screen where users can view their
// information. This screen serves as the Profile tab in the bottom navigation,
// providing a dedicated space for user-related content and demonstrating
// common mobile UI patterns like cards, avatars, and typography hierarchy.
//
// ============================================================================

import React, { useEffect } from 'react';

// Explanation: This line imports React and the useEffect hook from the React library. React is
// the core library that enables us to create components (reusable UI building
// blocks). The useEffect hook is a special function that allows us to perform side
// effects in our component, such as fetching data when the screen loads or
// cleaning up resources when the screen closes. We use curly braces { } around
// useEffect because it's a named export from React, not the default export.

import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Explanation: This line imports four essential components from the React Native library. View
// is the fundamental building block for layouts (similar to a <div> in HTML), Text
// is used to display text content, StyleSheet is a utility that helps us define
// styles efficiently, and ScrollView is a scrollable container that allows content
// to scroll vertically or horizontally when it exceeds the screen size. React
// Native components are imported as named exports, which is why we use curly
// braces.

const ProfileScreen = () => {

// Explanation: This line defines our ProfileScreen component as a functional component using an
// arrow function syntax. The "const" keyword creates a constant variable that
// cannot be reassigned. Functional components are the modern way to create React
// components - they're JavaScript functions that return JSX (a syntax that looks
// like HTML but is actually JavaScript). The empty parentheses () mean this
// component doesn't accept any props (parameters) from its parent component.

  useEffect(() => {

// Explanation: This line starts the useEffect hook, which manages side effects in our
// component. The arrow function () => { } is the callback that will execute when
// the component mounts (appears on screen). Side effects are operations that
// interact with the outside world, such as fetching data from an API, setting up
// timers, subscribing to events, or logging information. useEffect is called after
// React finishes rendering the component to the screen.

    console.log('ProfileScreen mounted - Component is now visible');

// Explanation: This line logs a message to the console when the component first appears on
// screen. console.log() is a debugging tool that prints messages to the developer
// console, which is visible in development tools but not to end users. In a real
// application, this is where you might start fetching user profile data from a
// server. The "mounted" term means the component has been created and added to the
// screen.

    console.log('This is where you would typically fetch user data from an API');

// Explanation: This is another console.log statement that serves as educational documentation,
// explaining what would normally happen at this point in a production app. In a
// real application, you would replace this with actual code that makes HTTP
// requests to your backend server using fetch() or a library like axios to
// retrieve the user's profile information, such as their name, email, avatar,
// statistics, and preferences.

    return () => {

// Explanation: This line begins the cleanup function that useEffect returns. The cleanup
// function is important for preventing memory leaks and unwanted behavior. It runs
// when the component is about to be removed from the screen (unmounting) or before
// the effect runs again if dependencies change. In this case, since we have an
// empty dependency array (shown later), this cleanup only runs when the component
// unmounts. Cleanup is essential for canceling API requests, removing event
// listeners, clearing timers, or closing connections.

      console.log('ProfileScreen unmounting - Component is being removed');

// Explanation: This line logs a message when the component is about to be removed from the
// screen. "Unmounting" means React is destroying the component instance, which
// typically happens when the user navigates away from this screen to another
// screen in the app. This logging helps developers understand the component
// lifecycle, which is crucial for debugging issues related to data fetching,
// subscriptions, or resource management.

      console.log('This is where you would cancel API requests or clean up subscriptions');

// Explanation: This educational console.log explains what cleanup operations you'd typically
// perform here. In production code, you would cancel any ongoing fetch() requests
// using AbortController, unsubscribe from WebSocket connections, clear intervals
// or timeouts, remove event listeners, or close database connections. Proper
// cleanup prevents errors from trying to update unmounted components and avoids
// memory leaks that can slow down or crash your app.

    };

// Explanation: This closing brace ends the cleanup function that gets returned from useEffect.
// The cleanup function is optional, but it's a best practice to include it
// whenever your effect creates resources that need to be cleaned up. The return
// statement makes this cleanup function available to React, which will
// automatically call it at the appropriate time in the component's lifecycle.

  }, []);

// Explanation: This line closes the useEffect hook and provides the dependency array []. The
// empty square brackets [] are critically important - they tell React to run this
// effect only once when the component first mounts, and not to re-run it when the
// component re-renders. If we omitted the [], the effect would run after every
// single render, potentially causing infinite loops. If we added variables inside
// the brackets like [userId], the effect would re-run whenever userId changes. For
// initial data loading, an empty array is the most common pattern.

  return (
    // Explanation: This line begins the return statement that defines what the component will render (display) on the screen. Everything inside the return statement is JSX, which looks like HTML but is actually JavaScript that React transforms into native mobile components. The return statement is required in every functional component - it tells React what UI elements to create and display when this component is used.

    <ScrollView style={styles.container}>

      {/* Explanation: This line creates a ScrollView component, which is a scrollable container that wraps our entire profile screen content. The ScrollView automatically enables vertical scrolling when content is taller than the screen height. The style prop applies the "container" style object (defined later in our StyleSheet), which sets flex: 1 to take up all available screen space and backgroundColor: '#f5f5f5' for a light gray background. We use curly braces styles.container to reference JavaScript variables inside JSX. */}

      <View style={styles.content}>

        {/* Explanation: This View component serves as a wrapper for all the profile content and applies padding: 20 (defined in styles.content) to create 20 pixels of space around all edges. This padding prevents content from touching the screen edges, which would look cramped and unprofessional. View is the fundamental layout component in React Native - it's like a container that can hold other components and is used to structure and organize your interface. Every layout in React Native is built using Views. */}

        {/* Header Section: Avatar and User Info */}

        {/* Explanation: This is a JSX comment that documents the purpose of the following section. Comments in JSX require the special syntax because we're inside the return statement. Good comments like this help developers (including your future self) quickly understand the structure of your component. The header section will display the user's avatar (profile picture) and basic information like name and email in a horizontal layout. */}

        <View style={styles.header}>

          {/* Explanation: This View creates the header container that will hold the avatar and user information side by side. The styles.header style object (defined later) includes flexDirection: 'row' to arrange children horizontally, alignItems: 'center' to vertically center them, padding: 20 for internal spacing, backgroundColor: '#fff' for a white background, borderRadius: 10 for rounded corners, and marginBottom: 20 to create space below the header. This demonstrates the "card" design pattern commonly used in modern mobile interfaces. */}

          <View style={styles.avatar}>

            {/* Explanation: This View creates a circular container for the user's avatar. The styles.avatar style object defines width: 80 and height: 80 for size, borderRadius: 40 (half of width/height) to create a perfect circle, backgroundColor: '#007AFF' for the iOS blue color, justifyContent: 'center' and alignItems: 'center' to center the initials inside the circle, and marginRight: 15 to create space between the avatar and the user info. Making a circle requires equal width and height, and borderRadius must be exactly half of that dimension. */}

            <Text style={styles.avatarText}>LS</Text>

            {/* Explanation: This Text component displays the user's initials "LS" (for Lassy Smith) inside the circular avatar. The styles.avatarText applies fontSize: 32 for large text, fontWeight: 'bold' for emphasis, and color: '#fff' for white text that contrasts with the blue background. In a production app, you would replace this with either an actual profile image using the Image component or dynamically generated initials based on the user's name from your API data. */}

          </View>

          {/* Explanation: This closing tag ends the avatar View container. In JSX, every opening tag must have a corresponding closing tag, similar to HTML. Self-closing tags like View component are allowed when the component has no children, but when a component wraps other components or content, you need separate opening and closing tags like View with opening and closing. Proper indentation (two spaces per level) makes the nesting structure clear and the code easier to read. */}

          <View style={styles.userInfo}>

            {/* Explanation: This View creates a container for the user's textual information (name and email). The styles.userInfo applies flex: 1, which is crucial for responsive layout. The flex: 1 property tells this View to expand and take up all remaining horizontal space after the avatar takes its fixed 80 pixels width plus 15 pixels margin. This makes the layout adapt to different screen sizes - on larger screens, the user info section will be wider, while on smaller screens it will be narrower, but the avatar stays the same size. */}

            <Text style={styles.name}>Lassy Smith</Text>

            {/* Explanation: This Text component displays the user's full name. The styles.name applies fontSize: 24 for prominence (making it the largest text in the header), fontWeight: 'bold' for emphasis showing it's the most important information, and color: '#333' for a dark gray that's easier on the eyes than pure black. In a real app, this would be dynamic data like user.name fetched from your API, not hardcoded text. */}

            <Text style={styles.email}>lassy.smith@example.com</Text>

            {/* Explanation: This Text component displays the user's email address. The styles.email uses fontSize: 16 (smaller than the name) and color: '#666' (a lighter gray) to establish visual hierarchy, indicating this is secondary information. The marginTop: 4 creates just 4 pixels of vertical space between the name and email, keeping them visually connected while preventing them from appearing cramped. This demonstrates how small spacing adjustments significantly impact visual design. */}

          </View>

          {/* Explanation: This closing tag ends the userInfo View container that holds the name and email. The flexbox layout (flexDirection: 'row' on the parent header) combined with flex: 1 on this container creates a responsive horizontal layout where the avatar has fixed size and the user info flexibly takes remaining space. Understanding how flex properties interact between parent and child components is fundamental to mastering React Native layouts. */}

        </View>

        {/* Explanation: This closing tag ends the header View container. The header section demonstrates several key React Native concepts: horizontal layout using flexDirection: 'row', vertical centering with alignItems: 'center', the card design pattern with white background and rounded corners, creating circular elements with equal dimensions and half borderRadius, and responsive layout using the flex property. These patterns are reusable throughout your app for consistent, professional-looking interfaces. */}

        {/* About Section */}

        {/* Explanation: This JSX comment marks the beginning of the "About" section. Comments like this serve as section dividers in your code, making it easier to navigate long components. The About section will display biographical or descriptive information about the user. In a real app, this text would come from the user's profile data stored in your database, allowing users to write a personal bio or description about themselves. */}

        <View style={styles.section}>

          {/* Explanation: This View creates a container for the About section using the reusable styles.section style object. The section style includes backgroundColor: '#fff' for white background, borderRadius: 10 for rounded corners, padding: 20 for internal spacing between the border and content, and marginBottom: 20 for external spacing from the next section. This creates the consistent "card" appearance used throughout the profile, helping users visually group related information together. */}

          <Text style={styles.sectionTitle}>About</Text>

          {/* Explanation: This Text component displays the section heading "About". The styles.sectionTitle applies fontSize: 18 for prominence (larger than body text but smaller than the user's name), fontWeight: '600' for semi-bold emphasis, color: '#333' for dark gray, and marginBottom: 10 to create space between the title and the content below. Consistent styling for all section titles creates visual patterns that help users quickly scan and understand the screen structure. */}

          <Text style={styles.aboutText}>

            {/* Explanation: This opening Text tag starts the container for the biographical content. The styles.aboutText style object applies fontSize: 16 for comfortable reading, color: '#333' for good contrast, and lineHeight: 22 for proper spacing between lines of text. The lineHeight is particularly important for readability - it's set to 1.375 times the fontSize (22/16), which falls in the optimal range of 1.3-1.5 for comfortable reading. Too little line height makes text feel cramped, while too much makes lines feel disconnected. */}

            A beautiful person inside and out. I'm really glad I met you.

            {/* Explanation: This is the actual biographical text content displayed in the About section. In JSX, text can be placed directly inside Text components without quotes. In a production application, this would be dynamic content like user.bio pulled from your API, allowing each user to have personalized content. The text demonstrates how longer content benefits from proper lineHeight styling applied to the parent Text component. Note that in React Native, all text must be inside Text components - you cannot put bare text directly in View components. */}

          </Text>

          {/* Explanation: This closing tag ends the aboutText Text component. Note that the text content was on a separate line from the opening and closing tags, which is a common formatting style for multi-line text content. This makes the code more readable than having everything on one line. The text could also be written as Text with style aboutText and content on a single line, especially for shorter content. */}

        </View>

        {/* Explanation: This closing tag ends the About section's View container. Each section follows the same structural pattern: a View with styles.section for the card appearance, a Text with styles.sectionTitle for the heading, and section-specific content components. This consistent structure makes the code predictable and maintainable - when you need to add a new section, you can copy this pattern and just change the title and content. */}

        {/* Stats Section */}

        {/* Explanation: This JSX comment introduces the Stats section, which will display numerical metrics about the user's activity. Stats sections are common in profile interfaces to show engagement metrics like views, favorites, followers, posts, or achievements. The comment helps developers quickly locate this section when reading or modifying the code. Clear section markers like this become increasingly valuable as components grow larger and more complex. */}

        <View style={styles.section}>

          {/* Explanation: This View creates another section container using the same reusable styles.section style, maintaining the consistent card appearance throughout the profile. Code reusability like this is a fundamental principle of good software design - define common styles once and reuse them everywhere they're needed. This approach ensures visual consistency, reduces code duplication, makes updates easier (change once, affect all instances), and reduces the chance of styling inconsistencies. */}

          <Text style={styles.sectionTitle}>Stats</Text>

          {/* Explanation: This Text displays the "Stats" section heading using the same styles.sectionTitle as the About section. Consistent heading styling across sections creates a professional, cohesive interface. Users learn to recognize these styling patterns, which reduces cognitive load (the mental effort required to use your app). When all section titles look the same, users immediately understand they're section headers without having to think about it. */}

          <View style={styles.statsRow}>

            {/* Explanation: This View creates a container for the statistics items and applies styles.statsRow, which uses flexDirection: 'row' to arrange the three stat items horizontally and justifyContent: 'space-around' to evenly distribute space around each item. The 'space-around' value creates equal space before the first item, between items, and after the last item, resulting in a balanced layout. This container demonstrates how nested flex containers work - the parent section uses default column layout, while this child uses row layout. */}

            <View style={styles.statItem}>

              {/* Explanation: This View creates a container for the first statistic item. The styles.statItem applies alignItems: 'center' which horizontally centers the number and label (since the default flexDirection is 'column', the cross axis is horizontal). This creates a centered vertical stack where the number sits directly above the label. Each stat item is independent, making it easy to add or remove stats without affecting the others. */}

              <Text style={styles.statNumber}>127</Text>

              {/* Explanation: This Text displays the numerical value "127" for products viewed. The styles.statNumber uses fontSize: 24 for prominence (making the number the visual focal point), fontWeight: 'bold' for emphasis, and color: '#007AFF' (iOS blue) to make the numbers stand out and indicate they're interactive or important data. In a real app, this would be dynamic data like stats.productsViewed fetched from your API, showing real user activity metrics. */}

              <Text style={styles.statLabel}>Products Viewed</Text>

              {/* Explanation: This Text displays the label describing what the number represents. The styles.statLabel uses fontSize: 14 (smaller than the number), color: '#666' (light gray for secondary information), and marginTop: 4 to create slight vertical separation from the number while keeping them visually connected as a pair. The visual hierarchy (large bold blue number, small gray label) guides the user's eye to the data first, then to the context. */}

            </View>

            {/* Explanation: This closing tag ends the first stat item View. The combination of alignItems: 'center' on this View and the font styling on the Text components creates a clean, centered vertical stack. This pattern is repeated for each stat item, creating a consistent and predictable layout. Understanding how to create these self-contained, reusable component patterns is key to efficient React Native development. */}

            <View style={styles.statItem}>

              {/* Explanation: This View creates the container for the second statistic item using the same styles.statItem. The consistent styling between all three stat items creates visual rhythm and balance. The parent statsRow's justifyContent: 'space-around' automatically handles the horizontal spacing, so individual stat items don't need to worry about margins or positioning - they just need to define their internal layout. */}

              <Text style={styles.statNumber}>43</Text>

              {/* Explanation: This Text displays "43" representing the number of favorited items. The same styles.statNumber ensures consistent appearance across all stat numbers. Consistency in data presentation is crucial for user experience - when all similar data looks the same, users can quickly scan and compare values. If each stat had different colors or sizes, it would be visually confusing and make comparison difficult. */}

              <Text style={styles.statLabel}>Favorites</Text>

              {/* Explanation: This Text displays the "Favorites" label describing what the 43 represents. The consistent use of styles.statLabel ensures all three labels have identical styling. In a production app, these labels might also be dynamic to support internationalization (i18n), where the text changes based on the user's language preference. For example: t('profile.stats.favorites') using a translation library. */}

            </View>

            {/* Explanation: This closing tag ends the second stat item View. Notice how each stat item is structurally identical - they all use the same View wrapper with statItem styles, a number Text with statNumber styles, and a label Text with statLabel styles. This repetitive structure is a good candidate for creating a reusable StatItem component, which would reduce code duplication and make the component easier to maintain and modify. */}

            <View style={styles.statItem}>

              {/* Explanation: This View creates the container for the third and final statistic item. Having exactly three items works well with the space-around justification, creating a balanced appearance. If you had four or five items, they might feel cramped, and you might need to adjust the layout strategy, perhaps using a grid or wrapping rows for better presentation on smaller screens. */}

              <Text style={styles.statNumber}>8</Text>

              {/* Explanation: This Text displays "8" representing the number of reviews the user has written. Notice this number is much smaller than the others (8 vs 127 and 43), but the styling remains consistent. This demonstrates that good UI design uses consistent styling regardless of the data values - the visual design shouldn't change based on whether numbers are large or small, positive or negative. */}

              <Text style={styles.statLabel}>Reviews</Text>

              {/* Explanation: This Text displays the "Reviews" label. Completing the stats row, this third item demonstrates how space-around distributes space equally around all items. If you counted the pixels, you'd find equal space before "Products Viewed", between each stat, and after "Reviews". This mathematical precision in spacing is what makes interfaces feel polished and professional rather than haphazard. */}

            </View>

            {/* Explanation: This closing tag ends the third stat item View, completing all three statistics. The statsRow now contains three identically structured child Views, each with a centered vertical layout. The parent's flexDirection: 'row' and justifyContent: 'space-around' distribute these three items horizontally with equal spacing, creating a balanced and professional appearance that adapts to different screen widths. */}

          </View>

          {/* Explanation: This closing tag ends the statsRow View container. The stats section demonstrates several important layout concepts: nesting flex containers (column section > row statsRow > column statItem), using justifyContent for main axis distribution (space-around), using alignItems for cross axis alignment (center), and creating visual hierarchy through font size, weight, and color. These are fundamental patterns you'll use constantly in React Native development. */}

        </View>

        {/* Explanation: This closing tag ends the Stats section's View container. This section follows the same card pattern as the About section but contains more complex nested layouts with multiple flex containers. The reusable section style maintains visual consistency, while the unique internal structure (statsRow and statItems) provides the specific layout needed for displaying numerical data. This demonstrates how consistent outer patterns (cards) can contain diverse inner content. */}

        {/* Preferences Section */}

        {/* Explanation: This JSX comment marks the beginning of the Preferences section, which will display the user's app settings and configuration options. Preferences sections typically show things like theme (light/dark mode), language, notification settings, privacy options, or display preferences. This comment helps developers quickly navigate to the preferences functionality when they need to add new settings or modify existing ones. */}

        <View style={styles.section}>

          {/* Explanation: This View creates the container for the Preferences section using the same reusable styles.section. All three major sections (About, Stats, Preferences) use this same style, creating strong visual consistency. Users can immediately recognize that these white rounded rectangles with padding are major content sections. This consistent visual language helps users understand your app's information architecture without conscious effort. */}

          <Text style={styles.sectionTitle}>Preferences</Text>

          {/* Explanation: This Text displays the "Preferences" section heading using styles.sectionTitle for consistency with the About and Stats section titles. The consistent positioning, sizing, and spacing of section titles creates a predictable reading pattern. Users' eyes know exactly where to look for section titles, which improves scanability and helps users quickly find the information they're looking for. */}

          <View style={styles.preferenceItem}>

            {/* Explanation: This View creates a container for the first preference row showing the theme setting. The styles.preferenceItem uses flexDirection: 'row' to arrange the label and value horizontally, justifyContent: 'space-between' to push the label to the left edge and value to the right edge, and marginBottom: 15 to create vertical space between preference rows. This label-value pattern is extremely common in mobile interfaces for displaying key-value pairs or settings. */}

            <Text style={styles.preferenceLabel}>Theme</Text>

            {/* Explanation: This Text displays the preference label "Theme" on the left side. The styles.preferenceLabel applies fontSize: 16 for comfortable reading and color: '#333' for good contrast. The justifyContent: 'space-between' on the parent View pushes this text to the left edge. In a production app, this might be an interactive element like a button or dropdown that opens a theme selection menu when tapped. */}

            <Text style={styles.preferenceValue}>Light</Text>

            {/* Explanation: This Text displays the current preference value "Light" on the right side. The styles.preferenceValue uses fontSize: 16 (same size as the label for balance) and color: '#666' (lighter gray to indicate it's the value rather than the label). The parent's justifyContent: 'space-between' pushes this text to the right edge. The visual result is Theme and Light with space between that adapts to screen width. */}

          </View>

          {/* Explanation: This closing tag ends the first preference item View. The preferenceItem pattern demonstrates a crucial React Native layout technique: using flexDirection: 'row' and justifyContent: 'space-between' to create a two-column effect where left and right items are separated by maximum space. This pattern is used everywhere in mobile apps for settings rows, list items showing name and value, navigation lists with labels and chevrons, and any time you need left-right separation. */}

          <View style={styles.preferenceItem}>

            {/* Explanation: This View creates the container for the second preference row showing the language setting. It uses the same styles.preferenceItem as the theme row, maintaining consistent styling and spacing. The marginBottom: 15 creates vertical separation from the theme row above and the notifications row below. Consistent spacing between similar items is a key principle of visual design that creates rhythm and makes interfaces feel organized rather than chaotic. */}

            <Text style={styles.preferenceLabel}>Language</Text>

            {/* Explanation: This Text displays the "Language" preference label using styles.preferenceLabel for consistency with the theme label above. In a real application, this might display text from a translation file based on the user's selected language. For example, users who've selected Spanish would see "Idioma" instead of "Language". This is called internationalization or i18n and is important for apps that serve global audiences. */}

            <Text style={styles.preferenceValue}>English</Text>

            {/* Explanation: This Text displays the current language value "English" using styles.preferenceValue. In a production app, this would dynamically display the user's selected language like settings.language. When tapped, this row might open a language selection screen showing options like English, Spanish, French, German, etc. The lighter color (#666) subtly indicates this is the value rather than the label without being too obvious. */}

          </View>

          {/* Explanation: This closing tag ends the second preference item View. The consistent structure across preference items (View with preferenceItem styles containing two Text components with preferenceLabel and preferenceValue styles) demonstrates good component design. When structure is consistent, code becomes predictable and easier to understand. If you need to add a new preference row, you know exactly what pattern to follow. */}

          <View style={[styles.preferenceItem, { marginBottom: 0 }]}>

            {/* Explanation: This View creates the container for the third preference row. Notice the style prop uses array syntax with styles.preferenceItem and marginBottom of 0 to combine two style objects. This is called style composition - it applies all styles from preferenceItem, then overrides the marginBottom with 0. This removes the bottom margin from the last item since there's no content below it that needs separation. The array syntax merges styles from left to right, with later styles overriding earlier ones when properties conflict. */}

            <Text style={styles.preferenceLabel}>Notifications</Text>

            {/* Explanation: This Text displays the "Notifications" preference label. Following the consistent pattern established by the previous preference items, this maintains visual predictability. In a real app, tapping this row might open a detailed notifications settings screen where users can configure different types of notifications, quiet hours, sound preferences, badge counts, and other notification-related settings. */}

            <Text style={styles.preferenceValue}>Enabled</Text>

            {/* Explanation: This Text displays the notification status "Enabled". The value could be "Enabled" or "Disabled" based on the user's settings. In a more interactive implementation, this might be replaced with a Switch component (toggle) that allows users to enable/disable notifications directly from this screen without navigating to a separate settings screen. The current text-based approach keeps the example simple and focused on layout concepts. */}

          </View>

          {/* Explanation: This closing tag ends the third and final preference item View. The marginBottom of 0 override prevents unnecessary spacing after the last item in the section. This attention to spacing detail is what separates amateur interfaces from professional ones. Extra spacing at the end of sections looks sloppy and wastes screen space, while proper spacing creates visual rhythm and makes interfaces feel polished. */}

        </View>

        {/* Explanation: This closing tag ends the Preferences section View. The Preferences section demonstrates the label-value row pattern that's fundamental to settings interfaces. Each preference follows identical structure (preferenceItem View with preferenceLabel and preferenceValue Text components), creating visual consistency and predictable user experience. The last item's marginBottom override shows how style composition allows flexibility within consistent patterns. */}

      </View>

      {/* Explanation: This closing tag ends the content View that wraps all the profile content sections. The content View's padding: 20 created consistent spacing around all sections throughout the entire profile. This wrapper pattern (outer ScrollView for scrolling, inner View for padding) is common in React Native screens because it separates concerns: ScrollView handles scrolling behavior while View handles spacing, making the layout logic clearer and easier to modify. */}

    </ScrollView>
    // Explanation: This closing tag ends the ScrollView component that wraps the entire profile screen. The ScrollView enables vertical scrolling, ensuring that all content is accessible even on small screens or when sections are expanded in a more feature-complete version. ScrollView is essential for most content screens because mobile devices have limited screen height, and content often needs more vertical space than is immediately visible.
  );

// Explanation: This closing parenthesis ends the return statement. Everything between return (
// and ); is JSX that defines what the component renders to the screen. The return
// statement is required in functional components - without it, React doesn't know
// what to display. In more complex components, you might have JavaScript logic
// above the return statement (like data processing or state management) and then
// reference that logic inside the JSX.

};

// Explanation: This closing brace ends the ProfileScreen functional component. At this point,
// we've completed the component definition - it's a JavaScript function that uses
// the useEffect hook for lifecycle management and returns JSX describing the UI.
// The component is now ready to be exported and used in other parts of the
// application. The semicolon after the closing brace is optional but commonly
// included for consistency with variable declarations.

const styles = StyleSheet.create({

// Explanation: This line begins the style definitions using StyleSheet.create(), which is React
// Native's way of defining styles. StyleSheet.create() takes an object where each
// property is a style name (like 'container', 'header', 'avatar') and its value is
// another object containing CSS-like style properties. Using StyleSheet.create()
// instead of plain JavaScript objects provides several benefits: better
// performance (styles are created once and reused), validation of style properties
// (warnings for invalid or misspelled properties), and cleaner code organization
// by keeping all styles together at the bottom of the file.

  container: {

// Explanation: This line begins defining the 'container' style object that's applied to the
// root ScrollView. The colon after 'container' indicates we're defining the value
// for this property, which is an object containing style properties. Container
// styles typically define the overall appearance and behavior of the component's
// outer wrapper, such as background color, flex behavior, or dimensions.

    flex: 1,

// Explanation: The flex: 1 property tells the ScrollView to expand and fill all available space
// in its parent container. Flex is a relative sizing system - flex: 1 means take
// up 1 share of available space. If there were sibling components with flex: 2,
// they would get twice as much space. In this case, flex: 1 makes the ScrollView
// fill the entire screen height and width. Without this, the ScrollView would only
// be as large as its content requires.

    backgroundColor: '#f5f5f5',

// Explanation: This sets the background color to a light gray (#f5f5f5). The hashtag indicates
// a hexadecimal color code where pairs of characters represent red, green, and
// blue values (f5 = 245 for red, f5 = 245 for green, f5 = 245 for blue). Since all
// three values are equal, this creates a neutral gray. This light gray background
// provides subtle contrast against the white (#fff) content cards, helping them
// stand out visually without harsh contrast.

  },

// Explanation: This closing brace and comma end the container style object and prepare for the
// next style definition. In JavaScript object literals, properties are separated
// by commas. The comma after the closing brace is required for all styles except
// the last one, though many developers include it even on the last style (called a
// trailing comma) because it makes adding new styles easier and produces cleaner
// git diffs.

  content: {

// Explanation: This line begins defining the 'content' style object that's applied to the View
// wrapper inside the ScrollView. The content wrapper separates scrolling behavior
// (ScrollView) from padding/spacing (View), which is a clean separation of
// concerns. This makes the code easier to understand and modify - if you want to
// change padding, you modify content styles; if you want to change scroll
// behavior, you modify the ScrollView props.

    padding: 20,

// Explanation: This applies 20 pixels of padding on all four sides (top, right, bottom, left)
// of the content View. Padding is space inside the element between its edges and
// its content. This prevents the section cards from touching the screen edges,
// creating comfortable breathing room. If we wanted different padding on each
// side, we could use paddingTop, paddingRight, paddingBottom, and paddingLeft
// separately, or use paddingVertical (top+bottom) and paddingHorizontal
// (left+right) for symmetrical spacing.

  },

// Explanation: This closing brace and comma end the content style object. The content style is
// simple, containing only padding, but this single property has significant visual
// impact - removing it would make the entire interface feel cramped and
// unprofessional. Good UI design often involves many small spacing decisions that
// individually seem minor but collectively determine whether an interface feels
// polished or amateurish.

  header: {

// Explanation: This line begins defining the 'header' style object for the section containing
// the avatar and user information. The header is the first major visual element
// users see, so its styling is important for making a good first impression. These
// styles create a horizontal card layout with the avatar and text side-by-side,
// demonstrating fundamental flexbox layout techniques.

    flexDirection: 'row',

// Explanation: This changes the flex direction from the default 'column' (vertical stacking) to
// 'row' (horizontal arrangement). This makes the avatar and user info appear
// side-by-side instead of stacked. When flexDirection is 'row', the main axis
// becomes horizontal (left to right) and the cross axis becomes vertical (top to
// bottom). This affects how other flex properties like justifyContent and
// alignItems work - justifyContent controls horizontal spacing and alignItems
// controls vertical alignment.

    alignItems: 'center',

// Explanation: This vertically centers all children (the avatar and user info) within the
// header. Since flexDirection is 'row', the cross axis is vertical, so alignItems
// controls vertical alignment. The 'center' value places items at the vertical
// center of the container. Other options include 'flex-start' (top), 'flex-end'
// (bottom), 'stretch' (fill height), and 'baseline' (align text baselines). This
// ensures the avatar and text are aligned at the same vertical position, which
// looks more organized than top-aligned items.

    padding: 20,

// Explanation: This applies 20 pixels of internal spacing on all sides of the header container.
// Padding creates space between the container's edges and its content (the avatar
// and text). Without this padding, the avatar would touch the top and left edges
// of the white card, and the text would touch the right and top edges, making the
// design feel cramped. The padding value of 20 matches the content padding,
// creating consistent rhythm throughout the interface.

    backgroundColor: '#fff',

// Explanation: This sets the background color to pure white (#fff is shorthand for #ffffff).
// The white background creates the card appearance by contrasting with the light
// gray (#f5f5f5) screen background. White backgrounds are standard for content
// cards in mobile interfaces because they're clean, neutral, easy to read against,
// and make colored text or icons stand out. The white background also subtly
// indicates this is an interactive or important section.

    borderRadius: 10,

// Explanation: This rounds all four corners of the header card with a 10-pixel radius, creating
// smooth curves instead of sharp 90-degree angles. Rounded corners are ubiquitous
// in modern mobile design because they feel friendly and approachable, they match
// the rounded corners of physical devices, they help define boundaries without
// harsh lines, and they simply look more polished than sharp corners. The
// borderRadius value of 10 provides noticeable rounding without being excessive or
// cartoonish.

    marginBottom: 20,

// Explanation: This creates 20 pixels of space below the header, separating it from the About
// section below. Margin is space outside the element that pushes other elements
// away. The consistent 20-pixel spacing between sections creates visual rhythm and
// breathing room, preventing the interface from feeling cluttered. Without
// margins, sections would stack directly against each other, making it harder to
// distinguish where one section ends and another begins.

  },

// Explanation: This closing brace and comma end the header style object. The header styles
// demonstrate creating a reusable card component pattern: white background,
// rounded corners, internal padding, and external margin. This exact pattern is
// reused for all section containers (About, Stats, Preferences) through the shared
// 'section' style, demonstrating how defining common patterns once and reusing
// them creates consistent, maintainable interfaces.

  avatar: {

// Explanation: This line begins defining the 'avatar' style object that creates the circular
// profile picture placeholder. Creating circles in React Native requires specific
// property combinations, and these styles demonstrate the exact recipe: equal
// width and height, borderRadius exactly half of the dimension, and centering
// properties for the content inside. Understanding this pattern is essential
// because circular elements are common in mobile interfaces for profile pictures,
// icons, badges, and buttons.

    width: 80,

// Explanation: This sets the avatar's width to 80 pixels. For a perfect circle, width and
// height must be equal. The value of 80 provides a good size for a profile avatar
// - large enough to be prominent and recognizable but not so large that it
// dominates the screen or causes layout issues on smaller devices. If width and
// height were different values (like width: 80, height: 60), you'd get an oval
// instead of a circle, even with borderRadius.

    height: 80,

// Explanation: This sets the avatar's height to 80 pixels, matching the width. The equal
// dimensions are the first requirement for creating a perfect circle. If you need
// to change the avatar size, you must update both width and height to the same new
// value, and also update borderRadius to half that value. For example, a 100-pixel
// avatar would need width: 100, height: 100, borderRadius: 50.

    borderRadius: 40,

// Explanation: This creates the circular shape by rounding the corners with a radius of 40
// pixels, which is exactly half of the 80-pixel width and height. When
// borderRadius is half the dimension, the corners become so rounded that they form
// a perfect circle. If borderRadius were less than half (like 20), you'd get
// rounded corners but not a circle. If it were more than half, it would still be a
// circle because borderRadius is capped at half the dimension. Many developers use
// borderRadius: 999 or borderRadius: '50%' to ensure circularity regardless of
// dimensions, but explicit values like 40 make the relationship clearer for
// learning purposes.

    backgroundColor: '#007AFF',

// Explanation: This sets the background color to Apple's signature blue color (#007AFF). This
// blue is the default tint color in iOS and is widely recognized by iOS users,
// making it a safe, familiar choice for accent colors. The solid background color
// is important because the avatar contains text (initials) that needs to be
// visible, so we need good contrast. In a production app, you might use a colored
// background as a fallback when the user hasn't uploaded a profile picture, or
// generate unique colors per user based on their name.

    justifyContent: 'center',

// Explanation: This centers the avatar's children (the "LS" text) along the main axis. Since we
// didn't specify flexDirection, it defaults to 'column', so the main axis is
// vertical. Therefore, justifyContent: 'center' vertically centers the text.
// Combined with alignItems: 'center', this creates perfect centering. If the
// avatar contained multiple children stacked vertically, justifyContent: 'center'
// would center the entire group vertically as a unit.

    alignItems: 'center',

// Explanation: This centers the avatar's children along the cross axis. With the default
// flexDirection: 'column', the cross axis is horizontal, so alignItems: 'center'
// horizontally centers the text. The combination of justifyContent: 'center' and
// alignItems: 'center' is the standard pattern for perfect centering in React
// Native. This two-property combination works regardless of content size or
// container dimensions, making it reliable for any centering needs.

    marginRight: 15,

// Explanation: This creates 15 pixels of space to the right of the avatar, separating it from
// the user info text. Without this margin, the avatar and text would be directly
// adjacent, which looks cramped. The 15-pixel value provides comfortable
// separation without excessive gap. This is an example of targeted spacing - we
// only need margin on the right side because the parent header's padding handles
// top, bottom, and left spacing, and there's nothing to the right of the user info
// that needs separation.

  },

// Explanation: This closing brace and comma end the avatar style object. The avatar styles
// demonstrate the precise formula for creating circular elements: equal width and
// height, borderRadius exactly half that value, and centering properties for
// internal content. This pattern is so common in mobile development that it's
// worth memorizing. Many developers create reusable Circle components that
// encapsulate this pattern to avoid repeating these styles throughout their
// codebase.

  avatarText: {

// Explanation: This line begins defining the 'avatarText' style object for the initials
// displayed inside the circular avatar. These styles make the text large, bold,
// white, and visually prominent. Text styling inside badges, avatars, or buttons
// requires careful consideration of size, weight, and color to ensure readability
// and visual impact. The styles create sufficient contrast against the blue
// background and make the initials clearly recognizable.

    fontSize: 32,

// Explanation: This sets the text size to 32 pixels, making it quite large and easily readable.
// The size is chosen proportionally to the 80-pixel avatar container - roughly 40%
// of the container size - which prevents the text from being too small (hard to
// read) or too large (touching edges). When choosing fontSize for contained text,
// consider the container dimensions and ensure adequate space around the text. For
// a 100-pixel avatar, you'd want fontSize around 40; for a 60-pixel avatar, around
// 24.

    fontWeight: 'bold',

// Explanation: This makes the text bold, increasing its visual weight and impact. React
// Native's fontWeight accepts values from '100' (thinnest) to '900' (boldest), or
// the keywords 'normal' (400) and 'bold' (700). Bold text is more legible at
// smaller sizes and stands out more, which is why it's commonly used for initials,
// badges, buttons, and other emphasized text. The bold weight also provides
// additional contrast against the background, improving readability.

    color: '#fff',

// Explanation: This sets the text color to pure white (#fff). White text on the blue (#007AFF)
// background provides excellent contrast ratio (meeting WCAG accessibility
// standards), ensuring the initials are clearly readable for all users including
// those with visual impairments. The white-on-blue color scheme is also
// aesthetically pleasing and commonly used in interface design. Always consider
// contrast ratios when choosing text and background colors - tools like WebAIM's
// contrast checker can verify accessibility.

  },

// Explanation: This closing brace and comma end the avatarText style object. Text styling
// involves three primary properties: fontSize for size, fontWeight for emphasis,
// and color for appearance. These three properties working together create visual
// hierarchy and ensure readability. For text displayed on colored backgrounds,
// always verify sufficient contrast - white text on dark backgrounds or dark text
// on light backgrounds typically provides the best readability.

  userInfo: {

// Explanation: This line begins defining the 'userInfo' style object for the container that
// holds the name and email text. This style contains only one property (flex: 1),
// but that single property is crucial for creating a responsive horizontal layout
// where the user info takes up all remaining space after the avatar. This
// demonstrates how sometimes the most important styles are the simplest.

    flex: 1,

// Explanation: This is one of the most important properties for responsive layouts. The flex: 1
// tells this View to expand and take up all available horizontal space after the
// avatar (which has a fixed width of 80 pixels plus 15 pixels margin). Without
// flex: 1, the userInfo would only be as wide as its content requires, leaving
// empty space to the right. On larger screens, flex: 1 allows the text area to
// expand, while on smaller screens it shrinks appropriately, making the layout
// automatically responsive to different device sizes.

  },

// Explanation: This closing brace and comma end the userInfo style object. Despite containing
// only one property, this style is essential for proper layout. The flex: 1
// property makes the difference between a rigid layout that works only at one
// screen size and a responsive layout that adapts to any device. This demonstrates
// that effective styling isn't about having many properties - it's about choosing
// the right properties for your layout goals.

  name: {

// Explanation: This line begins defining the 'name' style object for displaying the user's
// name. The name is the most important text in the header section, so these styles
// make it visually prominent through large size, bold weight, and dark color.
// Creating clear visual hierarchy through text styling guides users' attention to
// the most important information first, improving usability and making interfaces
// easier to scan quickly.

    fontSize: 24,

// Explanation: This sets the name text to 24 pixels, making it the largest text in the header
// section and one of the largest on the entire screen. The large size immediately
// draws attention and signals that this is the most important text in this area.
// Font size is one of the primary tools for creating visual hierarchy - users
// naturally look at larger text first. The size also ensures readability even for
// users with mild vision impairments or those viewing the screen from a distance.

    fontWeight: 'bold',

// Explanation: This makes the name text bold, adding emphasis and visual weight. Bold text
// stands out more than regular weight text, reinforcing that this is important
// information. The combination of large fontSize (24) and bold fontWeight creates
// strong visual hierarchy, making the name the clear focal point of the header.
// This bold emphasis also improves readability by making characters more distinct
// and clearer, especially on lower-resolution screens.

    color: '#333',

// Explanation: This sets the text color to a dark gray (#333) rather than pure black (#000).
// Dark gray provides excellent readability while being slightly softer on the eyes
// than pure black, which can appear harsh on bright white backgrounds. The color
// #333 means red=51, green=51, blue=51 in RGB (approximately 20% brightness),
// creating a very dark gray that's effectively black for practical purposes but
// technically softer. Many professional designs prefer #333 over #000 for body
// text because it reduces eye strain during extended reading.

  },

// Explanation: This closing brace and comma end the name style object. The combination of
// fontSize: 24, fontWeight: 'bold', and color: '#333' creates a strong visual
// hierarchy, making the name the most prominent text element in the header. When
// designing interfaces, establish a clear typographic hierarchy where the most
// important information has the largest size and boldest weight, and less
// important information uses smaller sizes and lighter weights.

  email: {

// Explanation: This line begins defining the 'email' style object for displaying the user's
// email address. The email is secondary information compared to the name, so these
// styles make it visually less prominent through smaller size, normal weight (not
// bold), and lighter color. This deliberate de-emphasis creates the visual
// hierarchy that guides users to read the name first, then the email, which
// matches the natural importance of this information.

    fontSize: 16,

// Explanation: This sets the email text to 16 pixels, which is 8 pixels smaller than the name's
// 24 pixels. This size difference immediately signals that the email is less
// important than the name. The 16-pixel size is still perfectly readable - it's a
// common base font size for body text in mobile interfaces. The size creates a 3:2
// ratio with the name (24:16), which is a comfortable proportion that's noticeably
// different without being extreme.

    color: '#666',

// Explanation: This sets the email color to medium gray (#666), which is noticeably lighter
// than the name's dark gray (#333). This color difference reinforces the visual
// hierarchy established by the size difference. The #666 color means RGB values of
// 102, 102, 102 (approximately 40% brightness), creating a medium gray that's
// clearly readable but visually less prominent than darker text. Using color to
// create hierarchy is a subtle but powerful technique that improves scanability
// without users consciously noticing.

    marginTop: 4,

// Explanation: This creates just 4 pixels of space above the email, separating it from the name
// above. The small margin value (4 pixels instead of 10-20) keeps the name and
// email visually connected as a related pair while preventing them from appearing
// cramped or overlapping. This is an example of proximity principle in design -
// related items should be close to each other, and the small space indicates
// relationship. Too much space would make them feel unrelated; too little would
// make them feel crowded. The 4-pixel value is the sweet spot.

  },

// Explanation: This closing brace and comma end the email style object. The email styles
// demonstrate how to create secondary text that's clearly readable but visually
// less prominent than primary text. The smaller fontSize (16 vs 24), lighter color
// (#666 vs #333), lack of bold weight, and minimal marginTop all work together to
// create proper visual hierarchy. Users will naturally read the name first, then
// the email, without consciously thinking about why - that's good design working
// invisibly.

  section: {

// Explanation: This line begins defining the 'section' style object, which is the reusable card
// pattern applied to the About, Stats, and Preferences sections. Creating reusable
// styles like this is fundamental to efficient React Native development. Instead
// of duplicating these four properties (backgroundColor, borderRadius, padding,
// marginBottom) for each section, we define them once and reuse them everywhere.
// This ensures consistency, reduces code duplication, and makes updates easy -
// changing the section style automatically updates all sections.

    backgroundColor: '#fff',

// Explanation: This sets all section cards to pure white (#fff), matching the header's white
// background. The white creates the card appearance by contrasting with the light
// gray screen background (#f5f5f5). Consistent use of white for all content cards
// creates a strong visual pattern that helps users understand information
// architecture - white rectangles contain related content. This pattern is so
// common in modern mobile design that users have learned to recognize it instantly
// across different apps.

    borderRadius: 10,

// Explanation: This rounds the corners of all section cards with a 10-pixel radius, exactly
// matching the header's borderRadius. Consistent corner rounding across all cards
// is crucial for visual cohesion - if different cards had different borderRadius
// values, the interface would feel inconsistent and unpolished. The value 10
// provides noticeable rounding without being excessive. Values between 8-12 are
// common for card corners in mobile interfaces because they're rounded enough to
// look modern but not so rounded that they become distracting or cartoonish.

    padding: 20,

// Explanation: This applies 20 pixels of internal spacing on all sides of every section card.
// Padding creates breathing room between the card edges and content, preventing
// text and elements from touching the edges which would look cramped. The value of
// 20 is comfortable - large enough to provide clear separation but not so large
// that it wastes space. The consistent padding of 20 across all cards (matching
// the header and content padding) creates a visual rhythm of consistent spacing
// throughout the interface.

    marginBottom: 20,

// Explanation: This creates 20 pixels of space below each section card, separating it from the
// next card. Without this margin, cards would stack directly against each other,
// making boundaries unclear and the interface feel cluttered. The consistent
// 20-pixel spacing creates visual rhythm - every card is separated by exactly the
// same amount of space, which feels organized and intentional. This margin value
// matches the other spacing (padding: 20), creating harmonious spacing proportions
// throughout the entire screen.

  },

// Explanation: This closing brace and comma end the section style object. These four properties
// (backgroundColor, borderRadius, padding, marginBottom) define the reusable card
// pattern used throughout modern mobile interfaces. By defining this pattern once
// in the section style and reusing it for About, Stats, and Preferences sections,
// we ensure perfect consistency and make maintenance trivial - any change to the
// card appearance requires updating only these four lines, and all sections update
// automatically. This is the power of well-designed reusable styles.

  sectionTitle: {

// Explanation: This line begins defining the 'sectionTitle' style object for section headings
// like "About", "Stats", and "Preferences". These styles make section titles
// visually distinct from body text and establish them as headings in the
// information hierarchy. Consistent heading styles help users quickly scan the
// interface and understand the structure of information. The styles use
// medium-large size, semi-bold weight, dark color, and bottom margin to create
// clear section headers.

    fontSize: 18,

// Explanation: This sets section titles to 18 pixels, which is larger than body text (16) but
// smaller than the user's name (24). This creates a three-level text hierarchy:
// primary (name at 24), section headings (at 18), and body text (at 16). The
// 18-pixel size makes headings prominent enough to be clearly recognizable as
// section dividers but not so large that they compete with the primary heading
// (the user's name). This proportional sizing creates visual order that guides
// users through the interface.

    fontWeight: '600',

// Explanation: This sets the font weight to 600, which is semi-bold - bolder than normal (400)
// but not as bold as bold (700). React Native accepts fontWeight as strings from
// '100' to '900' in increments of 100, where 400 is normal and 700 is bold. The
// 600 weight provides noticeable emphasis without being as strong as the name's
// bold weight, creating a secondary level of visual hierarchy. Semi-bold headings
// stand out enough to be recognized as headings but don't overpower the content
// below them.

    color: '#333',

// Explanation: This sets section title color to dark gray (#333), matching the name's color.
// Using the same color for both the primary heading (name) and section headings
// creates consistency while relying on size and weight differences to establish
// hierarchy. The dark #333 color provides excellent readability and feels more
// professional and easier on the eyes than pure black. Consistent color usage
// across heading levels creates visual coherence in your typography system.

    marginBottom: 10,

// Explanation: This creates 10 pixels of space below section titles, separating them from the
// content below. This margin is smaller than the spacing between sections (20) but
// noticeable enough to create clear separation between the heading and its
// content. The spacing helps users understand that the title applies to the
// content below it. Without this margin, the title would appear cramped against
// the content. The 10-pixel value is exactly half the section spacing (20),
// creating a proportional relationship that feels harmonious.

  },

// Explanation: This closing brace and comma end the sectionTitle style object. Section headings
// demonstrate how to create secondary-level typography hierarchy using fontSize:
// 18 (between primary and body), fontWeight: '600' (between normal and bold), and
// marginBottom: 10 for separation. Consistent heading styles across all sections
// help users quickly scan and understand content organization. When users see this
// styling pattern, they immediately recognize it as a section heading without
// conscious thought.

  aboutText: {

// Explanation: This line begins defining the 'aboutText' style object for the biographical text
// in the About section. These styles optimize the text for comfortable reading,
// particularly the lineHeight property which is crucial for multi-line text
// readability. While font size and color are important, lineHeight often makes the
// difference between text that's comfortable to read and text that feels cramped
// or disconnected.

    fontSize: 16,

// Explanation: This sets the biographical text to 16 pixels, which is a standard comfortable
// reading size for body text in mobile interfaces. The 16-pixel size is large
// enough to be easily readable without requiring zooming or straining, yet small
// enough to fit reasonable amounts of text on screen. This matches the preference
// labels' size, creating consistency for body-level text throughout the interface.
// Font sizes of 14-18 pixels are typical for mobile body text, with 16 being the
// most common choice.

    color: '#333',

// Explanation: This sets the text color to dark gray (#333), providing excellent readability
// through strong contrast against the white card background. For body text that
// users need to read comfortably, using darker colors like #333 is important -
// lighter colors like #666 work for labels or secondary information but would
// create eye strain for paragraph text. The #333 color is dark enough for
// comfortable reading while being slightly softer than pure black.

    lineHeight: 22,

// Explanation: This sets the vertical spacing between lines of text to 22 pixels, which is
// critically important for readability. Line height (also called leading in
// typography) determines how cramped or spacious multi-line text feels. The ratio
// of 22:16 (lineHeight:fontSize) equals 1.375, which falls in the optimal range of
// 1.3-1.5 for comfortable reading. Too small (below 1.3) makes lines feel cramped
// and harder to read; too large (above 1.5) makes text feel disconnected and
// harder to follow. The 22-pixel lineHeight creates comfortable, readable
// paragraph text.

  },

// Explanation: This closing brace and comma end the aboutText style object. The combination of
// fontSize: 16, color: '#333', and lineHeight: 22 creates comfortable, readable
// body text. The lineHeight is particularly important - it's often overlooked by
// beginners but makes a huge difference in text readability. When styling
// paragraph text, always set lineHeight to 1.3-1.5 times the fontSize. This
// attention to typography detail separates professional interfaces from amateur
// ones.

  statsRow: {

// Explanation: This line begins defining the 'statsRow' style object for the container that
// holds the three statistics items. This container changes the layout direction
// from vertical (the default) to horizontal and uses space-around distribution to
// create balanced spacing. The styles demonstrate how nested flex containers work
// together - the section has vertical (column) layout, while statsRow has
// horizontal (row) layout, allowing different layout strategies at different
// nesting levels.

    flexDirection: 'row',

// Explanation: This changes the layout direction from vertical (default 'column') to horizontal
// ('row'), making the three stat items appear side-by-side instead of stacked.
// When flexDirection is 'row', the main axis runs horizontally (left to right) and
// the cross axis runs vertically (top to bottom). This directional change affects
// how other flex properties work - justifyContent now controls horizontal
// distribution and alignItems controls vertical alignment. Row layout is essential
// for creating horizontal arrangements like navigation bars, button groups, or
// these statistics.

    justifyContent: 'space-around',

// Explanation: This distributes the three stat items horizontally using the 'space-around'
// algorithm, which creates equal space before the first item, between items, and
// after the last item. Mathematically, if each gap has value X, the layout is: [X
// space][item][2X space][item][2X space][item][X space], where the internal gaps
// are double the edge gaps. This creates balanced distribution where items don't
// touch edges and have comfortable separation. Other justifyContent values include
// 'flex-start' (items at start), 'center' (items centered), 'flex-end' (items at
// end), 'space-between' (maximum internal space, no edge space), and
// 'space-evenly' (perfectly equal space everywhere).

  },

// Explanation: This closing brace and comma end the statsRow style object. These two properties
// (flexDirection: 'row' and justifyContent: 'space-around') create a horizontal
// layout with balanced spacing that automatically adapts to different screen
// widths. On wider screens, items spread out with more space between them; on
// narrow screens, items move closer together but maintain proportional spacing.
// This responsive behavior happens automatically without media queries or manual
// calculations, showcasing the power of flexbox layout.

  statItem: {

// Explanation: This line begins defining the 'statItem' style object for individual statistic
// containers that each hold a number and label. These styles create centered
// vertical stacks where the number sits directly above its label. The default
// flexDirection: 'column' (vertical) combined with alignItems: 'center'
// (horizontal centering) creates the centered stack appearance. This pattern is
// common for displaying metrics, scores, or any number-label pairs.

    alignItems: 'center',

// Explanation: This horizontally centers the stat item's children (the number and label). Since
// we didn't specify flexDirection, it defaults to 'column' (vertical layout),
// which means the cross axis is horizontal. Therefore, alignItems: 'center'
// centers items horizontally. This creates a centered vertical stack where both
// the number and label are horizontally aligned with each other. Without this
// property, the number and label would be left-aligned, which would look less
// polished and make comparing values across stats more difficult visually.

  },

// Explanation: This closing brace and comma end the statItem style object. Despite containing
// only one property, this style is important for creating the centered appearance
// of each statistic. The alignItems: 'center' ensures that both the number and
// label are center-aligned with each other, creating a neat vertical stack. The
// parent statsRow's space-around handles horizontal spacing between stat items, so
// individual items don't need margins - this separation of concerns (parent
// handles spacing, children handle internal alignment) is a key principle of clean
// layout code.

  statNumber: {

// Explanation: This line begins defining the 'statNumber' style object for displaying the
// numeric values in the statistics section. These styles make the numbers large,
// bold, and colored to be the visual focal points of each stat item. The styling
// creates strong visual hierarchy where numbers are immediately
// attention-grabbing, then users' eyes naturally move to the smaller labels below
// to understand what the numbers represent.

    fontSize: 24,

// Explanation: This sets the stat numbers to 24 pixels, making them large and prominent. The
// size matches the user's name (also 24), creating visual consistency for the most
// important data on the screen. Large numbers are immediately eye-catching and
// easy to read even with a quick glance, which is important for stats that users
// want to check quickly. The 24-pixel size is large enough to emphasize importance
// but not so large that it overwhelms the layout or makes positioning difficult.

    fontWeight: 'bold',

// Explanation: This makes the numbers bold, adding visual weight and emphasis. Bold numbers
// stand out even more than size alone would provide, creating maximum visual
// prominence. The bold weight also improves readability by making the numerals
// more distinct and clear. For numbers that represent key metrics or data points,
// bold weight is a common choice because it draws immediate attention and signals
// importance.

    color: '#007AFF',

// Explanation: This sets the numbers to blue (#007AFF), Apple's signature blue color, breaking
// from the grayscale palette used elsewhere. The color serves multiple purposes:
// it draws visual attention through color contrast, it suggests the numbers might
// be interactive or are important data points, and it adds visual interest to the
// interface. The blue color against the white background provides excellent
// contrast and readability while making the numbers the most visually distinctive
// elements in the stats section. Color is a powerful tool for creating visual
// hierarchy and emphasis.

  },

// Explanation: This closing brace and comma end the statNumber style object. The combination of
// fontSize: 24, fontWeight: 'bold', and color: '#007AFF' creates numbers that are
// impossible to miss - they're the most visually prominent elements in the stats
// section. This deliberate emphasis through size, weight, and color guides users'
// attention exactly where you want it (the data) before they read the context (the
// labels). This is strategic visual design that improves usability by working with
// natural eye movement patterns.

  statLabel: {

// Explanation: This line begins defining the 'statLabel' style object for the descriptive text
// below each number (like "Products Viewed" or "Favorites"). These styles make
// labels visually secondary to the numbers through smaller size and lighter color,
// creating clear hierarchy where numbers are read first, then labels provide
// context. This hierarchy matches how users want to consume this information -
// quick data check first, context second.

    fontSize: 14,

// Explanation: This sets stat labels to 14 pixels, making them noticeably smaller than the
// numbers (24) and even smaller than body text (16). The small size signals that
// labels are supporting information rather than primary content. The 10-pixel
// difference from the numbers (24-14) creates strong visual hierarchy. The
// 14-pixel size is still readable - it's a common minimum size for mobile
// interface text. Going below 14 pixels risks readability issues, especially for
// users with vision impairments.

    color: '#666',

// Explanation: This sets labels to medium gray (#666), making them visually less prominent than
// the blue numbers. The gray color indicates secondary information without
// sacrificing too much readability. The #666 color provides sufficient contrast
// against the white background for comfortable reading while clearly establishing
// that labels are contextual information subordinate to the numbers. The
// consistent use of #666 for secondary text throughout the interface (email,
// preference values, stat labels) creates a recognizable pattern.

    marginTop: 4,

// Explanation: This creates 4 pixels of vertical space above each label, separating it from the
// number above. The small margin (just 4 pixels) keeps the number and label
// visually connected as a pair while preventing them from appearing cramped or
// touching. This is another example of the proximity principle - related items
// should be close but not touching. The same 4-pixel value is used between the
// name and email, creating consistency in how closely-related information pairs
// are spaced throughout the interface.

  },

// Explanation: This closing brace and comma end the statLabel style object. The labels
// demonstrate how to create tertiary-level text in your hierarchy through small
// fontSize (14), secondary color (#666), and minimal marginTop (4). The strong
// contrast with the numbers (large, bold, blue vs small, regular, gray) creates an
// obvious visual hierarchy that naturally guides users to read numbers first, then
// labels. This hierarchy makes the stats section scannable and easy to understand
// at a glance.

  preferenceItem: {

// Explanation: This line begins defining the 'preferenceItem' style object for the rows in the
// Preferences section that display setting labels on the left and values on the
// right. These styles create the common "label-value" row pattern seen throughout
// mobile settings interfaces. The pattern uses horizontal layout with
// space-between justification to push label and value to opposite edges, and
// marginBottom to separate rows. This is one of the most common UI patterns in
// mobile development.

    flexDirection: 'row',

// Explanation: This changes the layout direction to horizontal ('row'), making the label and
// value appear side-by-side instead of stacked. This horizontal arrangement is
// standard for settings rows, list items, and any key-value pairs. With
// flexDirection: 'row', the main axis is horizontal (left to right) and the cross
// axis is vertical (top to bottom). The row direction combined with space-between
// justification creates the signature [Label]_________[Value] appearance where
// maximum space separates the two elements.

    justifyContent: 'space-between',

// Explanation: This is one of the most useful justifyContent values, which pushes the first
// child (label) to the left edge and the last child (value) to the right edge,
// with maximum space between them. This creates the classic two-column appearance
// without defining columns - the spacing happens automatically and responsively
// adapts to different screen widths. On wider screens, there's more space between
// label and value; on narrow screens, less space, but the label-left-value-right
// pattern always holds. This property is essential for creating settings rows,
// list items with trailing information, navigation items with chevrons, and
// countless other patterns.

    marginBottom: 15,

// Explanation: This creates 15 pixels of vertical space below each preference row, separating
// it from the next row. Without this margin, all preference rows would stack
// directly against each other, making them feel cramped and making it harder to
// visually distinguish individual rows. The 15-pixel value provides comfortable
// separation while keeping rows clearly connected as a group. Note that the last
// preference row overrides this margin to 0 using style composition
// [styles.preferenceItem, { marginBottom: 0 }], preventing unnecessary space at
// the end of the section.

  },

// Explanation: This closing brace and comma end the preferenceItem style object. These three
// properties create one of the most common patterns in mobile interfaces - the
// label-value row. The combination of flexDirection: 'row' (horizontal layout),
// justifyContent: 'space-between' (opposing edges), and marginBottom: 15 (row
// separation) is used in settings screens, contact lists, message threads, and
// countless other contexts. Understanding and memorizing this pattern is essential
// for efficient React Native development.

  preferenceLabel: {

// Explanation: This line begins defining the 'preferenceLabel' style object for the left-side
// labels in preference rows (like "Theme", "Language", "Notifications"). These
// styles make labels readable and clearly indicate they're the descriptive part of
// each setting. The styling uses moderate size and dark color for readability
// while remaining visually less prominent than section titles through smaller size
// and normal weight.

    fontSize: 16,

// Explanation: This sets preference labels to 16 pixels, the standard body text size used
// throughout the interface. The consistent size creates visual cohesion and
// comfortable readability. At 16 pixels, labels are easily readable without being
// too large or small. This size matches the aboutText and provides consistency for
// all body-level text in the interface. Consistent sizing for similar types of
// information helps users develop mental models of your interface structure.

    color: '#333',

// Explanation: This sets labels to dark gray (#333), providing excellent readability and
// indicating they're primary text within the preference rows (as opposed to the
// values which use lighter #666). The #333 color creates strong contrast against
// the white card background, ensuring comfortable reading. Using #333 for labels
// and #666 for values creates subtle visual hierarchy within each row - users'
// eyes naturally go to the darker text (label) first, then to the lighter text
// (value).

  },

// Explanation: This closing brace and comma end the preferenceLabel style object. The label
// styling uses fontSize: 16 and color: '#333' to create readable, clear text
// that's darker (more prominent) than the values but lighter (less prominent) than
// section titles. This creates a three-level hierarchy even within the preferences
// section: section title (18, semi-bold, #333) > preference labels (16, normal,
// #333) > preference values (16, normal, #666). The hierarchy works through size,
// weight, and color differences.

  preferenceValue: {

// Explanation: This line begins defining the 'preferenceValue' style object for the right-side
// values in preference rows (like "Light", "English", "Enabled"). These styles
// make values visually secondary to labels through lighter color while maintaining
// the same size for balance. The subtle color difference is enough to establish
// hierarchy without making values hard to read or feel unimportant.

    fontSize: 16,

// Explanation: This sets preference values to 16 pixels, matching the labels' size. Using the
// same fontSize for both label and value creates visual balance - neither element
// appears more important through size. The hierarchy between label and value is
// established through color difference (#333 vs #666) rather than size difference.
// This is more subtle than using size for hierarchy but works well for paired
// information where both elements are relatively equal in importance.

    color: '#666',

// Explanation: This sets values to medium gray (#666), making them visually less prominent than
// the darker labels (#333). This color difference establishes that values are the
// data while labels are the context, guiding users to read labels first (darker
// text draws attention first) then values. The #666 color still provides good
// readability - it's not so light that it's hard to read. This gray is
// consistently used for secondary information throughout the interface (email,
// stat labels), creating a recognizable pattern that users learn to interpret as
// "this is supporting information."

  },

// Explanation: This closing brace and comma end the preferenceValue style object. The value
// styling demonstrates how subtle color differences create visual hierarchy
// without dramatic contrast. Both labels and values use fontSize: 16, but labels
// use #333 (darker) while values use #666 (lighter). This subtle distinction
// naturally guides reading order (label then value) while keeping both elements
// equally readable. Subtle hierarchy like this is sophisticated - it works without
// users consciously noticing, which is the mark of excellent design.

});

// Explanation: This closing brace and semicolon end the StyleSheet.create() call, completing
// all style definitions. The StyleSheet contains 17 different style objects that
// work together to create a complete, polished profile interface. The styles
// demonstrate key concepts: reusable patterns (section, preferenceItem), visual
// hierarchy through size/weight/color, flexbox layouts (row and column), spacing
// with padding and margin, creating circles with borderRadius, and responsive
// design with flex properties. These patterns are fundamental to all React Native
// development.

export default ProfileScreen;

// Explanation: This line exports the ProfileScreen component as the default export from this
// file, making it available for import in other files. Default exports are
// imported without curly braces: import ProfileScreen from './ProfileScreen'. This
// component can now be used in navigation configuration to display the profile
// screen when users navigate to it. The export statement is always the last line
// in component files, after all component logic and styles are defined. Without
// this export, the component would be unusable outside this file.

// ============================================================================
// FILE: src/components/ProductCard.js
// ============================================================================
//
// PURPOSE:
// This reusable component displays a single product as a card with image, title,
// price, and rating. It's used in the product list to show each item.
//
// WHAT IT DOES:
// - Accepts product data and onPress callback as props
// - Renders product image, title, price, and rating in a styled card layout
// - Makes the card tappable to navigate to product details
// - Uses PropTypes to validate the shape of data it receives
// - Applies responsive styling with flexbox
//
// WHY IT'S NEEDED:
// Breaking UI into reusable components is fundamental to React development.
// This card component can be used anywhere products are displayed (lists,
// search results, recommendations). Reusability reduces code duplication and
// ensures consistent product presentation throughout the app.
//
// ============================================================================

import React from 'react';

// Explanation: This imports the React library, which is required for using JSX
// syntax. When you write JSX code like <View>Hello</View>, it gets transformed
// into React.createElement() function calls by Babel, so React must be in scope.
// This is essential for all React components.

import PropTypes from 'prop-types';

// Explanation: This imports the PropTypes library for runtime type-checking of
// component props. During development, PropTypes validates that the props passed
// to your component have the correct types and structure, showing helpful console
// warnings when something is wrong. This makes debugging easier and serves as
// inline documentation.

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Explanation: This imports core React Native components needed to build the UI.
// View is like a <div> container used for layout and grouping. Text is required
// for displaying any text (unlike HTML where text can be direct children). Image
// displays pictures from URLs or local files. TouchableOpacity makes elements
// tappable with visual feedback. StyleSheet creates optimized style objects for
// better performance.

const ProductCard = ({ product, onPress }) => {

// Explanation: This declares a functional component named ProductCard using ES6
// arrow function syntax. The curly braces { product, onPress } use destructuring
// to extract specific properties from the props object. This is cleaner than
// writing (props) and then accessing props.product throughout the code.
// Components are JavaScript functions that accept inputs (props) and return React
// elements describing what should appear on screen.

  return (

{/* Explanation: The return statement begins the JSX that defines what this
component renders to the screen. Everything between the parentheses is JSX - a
syntax extension that looks like HTML but is actually JavaScript. JSX makes it
easier to visualize the component structure compared to writing
React.createElement() calls directly. */}

    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}

{/* Explanation: The onPress prop defines what happens when the user taps this
card. It calls the onPress function passed in via props, sending the product
data as an argument. The arrow function () => is necessary here - without it,
writing onPress={onPress(product)} would call the function immediately during
render instead of waiting for the tap. This pattern allows the parent component
to control what happens when a card is tapped. */}

      activeOpacity={0.7}

{/* Explanation: This controls how transparent the card becomes when pressed. The
value ranges from 0 (completely invisible) to 1 (fully opaque). The default is
0.2 which is very transparent. Setting it to 0.7 provides subtle visual
feedback - the card dims slightly when tapped but remains clearly visible. This
gives users confirmation that their tap was registered. */}

    >
      <View style={styles.imageContainer}>

{/* Explanation: This View acts as a container for the product image. It has fixed
dimensions (defined in styles.imageContainer) to ensure all product cards have
the same height regardless of the image's original size. It also has rounded
top corners and overflow: 'hidden' to make sure the image respects those
rounded corners. Without a container, we couldn't control image dimensions as
precisely. */}

        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}

{/* Explanation: This applies styles that make the image fill its container
completely (width: '100%' and height: '100%'). Without explicit dimensions,
React Native images won't display. By setting width and height to 100%, the
image stretches to match its parent container's 200dp height, ensuring
consistent card sizes across different product images. */}

          resizeMode="cover"

{/* Explanation: This controls how the image fits when its aspect ratio doesn't
match the container. 'cover' scales the image to fill the entire container
while maintaining its aspect ratio, cropping parts if necessary. This is ideal
for product cards because it prevents empty space while keeping images
undistorted. Other options include 'contain' (fits entire image, may leave
empty space), 'stretch' (distorts image to fill), and 'center' (centers without
scaling). */}

        />
      </View>

      <View style={styles.textContainer}>

{/* Explanation: This View contains all the text information below the image. The
styles.textContainer applies padding (space inside the container) to push text
away from edges, and gap to add space between child elements automatically.
This creates a clean, organized layout for the product details without needing
to add margins to each individual Text component. */}

        <Text style={styles.title} numberOfLines={2}>
          {product.title}

{/* Explanation: This displays the actual product title text from the product
object passed in via props. The curly braces { } are JSX syntax for embedding
JavaScript expressions. When the component renders, it looks up product.title
(like "Wireless Headphones") and displays it. This dynamic content makes the
component reusable for any product. */}

        </Text>

        <Text style={styles.category} numberOfLines={1}>
          {product.category}

{/* Explanation: This displays the category value from the product data, such as
"electronics", "beauty", or "home-decor". Combined with the capitalize text
transform in the styles, this will display as "Electronics", "Beauty",
"Home-Decor". The curly braces embed this JavaScript expression into the JSX,
so the value updates automatically when different product data is passed to the
component. */}

        </Text>

        <View style={styles.priceRatingContainer}>

{/* Explanation: This View groups the price and rating together in a horizontal row
at the bottom of the card. The styles.priceRatingContainer uses flexbox to
arrange its children horizontally (flexDirection: 'row') and pushes them to
opposite ends (justifyContent: 'space-between'). This creates the common
e-commerce layout where price appears on the left and rating on the right. */}

          <Text style={styles.price}>
            ${product.price.toFixed(2)}

{/* Explanation: This formats the price value for display. The dollar sign $ is
literal text. product.price is the numeric price value (like 99.9 or 149). The
toFixed(2) method converts the number to a string with exactly 2 decimal
places: 99.9 becomes "99.90", and 149 becomes "149.00". This ensures all prices
display cents consistently, meeting user expectations for currency formatting. */}

          </Text>

          <Text style={styles.rating}>
            ⭐ {product.rating.toFixed(1)}

{/* Explanation: This displays a star emoji followed by the numeric rating. The
star provides instant visual recognition - users know this represents product
quality. product.rating.toFixed(1) formats the rating to one decimal place: 4.5
stays "4.5", and 5 becomes "5.0". This provides precise rating information
while keeping it concise. The space between the emoji and number improves
readability. */}

          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProductCard.propTypes = {

// Explanation: PropTypes is attached to the component to define and validate the
// expected props structure. This runs during development to check that the
// component receives the correct data. If props are missing or have wrong types,
// React shows console warnings. This acts as both runtime validation and inline
// documentation, showing other developers exactly what data this component needs.

  product: PropTypes.shape({

// Explanation: PropTypes.shape() validates that product is an object with a
// specific structure. Inside the curly braces, we define each required property
// and its type. This ensures the product object has all the data the component
// needs to render properly. If someone passes a product without a thumbnail or
// price, PropTypes will warn them immediately rather than causing a silent
// failure or crash.

    thumbnail: PropTypes.string.isRequired,

// Explanation: This validates that product.thumbnail must be a string and is
// required. The thumbnail is the image URL, so it must be a string like
// "https://example.com/image.jpg". The .isRequired means if someone renders
// <ProductCard product={{ ... }} /> without a thumbnail property, React will show
// a warning in the console during development. This helps catch bugs early.

    title: PropTypes.string.isRequired,

// Explanation: This validates that product.title must be a string and cannot be
// omitted. The title is the product name displayed to users, so it's essential
// data. Making it required ensures the component always has something meaningful
// to display. If this were optional (without .isRequired), the component might
// render with empty space where the title should be.

    category: PropTypes.string.isRequired,

// Explanation: This validates that product.category must be a string and is
// mandatory. Categories help users understand what type of product they're
// viewing ("electronics", "clothing", etc.). By marking it as required, we ensure
// the component always has this contextual information to display, creating a
// complete product card.

    price: PropTypes.number.isRequired,

// Explanation: This validates that product.price must be a number (like 99.99,
// not "99.99") and is required. Numbers are essential because we use .toFixed(2)
// on the price, which only works on number types. If someone passed a string by
// mistake, PropTypes would warn them. Prices are obviously critical for
// e-commerce, so .isRequired prevents incomplete product data.

    rating: PropTypes.number.isRequired,

// Explanation: This validates that product.rating must be a number (like 4.5,
// not "4.5") and is mandatory. We use .toFixed(1) on the rating, which requires a
// numeric type. Ratings help users make purchasing decisions, so they're
// essential data. The .isRequired ensures every product card displays rating
// information, maintaining consistency across the product catalog.

  }).isRequired,

// Explanation: The .isRequired at the end applies to the entire product object,
// not just its properties. This means the product prop itself cannot be undefined
// or null - it must be an object (even if it's empty, though the inner isRequired
// validators would then complain). This provides two layers of validation: the
// product must exist, and it must contain the required properties.

  onPress: PropTypes.func.isRequired,

// Explanation: This validates that onPress must be a function and is required.
// The function gets called when users tap the card, typically to navigate to a
// detail screen or add the item to a cart. Making it required ensures the card is
// always interactive - there's no point displaying a product card that doesn't
// respond to taps. If someone forgets to pass onPress, PropTypes warns them
// immediately.

};

const styles = StyleSheet.create({

// Explanation: StyleSheet.create() is React Native's way of defining styles. It
// takes an object containing style definitions and returns an optimized style
// object. Unlike inline styles (style={{ ... }}), StyleSheet.create() validates
// styles once at creation time and optimizes them for performance. Styles are
// then referenced by their keys (styles.card, styles.image) throughout the
// component.

  card: {

// Explanation: This defines styles for the outermost TouchableOpacity container -
// the entire product card. These styles create the card appearance: white
// background, rounded corners, spacing between cards, and shadow effects that
// make it appear to float above the screen. All these properties combine to
// create the modern "card" design pattern common in mobile apps.

    backgroundColor: '#FFFFFF',

// Explanation: This sets the card's background to white using hex color notation
// (#RRGGBB format). White backgrounds are standard for product cards because they
// create clean contrast with text and images, don't distract from content, and
// match most app designs. The hex format is more concise than rgb(255, 255, 255).
// #FFF is a valid shorthand, but #FFFFFF is more explicit.

    borderRadius: 12,

// Explanation: This rounds all four corners of the card with a 12
// density-independent pixel radius. Density-independent pixels (dp) scale
// automatically across different screen densities, ensuring the corners look
// equally rounded on all devices. A radius of 12 provides noticeable but not
// excessive rounding - modern and friendly without looking cartoonish. Higher
// values (like 20) would create more dramatic curves.

    marginHorizontal: 10,

// Explanation: This is a shorthand property that sets both marginLeft and
// marginRight to 10dp. Horizontal margins create space between the card and
// screen edges (or between cards if displayed side-by-side). The value 10dp
// provides comfortable breathing room without wasting too much screen space.
// Using marginHorizontal is cleaner than writing out marginLeft: 10, marginRight:
// 10 separately.

    marginVertical: 8,

// Explanation: This shorthand sets both marginTop and marginBottom to 8dp.
// Vertical margins create space between cards when they're stacked in a list. The
// value 8dp is slightly less than the horizontal margin, which is intentional -
// it creates a subtle visual rhythm. Too much vertical margin would waste
// scrollable space; too little would make cards feel cramped and harder to tap
// individually.

    shadowColor: '#000000',

// Explanation: This sets the shadow color to pure black. Shadows make the card
// appear to float above the background, creating depth and visual hierarchy.
// Black shadows look natural because they mimic real-world shadows. The shadow
// properties (shadowColor, shadowOffset, shadowOpacity, shadowRadius) work on
// iOS. For Android, we need the elevation property instead, which is why both are
// included.

    shadowOffset: { width: 0, height: 2 },

// Explanation: This controls the shadow's position relative to the card. width:
// 0 means the shadow doesn't shift left or right - it's centered. height: 2
// means the shadow appears 2dp below the card. This downward offset mimics how
// real shadows fall beneath objects when lit from above, creating a natural,
// realistic appearance. Larger height values would make the card appear to float
// higher.

    shadowOpacity: 0.1,

// Explanation: This sets how dark/transparent the shadow appears, ranging from 0
// (invisible) to 1 (completely opaque black). A value of 0.1 creates a very
// subtle shadow - just enough to create depth without being distracting or making
// the interface feel heavy. Stronger shadows (0.3-0.5) would be more dramatic but
// might overwhelm the clean, modern design.

    shadowRadius: 8,

// Explanation: This controls how blurred the shadow is. A radius of 8dp creates a
// soft, diffused shadow rather than a hard edge. Larger values create softer,
// more spread-out shadows (making objects appear higher above the surface).
// Smaller values create sharper shadows (objects closer to surface). 8dp strikes
// a balance - the shadow is noticeable but not overpowering, maintaining the
// subtle, elegant aesthetic.

    elevation: 3,

// Explanation: This is Android's shadow property. While iOS uses
// shadowColor/shadowOffset/shadowOpacity/shadowRadius, Android uses a single
// elevation value. elevation: 3 creates a small shadow appropriate for cards.
// Higher values (5-10) would create more dramatic shadows for floating action
// buttons or modals. Both iOS shadow properties and Android elevation are needed
// to ensure shadows appear consistently across all devices.

  },
  imageContainer: {

// Explanation: This defines styles for the View that wraps the product image.
// The container serves several purposes: it enforces fixed dimensions so all
// cards have consistent heights, it applies rounded top corners to match the
// card's design, and it uses overflow: 'hidden' to ensure the image respects
// those rounded corners. Without this container, we couldn't control image sizing
// and corner rounding as precisely.

    width: '100%',

// Explanation: This makes the container span the full width of its parent (the
// card). Using percentage values ('100%') is responsive - the container
// automatically adjusts if the card width changes. This is better than fixed
// pixel values which wouldn't adapt to different screen sizes. Full width ensures
// the image uses all available horizontal space without leaving gaps at the
// edges.

    height: 200,

// Explanation: This sets a fixed height of 200 density-independent pixels for
// the image area. Fixed height is crucial for consistent card sizing - without
// it, images with different aspect ratios would create cards of varying heights,
// making the list look messy. 200dp is tall enough to showcase products clearly
// but not so tall that only one or two cards fit on screen, balancing detail with
// browsability.

    borderTopLeftRadius: 12,

// Explanation: This rounds only the top-left corner with a 12dp radius, matching
// the card's overall borderRadius. We round only the top corners because the
// image is at the top of the card. The bottom corners don't need rounding since
// they're covered by the text container below. Matching the card's radius ensures
// the image appears seamlessly integrated into the card rather than looking like
// a separate element.

    borderTopRightRadius: 12,

// Explanation: This rounds only the top-right corner, again matching the card's
// 12dp radius. Together with borderTopLeftRadius, this gives the image area
// rounded top corners while leaving the bottom square. This selective rounding is
// a common design pattern in card layouts where an image occupies the top portion
// - it maintains visual continuity with the card's rounded aesthetic.

    overflow: 'hidden',

// Explanation: This is critical for making borderRadius work on child elements.
// By default, child elements (the Image) can overflow their container's borders,
// ignoring the rounded corners. overflow: 'hidden' clips any content that extends
// beyond the container's boundaries, forcing the image to respect the rounded
// corners. Without this, you'd see square image corners peeking out beyond the
// container's rounded corners.

  },
  image: {

// Explanation: This defines styles for the actual Image component. The styles
// make the image fill its container completely using percentage-based dimensions.
// This is the standard pattern in React Native for responsive images - the
// container sets fixed dimensions (like the 200dp height above), and the image
// fills that space using percentages. The resizeMode prop (set in the JSX) then
// controls how the image fits.

    width: '100%',

// Explanation: This makes the image span the full width of its container (the
// imageContainer). Percentage widths are responsive and essential for React
// Native images. The image will automatically adjust if the container width
// changes, maintaining proper sizing across different screen sizes. Combined with
// the container's width: '100%', this ensures the image uses all available
// horizontal space from edge to edge of the card.

    height: '100%',

// Explanation: This makes the image fill the full height of its container (200dp
// as set on imageContainer). Together with width: '100%', this ensures the image
// completely fills its designated space without gaps. The resizeMode: 'cover'
// (set in the JSX) then controls how the image scales to fit these dimensions
// while maintaining its aspect ratio, cropping if necessary to avoid distortion
// or empty space.

  },
  textContainer: {

// Explanation: This defines styles for the View containing all text elements
// (title, category, price, rating). The padding creates breathing room inside the
// container, pushing text away from edges for better readability. The gap
// property adds space between child elements automatically, eliminating the need
// to add margins to each individual Text component. This creates a clean,
// organized information hierarchy below the image.

    padding: 12,

// Explanation: This adds 12dp of space inside all four edges of the container,
// between the container's border and its content. Padding prevents text from
// touching the edges, which would look cramped and be harder to read. 12dp is
// comfortable - enough space to feel open and organized, but not so much that it
// wastes the limited space available on mobile screens. Padding applies equally
// on all sides for visual consistency.

    gap: 6,

// Explanation: This is a modern CSS/React Native property that automatically
// adds 6dp of space between each child element (the title, category, and
// price/rating container). Instead of adding marginTop or marginBottom to each
// Text component individually, gap handles all the spacing in one declaration.
// This keeps code cleaner and makes spacing adjustments easier - change one value
// instead of updating multiple margin properties.

  },
  title: {

// Explanation: This defines styles for the product title text - the most
// prominent text element in the card. The styles create visual hierarchy through
// size (larger than other text), weight (bold), and color (darkest). Font size
// 16dp is readable without overwhelming the card. The dark gray color is softer
// than pure black, which can look harsh on screens. These choices make the title
// the primary focus while remaining comfortable to read.

    fontSize: 16,

// Explanation: This sets the title text size to 16 density-independent pixels.
// This is larger than the category (14dp) and rating (14dp), making the title the
// most prominent text element. 16dp is a comfortable size for primary text on
// mobile - large enough to read easily without squinting, but not so large that
// long titles take up excessive space. The size helps establish clear information
// hierarchy in the card.

    fontWeight: '600',

// Explanation: This sets the font weight (thickness) to 600, which is semi-bold.
// Font weight ranges from 100 (thin) to 900 (black/heavy), with 400 being normal
// and 700 being bold. Using 600 instead of full bold (700) makes the title
// prominent without appearing too heavy or overwhelming the design. The semi-bold
// weight creates visual hierarchy - the title stands out more than regular-weight
// secondary text like category.

    color: '#1F2937',

// Explanation: This sets the title color to a very dark gray (almost black) using
// hex notation. Pure black (#000000) can look harsh and create too much contrast
// on bright screens. This dark gray (#1F2937) is softer and more comfortable to
// read while still appearing as "black" to users. It's a common choice in modern
// UI design for primary text, striking a balance between readability and visual
// comfort.

    lineHeight: 22,

// Explanation: This sets the vertical space each line of text occupies to 22dp.
// Line height affects readability - too tight and text feels cramped, too loose
// and lines feel disconnected. With fontSize: 16, a lineHeight of 22 creates a
// ratio of 1.375 (22/16), which is comfortable for reading. This extra vertical
// space is especially important since we allow 2 lines with numberOfLines={2},
// preventing lines from feeling squashed together.

  },
  category: {

// Explanation: This defines styles for the product category text - secondary
// information that provides context about the product type. The smaller font size
// (14dp vs title's 16dp), lighter gray color, and capitalize transformation make
// it visually subordinate to the title while still being easily readable. This
// creates clear information hierarchy: title first, category second.

    fontSize: 14,

// Explanation: This sets the category text to 14 density-independent pixels,
// smaller than the title (16dp) but matching the rating size. This smaller size
// signals that category is secondary information - helpful context but not the
// primary focus. 14dp is still comfortably readable on mobile devices while
// clearly establishing visual hierarchy. The consistent 14dp size for both
// category and rating creates visual harmony in the card's design.

    color: '#6B7280',

// Explanation: This sets the category color to a medium gray. This gray is
// significantly lighter than the title's dark gray (#1F2937), creating clear
// visual hierarchy through color contrast. The lighter color signals that
// category is secondary, contextual information rather than primary content. This
// gray is still dark enough to be easily readable while being noticeably
// subordinate to the title, following accessibility best practices for text
// contrast.

    textTransform: 'capitalize',

// Explanation: This automatically capitalizes the first letter of each word in
// the category text. If the data contains "electronics", it displays as
// "Electronics"; "home-decor" becomes "Home-Decor". This creates a more polished,
// professional appearance regardless of how the data is formatted in the backend.
// It's a simple styling choice that improves consistency across the UI without
// requiring data transformation in JavaScript.

  },
  priceRatingContainer: {

// Explanation: This defines styles for the View that holds both the price and
// rating, arranging them in a horizontal row. The flexbox properties create the
// common e-commerce layout where price appears on the left and rating on the
// right with space between them. This layout draws attention to both pieces of
// key decision-making information while keeping them organized and easy to scan
// at a glance.

    flexDirection: 'row',

// Explanation: This arranges the container's children (price and rating)
// horizontally in a row rather than vertically. By default, React Native uses
// flexDirection: 'column' (vertical stacking). Changing to 'row' puts the price
// and rating side-by-side, which is more space-efficient and matches common
// e-commerce conventions. This horizontal layout makes both pieces of information
// visible simultaneously without requiring scrolling or taking up excessive
// vertical space.

    justifyContent: 'space-between',

// Explanation: This distributes children along the main axis (horizontal since
// flexDirection is 'row') with maximum space between them. The first child
// (price) aligns to the left edge, the last child (rating) aligns to the right
// edge, and any remaining space is evenly distributed between them. This creates
// the classic e-commerce layout: price on left, rating on right, maximizing
// separation so neither element crowds the other.

    alignItems: 'center',

// Explanation: This centers children along the cross axis (vertical since
// flexDirection is 'row'). If the price and rating had different heights, they
// would both center vertically within the container, maintaining visual
// alignment. Even though they're currently similar heights, this ensures they
// stay aligned if styling changes. It's a best practice that prevents layout
// issues and keeps elements visually balanced.

    marginTop: 4,

// Explanation: This adds 4dp of space above the price/rating container,
// separating it from the category text above. This is additional spacing beyond
// the gap: 6 defined in textContainer. The small margin creates a subtle visual
// break, grouping the title and category together as basic info while separating
// the price/rating as actionable/evaluative info. This micro-spacing improves
// information hierarchy and scanability.

  },
  price: {

// Explanation: This defines styles for the price text - one of the most
// important elements in an e-commerce interface. The larger font size (18dp,
// biggest in the card), bold weight (700), and distinctive green color make it
// immediately noticeable. These choices reflect the price's importance in
// purchase decisions. The green color is commonly associated with "go" actions
// and affordability in e-commerce, creating subtle psychological encouragement.

    fontSize: 18,

// Explanation: This sets the price to 18 density-independent pixels, making it
// the largest text in the card. This size hierarchy emphasizes that price is
// critical information for purchase decisions. 18dp is large enough to be
// immediately visible when scanning a list of products, helping users quickly
// compare prices. The larger size naturally draws the eye, making the price a
// focal point alongside the product image.

    fontWeight: '700',

// Explanation: This sets the price to fully bold (700 is standard bold weight).
// Combined with the large size and distinctive color, the bold weight makes the
// price unmissable. In visual hierarchy, the price becomes the most prominent
// text element, even more so than the semi-bold (600) title. This reflects
// real-world importance - in e-commerce, price is often the deciding factor in
// purchases, so it deserves maximum visual weight.

    color: '#10B981',

// Explanation: This sets the price color to a bright, friendly green. Green is
// strategically chosen for e-commerce prices because it's associated with
// positive actions ("go", "proceed", "yes") and affordability. It creates subtle
// psychological encouragement without being manipulative. The specific shade
// #10B981 is modern and vibrant without being garish, standing out clearly
// against the white background while maintaining a professional appearance. This
// is a common design pattern in e-commerce apps and websites.

  },
  rating: {

// Explanation: This defines styles for the rating text - important evaluative
// information that helps users make informed purchase decisions. The amber/gold
// color (#F59E0B) complements the star emoji and signals quality/value. The
// medium size (14dp) and semi-bold weight (600) make it noticeable without
// competing with the price's prominence. This creates a balanced layout where
// both price and quality information are clearly visible.

    fontSize: 14,

// Explanation: This sets the rating to 14 density-independent pixels, matching
// the category size but smaller than price (18dp) and title (16dp). This size
// makes ratings clearly readable while establishing visual hierarchy - they're
// important secondary information but subordinate to price. 14dp is comfortable
// for quick scanning when comparing products in a list, allowing users to easily
// spot high-rated items without the text overwhelming the card's compact design.

    color: '#F59E0B',

// Explanation: This sets the rating color to amber/gold (#F59E0B), a warm
// yellow-orange shade. This color choice is intentional: gold is universally
// associated with quality, value, and achievement (gold medals, gold stars). It
// complements the star emoji's yellow color, creating visual coherence. The warm
// tone contrasts nicely with the cool green price, making both elements distinct
// and easy to differentiate at a glance. This color psychology subtly reinforces
// the rating's meaning.

    fontWeight: '600',

// Explanation: This sets the rating to semi-bold weight (600), the same as the
// title. This weight makes the rating stand out more than regular text without
// being as heavy as the fully bold (700) price. The semi-bold weight signals
// importance - ratings influence purchase decisions - while maintaining visual
// balance. If ratings were too light, they'd be overlooked; too heavy, and
// they'd compete with the price for attention. 600 is the sweet spot.

  },
});

export default ProductCard;

// Explanation: This exports the ProductCard component as the default export from
// this file, making it available for import in other files. Other files can now
// import it using: import ProductCard from './components/ProductCard'. Once
// imported, it can be used anywhere by passing the required props: <ProductCard
// product={{ thumbnail: '...', title: '...', category: '...', price: 99.99,
// rating: 4.5 }} onPress={(product) => console.log('Tapped:', product)} />. This
// is how components are shared and reused across a React Native application.

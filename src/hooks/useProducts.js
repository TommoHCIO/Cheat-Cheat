// ============================================================================
// FILE: src/hooks/useProducts.js
// ============================================================================
//
// PURPOSE:
// This custom React hook fetches product data from the API and provides
// functions to filter and sort products based on user interactions.
//
// WHAT IT DOES:
// - Fetches all products when the component mounts
// - Manages loading, error, and products array states
// - Provides handleSearch() function for searching by title/description
// - Provides handleSort() function for sorting by price or title
// - Provides handleFilter() function for filtering by category
// - Returns products data, states, and helper functions to components
//
// WHY IT'S NEEDED:
// This hook encapsulates all product fetching and manipulation logic in one
// reusable place. Components can simply call this hook to get products and
// filtering/sorting capabilities without duplicating complex logic. This
// follows React best practices of extracting stateful logic into custom hooks.
//
// ============================================================================

import { useState, useEffect } from 'react';

// Explanation: This line imports two essential React hooks from the React library.
// useState is used to create and manage state variables (data that can change
// over time), and useEffect is used to perform side effects like fetching data
// from an API. These hooks are the building blocks for managing component
// behavior and data.

import { fetchProducts } from '../services/api';

// Explanation: This line imports the fetchProducts function from our API service
// file located in the services folder. The fetchProducts function is responsible
// for making HTTP requests to retrieve product data from an external API. By
// importing it here, we can use it inside our custom hook to load products when
// needed.

const useProducts = () => {

// Explanation: This line defines a custom React hook named useProducts. A custom
// hook is a JavaScript function that starts with "use" (a React naming
// convention) and can call other React hooks. The arrow function syntax () => {}
// creates the function. Custom hooks allow us to extract and reuse stateful
// logic across multiple components without duplicating code.

  const [products, setProducts] = useState([]);

// Explanation: This line creates a state variable called "products" that will
// store all the original product data from the API. useState([]) initializes it
// as an empty array and returns two values: the current state (products) and a
// function to update it (setProducts). We use array destructuring [products,
// setProducts] to name these values. The empty array [] is the initial value
// before data is loaded.

  const [filteredProducts, setFilteredProducts] = useState([]);

// Explanation: This line creates another state variable called
// "filteredProducts" to store the currently visible products after applying
// search, sort, or filter operations. By keeping both products and
// filteredProducts separate, we maintain the original data intact while showing
// different views to the user. This allows us to reset filters easily without
// re-fetching data from the API.

  const [loading, setLoading] = useState(true);

// Explanation: This line creates a boolean state variable called "loading" that
// tracks whether data is currently being fetched from the API. It starts as true
// because we begin loading data immediately when the component mounts. When
// loading is true, the UI can display a loading spinner or message. When it
// becomes false, the UI shows the actual product data or an error message.

  const [error, setError] = useState(null);

// Explanation: This line creates a state variable called "error" to store any
// error messages if the API call fails. It starts as null (no error). If
// something goes wrong during data fetching (network failure, server error,
// etc.), we'll store the error message here and display it to the user instead
// of crashing the application.

  useEffect(() => {

// Explanation: This line starts a useEffect hook, which runs code after the
// component renders. useEffect is used for "side effects" - operations that
// interact with things outside the component, like fetching data from an API,
// setting up subscriptions, or manually updating the DOM. The arrow function
// contains the code that will execute.

    const loadProducts = async () => {

// Explanation: This line defines an asynchronous function called loadProducts
// inside the useEffect. We mark it as "async" because it will perform
// asynchronous operations (fetching data from an API). Async functions allow us
// to use the "await" keyword to wait for promises to resolve, making
// asynchronous code easier to read and write than traditional promise chains.

      try {

// Explanation: This line starts a try block for error handling. Code inside the
// try block might throw errors (like network failures or API errors). If an
// error occurs, execution jumps to the catch block instead of crashing the
// application. This allows us to handle errors gracefully and show user-friendly
// error messages.

        setLoading(true);

// Explanation: This line sets the loading state to true at the start of the data
// fetching process. This tells the UI to display a loading indicator (like a
// spinner or "Loading..." message) to inform users that data is being retrieved.
// It's important to show loading states for good user experience, especially on
// slow connections.

        setError(null);

// Explanation: This line resets the error state to null before attempting to
// fetch data. If there was a previous error from a failed request, this clears
// it out. This ensures that old error messages don't persist when the user
// retries loading data.

        const data = await fetchProducts();

// Explanation: This line calls the fetchProducts function and waits for it to
// complete using the "await" keyword. The await keyword pauses execution of this
// async function until the promise from fetchProducts resolves (completes). Once
// the data arrives, it's stored in the "data" variable. If the API call fails,
// an error is thrown and caught by the catch block.

        setProducts(data);

// Explanation: This line updates the products state with the data retrieved from
// the API. By calling setProducts with the new data, we trigger a re-render of
// any components using this hook, causing them to display the newly loaded
// products. This stores our original, unfiltered dataset.

        setFilteredProducts(data);

// Explanation: This line also updates the filteredProducts state with the same
// data. Initially, filteredProducts shows all products since no search, sort, or
// filter has been applied yet. Later, when users search or filter, only
// filteredProducts will change while products remains unchanged, preserving the
// original data.

      } catch (err) {

// Explanation: This line starts the catch block that runs if any error occurs in
// the try block. The error object is automatically passed to the catch block as
// the "err" parameter. This could be a network error, server error, or any other
// problem that prevents data from loading successfully.

        setError(err.message);

// Explanation: This line extracts the error message from the error object and
// stores it in the error state. The err.message property contains a
// human-readable description of what went wrong (like "Network request failed"
// or "Server returned 404"). By storing this in state, we can display it to
// users so they understand why data didn't load.

      } finally {

// Explanation: This line starts the finally block, which runs after the try and
// catch blocks complete, regardless of whether an error occurred or not. The
// finally block is guaranteed to execute, making it perfect for cleanup
// operations that should always happen.

        setLoading(false);

// Explanation: This line sets loading to false, indicating that the data
// fetching process has completed (whether it succeeded or failed). This tells
// the UI to stop showing the loading indicator and instead display either the
// product data (if successful) or an error message (if failed). This line runs
// whether the fetch succeeds or throws an error.

      }

// Explanation: This closing brace ends the try-catch-finally block. All error
// handling for the data fetching operation is now complete.

    };

// Explanation: This closing brace and semicolon end the definition of the
// loadProducts async function. The function is now defined but hasn't been
// called yet - we'll call it on the next line.

    loadProducts();

// Explanation: This line immediately calls the loadProducts function we just
// defined. Without this call, the function would be defined but never execute.
// By calling it here, we trigger the data fetching process as soon as the
// component mounts (when the useEffect first runs).

  }, []);

// Explanation: This closing brace and comma-separated empty array [] complete
// the useEffect hook. The empty dependency array [] is crucial - it tells React
// to run this effect only once when the component first mounts, not on every
// re-render. If we omitted the array, the effect would run after every render,
// causing infinite API calls. If we included variables in the array like
// [someVar], the effect would re-run whenever those variables change.

  const handleSearch = (query) => {

// Explanation: This line defines a function called handleSearch that takes a
// search query (text input from the user) as a parameter. This function will
// filter the products based on whether their title or description contains the
// search query. Functions like this are called "handlers" because they handle
// user actions (in this case, typing in a search box).

    if (!query.trim()) {

// Explanation: This line checks if the search query is empty or contains only
// whitespace. The trim() method removes whitespace from both ends of the string,
// and the ! operator negates (reverses) the result. So if query.trim() is an
// empty string (which is "falsy" in JavaScript), !query.trim() becomes true.
// This condition catches cases where users clear the search box or enter only
// spaces.

      setFilteredProducts(products);

// Explanation: This line resets the filtered products to show all products when
// the search query is empty. By setting filteredProducts back to the complete
// products array, we remove any previous search filters and display everything
// again. This provides intuitive behavior - clearing the search box shows all
// products again.

      return;

// Explanation: This line exits the handleSearch function early. Since we've
// already handled the empty query case by resetting the filtered products,
// there's no need to continue with the rest of the function. The return
// statement stops execution here and prevents the search logic below from
// running unnecessarily.

    }

// Explanation: This closing brace ends the if block for handling empty queries.
// If the code reaches this point, we know the query is not empty and contains
// actual search text to process.

    const searchLower = query.toLowerCase();

// Explanation: This line converts the search query to lowercase letters and
// stores it in searchLower. Converting to lowercase enables case-insensitive
// searching - so "phone", "Phone", "PHONE", and "pHoNe" all match the same
// products. Without this, searches would be case-sensitive and miss valid
// matches, frustrating users.

    const filtered = products.filter((product) => {

// Explanation: This line starts filtering the products array using the filter()
// method. The filter() method creates a new array containing only elements that
// pass a test. It loops through each product and calls the provided function
// (the arrow function after =>) for each one. If the function returns true, that
// product is included in the filtered array; if false, it's excluded.

      const titleLower = (product.title || '').toLowerCase();

// Explanation: This line safely extracts and converts the product's title to
// lowercase. The (product.title || '') part is a defensive coding technique - if
// product.title is null or undefined, it uses an empty string '' instead,
// preventing errors. Then toLowerCase() converts it to lowercase for
// case-insensitive comparison. This ensures the search works even if some
// products have missing or malformed data.

      const descriptionLower = (product.description || '').toLowerCase();

// Explanation: This line does the same thing for the product's description - it
// safely extracts the description, provides an empty string fallback if it's
// missing, and converts to lowercase. By searching both title and description,
// we give users more ways to find products. A search for "wireless" might match
// a title or a description mentioning wireless capabilities.

      return titleLower.includes(searchLower) || descriptionLower.includes(searchLower);

// Explanation: This line determines whether the current product should be
// included in the search results. The includes() method checks if a string
// contains a substring. The || (OR) operator means the product is included if
// the search query appears in EITHER the title OR the description. This return
// value (true or false) tells filter() whether to keep this product in the
// results.

    });

// Explanation: This closing brace and semicolon complete the filter() method
// call. At this point, the filtered variable contains a new array with only the
// products that match the search query.

    setFilteredProducts(filtered);

// Explanation: This line updates the filteredProducts state with the new
// filtered array. This triggers a re-render of components using this hook,
// causing the UI to update and display only the products matching the search
// query. Users immediately see the search results without any page refresh.

  };

// Explanation: This closing brace and semicolon end the handleSearch function
// definition. The function is now ready to be called whenever a user types in
// the search box.

  const handleSort = (sortBy) => {

// Explanation: This line defines a function called handleSort that takes a
// sortBy parameter indicating what field to sort by (either 'title' or 'price').
// This function will rearrange the filtered products in alphabetical order (for
// titles) or numerical order (for prices) to help users browse products more
// easily.

    let sorted = [...filteredProducts];

// Explanation: This line creates a copy of the filteredProducts array using the
// spread operator [...array]. The spread operator unpacks all elements from
// filteredProducts into a new array. We create a copy because the sort() method
// we'll use next modifies arrays in place, and React state should never be
// mutated directly. Mutating state directly can cause bugs where the UI doesn't
// update properly.

    switch (sortBy) {

// Explanation: This line starts a switch statement that checks the value of
// sortBy and executes different code based on that value. Switch statements are
// cleaner than multiple if-else statements when you have several possible values
// to check. Each case below handles a different sorting option.

      case 'title':

// Explanation: This line starts a case block that runs if sortBy equals 'title'.
// When users choose to sort by title, the code in this case block executes,
// sorting products alphabetically by their title.

        sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

// Explanation: This line sorts the products alphabetically by title. The sort()
// method takes a comparison function with two parameters (a and b) representing
// two products being compared. The localeCompare() method compares strings
// alphabetically and returns a negative number if a comes before b, positive if
// b comes before a, or zero if they're equal. The (a.title || '') provides a
// fallback empty string if title is missing, preventing errors.

        break;

// Explanation: This line exits the switch statement after handling the 'title'
// case. Without break, code execution would continue into the next case
// ('price'), causing incorrect behavior. Break ensures only the appropriate case
// runs.

      case 'price':

// Explanation: This line starts a case block that runs if sortBy equals 'price'.
// When users choose to sort by price, the code in this case block executes,
// sorting products numerically from lowest to highest price.

        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));

// Explanation: This line sorts products numerically by price. For numbers, we
// use subtraction instead of localeCompare(). If a.price is less than b.price,
// the result is negative (a comes first). If a.price is greater, the result is
// positive (b comes first). The (a.price || 0) provides a fallback of 0 if price
// is missing, ensuring the math still works without errors.

        break;

// Explanation: This line exits the switch statement after handling the 'price'
// case. This ensures we don't accidentally execute code from other cases.

      default:

// Explanation: This line starts the default case, which runs if sortBy doesn't
// match any of the specific cases above. The default case acts as a catch-all
// for unexpected values, preventing errors if an invalid sort option is somehow
// passed to the function.

        break;

// Explanation: This line exits the switch statement for the default case. Even
// though the default case doesn't do anything here (no sorting), we still need
// break to properly close the switch statement structure.

    }

// Explanation: This closing brace ends the switch statement. All sorting logic
// is complete, and the sorted array now contains products arranged in the
// requested order.

    setFilteredProducts(sorted);

// Explanation: This line updates the filteredProducts state with the newly
// sorted array. This triggers a re-render, causing components to display
// products in the new order. Users immediately see their products rearranged
// according to their selected sort option (title or price).

  };

// Explanation: This closing brace and semicolon end the handleSort function
// definition. The function is now ready to be called whenever users change the
// sort option.

  const handleFilter = (category) => {

// Explanation: This line defines a function called handleFilter that takes a
// category parameter (like "electronics", "clothing", etc.). This function
// filters products to show only those belonging to the selected category,
// allowing users to narrow down the product list to specific types of items.

    if (!category || category.trim() === '' || category.toLowerCase() === 'all') {

// Explanation: This line checks if the category is empty, contains only
// whitespace, or equals "all". The || (OR) operators mean if ANY of these
// conditions are true, the if block executes. !category is true if category is
// null, undefined, or any falsy value. trim() === '' catches whitespace-only
// strings. toLowerCase() === 'all' handles the "all categories" option that
// shows everything. This condition determines if we should show all products
// instead of filtering.

      setFilteredProducts(products);

// Explanation: This line resets filteredProducts to show all products when no
// specific category is selected or when "all" is selected. This removes any
// previous category filter and displays the complete product list. It provides
// intuitive behavior - selecting "all categories" shows everything again.

      return;

// Explanation: This line exits the handleFilter function early since we've
// already handled the "show all" case. There's no need to continue with the
// category filtering logic below, so we return to stop execution here.

    }

// Explanation: This closing brace ends the if block for handling the "show all"
// case. If execution reaches this point, we know a specific category was
// selected and we need to filter the products.

    const filtered = products.filter((product) => {

// Explanation: This line starts filtering the products array to find only
// products matching the selected category. The filter() method loops through
// each product and keeps only those for which the arrow function returns true.
// We're creating a new array called filtered that will contain only products in
// the chosen category.

      return (product.category || '').toLowerCase() === category.toLowerCase();

// Explanation: This line compares each product's category to the selected
// category, both converted to lowercase for case-insensitive matching. The
// (product.category || '') provides a fallback empty string if the category
// property is missing. The === operator checks for exact equality after both
// sides are lowercased. If they match, this product is included in the filtered
// results; if not, it's excluded. This ensures "Electronics" matches
// "electronics", "ELECTRONICS", etc.

    });

// Explanation: This closing brace and semicolon complete the filter() method
// call. The filtered variable now contains a new array with only products from
// the selected category.

    setFilteredProducts(filtered);

// Explanation: This line updates the filteredProducts state with the
// category-filtered array. This triggers a re-render of components using this
// hook, causing the UI to update and display only products from the selected
// category. Users immediately see the filtered results without a page refresh.

  };

// Explanation: This closing brace and semicolon end the handleFilter function
// definition. The function is now ready to be called whenever users select a
// different category from a dropdown or category list.

  return {

// Explanation: This line starts the return statement that defines what this
// custom hook exposes to components that use it. The curly braces {} create an
// object containing all the state variables and functions that components need.
// By returning an object, components can destructure only what they need: const
// { filteredProducts, handleSearch } = useProducts();

    products,

// Explanation: This line includes the products state variable in the returned
// object. This is the complete, original array of products loaded from the API.
// Components might use this to display the total number of products or to access
// the unfiltered data. The shorthand syntax "products" is equivalent to
// "products: products" - JavaScript allows this when the key and value have the
// same name.

    filteredProducts,

// Explanation: This line includes the filteredProducts state variable in the
// returned object. This is the currently visible array of products after any
// search, sort, or filter operations have been applied. This is typically what
// components will map over to display the product list in the UI.

    loading,

// Explanation: This line includes the loading boolean state variable in the
// returned object. Components use this to conditionally render loading
// indicators (spinners, "Loading..." text) while data is being fetched. When
// loading is true, show a loading indicator; when false, show the actual
// products or error message.

    error,

// Explanation: This line includes the error state variable in the returned
// object. Components use this to display error messages to users if the API call
// fails. If error is not null, the component can show an error message like
// "Failed to load products: [error message]" instead of trying to display
// products that don't exist.

    handleSearch,

// Explanation: This line includes the handleSearch function in the returned
// object. Components can call this function with a search query string, and it
// will filter products based on whether their title or description contains that
// query. For example, a search input component would call
// handleSearch(event.target.value) whenever the user types.

    handleSort,

// Explanation: This line includes the handleSort function in the returned
// object. Components can call this function with a sort option ('title' or
// 'price'), and it will rearrange the filtered products in the requested order.
// A dropdown menu might call handleSort('price') when users select "Sort by
// Price".

    handleFilter

// Explanation: This line includes the handleFilter function in the returned
// object. Components can call this function with a category name, and it will
// filter products to show only items in that category. A category selector might
// call handleFilter('electronics') when users click on the Electronics category.

  };

// Explanation: This closing brace and semicolon complete the return statement.
// The object containing all state variables and handler functions is now
// returned to any component that calls useProducts(). This creates a clean API
// where components get everything they need without worrying about how it's
// implemented internally.

};

// Explanation: This closing brace and semicolon end the useProducts function
// definition. The entire custom hook is now complete. Any component can import
// and call this hook to get product data and manipulation functions.

export default useProducts;

// Explanation: This line exports the useProducts function as the default export
// from this module. Default exports can be imported with any name: import
// useProducts from './useProducts' or import MyProductHook from './useProducts'.
// By exporting this hook, we make it available for other files in the project to
// import and use. Components will import this hook to access all the
// product-related functionality without needing to implement the logic
// themselves.

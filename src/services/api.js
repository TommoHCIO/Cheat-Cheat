// ============================================================================
// FILE: src/services/api.js
// ============================================================================
//
// PURPOSE:
// This file serves as the API service layer, centralizing all HTTP requests to
// the DummyJSON API. It provides clean, reusable functions for fetching product
// data throughout the application.
//
// WHAT IT DOES:
// - Defines the base API URL for DummyJSON
// - Exports functions to fetch all products, search products, get products by
//   category, fetch category lists, and get individual product details
// - Handles HTTP requests using fetch()
// - Processes JSON responses and handles errors
//
// WHY IT'S NEEDED:
// Centralizing API calls in one file makes the codebase maintainable and DRY
// (Don't Repeat Yourself). Instead of writing fetch() calls throughout the app,
// components import these functions for consistent, reusable data fetching with
// proper error handling.
//
// ============================================================================

/**
// Explanation: This is a JSDoc comment block that documents what this entire
// file does. JSDoc comments start with /** and are used to describe files,
// functions, and code sections. They help other developers (and your future
// self) understand the purpose of the code without reading every line. Good
// documentation is crucial for maintainability.

 * API Service - Product Data Management

// Explanation: This line is the title/summary describing that this file is an
// API service responsible for managing product data. It tells you at a glance
// what functionality this file provides to the rest of the application.

 * This file handles all communication with the DummyJSON API

// Explanation: This line provides additional context explaining that this
// specific service communicates with an external API called DummyJSON. It helps
// developers understand the data source and external dependencies of this
// module.

 */

// Explanation: This closing marker ends the JSDoc comment block. Everything
// between /** and */ is treated as documentation and ignored during code
// execution.

const API_BASE_URL = 'https://dummyjson.com';

// Explanation: This declares a constant variable named API_BASE_URL that stores
// the base web address for all API requests. Using 'const' means this value
// cannot be changed later in the code. By storing the URL in one place, if
// DummyJSON ever changes their domain, we only need to update this single line
// instead of searching through all our code. This follows the DRY principle
// (Don't Repeat Yourself).

async function fetchProducts() {

// Explanation: This line defines an asynchronous function named fetchProducts.
// The 'async' keyword tells JavaScript this function will perform operations
// that take time (like fetching data from the internet). Async functions
// automatically return a Promise, which represents a value that will be
// available in the future. The empty parentheses () mean this function takes no
// parameters - you just call it as fetchProducts().

  try {

// Explanation: This starts a try block, which is used for error handling. Any
// code inside the try block is monitored for errors. If any error occurs
// (network failure, invalid data, server crash, etc.), JavaScript immediately
// stops executing the try block and jumps to the catch block below. This
// prevents errors from crashing your entire application.

    const response = await fetch(`${API_BASE_URL}/products?limit=150`);

// Explanation: This line performs several operations: First, it uses template
// literal syntax (backticks) to construct the full URL by combining
// API_BASE_URL with the endpoint '/products?limit=150'. The fetch() function
// sends an HTTP GET request to that URL. The 'await' keyword pauses execution
// until the server responds. The ?limit=150 parameter tells the API to return
// up to 150 products instead of the default 30, ensuring we get products from
// all categories. The response is stored in a constant variable named
// 'response'.

    if (!response.ok) {

// Explanation: This if statement checks whether the HTTP request was
// successful. The response.ok property is a boolean (true/false) that is true
// when the HTTP status code is in the 200-299 range (success) and false for
// error codes like 404 (Not Found), 500 (Server Error), or 503 (Service
// Unavailable). The exclamation mark ! negates the value, so this condition is
// true when the response is NOT ok, meaning an error occurred.

      throw new Error(`HTTP error! status: ${response.status}`);

// Explanation: If the response was not successful, this line creates and throws
// a new Error object. The Error contains a descriptive message using template
// literal syntax to include the actual HTTP status code from response.status.
// For example, if the server returns 404, the error message will be "HTTP
// error! status: 404". Throwing an error stops execution and immediately jumps
// to the catch block, allowing proper error handling.

    }

// Explanation: This closing brace ends the if statement block. If the
// response.ok check passes (meaning no error), the code continues to the next
// line instead of throwing an error.

    const data = await response.json();

// Explanation: This line converts the HTTP response body from JSON text format
// into a JavaScript object. The response.json() method is asynchronous (it
// returns a Promise), so we use 'await' to pause until the conversion is
// complete. The resulting JavaScript object is stored in the 'data' constant.
// For example, the JSON text '{"products":[{"id":1,"title":"iPhone"}]}' becomes
// a real JavaScript object you can access with data.products[0].title.

    return data.products;

// Explanation: This line returns the 'products' array from the data object back
// to whatever code called this function. The DummyJSON API wraps the actual
// product array inside an object with a 'products' property, so we extract just
// that array. This makes it easier for components to use the data - they get a
// simple array of products instead of having to unwrap it themselves.

  } catch (error) {

// Explanation: This starts the catch block, which handles any errors that
// occurred in the try block. The 'error' parameter is a variable that contains
// information about what went wrong (error message, stack trace, etc.). This
// could be a network error, an HTTP error we threw, a JSON parsing error, or
// any other type of error.

    console.error('Error fetching products:', error);

// Explanation: This line logs the error to the browser's console for debugging
// purposes. console.error() is similar to console.log() but specifically for
// errors - it typically displays in red and may include a stack trace. The
// first parameter is a descriptive message explaining where the error occurred,
// and the second parameter is the actual error object. This helps developers
// debug issues during development.

    throw error;

// Explanation: After logging the error for debugging, this line re-throws the
// error so it can be handled by the calling code (usually a React component).
// Re-throwing gives the UI layer control over how to respond to errors - it
// might show an error message to the user, try again, or navigate to an error
// page. Without re-throwing, the calling code would think everything succeeded.

  }

// Explanation: This closing brace ends the catch block. Once the error is
// logged and re-thrown, execution exits the catch block and propagates the
// error up to the caller.

}

// Explanation: This closing brace ends the entire fetchProducts function
// definition. Now other parts of the application can call fetchProducts() to
// retrieve the product list.

async function searchProducts(query) {

// Explanation: This defines another asynchronous function named searchProducts
// that takes one parameter called 'query'. The query parameter will contain the
// search text the user wants to find (like "iPhone" or "laptop"). This function
// will send the query to the API's search endpoint and return matching
// products.

  if (!query || query.trim() === '') {

// Explanation: This is input validation that checks if the query is invalid.
// The first condition (!query) checks if query is null, undefined, or an empty
// string. The second condition (query.trim() === '') checks if query contains
// only whitespace characters. The trim() method removes whitespace from both
// ends, so "   " becomes "". The || (OR) operator means if either condition is
// true, the overall condition is true. This prevents making unnecessary API
// calls with empty searches.

    throw new Error('Search query cannot be empty');

// Explanation: If the query is invalid (empty or only whitespace), this line
// immediately throws an error with a descriptive message. Throwing an error
// here prevents the function from making a pointless API call and gives
// immediate feedback to the calling code about what went wrong. The error
// message clearly explains the problem so developers and users understand the
// issue.

  }

// Explanation: This closing brace ends the input validation if block. If the
// query is valid (not empty), execution continues to the next line.

  try {

// Explanation: This starts another try block for error handling during the API
// request. Any errors that occur while searching (network failures, server
// errors, parsing errors) will be caught and handled gracefully instead of
// crashing the application.

    const encodedQuery = encodeURIComponent(query);

// Explanation: This line encodes the search query to make it safe for use in a
// URL. URLs cannot contain spaces or special characters like ?, &, =, #, etc.
// The encodeURIComponent() function converts these characters into
// percent-encoded format. For example, "iPhone 12" becomes "iPhone%2012" (where
// %20 represents a space), and "home & garden" becomes "home%20%26%20garden"
// (where %26 represents &). This encoding prevents URL errors and security
// vulnerabilities.

    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodedQuery}`);

// Explanation: This line constructs the search URL by combining API_BASE_URL
// with the search endpoint '/products/search?q=' and the encoded query. The ?q=
// part is a URL query parameter where 'q' stands for 'query'. The fetch()
// function sends an HTTP GET request to this URL, and 'await' pauses execution
// until the server responds with search results. The response is stored in the
// 'response' constant.

    if (!response.ok) {

// Explanation: This checks if the HTTP request was successful by examining
// response.ok. If the status code is not in the 200-299 success range (meaning
// an error like 400 Bad Request, 404 Not Found, or 500 Server Error occurred),
// this condition is true and we need to handle the error.

      throw new Error(`HTTP error! status: ${response.status}`);

// Explanation: If the response indicates an error, this line creates and throws
// an Error object with a message that includes the actual HTTP status code. For
// example, "HTTP error! status: 500" if the server crashed. Throwing the error
// stops execution and jumps to the catch block for proper error handling.

    }

// Explanation: This closing brace ends the response.ok check. If the response
// was successful, execution continues to parse the response data.

    const data = await response.json();

// Explanation: This converts the HTTP response body from JSON text into a
// JavaScript object. The response.json() method is asynchronous, so we use
// 'await' to wait for the conversion to complete. The resulting object contains
// the search results and is stored in the 'data' constant.

    return data.products;

// Explanation: This extracts and returns the 'products' array from the data
// object. The DummyJSON API wraps search results in an object with a 'products'
// property containing the array of matching products. By returning just the
// array, we make it simpler for components to use the search results.

  } catch (error) {

// Explanation: This catch block handles any errors that occurred during the
// search operation (in the try block above). The 'error' parameter contains
// details about what went wrong - it could be a network error, the HTTP error
// we threw, a JSON parsing error, or any other type of failure.

    console.error(`Error searching for products with query "${query}":`, error);

// Explanation: This logs the error to the console for debugging, including the
// actual search query that was used. Using template literal syntax, the error
// message shows which query failed, making it much easier to debug issues. For
// example, if searching for "laptop" fails, you'll see 'Error searching for
// products with query "laptop":' followed by the error details.

    throw error;

// Explanation: After logging the error, this re-throws it so the calling code
// (usually a React component) can handle it appropriately. The component might
// show an error message to the user, clear the search results, or provide a
// retry option. Re-throwing gives control to the UI layer.

  }

// Explanation: This closing brace ends the catch block. After handling the
// error, execution exits the catch block and the error propagates to the
// caller.

}

// Explanation: This closing brace ends the searchProducts function definition.
// Now other parts of the application can call searchProducts("some query") to
// search for products.

async function fetchProductsByCategory(category) {

// Explanation: This defines an asynchronous function named
// fetchProductsByCategory that takes one parameter called 'category'. The
// category parameter should be a category name like "smartphones", "laptops",
// or "fragrances". This function fetches all products belonging to that
// specific category from the API.

  if (!category || category.trim() === '') {

// Explanation: This input validation checks if the category parameter is
// invalid. The !category condition checks if it's null, undefined, or empty.
// The category.trim() === '' condition checks if it contains only whitespace.
// The || (OR) operator means if either is true, the category is invalid. This
// prevents making API calls with empty or invalid category names.

    throw new Error('Category cannot be empty');

// Explanation: If the category is invalid, this immediately throws an Error
// with a clear message explaining the problem. Throwing an error here provides
// immediate feedback and prevents a wasteful API call. The error message helps
// developers understand what went wrong.

  }

// Explanation: This closing brace ends the input validation block. If the
// category is valid, execution continues to make the API request.

  try {

// Explanation: This starts a try block for error handling during the category
// fetch operation. Any errors that occur will be caught and handled instead of
// crashing the application.

    const encodedCategory = encodeURIComponent(category);

// Explanation: This encodes the category name to be URL-safe. If the category
// contains spaces (like "home decoration") or special characters,
// encodeURIComponent() converts them to percent-encoded format. For example,
// "home decoration" becomes "home%20decoration". This ensures the URL is valid
// and prevents errors.

    const response = await fetch(`${API_BASE_URL}/products/category/${encodedCategory}`);

// Explanation: This constructs the category URL by combining API_BASE_URL with
// '/products/category/' and the encoded category name. The fetch() function
// sends an HTTP GET request to this URL, and 'await' pauses until the server
// responds with products in that category. The response is stored in the
// 'response' constant.

    if (!response.ok) {

// Explanation: This checks if the HTTP request succeeded by examining
// response.ok. If the status code indicates an error (not in the 200-299
// range), this condition is true and we need to throw an error.

      throw new Error(`HTTP error! status: ${response.status}`);

// Explanation: If the response indicates failure, this creates and throws an
// Error with a message including the HTTP status code. This helps identify what
// type of error occurred (404 for category not found, 500 for server error,
// etc.).

    }

// Explanation: This closing brace ends the response.ok check. If successful,
// execution continues to parse the response.

    const data = await response.json();

// Explanation: This converts the HTTP response body from JSON text into a
// JavaScript object using the response.json() method. The 'await' keyword waits
// for the conversion to complete. The resulting object is stored in the 'data'
// constant.

    return data.products;

// Explanation: This extracts and returns the 'products' array from the data
// object. The API wraps the product array in an object with a 'products'
// property, so we extract just the array to make it easier for components to
// use.

  } catch (error) {

// Explanation: This catch block handles any errors that occurred in the try
// block. The 'error' parameter contains information about what went wrong
// during the category fetch operation.

    console.error(`Error fetching products for category "${category}":`, error);

// Explanation: This logs the error to the console with a message that includes
// the specific category name that failed. This makes debugging much easier
// because you can see exactly which category caused the problem. For example,
// 'Error fetching products for category "smartphones":' followed by error
// details.

    throw error;

// Explanation: After logging, this re-throws the error so the calling code can
// handle it. The component might show an error message to the user or try a
// different category. Re-throwing gives the UI layer control over error
// handling.

  }

// Explanation: This closing brace ends the catch block. After error handling,
// execution exits the catch block and propagates the error upward.

}

// Explanation: This closing brace ends the fetchProductsByCategory function
// definition. Now components can call fetchProductsByCategory("smartphones") to
// get all products in that category.

async function fetchProductById(id) {

// Explanation: This defines an asynchronous function named fetchProductById
// that takes one parameter called 'id'. The id parameter should be a product ID
// number (like 1, 2, 3, etc.). This function fetches detailed information about
// a single specific product from the API.

  if (id === null || id === undefined || id === '') {

// Explanation: This is comprehensive input validation that checks if the id
// parameter is invalid. It checks three conditions: id === null (explicitly
// null), id === undefined (not provided or explicitly undefined), or id === ''
// (empty string). Using === (strict equality) ensures type-safe comparisons.
// The || (OR) operators mean if any condition is true, the id is invalid. This
// prevents making API calls with invalid IDs.

    throw new Error('Product ID is required and cannot be empty');

// Explanation: If the id is invalid, this immediately throws an Error with a
// descriptive message. The error message clearly states that an ID is required
// and cannot be empty, helping developers understand what went wrong and how to
// fix it.

  }

// Explanation: This closing brace ends the input validation block. If the id is
// valid (not null, undefined, or empty), execution continues to fetch the
// product.

  try {

// Explanation: This starts a try block for error handling during the product
// fetch operation. Any errors will be caught and handled gracefully instead of
// crashing the application.

    const response = await fetch(`${API_BASE_URL}/products/${id}`);

// Explanation: This constructs the product URL by combining API_BASE_URL with
// '/products/' and the id. For example, if id is 5, the URL becomes
// 'https://dummyjson.com/products/5'. The fetch() function sends an HTTP GET
// request to this URL, and 'await' pauses until the server responds with the
// product data. The response is stored in the 'response' constant.

    if (!response.ok) {

// Explanation: This checks if the HTTP request was successful by examining
// response.ok. If the status code is not in the 200-299 success range, this
// condition is true and we need to handle the error. This could be a 404
// (product not found) or 500 (server error).

      if (response.status === 404) {

// Explanation: This nested if statement specifically checks if the status code
// is 404, which means "Not Found". For this function, a 404 specifically means
// the product with that ID doesn't exist in the database. By checking for 404
// separately, we can provide a more helpful, specific error message rather than
// a generic error.

        throw new Error(`Product with ID ${id} not found`);

// Explanation: If the status is 404, this throws an Error with a message that
// includes the specific ID that wasn't found. For example, "Product with ID
// 99999 not found". This helps users and developers understand exactly what
// happened - the ID they requested doesn't exist.

      }

// Explanation: This closing brace ends the 404-specific check. If the status is
// something other than 404, execution continues to the next line.

      throw new Error(`HTTP error! status: ${response.status}`);

// Explanation: If the response was not ok but also not 404, this throws a more
// generic HTTP error with the status code. This handles all other error cases
// like 500 (Server Error), 503 (Service Unavailable), or 400 (Bad Request). The
// status code helps identify what type of error occurred.

    }

// Explanation: This closing brace ends the response.ok check. If the response
// was successful (status 200), execution continues to parse the response data.

    const data = await response.json();

// Explanation: This converts the HTTP response body from JSON text into a
// JavaScript object. The response.json() method is asynchronous, so we use
// 'await' to wait for completion. The resulting product object is stored in the
// 'data' constant.

    return data;

// Explanation: This returns the entire data object, which represents a single
// product with all its details (id, title, description, price, images, etc.).
// Unlike the other functions that return data.products, this returns just
// 'data' because the API returns the product object directly, not wrapped in a
// container.

  } catch (error) {

// Explanation: This catch block handles any errors that occurred while fetching
// the product in the try block. The 'error' parameter contains information
// about what went wrong.

    console.error(`Error fetching product with ID ${id}:`, error);

// Explanation: This logs the error to the console with a message that includes
// the specific product ID that failed. This makes debugging much easier because
// you can see exactly which product fetch failed. For example, 'Error fetching
// product with ID 5:' followed by error details.

    throw error;

// Explanation: After logging the error, this re-throws it so the calling code (usually a React
// component) can handle it appropriately. The component might show an error page, display a
// "Product not found" message, or redirect to the home page. Re-throwing gives control to the UI
// layer.

  }

// Explanation: This closing brace ends the catch block. After error handling, execution exits the
// catch block and the error propagates to the caller.

}

// Explanation: This closing brace ends the fetchProductById function definition. Now components can
// call fetchProductById(5) to get details for product #5.

export {

// Explanation: This starts an export statement that makes functions available to other JavaScript
// files. Without exporting, these functions would be private to this file only. The opening brace {
// indicates we're using named exports, which allow exporting multiple items from a single file.

  fetchProducts,

// Explanation: This exports the fetchProducts function, making it available for import in other
// files. Other files can import it like: import { fetchProducts } from './api.js'. The comma
// indicates there are more items to export.

  searchProducts,

// Explanation: This exports the searchProducts function so other files can search for products.
// Components will import and call this function when users type in the search box. Another comma
// indicates more exports follow.

  fetchProductsByCategory,

// Explanation: This exports the fetchProductsByCategory function so components can filter products
// by category. This will be used when users click category buttons or select from a category
// dropdown. Another comma indicates one more export.

  fetchProductById

// Explanation: This exports the fetchProductById function so components can load detailed product
// information. This will be used on product detail pages when users click on a specific product. No
// comma because this is the last export.

};

// Explanation: This closing brace and semicolon complete the export statement. All four functions
// are now publicly available for import in other parts of the application. This modular approach
// keeps code organized, reusable, and maintainable.

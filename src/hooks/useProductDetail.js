// ============================================================================
// FILE: src/hooks/useProductDetail.js
// ============================================================================
//
// PURPOSE:
// This custom React hook fetches and manages the state for a single product's
// detailed information, with proper cleanup to prevent memory leaks.
//
// WHAT IT DOES:
// - Accepts a productId parameter
// - Manages loading, error, and product data states
// - Fetches product details from the API when the component mounts
// - Uses AbortController to cancel ongoing requests if the component unmounts
// - Returns the product data, loading state, and error state to the component
//
// WHY IT'S NEEDED:
// Extracting data fetching logic into a custom hook makes code reusable and
// maintains separation of concerns. Multiple components can use this hook
// without duplicating the fetch logic. The AbortController prevents memory
// leaks by canceling requests when users navigate away before data arrives.
//
// ============================================================================

import { useState, useEffect } from 'react';

// Explanation: This line imports two essential React hooks from the React
// library. useState is used to create state variables that can change over
// time (like storing product data, loading status, and errors). useEffect is
// used to perform side effects like fetching data from an API when the
// component mounts or when certain values change. These hooks are fundamental
// building blocks for creating functional components with state and lifecycle
// behavior in React.

import { fetchProductById } from '../services/api';

// Explanation: This line imports a function called fetchProductById from the
// api.js file located in the services folder. This function is responsible for
// making HTTP requests to fetch product details from a backend server. By
// keeping API logic in a separate file, we follow the separation of concerns
// principle - the hook focuses on state management while the api.js file
// handles the actual network communication.

const useProductDetail = (productId) => {

// Explanation: This line declares a custom hook named useProductDetail that
// accepts one parameter: productId. Custom hooks are JavaScript functions that
// start with "use" and allow you to extract and reuse stateful logic across
// multiple components. The productId parameter is the unique identifier for
// the product we want to fetch from the API. This hook encapsulates all the
// logic needed to fetch, store, and manage a single product's data.

  const [product, setProduct] = useState(null);

// Explanation: This line creates a state variable called product initialized
// to null, and a setter function called setProduct to update it. The null
// initial value indicates "no data yet" which is different from an empty
// object or an error state. When the fetch succeeds, setProduct will be called
// with the product data object. Components can check if product is null to
// determine whether data has loaded yet.

  const [loading, setLoading] = useState(true);

// Explanation: This line creates a state variable called loading initialized
// to true, and a setter function called setLoading. The loading state tracks
// whether a network request is currently in progress. It starts as true
// because we want to show a loading indicator immediately when the component
// mounts. It gets set to false once the fetch completes (whether successful or
// not), allowing the UI to show either the product data or an error message.

  const [error, setError] = useState(null);

// Explanation: This line creates a state variable called error initialized to
// null, and a setter function called setError. The error state stores any
// error messages that occur during the fetch operation. It starts as null (no
// errors), and if something goes wrong during the fetch (network failure,
// server error, invalid response), setError will be called with an error
// message string. Components can check if error is not null to conditionally
// render error messages to the user.

  useEffect(() => {

// Explanation: This line starts a useEffect hook which runs side effects in
// functional components. The arrow function passed to useEffect contains all
// the code that should run when the component mounts and whenever the
// dependencies (specified at the end) change. Effects are perfect for data
// fetching because they run after the component renders, allowing React to
// update the screen quickly before starting potentially slow network requests.

    console.log(`useProductDetail hook mounted - fetching product ID: ${productId}`);

// Explanation: This line logs a message to the browser's developer console for
// debugging purposes. The template string (using backticks) includes the
// productId value, making it easy to track which product is being fetched.
// Console logs are invaluable during development for understanding the
// execution flow, verifying that effects run when expected, and diagnosing
// issues. In production, these logs can help debug user-reported problems.

    const controller = new AbortController();

// Explanation: This line creates a new AbortController instance, which is a
// Web API object that allows you to cancel ongoing fetch requests. The
// controller has two main parts: the controller itself (which you use to
// trigger cancellation) and a signal property (which you pass to fetch to make
// it cancellable). This is crucial for preventing memory leaks - if the
// component unmounts while a fetch is still running, we need a way to cancel
// that fetch to avoid attempting state updates on an unmounted component.

    const fetchProduct = async () => {

// Explanation: This line declares an asynchronous function named fetchProduct
// that will handle the actual data fetching logic. The async keyword allows us
// to use await inside the function, making asynchronous code look and behave
// more like synchronous code. By defining this as a separate function inside
// the effect, we can organize our error handling with try-catch and call the
// function immediately afterward. Note that we can't make the useEffect
// callback itself async because useEffect expects either nothing or a cleanup
// function to be returned, not a Promise.

      try {

// Explanation: This line starts a try block, which is used for error handling
// in JavaScript. Any code inside the try block will be monitored for errors.
// If an error occurs (like a network failure, server error, or invalid JSON
// response), JavaScript will immediately jump to the catch block below,
// allowing us to handle the error gracefully instead of crashing the app. This
// is essential for network requests because they can fail for many reasons
// beyond our control.

        setError(null);

// Explanation: This line resets the error state to null at the beginning of
// each fetch attempt. This is important when a user retries after a failed
// fetch - we want to clear any previous error messages so the UI doesn't show
// stale error information. If we didn't reset this, an old error message might
// remain visible even during a successful retry, confusing the user.

        setLoading(true);

// Explanation: This line sets the loading state to true to indicate that a
// fetch operation has started. This triggers the UI to display a loading
// indicator (like a spinner or skeleton screen) to inform the user that data
// is being fetched. Even though loading starts as true initially, we
// explicitly set it here because this fetch function might run multiple times
// (when productId changes), and we need to show the loading state for each
// fetch attempt.

        const data = await fetchProductById(productId, controller.signal);

// Explanation: This line calls the fetchProductById function and waits for it
// to complete using the await keyword. We pass two arguments: productId (to
// identify which product to fetch) and controller.signal (to make the request
// cancellable). The await keyword pauses execution of this function until the
// Promise returned by fetchProductById resolves, then assigns the resolved
// value (the product data) to the data constant. If the fetch fails, an error
// will be thrown and caught by the catch block below.

        if (controller.signal.aborted) return;

// Explanation: This line checks if the fetch request was cancelled (aborted)
// while it was in progress. If the user navigated away from the screen or the
// productId changed before the fetch completed, controller.abort() will have
// been called, setting signal.aborted to true. In that case, we return early
// without updating any state. This prevents the "Can't perform a React state
// update on an unmounted component" warning and avoids displaying stale data
// that's no longer relevant.

        setProduct(data);

// Explanation: This line updates the product state with the fetched data,
// triggering a re-render of any components using this hook. The data object
// typically contains properties like id, name, price, description, image URLs,
// etc. By storing this in state, React will automatically update the UI to
// display the product details. This line only runs if the fetch succeeded and
// wasn't aborted, ensuring we only display valid, current data.

      } catch (err) {

// Explanation: This line starts a catch block that handles any errors thrown
// in the try block above. The err parameter contains information about what
// went wrong - it could be a network error (user offline), a server error (500
// status code), a timeout, or an abort error. By catching errors here instead
// of letting them propagate, we prevent the app from crashing and can show
// user-friendly error messages instead of confusing technical details.

        if (controller.signal.aborted) return;

// Explanation: This line checks if the error was caused by request
// cancellation rather than a real failure. When controller.abort() is called,
// it throws an AbortError which triggers the catch block. However,
// cancellation is intentional and not an error the user should see, so we
// check signal.aborted and return early without setting error state. This
// prevents showing an error message when the user simply navigated away or
// changed products.

        setError(err.message || 'Failed to fetch product');

// Explanation: This line updates the error state with a user-friendly error
// message. We first try to use err.message (which might contain details like
// "Network request failed" or "Server returned 404"), but if that's undefined
// or empty, we fall back to a generic message "Failed to fetch product". This
// error message will be displayed in the UI, informing the user that something
// went wrong and they might want to retry or check their connection.

        console.error('Error fetching product:', err);

// Explanation: This line logs the full error object to the browser console for
// debugging purposes. While we show the user a simple error message in the UI,
// the full error object (logged here) contains additional technical details
// like stack traces, error codes, and request/response information that are
// invaluable for developers troubleshooting issues. The console.error method
// specifically logs errors in red in the console, making them easy to spot.

      } finally {

// Explanation: This line starts a finally block, which runs after the try
// block completes (whether it succeeded or threw an error) and after the catch
// block finishes (if an error occurred). Code in the finally block is
// guaranteed to run regardless of whether the try block succeeded or failed,
// making it perfect for cleanup operations like setting loading to false. This
// ensures the loading indicator stops spinning even if an error occurred.

        if (controller.signal.aborted) return;

// Explanation: This is the third and final abort checkpoint, checking one last
// time if the request was cancelled before updating the loading state. This
// might seem redundant, but it's necessary because even in the finally block,
// we could be dealing with an unmounted component. By checking signal.aborted
// here, we ensure absolutely no state updates occur on unmounted components,
// preventing memory leaks and React warnings in all edge cases.

        setLoading(false);

// Explanation: This line sets the loading state to false, indicating that the
// fetch operation has completed (whether successfully or with an error). This
// triggers the UI to hide the loading indicator and show either the product
// details (if fetch succeeded) or an error message (if fetch failed). By
// placing this in the finally block, we guarantee that loading gets set to
// false in all code paths, preventing the loading indicator from spinning
// forever.

      }
    };

// Explanation: This closing brace ends the fetchProduct async function
// definition. Everything above this brace (the try-catch-finally blocks) is
// the function body that executes when fetchProduct is called. Now that the
// function is defined, we can call it on the next line to actually trigger the
// data fetch.

    fetchProduct();

// Explanation: This line calls the fetchProduct function we just defined,
// which starts the actual data fetching process. Without this call, the
// function would be defined but never executed. This happens immediately when
// the effect runs (when the component mounts or productId changes), so data
// fetching begins right away without waiting for user interaction. We don't
// await this call because useEffect expects a cleanup function or nothing, not
// a Promise.

    return () => {

// Explanation: This line starts the cleanup function that useEffect returns.
// This function will be called automatically by React in two situations: when
// the component unmounts (is removed from the screen) or right before the
// effect runs again (when productId changes). The cleanup function is
// essential for preventing memory leaks by canceling ongoing operations that
// are no longer needed. It's the last chance to clean up resources before the
// component disappears or restarts.

      console.log(`useProductDetail hook cleanup - aborting fetch for product ID: ${productId}`);

// Explanation: This line logs a cleanup message to the console for debugging.
// The message includes the productId that was being fetched, helping
// developers understand when and why cleanups occur. This is particularly
// useful for diagnosing issues like rapid navigation (user quickly navigating
// between products) or unexpected unmounts. In development, these logs help
// verify that cleanup is happening as expected.

      controller.abort();

// Explanation: This line cancels the ongoing fetch request by calling abort()
// on the AbortController we created earlier. When called, this immediately
// signals to the fetch API that the request should be cancelled, and the
// browser stops processing the request. This frees up network resources and
// prevents the fetch callbacks from trying to update state on an unmounted
// component. The signal.aborted checks throughout the fetchProduct function
// will detect this and prevent state updates.

    };

// Explanation: This closing brace ends the cleanup function. Everything
// between "return () => {" and this brace will execute when the component
// unmounts or before the effect re-runs. By returning this function from
// useEffect, we tell React "before you throw away this component or run this
// effect again, please run this cleanup code first".

  }, [productId]);

// Explanation: This closing brace and bracket complete the useEffect hook. The
// array [productId] is the dependency array, which tells React to re-run this
// entire effect whenever productId changes. React compares the new productId
// value with the previous one using Object.is, and if they're different, it
// runs the cleanup function (aborting the old fetch) and then runs the effect
// again (fetching the new product). We only include productId because other
// values like setProduct, setError, and setLoading are guaranteed by React to
// never change, and fetchProductById is imported so it never changes either.

  return { product, loading, error };

// Explanation: This line returns an object containing the three state values:
// product (the fetched data or null), loading (boolean indicating if fetch is
// in progress), and error (error message string or null). By returning an
// object instead of an array, components can destructure by name like "const {
// product, error } = useProductDetail(id)" and ignore values they don't need.
// This is the hook's public API - everything else is internal implementation
// details.

};

// Explanation: This closing brace ends the useProductDetail function
// definition. Everything above defines what happens when a component calls
// useProductDetail(productId): state is initialized, an effect is set up to
// fetch data, and an object with product/loading/error is returned. The
// function itself is not exported yet - that happens on the next line.

export default useProductDetail;

// Explanation: This line exports the useProductDetail hook as the default
// export of this module, making it available for import in other files. Other
// components can now import this hook using "import useProductDetail from
// './hooks/useProductDetail'" and use it to fetch product details. The default
// export means they don't need curly braces around the import name and can
// choose any name they want when importing (though conventionally they should
// keep the original name).

// ============================================================================
// FILE: babel.config.js
// ============================================================================
//
// PURPOSE:
// This file configures Babel, the JavaScript transpiler that transforms modern
// JavaScript and JSX code into versions compatible with React Native and mobile
// devices. It tells Babel which presets and plugins to use for code transformation.
//
// WHAT IT DOES:
// - Exports a configuration function that Babel calls during the build process
// - Enables caching for faster builds
// - Specifies babel-preset-expo which includes all transformations needed for
//   React Native and Expo apps (JSX, modern JavaScript, TypeScript support)
//
// WHY IT'S NEEDED:
// Mobile devices and React Native don't understand JSX syntax or the latest
// JavaScript features. Babel converts your modern code into a format they can
// execute, enabling you to write clean, modern code while ensuring compatibility.
//
// ============================================================================

module.exports = function(api) {

// Explanation: This line exports a configuration function that Babel will call
// when it needs to transform your code. In Node.js, 'module.exports' makes code
// available to other files. The function receives an 'api' parameter, which is an
// object provided by Babel that gives access to internal features like caching.
// Think of this as the entry point where Babel asks "What are your transformation
// rules?"

  api.cache(true);

// Explanation: This line tells Babel to cache (save and reuse) this configuration
// instead of recalculating it every time it processes a file. When set to 'true',
// Babel will permanently store this configuration in memory, significantly speeding
// up your build process. The cache automatically invalidates when you change this
// file, switch environments (development to production), restart Metro bundler, or
// run with the --clear flag. For educational apps where configuration rarely
// changes, permanent caching provides optimal performance.

  return {

// Explanation: This line starts returning the actual configuration object that
// tells Babel how to transform your code. Everything inside this object defines
// which presets and plugins Babel should use. The curly braces create a JavaScript
// object that will contain properties like 'presets' and potentially 'plugins' if
// you need more advanced configuration.

    presets: ['babel-preset-expo'],

// Explanation: This line specifies which preset to use for transforming your code.
// A preset is a pre-packaged collection of Babel plugins bundled together. Instead
// of configuring 50+ individual transformation plugins, 'babel-preset-expo'
// provides everything needed for Expo and React Native apps in one package. This
// preset includes: (1) @babel/preset-env for transforming modern JavaScript
// features like arrow functions, async/await, and destructuring into compatible
// code; (2) @babel/preset-react for transforming JSX syntax into
// React.createElement calls; (3) @babel/preset-typescript if TypeScript is
// detected; (4) React Native specific transformations for platform-specific code
// and native modules; (5) Expo specific transformations for assets, environment
// variables, and SDK optimizations; (6) Metro bundler integration for fast refresh
// and source maps. Babel is a transpiler that converts modern JavaScript and JSX
// into code that mobile devices can execute.

  };

// Explanation: This line closes the configuration object and ends the return
// statement. The semicolon marks the end of this JavaScript statement. Everything
// between 'return {' and this closing brace defines your complete Babel
// configuration.

};

// Explanation: This line closes the function that was started at the beginning
// with 'module.exports = function(api) {'. The semicolon after the closing brace
// is technically optional in JavaScript but included here as a best practice for
// consistency. At this point, Babel has received your complete configuration and
// knows exactly how to transform your code files.

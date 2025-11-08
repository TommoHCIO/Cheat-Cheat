ASSETS FOLDER - REQUIRED FILES
================================

This folder needs the following image files for the Expo app to run:

1. icon.png
   - Size: 1024x1024 pixels
   - Purpose: App icon shown on home screen
   - Note: Expo will auto-generate if missing during build

2. splash.png
   - Size: 1284x2778 pixels (or similar ratio)
   - Purpose: Loading screen when app starts
   - Note: Expo will use default if missing

3. adaptive-icon.png
   - Size: 1024x1024 pixels
   - Purpose: Android adaptive icon (foreground)
   - Note: Android specific

4. favicon.png
   - Size: 48x48 pixels
   - Purpose: Web browser tab icon
   - Note: Only needed for web version

IMPORTANT:
==========
These files are optional for development. Expo will use default placeholder
images if they are missing. You can add your own custom images later.

To run the app now, just use:
  npm start

The app will work fine without custom assets during development!

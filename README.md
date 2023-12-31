# Course-React-Native

This repository contains a React Native project for a course.

## Getting Started

Follow these steps to set up and run the project:

1. **Start the Server:**
   - Navigate to the `server` directory.
   - Run the following command to start the JSON server: 
     ```
     json-server --watch db.json --port 3004
     ```
   This will start the server and serve data from the `db.json` file.

2. **Run ngrok:**
   - In a new terminal, run ngrok with the same port as the JSON server:
     ```
     ngrok http 3004
     ```
   ngrok will generate a temporary public URL that tunnels to your local server.

3. **Update Client Configuration:**
   - Navigate to the `client` directory.
   - Open the appropriate client configuration file.
   - Find the API base URL or server URL field and update it with the ngrok URL you obtained in the previous step.

4. **Run React Native Expo App:**
   - Open a new terminal.
   - Navigate to the `client` directory.
   - Run the following command to start the Expo app:
     ```
     npx expo start
     ```
   Expo will provide you with a QR code that you can scan using the Expo Go app on your physical device to test the app.

## Usage

- The server should now be running, providing data from the `db.json` file.
- The ngrok URL will allow your client to communicate with the server, even on devices connected to different networks.
- The Expo app will allow you to test the React Native app on a physical device or emulator.
- Make sure to follow the documentation in each directory for more specific instructions on setting up the server and client.

## License

This project is licensed under the [MIT License](LICENSE).

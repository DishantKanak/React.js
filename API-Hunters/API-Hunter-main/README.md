# API Hunter

A simple API testing tool built with React and Vite, using JSON Server for mock APIs.

## Features

- Test REST API endpoints with GET, POST, PUT, DELETE methods
- Add custom headers
- Send JSON body for POST/PUT requests
- View formatted JSON responses

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the JSON Server (for mock APIs):
   ```
   npm run json-server
   ```
   This will start the server on http://localhost:3001

3. In another terminal, start the React app:
   ```
   npm run dev
   ```
   Open http://localhost:5173 in your browser

## Usage

- Enter the API URL (e.g., http://localhost:3001/posts)
- Select the HTTP method
- Add headers in JSON format if needed
- For POST/PUT, add body in JSON format
- Click "Send Request" to test the API
- View the response below

## Mock Data

The JSON Server serves data from `db.json`. You can modify this file to add more mock endpoints.

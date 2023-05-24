# Node.js To-Do App

This Node.js app implements all CRUD operations for a to-do list. It provides the following functionalities:

- Add a new to-do for a specific user.
- Update an existing to-do for a specific user.
- Delete an existing to-do for a specific user.
- Get to-do information for a specific user.
- Get all to-do items for a specific user.

## Installation

npm install

## Environment Variables

Make sure to create a .env file in the project's root directory and define the following variables:

PORT=3000 # port to run the app

TOKEN_SECRET=JWT-SECRET-KEY

Access_Token_Expire=token-expire-time

MONGODB_URL= Your MongoDB database URL (e.g., mongodb+srv://{username}:{password}@cluster0.pxs5n.mongodb.net/{database name}?retryWrites=true&w=majority

WHITELISTED_DOMAINS=allowed-cors-domains-separated-by-commas

## Scripts

- Build the TypeScript code:

npm run build

- Start the app in production mode:

npm start

- Run the app in development mode with automatic reloading:

npm run dev

# SpeerApp

![Android Demo](https://github.com/user-attachments/assets/42ebac6b-9928-4c18-8dd7-1038af1c0635)

## Features

- GitHub user search functionality
- User profile viewing
- Followers and following list browsing
- Real-time user data fetching
- Infinite scroll for user lists
- Pull-to-refresh functionality

## Prerequisites

Before running the application, you need to:

1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings > Developer Settings > Personal Access Tokens
   - Generate a new token with the following scopes:
     - `read:user`
     - `user:follow`
   - Copy the generated token

2. Create a `.env` file in the root directory with the following content:
   ```
   GITHUB_TOKEN=your_personal_access_token_here
   ```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/PankajPunia/SpeerApp.git
   ```
2. Navigate to the project directory:
   ```sh
   cd SpeerApp
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Install the necessary pods for iOS:
   ```sh
   npx pod-install
   ```

## Usage

1. Start metro:
   ```sh
   npm start
   ```
2. Run the application on an Android or iOS simulator:
   ```sh
   npm run android
   npm run ios
   ```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── hooks/            # React query hooks
├── screens/          # Screens
├── services/         # API services and data handling
├── navigation/       # App navigaiton structure
```

## Overview of Implementation

### Architecture Choices

- **Component-Based Architecture**: The application is built using reusable React Native components to ensure modularity and maintainability.
- **TypeScript**: TypeScript is used to provide type safety and improve code quality.
- **React Query**: Manages data fetching, caching, and synchronization, simplifying API calls and reducing boilerplate while keeping data up to date

### Navigation

- **React Navigation**: React Navigation is used for client-side routing to handle navigation between different screens of the application. It uses combination of bottom tab navigator and native stack.

### State Management

- **Local State**: Local state is managed using React's `useState` hooks for component-specific state.



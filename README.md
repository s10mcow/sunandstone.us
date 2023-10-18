# React-Material-Starter-V2 by Spark Labs

This TypeScript starter project is developed by Spark Labs. It leverages a number of libraries to facilitate development and deployment:

## Libraries
The primary libraries used in this project are:

- **React**: The base library for building the user interface.
- **Material-UI (MUI)**: Used for the creation of responsive and reusable components.
- **Vite**: Improves development startup and refresh times.
- **Axios**: A tool for making HTTP requests.
- **React-Hook-Form & Yup**: These libraries are used together for efficient form validation.
- **Recoil**: Takes care of state management throughout the app.
- **React Query**: Manages asynchronous data, especially data fetching and caching.


## Release-It Configuration
The project uses [release-it](https://github.com/release-it/release-it) for automating the versioning and changelog generation. It creates Git tags and GitHub releases. The commit message, repo information and prerequisites are all defined in the `package.json`. Release-it also follows the convention over configuration principle, using the "angular" preset to easily keep up with the versioning scheme.

## Commands
The following commands apply to this project:

- `yarn dev`: Run the app in development mode.
- `yarn build`: Build the app for production, which will be found in the `build` folder.
- `yarn lint`: Execute eslint on the TypeScript source files.
- `yarn preview`: Establish a local server to preview the production build.

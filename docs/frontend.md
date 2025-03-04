# Frontend Documentation

## Overview

The frontend of this OTT platform is built using **Next.js** and is structured with **Redux, Axios, Formik, Tailwind CSS, and other essential libraries** to manage state, API requests, UI components, and form validation.

---

## Folder Structure

The frontend project is organized as follows:

- **.next/** - Next.js build output
- **node_modules/** - Installed dependencies
- **public/** - Static assets (images, icons, etc.)
- **src/** - Source code (Components, Pages, Store, etc.)
- **.env.local** - Environment variables
- **.gitignore** - Git ignore file
- **eslint.config.mjs** - ESLint configuration
- **jsconfig.json** - JavaScript/TypeScript configuration
- **next.config.mjs** - Next.js configuration
- **package-lock.json** - Lock file for dependencies
- **package.json** - Project metadata and dependencies
- **postcss.config.mjs** - PostCSS configuration for Tailwind
- **tailwind.config.mjs** - Tailwind CSS configuration
- **README.md** - Project documentation

## Dependencies

The project utilizes the following core dependencies:

- **@reduxjs/toolkit (v2.5.1)** - State management with Redux Toolkit
- **axios (v1.7.9)** - HTTP requests to the backend API
- **formik (v2.4.6)** - Form handling and validation
- **js-cookie (v3.0.5)** - Managing cookies for authentication
- **next (v15.1.6)** - Next.js framework
- **react (v19.0.0)** - React core library
- **react-dom (v19.0.0)** - React DOM renderer
- **react-icons (v5.4.0)** - Icon library for UI components
- **react-image-crop (v11.0.7)** - Image cropping utility
- **react-image-file-resizer (v0.4.8)** - Resizing images before uploading
- **react-redux (v9.2.0)** - Integrating Redux with React
- **react-uploader (v3.43.0)** - File upload utility
- **swiper (v11.2.1)** - Carousel slider library
- **uploader (v3.48.3)** - Uploading files to cloud storage
- **yup (v1.6.1)** - Schema validation for forms

## Development Dependencies

The following development dependencies are used for linting, styling, and configurations:

- **@eslint/eslintrc (v3)** - ESLint configuration
- **eslint (v9)** - JavaScript linter
- **eslint-config-next (v15.1.6)** - Next.js-specific ESLint rules
- **postcss (v8)** - CSS processing with PostCSS
- **tailwind-merge (v2.6.0)** - Utility for merging Tailwind classes
- **tailwindcss (v3.4.1)** - Tailwind CSS framework

# Frontend `src/` Folder Documentation

## Overview

The src/ folder contains the core application logic, including pages, components, hooks, schemas, sections, static assets, state management, and utility functions. Below is an overview of its structure:

## Folder Structure

- **app/** - Contains Next.js app-level configuration and routing logic.
- **components/** - Reusable UI components used across the application.
- **hooks/** - Custom React hooks for handling logic like authentication, API requests, etc.
- **schemas/** - Validation schemas used with Formik and Yup.
- **sections/** - Larger UI sections or layouts that combine multiple components.
- **static/** - Static assets such as images, icons, and JSON files.
- **store/** - Redux store, slices, and state management.
- **utility/** - Helper functions for common operations like API handling, formatting, and authentication.

# `utility` Folder Documentation

## Overview

The utility folder contains helper data files that store static or pre-defined information used within the application. These files help provide dummy content for UI components.

## Files in `utility/`

### dummy-movie-data.js

Exports an array of objects containing dummy movie data.
Each object represents a movie with properties like title, description, genre, cast, and other relevant details.
Used in components or pages to simulate movie listings when real data is unavailable.

### faq-data.js

Exports an array of objects containing Frequently Asked Questions (FAQs).
Each object includes a question and its corresponding answer.
Used in sections where FAQ content is displayed, like a Help or Support page.

# `store` Folder Documentation

## Overview

The store folder manages global state using Redux Toolkit. It contains the Redux store setup, a provider component, and state slices for different application features.

## Files in `store/`

### provider.jsx

- Exports a **Redux Provider** that wraps the application.
- Uses `{children}` to allow nested components to access the Redux store.
- Ensures that all components have access to the global state.

### index.js

- Creates the **Redux store** using `configureStore` from Redux Toolkit.
- Combines different reducers (state slices) and exports the store.

## `slices/` Folder

The `slices/` folder contains Redux slices that manage specific parts of the application's state.

### alertSlice.js

- Manages alert messages for notifications, errors, and success messages.
- Includes actions for **showing and hiding alerts.**

### authSlice.js

- Manages authentication state (user login, logout, token handling).
- Stores user information and authentication status.
- Includes actions for **logging in**, **logging out**, and **refreshing tokens**.

### modalSlice.js

- Controls the visibility of modals (popups).
- Includes actions for **opening and closing modals** dynamically.

# `static` Folder Documentation

## Overview

The `static` folder contains **CSS files** for styling and images for UI elements, ensuring a well-structured approach to handling static assets in the application.

## Folders inside `static/`

### css/

- Contains `tailwind.config.css`, which includes custom Tailwind CSS configurations.
- Used to define global styles, custom utilities, and theme extensions.

### images/

- Stores all image assets used in the application, such as logos, icons, and banners.
- Includes an `index.jsx` file, which imports and exports all images for easy access across the app.
- This approach helps maintain clean and organized imports in components.

# `sections` Folder Documentation

## Overview

The `sections` folder organizes different parts of the application into separate categories, making it easier to manage large components based on their purpose. It contains three subfolders:

### 1. authentication/

- Contains all authentication-related files such as **Login**, **Register**, **Forgot Password**, **Reset Password**, etc.
- These files handle user authentication workflows, including form submissions, validation, and API interactions.

### 2. marketing/

- Contains files related to marketing pages, including **Home Page sections**, **Call to Actions (CTAs)**, and **promotional content**.
- Used to display information about the platform and engage users.

### 3. profile/

- Contains files for **user profile management**, such as **profile update forms**, **avatar updates**, and **account settings**.
- Allows users to modify their personal information and preferences.

# `schemas` Folder Documentation

## Overview

The `schemas` folder is responsible for **form validation** using **Yup**, ensuring that user inputs meet specific requirements before submission.

## Files in `schemas/`

### index.js

- Contains all **Yup validation schemas** for different forms across the application.
- Defines validation rules for fields like **email**, **password**, **username**, **profile updates**, and **authentication forms**.
- Helps maintain consistent validation logic across components.

# `hooks` Folder Documentation

## Overview

The hooks folder contains **custom React hooks** to simplify and reuse logic across the application.

## Files in hooks/

### useAuthCheck.js

- Checks if the user is **authenticated**.
- If the user is **not authenticated**, it redirects them to the **login page**.
- Used in protected routes or components that require authentication.

# `components` Folder Documentation

## Overview

The `components` folder contains **all reusable UI components** used throughout the application, such as the **Header**, **Footer**, and **other shared elements**. It helps in maintaining a **modular structure** by keeping UI elements separate from page logic.

## Structure of `components/`

### General Components

- Includes commonly used components like **Header**, **Footer**, **Buttons**, **Modals**, **Cards**, and **other UI elements**.
- These components are designed to be reusable across multiple sections of the application.

### form/

- Contains **form-related components** like **input fields**, **checkboxes**, **radio buttons**, **text areas**, and **validation messages**.
- Helps maintain consistency in form UI and behavior across the application.

### dashboard/

- Contains **dashboard-specific components** used in the **Admin Panel** or **User Dashboard**.
- Includes widgets, charts, navigation menus, and other elements that make up the dashboard layout.

# `app` Folder Documentation

## Overview

The `app` folder is the core structure for **handling routing and page organization** in the Next.js application. It contains two subfolders:

## 1. (site)/

- Contains **all public-facing pages** for the application.
- Each folder inside represents a different route or page (e.g., **Home**, **About**, **Login**, **Register**).
- `page.jsx` files within these folders define the actual page components.
- Ensures that the site is well-structured and follows Next.js routing conventions.

## 2. dashboard/

- Contains **all admin-related pages and functionalities**.
- Includes a `layout.jsx` file that defines the **dashboard layout**, such as the **sidebar**, **navigation**, and **page structure**.
- **All admin panel pages** are stored here, ensuring a clear separation from public-facing pages.

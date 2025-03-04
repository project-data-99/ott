# Folder Structure

The backend of the OTT platform follows a well-organized structure to ensure scalability and maintainability. Below is the folder and file structure of the backend:

---

# Root Directory Structure

```
/backend
│── /node_modules       # Contains all installed dependencies
│── /public             # Public assets (if needed)
│── /src                # Main source code
│── .env                # Environment variables (not committed to Git)
│── .env.sample         # Sample environment variables for reference
│── .gitignore          # Files & folders to exclude from Git
│── .prettierignore     # Files ignored by Prettier
│── .prettierrc         # Prettier configuration for code formatting
│── package-lock.json   # Locks dependency versions
│── package.json        # Project metadata & dependencies

```

## Explanation of Root-Level Files

- **node_modules/** - Stores all dependencies installed via npm install. This folder is auto-generated and should not be modified manually.
- **public/** - Reserved for static files if needed.
- **src/** - Contains the main source code of the backend (we'll detail this later).
- **.env** - Stores environment variables (e.g., database connection, API keys).
- **.env.sample** - A template for environment variables, useful for setting up new environments.
- **.gitignore** - Specifies files & folders that should not be committed to Git (e.g., node_modules, .env).
- **.prettierignore** - Specifies files ignored by Prettier formatting.
- **.prettierrc** - Configuration for Prettier, defining code formatting rules.
- **package-lock.json** - Auto-generated file that ensures consistent dependency versions across installations.
- **package.json** - Defines project dependencies, scripts, and metadata.

## Backend Dependencies Documentation

The backend of the OTT platform uses various npm packages to handle authentication, database interactions, file uploads, and other essential functionalities. Below is a breakdown of the installed dependencies and their purpose.

### Dependencies

| Package           | Version     | Purpose                                                                                 |
| ----------------- | ----------- | --------------------------------------------------------------------------------------- |
| **bcrypt**        | 5.1.1       | Hashes passwords for secure authentication.                                             |
| **cookie-parser** | 1.4.7       | Parses cookies attached to client requests.                                             |
| **cors**          | 2.8.5       | Enables Cross-Origin Resource Sharing (CORS) to allow frontend-backend communication.   |
| **dotenv**        | 16.4.7      | Loads environment variables from `.env` files.                                          |
| **express**       | 4.21.2      | Web framework for building the backend API.                                             |
| **jsonwebtoken**  | 9.0.2       | Handles JWT-based authentication for users.                                             |
| **mongodb**       | 6.12.0      | Official MongoDB driver to connect and interact with MongoDB.                           |
| **mongoose**      | 8.9.5       | ODM (Object Data Modeling) library for MongoDB, providing schema-based data validation. |
| **multer**        | 1.4.5-lts.1 | Middleware for handling file uploads (e.g., video thumbnails, user profile pictures).   |
| **nodemailer**    | 6.10.0      | Sends emails (e.g., for account verification, password reset).                          |
| **slugify**       | 1.6.6       | Converts text into URL-friendly slugs (e.g., `movie-title` for SEO-friendly URLs).      |

### Dev Dependencies

| Package      | Version | Purpose                                                                         |
| ------------ | ------- | ------------------------------------------------------------------------------- |
| **nodemon**  | 3.1.9   | Automatically restarts the server during development when changes are detected. |
| **prettier** | 3.4.2   | Code formatter to maintain consistent code style.                               |

---

# Source Code Structure

The main backend logic resides inside the `src` folder. Below is the structure and purpose of each subfolder:

```
/src
│── /configs         # Configuration files (database, environment settings)
│── /controllers     # Handles business logic and request processing
│── /middlewares     # Custom middleware for authentication, validation, etc.
│── /models         # Mongoose models for database interaction
│── /routes         # API route definitions
│── /utils          # Utility/helper functions
│── index.js        # Main entry point of the backend
```

## Folder & File Descriptions

- **/configs**
  - Stores configuration files, such as database connections and environment settings.
  - Example: `db.config.js` (MongoDB connection setup).
- **/controllers**
  - Contains business logic for handling API requests.
  - Example: `video.controller.js` handles video CRUD operations.
- **/middlewares**
  - Stores middleware functions for authentication, authorization, validation, etc.
  - Example: `auth.middleware.js` verifies JWT tokens for protected routes.
- **/models**
  - Defines Mongoose schemas and models for MongoDB collections.
  - Example: `user.model.js` defines the User schema.
- **/routes**
  - Defines API routes and maps them to corresponding controllers.
  - Example: `video.routes.js` maps video-related requests to video.controller.js.
- **/utils**
  - Contains helper functions such as email handling, slug generation, etc.
  - Example: `email.util.js` for sending emails via Nodemailer.
- **index.js**
  - The main entry point of the backend application.
  - Initializes the Express server, connects to MongoDB, and loads middleware/routes.

---

# Backend Configuration (`configs/`)

The `configs/` folder contains configuration files that manage essential backend settings such as app initialization, database connection, email handling, and server setup.

## Folder Structure

```
/src/configs
│── app.config.js         # Express app setup (CORS, middleware, routes)
│── database.config.js    # MongoDB connection configuration
│── email.config.js       # Nodemailer setup & email functions
│── server.config.js      # Server initialization & role creation (one-time)
```

### `app.config.js` - Express App Configuration

This file configures the Express application by:

- Setting up CORS to allow frontend-backend communication.
- Applying middlewares such as JSON parsing and cookie parsing.
- Importing and registering routes for different API endpoints.

Example functionalities:

- Initialize Express app
- Configure middleware (e.g., express.json(), cookie-parser)
- Setup CORS policy
- Register API routes

### `database.config.js` - MongoDB Configuration

This file contains an async function that establishes a connection to MongoDB using Mongoose. It exports this function for use in server.config.js.

- Uses process.env.MONGODB_URI to load the database connection string from environment variables.
- Connects to MongoDB using mongoose.connect().
- Handles database connection errors gracefully.

Example functionalities:

- Connect to MongoDB
- Handle connection errors
- Export the function for external use

### `email.config.js` - Email Configuration

This file configures Nodemailer for sending transactional emails. It exports functions that send emails for different features.

- SMTP configuration using nodemailer.createTransport().
- Sends password reset and email verification emails.
- Uses dynamic templates for sending different types of emails.

Example functionalities:

- Configure SMTP settings
- Send password reset emails
- Send email verification codes
- Export email functions for use in authentication features

### `server.config.js` - Server Initialization

This file initializes the Express server and connects to the database.

- Starts the server on a specified PORT from .env.
- Calls the database connection function from database.config.js.
- (One-time) Creates default user roles for the system.

`createDefaultRoles()` function (imported but commented after first run) initializes roles like Admin, User, etc.. Once the roles are created, it is commented out to prevent duplicate entries.

Example functionalities:

- Start the Express server
- Connect to MongoDB
- (One-time) Create default roles

---

# Backend Controllers (`controllers/`)

The `controllers/` folder contains all business logic for handling API requests. Each file is responsible for a specific model (Admin, Cast, Category, Genre, User, Video).

## Folder Structure

```
/src/controllers
│── admin.controller.js   # Admin authentication controller
│── cast.controller.js    # Cast management (fetch, create, update, delete)
│── category.controller.js # Category management (fetch, create, update, delete)
│── genre.controller.js   # Genre management (fetch, create, update, delete)
│── user.controller.js    # User authentication & profile management
│── video.controller.js   # Video management (CRUD, uploads, cast assignments)
```

### `admin.controller.js` - Admin Login

Handles authentication for admin users.

- Admin Login: Validates credentials and issues a JWT token.

### `cast.controller.js` - Cast Management

Handles API requests related to movie/series cast members.

- Fetch Cast List - Retrieves all cast members.
- Fetch Cast Details - Retrieves details of a specific cast member.

#### Admin Roles

- Create Cast - Adds a new cast member.
- Update Cast - Updates cast details.
- Delete Cast - Removes a cast member.

### `category.controller.js` - Category Management

Handles API requests for categories (e.g., Action, Comedy, Drama).

- Fetch All Categories
- Fetch Category Details
- Fetch Category by ID

#### Admin Roles

- Create Category
- Update Category
- Delete Category

### `genre.controller.js` - Genre Management

Handles API requests for genres (e.g., Thriller, Sci-Fi, Romance).

- Fetch All Genres
- Fetch Genre Details
- Fetch Genre by ID

#### Admin Roles

- Create Genre
- Update Genre
- Delete Genre

### `user.controller.js` - User Management & Authentication

Handles user authentication and profile management.

- Fetch User Profile
- Register - New user signup.
- Login - User authentication with JWT.
- Logout - Invalidate user session.
- Refresh Access Token - Generate new token after expiry.
- Forgot Password Request - Sends reset link to email.
- Forgot Password - Verifies reset token.
- Reset Password - Allows users to set a new password.
- Update User Profile - Modify user details (name, email, etc.).
- Update Avatar - Upload and change profile picture.

### `video.controller.js` - Video Management

Handles CRUD operations for videos.

- Fetch All Videos

#### Admin Roles

- Create Video - Adds a new video to the platform.
- Upload Video Thumbnail - Uploads and associates a thumbnail.
- Remove Video Thumbnail - Deletes thumbnail from storage.
- Upload Video - Uploads actual video file.
- Remove Video - Deletes a video file from storage.
- Update Video Details - Modifies video metadata.
- Delete Video - Removes a video from the database.
- Add Casts to Video - Links actors to a video.
- Remove Cast from Video - Unlinks an actor.
- Update Cast in Video - Modifies cast information.

---

# Backend Middlewares (`middlewares/`)

The `middlewares/` folder contains reusable logic that processes requests before they reach controllers.

## Folder Structure

```
/src/middlewares
│── auth.middleware.js    # Authentication & Authorization middleware
│── multer.middleware.js  # File upload middleware (for media files)
```

### `auth.middleware.js` - Authentication & Authorization

This middleware handles user authentication and role-based access control.

- Verify Authentication - Ensures the user is logged in using JWT.
- Check if User is Verified - Ensures the user has verified their email before accessing certain features.
- Check if User is an Admin - Grants access to admin-only routes.

#### How it Works:

Extracts JWT from headers.
Verifies token and extracts user details.
Checks if the user has required permissions.
Calls `next()` to proceed if validation passes, otherwise returns an error.

### `multer.middleware.js` - File Upload Handling

This middleware manages media file uploads using multer.

- Handles video & image uploads (e.g., thumbnails, profile pictures, videos).
- Restricts file types to prevent invalid formats.
- Stores files in a designated location (e.g., uploads/).

#### How it Works:

Uses `multer.diskStorage()` or `multer.memoryStorage()`.
Limits file size to prevent large uploads.
Defines accepted file formats (e.g., .jpg, .png, .mp4).
Calls next() after a successful upload, otherwise returns an error.

# Backend Models (`models/`)

The `models/` folder contains Mongoose schemas that define the structure of data stored in MongoDB. Each model represents a database collection.

## Folder Structure

```
/src/models
│── cast.model.js        # Defines the Cast schema
│── category.model.js    # Defines the Category schema
│── genre.model.js       # Defines the Genre schema
│── user-role.model.js   # Defines the User Role schema
│── user.model.js        # Defines the User schema
│── video.model.js       # Defines the Video schema
```

# Backend Routes (`routes/`)

The `routes/` folder contains API endpoints that map to controller functions. These define how different HTTP requests (GET, POST, PUT, DELETE) interact with the backend.

## Folder Structure

```
/src/routes
│── admin.routes.js      # Admin authentication (dashboard login)
│── cast.routes.js       # CRUD operations for Cast
│── category.routes.js   # CRUD operations for Categories
│── genre.routes.js      # CRUD operations for Genres
│── user.routes.js       # Authentication & Profile Management
│── video.routes.js      # CRUD operations for Videos
```

# Backend Utilities (utils/)

The `utils/` folder contains helper functions that handle error management, API responses, async operations, token generation, data creation, model fetching, and validation. These utilities keep the code clean, reusable, and maintainable.

## Folder Structure

```
/src/utils
│── apiError.js           # Handles custom API errors
│── apiResponse.js        # Standard API response handling
│── asyncHandler.js       # Handles async/await errors
│── createDate.js         # Helper for generating timestamps
│── generateToken.js      # Generates JWT and verification tokens
│── getModelByName.js     # Dynamically retrieves Mongoose models
│── validators.js         # Validation utilities for form data
```

---

# API Endpoints Documentation

## Base URL

`http://localhost:8000/api`

### **Hello World**

| Method | Endpoint | Description                    |
| ------ | -------- | ------------------------------ |
| GET    | `/`      | Returns "Hello World" response |

---

## **Admin Routes** (`/admin`)

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   | `/login` | Admin login |

---

## **Cast Routes** (`/casts`)

| Method | Endpoint | Description                 |
| ------ | -------- | --------------------------- |
| GET    | `/all`   | Fetch all cast members      |
| GET    | `/:id`   | Fetch cast details by ID    |
| POST   | `/`      | Create a new cast (Admin)   |
| PATCH  | `/:id`   | Update cast details (Admin) |
| DELETE | `/:id`   | Delete cast (Admin)         |

---

## **Category Routes** (`/category`)

| Method | Endpoint      | Description                     |
| ------ | ------------- | ------------------------------- |
| GET    | `/all`        | Fetch all categories            |
| GET    | `/slug/:slug` | Fetch category details by slug  |
| GET    | `/:id`        | Fetch category details by ID    |
| POST   | `/`           | Create a new category (Admin)   |
| PATCH  | `/:id`        | Update category details (Admin) |
| DELETE | `/:id`        | Delete category (Admin)         |

---

## **Genre Routes** (`/genre`)

| Method | Endpoint | Description                  |
| ------ | -------- | ---------------------------- |
| GET    | `/all`   | Fetch all genres             |
| GET    | `/:id`   | Fetch genre details by ID    |
| POST   | `/`      | Create a new genre (Admin)   |
| PATCH  | `/:id`   | Update genre details (Admin) |
| DELETE | `/:id`   | Delete genre (Admin)         |

---

## **User Routes** (`/users`)

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| GET    | `/get-user-profile`        | Fetch user profile            |
| POST   | `/register`                | User registration             |
| POST   | `/login`                   | User login                    |
| POST   | `/logout`                  | Logout user                   |
| POST   | `/refresh-access-token`    | Refresh access token          |
| POST   | `/forgot-password`         | Request password reset        |
| PATCH  | `/forgot-password-request` | Handle password reset request |
| PATCH  | `/reset-password`          | Reset password                |
| PATCH  | `/update-profile`          | Update user profile           |
| PATCH  | `/update-avatar`           | Update user avatar            |

---

## **Video Routes** (`/videos`)

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/`                     | Fetch all videos               |
| POST   | `/`                     | Create a new video (Admin)     |
| PATCH  | `/:id/thumbnail`        | Upload video thumbnail (Admin) |
| PATCH  | `/:id/thumbnail-remove` | Remove video thumbnail (Admin) |
| PATCH  | `/:id/video`            | Upload video file (Admin)      |
| PATCH  | `/:id/video-remove`     | Remove video file (Admin)      |
| PATCH  | `/:id/update`           | Update video details (Admin)   |
| DELETE | `/:id/delete`           | Delete video (Admin)           |
| PATCH  | `/:id/add-cast`         | Add cast to video (Admin)      |
| PATCH  | `/:id/remove-cast`      | Remove cast from video (Admin) |
| PATCH  | `/:id/update-cast`      | Update cast in video (Admin)   |

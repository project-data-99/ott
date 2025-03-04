# Project Overview

## Introduction

This document provides an overview of the OTT (Over-The-Top) platform built using the MERN stack (MongoDB, Express, React/Next.js, Node.js). The project enables users to stream videos, manage content, and provide role-based access to different functionalities.

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Express.js (Node.js)
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)

## Folder Structure

```
/ott-platform
│── /backend      # Express.js & MongoDB backend
│── /frontend     # Next.js frontend
```

## Features

### Admin Features

- Authentication & Authorization
- Manage videos (CRUD)
- Manage categories (CRUD)
- Manage genres (CRUD)
- Manage cast members (CRUD)

### User Features

- Register & Login
- Manage Profile
- Browse & Stream Videos

### Models

- **User** – Stores user information and roles
- **User-Role** – Defines different access levels (admin, user, etc.)
- **Video** – Stores video details (title, description, URL, etc.)
- **Category** – Organizes videos into different sections
- **Genre** – Further classifies videos by type
- **Cast** – Stores information about actors/directors

### Architecture

- **Frontend**: Next.js for server-side rendering (SSR) and client-side rendering (CSR)
- **Backend**: RESTful API using Express.js
- **Database**: MongoDB for storing all content and user data
- **Authentication**: JWT-based authentication and role-based access control

### API Overview

The backend exposes a set of RESTful APIs for managing users, videos, categories, genres, and more.

- **Auth API**: Login, Register, JWT Token Management
- **User API**: Profile Management
- **Admin API**: CRUD operations for videos, categories, genres, and cast

### Configuration

- Environment variables setup

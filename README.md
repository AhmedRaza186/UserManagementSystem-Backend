# User Management System - Backend

The robust backend for the User Management System, built with Node.js and Express. It handles authentication, data validation, and core user management logic.

## 🚀 Features
- **User Authentication**: Secure signup and login with password hashing.
- **Email OTP Verification**: Multi-step verification using Nodemailer and Resend.
- **OTP Security**: 1-minute resend window, 5-minute expiry, and a 3-attempt limit.
- **User CRUD**: Full Create, Read, Update, and Delete capabilities.
- **Advanced Querying**: Search (by name/email), limit, and sort (newest, oldest, age) users.
- **JWT Security**: Token-based session management.
- **Mongoose Integration**: Schema-based data modeling with MongoDB.

## 🛠️ Tech Stack
- **Node.js** & **Express**
- **MongoDB** (Mongoose)
- **JWT** (jsonwebtoken)
- **Bcrypt** (Password security)
- **Nodemailer** & **Resend** (Email services)

## 🌐 Related Repository
This backend is part of a full-stack system. Check out the frontend here:
👉 **[User Management System - Frontend](https://github.com/AhmedRaza186/UserManagementSystem)**

## ⚙️ Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file:
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `PORT`
- `RESEND_API_KEY`
- `EMAIL_USER` (for Nodemailer)
- `EMAIL_PASS` (for Nodemailer)

## 🏗️ Installation
1. Clone the repository.
2. Run `npm install`.
3. Set up your `.env` file.
4. Run `npm run start:dev` for development mode.

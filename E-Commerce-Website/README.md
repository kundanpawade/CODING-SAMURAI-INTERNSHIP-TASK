# E-Commerce Project

This project is a comprehensive e-commerce web application built to demonstrate the core functionalities of a modern online store. It is ideal for learning, experimentation, and as a foundation for more advanced e-commerce solutions.

## Introduction

The application provides a seamless shopping experience, allowing users to:
- Browse a catalog of products with images, descriptions, and prices
- Filter products by category
- View detailed information about each product
- Add products to a shopping cart
- Adjust quantities or remove items from the cart
- Authenticate (log in/log out) to manage their cart and checkout
- Proceed through a simple checkout process

### Technologies Used
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js (Express)
- **State Management:** React Context API
- **Database:** (You can specify here if you use SQLite, MongoDB, etc. — update as needed)

### Project Goals
- Provide a clear example of a full-stack e-commerce application
- Demonstrate best practices in React and Node.js development
- Offer a starting point for developers to build and customize their own online stores

### Who is this for?
- Developers and students looking to learn about full-stack web development
- Anyone interested in understanding the structure of an e-commerce platform
- Those who want a base project to extend with more advanced features (payment integration, order history, admin panel, etc.)

---

## Features
- Product listing
- Shopping cart
- User authentication
- Checkout flow

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
1. **Clone the repository**
2. **Install frontend dependencies**
   ```sh
   npm install
   ```
3. **Install backend dependencies**
   ```sh
   cd server
   npm install
   ```

### (Optional) Seed the Database
If you want to add sample data:
```sh
node seed.js
```

### Running the Application
1. **Start the backend server**
   ```sh
   cd server
   node index.js
   ```
2. **Start the frontend development server**
   Open a new terminal in the project root:
   ```sh
   npm run dev
   ```

### Usage
- Visit the frontend URL (usually http://localhost:5173)
- Browse products
- Click "Add to Cart" on any product to add it to your cart
- View and manage your cart
- Proceed to checkout

---

**Note:**
- The backend runs on http://localhost:5000
- The frontend runs on http://localhost:5173 (default Vite port)

---

### Project Preview

Feel free to customize and extend this project! 
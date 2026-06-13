# ShopEZ

ShopEZ is a MERN e-commerce project. It has login, product catalog, cart, checkout, order history, admin dashboard and MongoDB connection.

## Project Folders

```txt
ShopEZ
  server
    config
    controller
    middleware
    model
    routes
  client
    src
      components
      context
      pages
```

## Backend Setup

```bash
cd ShopEZ/server
npm install
```

Create `.env` inside the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopEZ
JWT_SECRET=shopez_secret_key
CLIENT_URL=http://localhost:5173
```

Then run:

```bash
npm run seed
npm run dev
```

## Frontend Setup

```bash
cd ShopEZ/client
npm install
```

Create `.env` inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000
```

Then run:

```bash
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

Backend URL:

```txt
http://localhost:5000
```

## Demo Login

Admin:

```txt
email: admin@shopez.com
password: admin123
```

User:

```txt
email: student@shopez.com
password: student123
```

## Features

- User registration and login
- JWT authentication
- Product catalog and product details
- Cart with quantity update
- Checkout page
- My orders page
- Admin dashboard
- Add, edit and delete products
- View orders and mark delivered
- MongoDB models for users, products and orders

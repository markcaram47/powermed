# PowerMed Backend Setup Guide

This guide will help you set up the MERN stack backend for PowerMed.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Backend Setup

### 1. Install Backend Dependencies

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```
MONGODB_URI=mongodb://localhost:27017/powermed
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/powermed

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# Start MongoDB service from Services
```

**MongoDB Atlas:**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string and update `MONGODB_URI` in `.env`

### 4. Run the Backend Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## Frontend Configuration

### 1. Update API URL (Optional)

If your backend is running on a different URL, create a `.env` file in the root `powermed` directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### 2. Start Frontend

```bash
# From the root powermed directory
npm start
```

## Creating the First Admin Account

### Option 1: Using API (Recommended for initial setup)

1. Start the backend server
2. Use Postman, curl, or any API client to register an admin:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@powermed.com",
    "password": "your_secure_password"
  }'
```

### Option 2: Using MongoDB directly

You can also create an admin directly in MongoDB. The password will need to be hashed using bcrypt.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin (remove in production)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin (requires auth)

### Categories
- `GET /api/categories` - Get all active categories (public)
- `GET /api/categories/all` - Get all categories including inactive (admin)
- `GET /api/categories/:slug` - Get category by slug (public)
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Products
- `GET /api/products` - Get all active products (public)
- `GET /api/products?category=categoryId` - Get products by category (public)
- `GET /api/products?categorySlug=slug` - Get products by category slug (public)
- `GET /api/products/all` - Get all products including inactive (admin)
- `GET /api/products/:slug` - Get product by slug (public)
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

## Admin Panel Access

1. Click on the PowerMed logo in the header of any page
2. You'll be redirected to `/admin/login`
3. Enter your admin credentials
4. After login, you'll be redirected to `/admin/dashboard`

## Database Models

### Admin
- `username` (String, unique, required)
- `email` (String, unique, required)
- `password` (String, hashed, required)

### Category
- `name` (String, required)
- `slug` (String, unique, required)
- `description` (String)
- `image` (String - URL or path)
- `backgroundImage` (String - URL or path)
- `displayOrder` (Number)
- `isActive` (Boolean, default: true)

### Product
- `name` (String, required)
- `category` (ObjectId, ref: Category, required)
- `slug` (String, unique, required)
- `description` (String)
- `dosage` (String)
- `price` (Number, required)
- `image` (String - URL or path)
- `images` (Array of Strings)
- `details` (String)
- `isActive` (Boolean, default: true)
- `displayOrder` (Number)

## Security Notes

1. **Remove `/api/auth/register` route in production** - Only allow admin creation through secure methods
2. **Change JWT_SECRET** - Use a strong, random secret in production
3. **Use HTTPS** - Always use HTTPS in production
4. **Environment Variables** - Never commit `.env` files to version control
5. **Password Strength** - Enforce strong passwords for admin accounts

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- Verify network connectivity if using MongoDB Atlas

### Port Already in Use
- Change `PORT` in `.env` to a different port
- Or stop the process using port 5000

### CORS Errors
- The backend is configured to allow CORS from the frontend
- If issues persist, check the `cors` configuration in `server.js`

## Next Steps

1. Seed initial categories and products
2. Implement image upload functionality (currently using URLs)
3. Add product search functionality
4. Add pagination for products
5. Implement admin role management (if multiple admins needed)


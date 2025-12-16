# Admin Panel Setup Guide

## Overview
The admin panel is a hidden feature accessible by clicking the PowerMed logo on the contact page. It provides product management functionality after authentication.

## Backend Setup

### 1. Create Admin User
Run the following command to create a default admin user:

```bash
cd backend
npm run seed:admin
```

Default credentials:
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Important:** Change the password after first login in production!

### 2. Environment Variables
Make sure your `.env` file includes:

```env
JWT_SECRET=your-secret-key-change-in-production
MONGODB_URI=your-mongodb-connection-string
PORT=5001
```

### 3. Start Backend Server
```bash
cd backend
npm run dev
```

## Frontend Setup

### 1. Environment Variables (Optional)
Create a `.env` file in the frontend directory if you need to change the API URL:

```env
REACT_APP_API_URL=http://localhost:5001/api
```

### 2. Start Frontend
```bash
cd frontend
npm start
```

## Accessing the Admin Panel

1. Navigate to the **Contact** page (`/contact`)
2. Click on the **PowerMed logo** in the header
3. The admin panel modal will open
4. Enter your admin credentials
5. Once logged in, you can manage products

## Features

### Authentication
- Secure login with JWT tokens
- Token stored in localStorage
- Auto-verification on panel open

### Product Management
- **View Products:** See all products in a table
- **Add Product:** Create new products with full details
- **Edit Product:** Update existing products
- **Delete Product:** Remove products (with confirmation)
- **Product Fields:**
  - Name (required)
  - Category (required)
  - Description
  - Price (required)
  - Stock
  - SKU
  - Main Image URL
  - Additional Images (comma-separated URLs)
  - Active/Inactive status
  - Featured flag

## API Endpoints

### Admin Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify admin token (protected)

### Products (Public)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Products (Admin Only - Protected)
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Security Notes

1. **JWT Secret:** Change the default JWT secret in production
2. **Password:** Change default admin password immediately
3. **HTTPS:** Use HTTPS in production
4. **CORS:** Configure CORS properly for production
5. **Rate Limiting:** Consider adding rate limiting for login endpoints

## Troubleshooting

### Can't log in?
- Check if admin user exists: `npm run seed:admin`
- Verify backend server is running
- Check browser console for errors
- Verify API URL in frontend `.env`

### Products not loading?
- Check backend server logs
- Verify MongoDB connection
- Check CORS configuration
- Verify token is stored in localStorage

### Token expired?
- Log out and log back in
- Token expires after 30 days


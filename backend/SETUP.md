# Backend Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create .env File

Create a `.env` file in the `backend/` directory with your MongoDB connection string:

```bash
# Create .env file
touch .env
```

Then add the following content to `.env`:

```env
# MongoDB Connection String
# Replace with your actual MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/powermed

# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/powermed?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

**Important:** 
- Replace `MONGODB_URI` with your actual MongoDB connection string
- For local MongoDB: `mongodb://localhost:27017/powermed`
- For MongoDB Atlas: Use the connection string from your Atlas dashboard

### 3. Start MongoDB

**Local MongoDB:**
```bash
brew services start mongodb-community
```

**MongoDB Atlas:**
- Already running in the cloud
- Just make sure your IP is whitelisted

### 4. Start the Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected successfully: localhost:27017
🚀 Server running on port 5000
📍 Environment: development
```

### 5. Test the Connection

Visit `http://localhost:5000/api/health` in your browser or use curl:

```bash
curl http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "healthy",
  "timestamp": "2024-...",
  "database": "connected"
}
```

## Troubleshooting

### "MongoDB connection error"
- Check if MongoDB is running: `brew services list | grep mongodb`
- Verify your connection string in `.env`
- For Atlas: Check IP whitelist and credentials

### "Port 5000 already in use"
- Change `PORT=5001` in `.env` file
- Or stop the process: `lsof -ti:5000 | xargs kill`

## Next Steps

Once the server is running and connected to MongoDB, you can:
1. Add models (Admin, Category, Product)
2. Create API routes
3. Add authentication
4. Seed the database


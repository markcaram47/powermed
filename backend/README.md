# PowerMed Backend Server

Express.js backend server with MongoDB connection for PowerMed application.

## Project Structure

```
backend/
├── config/
│   └── database.js      # MongoDB connection configuration
├── models/              # MongoDB models (to be added)
├── routes/              # API routes (to be added)
├── middleware/          # Express middleware (to be added)
├── server.js            # Express server entry point
├── package.json         # Backend dependencies
└── .env                 # Environment variables (create this)
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```env
# MongoDB Connection String
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/powermed

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/powermed?retryWrites=true&w=majority

# JWT Secret Key (use a strong random string in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

**Important:** Replace the `MONGODB_URI` with your actual MongoDB connection string.

### 3. Start MongoDB

**If using local MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Verify it's running
lsof -i :27017
```

**If using MongoDB Atlas:**
- Make sure your IP is whitelisted in Atlas
- Use the connection string from Atlas dashboard

### 4. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

### 5. Verify Connection

- Check the console for: `✅ MongoDB Connected successfully`
- Visit `http://localhost:5000` to see the API welcome message
- Visit `http://localhost:5000/api/health` for health check

## Available Scripts

- `npm start` - Start server in production mode
- `npm run dev` - Start server in development mode with auto-reload (nodemon)
- `npm run seed` - Seed the database (when seed script is added)

## API Endpoints

Currently available:
- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint

More endpoints will be added as routes are implemented.

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running: `brew services list | grep mongodb`
- Check your connection string in `.env`
- For Atlas: Verify IP whitelist and credentials

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using the port: `lsof -ti:5000 | xargs kill`

### Module Not Found
- Run `npm install` to install dependencies

## Next Steps

1. Create MongoDB models (Admin, Category, Product)
2. Implement API routes (auth, categories, products)
3. Add authentication middleware
4. Create database seeding script

See `MONGODB_SETUP.md` for detailed MongoDB setup instructions.

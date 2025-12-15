# MongoDB Setup Guide

## Option 1: Install and Run MongoDB Locally (Recommended for Development)

### Install MongoDB on macOS

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add MongoDB tap
brew tap mongodb/brew

# Install MongoDB Community Edition
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community
```

### Verify MongoDB is Running

```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Or check the port
lsof -i :27017
```

### Stop MongoDB (if needed)

```bash
brew services stop mongodb-community
```

---

## Option 2: Use MongoDB Atlas (Cloud - Free Tier Available)

MongoDB Atlas is a cloud database service with a free tier perfect for development.

### Steps:

1. **Sign up for MongoDB Atlas**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Choose "FREE" (M0) tier
   - Select a cloud provider and region
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP**
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `powermed` (or your preferred database name)

6. **Update .env File**
   ```bash
   cd backend
   # Create .env file if it doesn't exist
   echo "MONGODB_URI=your_connection_string_here" > .env
   echo "JWT_SECRET=your_secret_key_here" >> .env
   echo "PORT=5001" >> .env
   ```

   Example connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/powermed?retryWrites=true&w=majority
   ```

---

## Option 3: Use Docker (Alternative)

If you have Docker installed:

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Stop MongoDB
docker stop mongodb

# Start MongoDB
docker start mongodb
```

---

## After Setup

1. **Restart your backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Seed the database (creates admin account):**
   ```bash
   cd backend
   npm run seed
   ```

3. **Verify connection:**
   - Check the server console for "✅ MongoDB Connected successfully"
   - Try logging in with: `admin@powermed.com` / `admin123`

---

## Troubleshooting

### "Connection timeout" error
- Make sure MongoDB is running: `brew services list | grep mongodb`
- Check if port 27017 is in use: `lsof -i :27017`
- For Atlas: Verify your IP is whitelisted

### "Authentication failed" error
- Check your username and password in the connection string
- Verify database user has correct permissions

### "Network error" (Atlas)
- Check your internet connection
- Verify IP whitelist includes your current IP
- Try "Allow Access from Anywhere" for development

---

## Quick Start (Local MongoDB)

```bash
# 1. Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# 2. Start MongoDB
brew services start mongodb-community

# 3. Verify it's running
lsof -i :27017

# 4. Start backend (in another terminal)
cd backend
npm run dev

# 5. Seed database
npm run seed
```

That's it! Your MongoDB should now be running and ready to use.


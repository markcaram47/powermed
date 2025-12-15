# 🚀 PowerMed - Quick Start Guide

## Project Structure

```
powermed/
├── frontend/    # React app (runs on port 3000)
└── backend/     # Reserved for future backend implementation
```

## Start Frontend

Open a terminal and run:

```bash
cd frontend
npm install          # Only needed first time
npm start            # Start React app
```

Frontend will run on: `http://localhost:3000`

Open `http://localhost:3000` in your browser to view the application.

## Backend

The `backend/` folder is reserved for future implementation. Backend will be implemented when MongoDB is set up.

## Troubleshooting

### "Cannot find module" errors
Run `npm install` in the `frontend/` folder

### Port already in use
- Frontend uses port 3000
- React will automatically try the next available port (3001, 3002, etc.) if 3000 is in use

## Need Help?

See the README.md files in each folder for more details.

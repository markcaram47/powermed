# PowerMed - React Application

A React frontend application for PowerMed products.

**Note:** Backend implementation is planned for future development. The project structure is set up to accommodate a MERN stack when ready.

## Project Structure

```
powermed/
├── frontend/          # React frontend application
│   ├── src/          # React source files
│   ├── public/       # Public assets
│   └── package.json  # Frontend dependencies
│
├── backend/          # Express.js backend server
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Express middleware
│   └── package.json  # Backend dependencies
│
└── README.md         # This file
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start React development server
npm start
```

The frontend will run on `http://localhost:3000`

## Environment Variables

### Frontend (.env in `frontend/` folder - optional)

Currently not needed. Will be used when backend is implemented.

## Available Scripts

### Frontend

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Future Backend Implementation

The `backend/` folder is reserved for future implementation. When ready:

1. Set up MongoDB (local or Atlas)
2. Implement Express.js server
3. Create API routes for products and categories
4. Implement admin authentication

See `backend/README.md` for planned structure.

## Troubleshooting

### Port Already in Use
If port 3000 is in use, React will automatically try the next available port (3001, 3002, etc.)

### Module Not Found Errors
Run `npm install` in the `frontend/` directory to install dependencies.

## License

This project is part of the PowerMed application.

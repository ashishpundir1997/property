# Property Web Application

A full-stack real estate property management web application built with Python FastAPI backend and Next.js frontend.

## Project Structure

```
property-web/
├── backend/          # FastAPI Python backend
├── frontend/         # Next.js React frontend
└── README.md        # This file
```

## Prerequisites

- **Node.js** (v18+) - For frontend
- **Python** (v3.10+) - For backend
- **npm** or **yarn** - Package managers

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create a virtual environment (optional but recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the backend server
```bash
python -m uvicorn app.main:app --reload
```

The backend will start at `http://localhost:8000`

**API Documentation**: Visit `http://localhost:8000/docs` for interactive API documentation

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

The frontend will start at `http://localhost:3000`

## Running Both Servers

You can run both servers in separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then visit `http://localhost:3000` in your browser.

## Available Scripts

### Backend
- `python -m uvicorn app.main:app --reload` - Start development server with auto-reload

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technology Stack

**Backend:**
- FastAPI - Modern Python web framework
- Uvicorn - ASGI server

**Frontend:**
- Next.js 14 - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Lucide React - Icons

## Project Features

- Browse available properties
- View detailed property information
- Project portfolio showcase
- Admin dashboard
- Responsive design (mobile, tablet, desktop)
- Mock data integration

## Notes

- The frontend uses mock data by default (configured in `frontend/src/hooks/index.ts`)
- The backend provides mock JSON data from files in `backend/app/data/`
- All API endpoints are documented in the backend's Swagger UI at `/docs`

## Troubleshooting

**Port already in use?**
- Backend default: `http://localhost:8000` - Change with: `--port 8001`
- Frontend default: `http://localhost:3000` - Change with: `-p 3001`

**Module not found errors?**
- Backend: Run `pip install -r requirements.txt` again
- Frontend: Run `npm install` again

**Build errors?**
- Clear cache: `npm run clean` (if available)
- Rebuild: `npm run build`

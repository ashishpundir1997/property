from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .routers import properties, inquiries, projects

# Create FastAPI app
app = FastAPI(
    title="Real Estate Platform API",
    description="Modern real estate property listing platform API",
    version="1.0.0",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(properties.router)
app.include_router(inquiries.router)
app.include_router(projects.router)


@app.get("/")
def read_root():
    """API root endpoint"""
    return {
        "message": "Real Estate Platform API",
        "docs": "/docs",
        "openapi": "/openapi.json",
    }


@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok"}


# Error handlers
@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc)},
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

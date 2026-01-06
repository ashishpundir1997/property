from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from datetime import datetime

from ..models import Project, ProjectCreate, ProjectUpdate
from ..utils import load_json_file, save_json_file, get_next_id

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=dict)
def list_projects(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
):
    """
    List all portfolio projects with pagination.
    """
    projects = load_json_file("projects.json")

    # Pagination
    total = len(projects)
    start = (page - 1) * limit
    end = start + limit
    items = projects[start:end]

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
    }


@router.get("/{project_id}", response_model=Project)
def get_project(project_id: int):
    """Get a single project by ID"""
    projects = load_json_file("projects.json")
    for project in projects:
        if project["id"] == project_id:
            return project
    raise HTTPException(status_code=404, detail="Project not found")


@router.post("", response_model=Project)
def create_project(project: ProjectCreate):
    """Create a new project (admin endpoint)"""
    projects = load_json_file("projects.json")
    new_id = get_next_id(projects)

    new_project = {
        "id": new_id,
        **project.model_dump(),
        "created_at": datetime.now().isoformat(),
    }

    projects.append(new_project)
    save_json_file("projects.json", projects)

    return new_project


@router.put("/{project_id}", response_model=Project)
def update_project(project_id: int, project_update: ProjectUpdate):
    """Update a project (admin endpoint)"""
    projects = load_json_file("projects.json")

    for i, project in enumerate(projects):
        if project["id"] == project_id:
            update_data = project_update.model_dump(exclude_unset=True)
            projects[i].update(update_data)
            save_json_file("projects.json", projects)
            return projects[i]

    raise HTTPException(status_code=404, detail="Project not found")


@router.delete("/{project_id}")
def delete_project(project_id: int):
    """Delete a project (admin endpoint)"""
    projects = load_json_file("projects.json")

    for i, project in enumerate(projects):
        if project["id"] == project_id:
            projects.pop(i)
            save_json_file("projects.json", projects)
            return {"message": "Project deleted successfully"}

    raise HTTPException(status_code=404, detail="Project not found")

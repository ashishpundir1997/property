from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from datetime import datetime

from ..models import Inquiry, InquiryCreate, InquiryUpdate, InquiryStatusEnum
from ..utils import load_json_file, save_json_file, get_next_id

router = APIRouter(prefix="/api/inquiries", tags=["inquiries"])


@router.get("", response_model=dict)
def list_inquiries(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    status: Optional[str] = Query(None),
    property_id: Optional[int] = Query(None),
):
    """
    List all inquiries with pagination and filters.
    
    Filters:
    - status: NEW, CONTACTED, CLOSED
    - property_id: Filter by property ID
    """
    inquiries = load_json_file("inquiries.json")

    # Apply filters
    filtered = inquiries

    if status:
        filtered = [i for i in filtered if i["status"] == status]

    if property_id is not None:
        filtered = [i for i in filtered if i["property_id"] == property_id]

    # Pagination
    total = len(filtered)
    start = (page - 1) * limit
    end = start + limit
    items = filtered[start:end]

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
    }


@router.get("/{inquiry_id}", response_model=Inquiry)
def get_inquiry(inquiry_id: int):
    """Get a single inquiry by ID"""
    inquiries = load_json_file("inquiries.json")
    for inquiry in inquiries:
        if inquiry["id"] == inquiry_id:
            return inquiry
    raise HTTPException(status_code=404, detail="Inquiry not found")


@router.post("", response_model=Inquiry)
def create_inquiry(inquiry: InquiryCreate):
    """Create a new inquiry (public endpoint)"""
    inquiries = load_json_file("inquiries.json")
    new_id = get_next_id(inquiries)

    new_inquiry = {
        "id": new_id,
        **inquiry.model_dump(),
        "status": "NEW",
        "created_at": datetime.now().isoformat(),
    }

    inquiries.append(new_inquiry)
    save_json_file("inquiries.json", inquiries)

    return new_inquiry


@router.put("/{inquiry_id}", response_model=Inquiry)
def update_inquiry(inquiry_id: int, inquiry_update: InquiryUpdate):
    """Update an inquiry (admin endpoint)"""
    inquiries = load_json_file("inquiries.json")

    for i, inquiry in enumerate(inquiries):
        if inquiry["id"] == inquiry_id:
            update_data = inquiry_update.model_dump(exclude_unset=True)
            inquiries[i].update(update_data)
            save_json_file("inquiries.json", inquiries)
            return inquiries[i]

    raise HTTPException(status_code=404, detail="Inquiry not found")


@router.delete("/{inquiry_id}")
def delete_inquiry(inquiry_id: int):
    """Delete an inquiry (admin endpoint)"""
    inquiries = load_json_file("inquiries.json")

    for i, inquiry in enumerate(inquiries):
        if inquiry["id"] == inquiry_id:
            inquiries.pop(i)
            save_json_file("inquiries.json", inquiries)
            return {"message": "Inquiry deleted successfully"}

    raise HTTPException(status_code=404, detail="Inquiry not found")

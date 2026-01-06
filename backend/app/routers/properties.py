from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from datetime import datetime

from ..models import (
    Property,
    PropertyCreate,
    PropertyUpdate,
    PropertyStatusEnum,
    PropertyTypeEnum,
    PaginatedResponse,
)
from ..utils import load_json_file, save_json_file, get_next_id, parse_datetime

router = APIRouter(prefix="/api/properties", tags=["properties"])


@router.get("", response_model=dict)
def list_properties(
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=100),
    location: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    bedrooms: Optional[int] = Query(None, ge=0),
    property_type: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
):
    """
    List all properties with pagination and filters.
    
    Filters:
    - location: Filter by location (partial match)
    - min_price: Minimum price filter
    - max_price: Maximum price filter
    - bedrooms: Exact bedroom count
    - property_type: APARTMENT, HOUSE, VILLA, LAND, COMMERCIAL
    - status: AVAILABLE, SOLD, UNDER_CONTRACT
    """
    properties = load_json_file("properties.json")

    # Apply filters
    filtered = properties

    if location:
        filtered = [
            p for p in filtered if location.lower() in p["location"].lower()
        ]

    if min_price is not None:
        filtered = [p for p in filtered if p["price"] >= min_price]

    if max_price is not None:
        filtered = [p for p in filtered if p["price"] <= max_price]

    if bedrooms is not None:
        filtered = [p for p in filtered if p["bedrooms"] == bedrooms]

    if property_type:
        filtered = [p for p in filtered if p["property_type"] == property_type]

    if status:
        filtered = [p for p in filtered if p["status"] == status]

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


@router.get("/{property_id}", response_model=Property)
def get_property(property_id: int):
    """Get a single property by ID"""
    properties = load_json_file("properties.json")
    for prop in properties:
        if prop["id"] == property_id:
            return prop
    raise HTTPException(status_code=404, detail="Property not found")


@router.post("", response_model=Property)
def create_property(property: PropertyCreate):
    """Create a new property (admin endpoint)"""
    properties = load_json_file("properties.json")
    new_id = get_next_id(properties)

    new_property = {
        "id": new_id,
        **property.model_dump(),
        "created_at": datetime.now().isoformat(),
    }

    properties.append(new_property)
    save_json_file("properties.json", properties)

    return new_property


@router.put("/{property_id}", response_model=Property)
def update_property(property_id: int, property_update: PropertyUpdate):
    """Update a property (admin endpoint)"""
    properties = load_json_file("properties.json")

    for i, prop in enumerate(properties):
        if prop["id"] == property_id:
            update_data = property_update.model_dump(exclude_unset=True)
            properties[i].update(update_data)
            save_json_file("properties.json", properties)
            return properties[i]

    raise HTTPException(status_code=404, detail="Property not found")


@router.delete("/{property_id}")
def delete_property(property_id: int):
    """Delete a property (admin endpoint)"""
    properties = load_json_file("properties.json")

    for i, prop in enumerate(properties):
        if prop["id"] == property_id:
            properties.pop(i)
            save_json_file("properties.json", properties)
            return {"message": "Property deleted successfully"}

    raise HTTPException(status_code=404, detail="Property not found")

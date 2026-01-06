from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class PropertyTypeEnum(str, Enum):
    APARTMENT = "APARTMENT"
    HOUSE = "HOUSE"
    VILLA = "VILLA"
    LAND = "LAND"
    COMMERCIAL = "COMMERCIAL"


class PropertyStatusEnum(str, Enum):
    AVAILABLE = "AVAILABLE"
    SOLD = "SOLD"
    UNDER_CONTRACT = "UNDER_CONTRACT"


class InquiryStatusEnum(str, Enum):
    NEW = "NEW"
    CONTACTED = "CONTACTED"
    CLOSED = "CLOSED"


# Property Models
class PropertyBase(BaseModel):
    title: str
    description: str
    price: float
    location: str
    property_type: PropertyTypeEnum
    status: PropertyStatusEnum
    bedrooms: int
    bathrooms: int
    area: float
    images: List[str] = []


class PropertyCreate(PropertyBase):
    pass


class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    location: Optional[str] = None
    property_type: Optional[PropertyTypeEnum] = None
    status: Optional[PropertyStatusEnum] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    area: Optional[float] = None
    images: Optional[List[str]] = None


class Property(PropertyBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


# Inquiry Models
class InquiryBase(BaseModel):
    property_id: int
    customer_name: str
    email: str
    phone: str
    message: str


class InquiryCreate(InquiryBase):
    pass


class InquiryUpdate(BaseModel):
    status: Optional[InquiryStatusEnum] = None
    customer_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    message: Optional[str] = None


class Inquiry(InquiryBase):
    id: int
    status: InquiryStatusEnum
    created_at: datetime

    model_config = {"from_attributes": True}


# Project Models
class ProjectBase(BaseModel):
    title: str
    description: str
    location: str
    images: List[str] = []
    start_date: str
    end_date: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    images: Optional[List[str]] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None


class Project(ProjectBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


# Pagination Models
class PaginationParams(BaseModel):
    page: int = Field(default=1, ge=1)
    limit: int = Field(default=12, ge=1, le=100)


class PaginatedResponse(BaseModel):
    items: List[object]
    total: int
    page: int
    limit: int

    model_config = {"from_attributes": True}

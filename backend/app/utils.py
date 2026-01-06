import json
import os
from datetime import datetime
from typing import List, Optional, Dict, Any

# Get the data directory path
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")


def load_json_file(filename: str) -> List[Dict[str, Any]]:
    """Load data from JSON file"""
    filepath = os.path.join(DATA_DIR, filename)
    try:
        with open(filepath, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def save_json_file(filename: str, data: List[Dict[str, Any]]) -> None:
    """Save data to JSON file"""
    filepath = os.path.join(DATA_DIR, filename)
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(filepath, "w") as f:
        json.dump(data, f, indent=2)


def get_next_id(data: List[Dict[str, Any]]) -> int:
    """Get the next ID for a new record"""
    if not data:
        return 1
    return max(item.get("id", 0) for item in data) + 1


def parse_datetime(date_string: str) -> datetime:
    """Parse datetime string"""
    try:
        return datetime.fromisoformat(date_string.replace("Z", "+00:00"))
    except:
        return datetime.now()


def serialize_datetime(dt: datetime) -> str:
    """Serialize datetime to ISO format string"""
    return dt.isoformat()

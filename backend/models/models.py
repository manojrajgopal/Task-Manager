from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class Comment(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    content: str
    created_at: datetime = Field(default_factory=datetime.now)

class Task(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    completed: bool = False  # Add this field
    comments: List[Comment] = []
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
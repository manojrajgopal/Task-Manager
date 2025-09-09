from fastapi import APIRouter, HTTPException
from models.database import db
from models.models import Task, Comment
from bson import ObjectId
import datetime

router = APIRouter(prefix="/tasks/{task_id}/comments", tags=["Comments"])

@router.post("/", response_model=Task)
async def add_comment(task_id: str, comment: Comment):
    result = await db.tasks.update_one(
        {"_id": ObjectId(task_id)}, 
        {"$push": {"comments": comment.dict()}, "$set": {"updated_at": datetime.datetime.now()}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    updated_task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    updated_task["id"] = str(updated_task["_id"])
    return updated_task

@router.put("/{comment_id}", response_model=Task)
async def update_comment(task_id: str, comment_id: str, comment_data: dict):
    result = await db.tasks.update_one(
        {"_id": ObjectId(task_id), "comments.id": comment_id},
        {"$set": {"comments.$.content": comment_data["content"], "updated_at": datetime.datetime.now()}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Comment not found")
    updated_task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    updated_task["id"] = str(updated_task["_id"])
    return updated_task

@router.delete("/{comment_id}", response_model=Task)
async def delete_comment(task_id: str, comment_id: str):
    result = await db.tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$pull": {"comments": {"id": comment_id}}, "$set": {"updated_at": datetime.datetime.now()}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Comment not found")
    updated_task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    updated_task["id"] = str(updated_task["_id"])
    return updated_task

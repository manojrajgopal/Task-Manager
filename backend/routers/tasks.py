from fastapi import APIRouter, HTTPException
from models.database import db
from models.models import Task
from bson import ObjectId
from typing import List
import datetime

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/", response_model=List[Task])
async def get_tasks():
    tasks = await db.tasks.find().to_list(100)
    for task in tasks:
        task["id"] = str(task["_id"])
    return tasks

@router.post("/", response_model=Task)
async def create_task(task: Task):
    task_dict = task.dict()
    task_dict["created_at"] = datetime.datetime.now()
    task_dict["updated_at"] = datetime.datetime.now()
    result = await db.tasks.insert_one(task_dict)
    created_task = await db.tasks.find_one({"_id": result.inserted_id})
    created_task["id"] = str(created_task["_id"])
    return created_task

@router.put("/{task_id}", response_model=Task)
async def update_task(task_id: str, task: Task):
    task_dict = task.dict()
    task_dict["updated_at"] = datetime.datetime.now()
    result = await db.tasks.update_one({"_id": ObjectId(task_id)}, {"$set": task_dict})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    updated_task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    updated_task["id"] = str(updated_task["_id"])
    return updated_task

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    result = await db.tasks.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}

@router.patch("/{task_id}", response_model=Task)
async def partial_update_task(task_id: str, update_data: dict):
    update_fields = {f: v for f, v in update_data.items() if v is not None}
    if not update_fields:
        raise HTTPException(status_code=400, detail="No fields to update")
    update_fields["updated_at"] = datetime.datetime.now()
    result = await db.tasks.update_one({"_id": ObjectId(task_id)}, {"$set": update_fields})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    updated_task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    updated_task["id"] = str(updated_task["_id"])
    return updated_task

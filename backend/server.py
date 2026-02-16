import os
from datetime import datetime, timezone
from contextlib import asynccontextmanager
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")

client = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    # Create indexes
    await db.analytics.create_index("timestamp")
    await db.contacts.create_index("created_at")
    yield
    client.close()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: Optional[str] = ""
    message: str

class AnalyticsEvent(BaseModel):
    page: str
    referrer: Optional[str] = ""
    user_agent: Optional[str] = ""
    screen_width: Optional[int] = 0
    screen_height: Optional[int] = 0

# --- Health ---

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# --- Contact Form ---

@app.post("/api/contact")
async def submit_contact(msg: ContactMessage):
    doc = {
        "name": msg.name,
        "email": msg.email,
        "subject": msg.subject,
        "message": msg.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "read": False,
    }
    await db.contacts.insert_one(doc)
    return {"status": "success", "message": "Message sent successfully!"}

@app.get("/api/contacts")
async def get_contacts():
    cursor = db.contacts.find({}, {"_id": 0}).sort("created_at", -1).limit(50)
    contacts = await cursor.to_list(length=50)
    return {"contacts": contacts}

# --- Analytics ---

@app.post("/api/analytics/track")
async def track_visit(event: AnalyticsEvent):
    doc = {
        "page": event.page,
        "referrer": event.referrer,
        "user_agent": event.user_agent,
        "screen_width": event.screen_width,
        "screen_height": event.screen_height,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    await db.analytics.insert_one(doc)
    return {"status": "tracked"}

@app.get("/api/analytics/stats")
async def get_analytics():
    # Total visits
    total_visits = await db.analytics.count_documents({})

    # Today's visits
    today = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
    today_visits = await db.analytics.count_documents({"timestamp": {"$gte": today}})

    # Total messages
    total_messages = await db.contacts.count_documents({})
    unread_messages = await db.contacts.count_documents({"read": False})

    # Recent visits (last 20)
    cursor = db.analytics.find({}, {"_id": 0}).sort("timestamp", -1).limit(20)
    recent_visits = await cursor.to_list(length=20)

    # Top referrers
    pipeline = [
        {"$match": {"referrer": {"$ne": ""}}},
        {"$group": {"_id": "$referrer", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 5}
    ]
    referrers_cursor = db.analytics.aggregate(pipeline)
    top_referrers = []
    async for doc in referrers_cursor:
        top_referrers.append({"referrer": doc["_id"], "count": doc["count"]})

    # Device breakdown
    device_pipeline = [
        {"$addFields": {
            "device": {
                "$cond": [{"$lte": ["$screen_width", 768]}, "mobile",
                    {"$cond": [{"$lte": ["$screen_width", 1024]}, "tablet", "desktop"]}
                ]
            }
        }},
        {"$group": {"_id": "$device", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    device_cursor = db.analytics.aggregate(device_pipeline)
    devices = {}
    async for doc in device_cursor:
        devices[doc["_id"]] = doc["count"]

    return {
        "total_visits": total_visits,
        "today_visits": today_visits,
        "total_messages": total_messages,
        "unread_messages": unread_messages,
        "recent_visits": recent_visits,
        "top_referrers": top_referrers,
        "devices": devices,
    }

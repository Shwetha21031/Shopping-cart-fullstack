from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, Column, Integer, String,Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware


SQLALCHEMY_DATABASE_URL = "sqlite:///./products.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    price = Column(Float)
    description = Column(String)
    category = Column(String)
    image = Column(String)
    

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = engine.connect()



@app.get("/items/")
async def get_items():
    db = SessionLocal()
    db_item = db.query(Item).all()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.close()
    return db_item

# @app.put("/items/")
# async def update_item(item2:item2):
#     db = SessionLocal()
#     db_item = db.query(Item).filter(Item.id == item2.id).first()
#     if db_item is None:
#         raise HTTPException(status_code=404, detail="Item not found")
#     db_item.name = item2.name
#     db_item.description = item2.description
#     db.commit()
#     db.close()
#     return {"message": "Item updated successfully"}

# @app.post("/items/")
# async def post_item(item2:item2):
#     db = SessionLocal()
#     new_item = Item(id=item2.id, name=item2.name, description=item2.description)
#     db.add(new_item)
#     db.commit()
#     db.refresh(new_item)
#     db.close()
#     return {"message": "Item updated successfully"}

# @app.get("/items/{id}")
# async def get_item(id: int):
#     db = SessionLocal()
#     db_item = db.query(Item).filter(Item.id == id).first()
#     if db_item is None:
#         raise HTTPException(status_code=404, detail="Item not found")
#     db.close()
#     return {"id": db_item.id, "name": db_item.name, "description": db_item.description}

# @app.delete("/items/{id}")
# async def delete_item(id: int):
#     db = SessionLocal()
#     db_item = db.query(Item).filter(Item.id == id).first()
#     if db_item is None:
#         raise HTTPException(status_code=404, detail="Item not found")
#     db.delete(db_item)
#     db.commit()
#     db.close()
#     return {"message": "Item deleted successfully"}





    
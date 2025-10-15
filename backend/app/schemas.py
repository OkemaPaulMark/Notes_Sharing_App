from pydantic import BaseModel,EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr 
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr 
    class Config:
        orm_mode = True

class NoteCreate(BaseModel):
    title: str
    content: str

class NoteOut(BaseModel):
    id: int
    title: str
    content: str
    owner_id: int
    class Config:
        orm_mode = True

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from . import models, schemas, database, crud, auth

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Note Sharing App")

# ---------- CORS CONFIGURATION ----------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ---------------------------------------

# ---------- USER REGISTRATION ----------
@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(auth.get_db)):
    existing_user = db.query(models.User).filter(
        (models.User.username == user.username) | (models.User.email == user.email)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already taken")

    return crud.create_user(db=db, user=user)


# ---------- USER LOGIN ----------
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(auth.get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = auth.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

# ---------- LOGOUT ----------
@app.post("/logout")
def logout(current_user=Depends(auth.get_current_user)):
    # In a real app, you might blacklist the token here or handle sessions.
    return {"message": f"User '{current_user.username}' logged out successfully"}


# ---------- NOTES ----------
@app.post("/notes", response_model=schemas.NoteOut)
def create_note(note: schemas.NoteCreate, current_user=Depends(auth.get_current_user), db: Session = Depends(auth.get_db)):
    return crud.create_note(db=db, note=note, user_id=current_user.id)

@app.get("/notes", response_model=list[schemas.NoteOut])
def list_notes(current_user=Depends(auth.get_current_user), db: Session = Depends(auth.get_db)):
    return crud.get_user_notes(db=db, user_id=current_user.id)

@app.delete("/notes/{note_id}")
def delete_note(note_id: int, current_user=Depends(auth.get_current_user), db: Session = Depends(auth.get_db)):
    success = crud.delete_note(db=db, note_id=note_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Note not found or not owned by user")
    return {"message": "Note deleted successfully"}

@app.get("/users/me", response_model=schemas.UserOut)
def get_user_me(current_user=Depends(auth.get_current_user)):
    return current_user
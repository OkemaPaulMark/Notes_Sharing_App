import React, { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");

  //  Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username);
        } else if (res.status === 401) {
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [token]);

  //  Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else if (response.status === 401) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [token]);

  // Add note
  const addNote = async ({ title, content }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const newNote = await response.json();
        setNotes([newNote, ...notes]);
      } else {
        alert("Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setNotes(notes.filter((n) => n.id !== id));
      } else {
        alert("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = (note) => {
    const newContent = prompt("Edit note:", note.content);
    if (newContent !== null) {
      setNotes(notes.map((n) => (n.id === note.id ? { ...n, content: newContent } : n)));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return <div className="text-center mt-5">Loading notes...</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Welcome, {username ? username : "User"}</h3>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <NoteForm onSave={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
    </div>
  );
}

export default NotesPage;

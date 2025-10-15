import React from "react";

function NoteItem({ note, onDelete, onEdit }) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>{note.title}</h5>
        <p>{note.content}</p>
        <div className="d-flex justify-content-end">
          <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(note)}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(note.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;

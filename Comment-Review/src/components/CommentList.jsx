import React from 'react';

export default function CommentList({ comments, onDelete }) {
  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <ul className="comment-list list-group">
      {comments.map(c => (
        <li key={c.id} className="list-group-item position-relative">
          {c.text}
          <button
            className="delete-btn btn btn-sm btn-outline-danger"
            onClick={() => onDelete(c.id)}
            aria-label="Delete comment"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}

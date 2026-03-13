import React, { useState } from 'react';

export default function CommentForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ id: Date.now(), text: text.trim() });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form mb-3">
      <div className="mb-2">
        <textarea
          className="form-control"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={!text.trim()}>
        Add Comment
      </button>
    </form>
  );
}

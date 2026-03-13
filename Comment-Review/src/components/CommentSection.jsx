import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './CommentSection.css';

const STORAGE_KEY = 'commentReview.comments';

export default function CommentSection() {
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  function addComment(comment) {
    setComments(prev => [comment, ...prev]);
  }

  function deleteComment(id) {
    setComments(prev => prev.filter(c => c.id !== id));
  }

  return (
    <section className="comment-section">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center">Comments</h2>
          <CommentForm onAdd={addComment} />
          <CommentList comments={comments} onDelete={deleteComment} />
        </div>
      </div>
    </section>
  );
}

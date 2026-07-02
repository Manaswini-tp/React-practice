// src/components/CommentsPanel.tsx
import React, { useState } from 'react';
import { useDesignHubStore } from '../store';

interface CommentsPanelProps {
  fileId: string;
}

const CommentsPanel: React.FC<CommentsPanelProps> = ({ fileId }) => {
  const comments = useDesignHubStore((state) => state.getCommentsByFile(fileId));
  const addComment = useDesignHubStore((state) => state.addComment);
  const user = useDesignHubStore((state) => state.user);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim() && user) {
      addComment({
        id: Date.now().toString(),
        fileId,
        author: user.name,
        text: commentText.trim(),
      });
      setCommentText('');
    }
  };

  return (
    <div>
      <h4>Comments ({comments.length})</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {comments.map((comment) => (
          <li
            key={comment.id}
            style={{
              padding: '8px',
              marginBottom: '8px',
              backgroundColor: '#fff3e0',
              borderRadius: '4px',
            }}
          >
            <strong>{comment.author}</strong>: {comment.text}
          </li>
        ))}
      </ul>
      {user ? (
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={handleAddComment}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Post
          </button>
        </div>
      ) : (
        <p style={{ color: '#999' }}>Login to add comments</p>
      )}
    </div>
  );
};

export default CommentsPanel;

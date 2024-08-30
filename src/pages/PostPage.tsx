import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getCommentsByPostId } from '../services/api';
import { Post, Comment } from '../models';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getPostById(id!).then(response => setPost(response.data));
    getCommentsByPostId(id!).then(response => setComments(response.data.data));
  }, [id]);

  return (
    <div>
      {post && (
        <>
          <img src={post.image} alt={post.text} />
          <h3>{post.text}</h3>
          <p>By {post.owner.firstName} {post.owner.lastName}</p>
          <div>
            {post.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </>
      )}
      <div>
        <h4>Comments:</h4>
        {comments.map(comment => (
          <p key={comment.id}>{comment.message}</p>
        ))}
      </div>
    </div>
  );
};

export default PostPage;

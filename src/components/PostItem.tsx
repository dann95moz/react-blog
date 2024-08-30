import React from 'react';
import { PostPreview } from '../models';

const PostItem: React.FC<{ post: PostPreview }> = ({ post }) => {
  return (
    <div>
      <img src={post.image} alt={post.text} />
      <h3>{post.text}</h3>
      <p>By {post.owner.firstName} {post.owner.lastName}</p>
      <div>
        {post.tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default PostItem;

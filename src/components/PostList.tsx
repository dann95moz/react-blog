import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid2 } from '@mui/material';
import { getPosts } from '../services/api';
import { PostPreview } from '../models';

interface PostListProps {
  selectedTag: string | null;
}

const PostList: React.FC<PostListProps> = ({ selectedTag }) => {
  const [posts, setPosts] = useState<PostPreview[]>([]);

  useEffect(() => {
    getPosts().then(response => {
      const filteredPosts = selectedTag
        ? response.data.data.filter(post => post.tags.includes(selectedTag))
        : response.data.data;
      setPosts(filteredPosts);
    });
  }, [selectedTag]);

  return (
    <Grid2 container justifyContent='space-between'>
      {posts.map(post => (
        <Grid2 key={post.id} >
          <Card sx={{width:250, height:350}} >
            <CardMedia
              component="img"
              height="140"
              image={post.image}
              alt={post.text}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {post.text}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by {post.owner.firstName} {post.owner.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.tags.join(', ')}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default PostList;

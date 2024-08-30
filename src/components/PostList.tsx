import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid2, CardActions, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { getCommentsByPostId, getPosts } from '../services/api';
import { Comment, PostPreview } from '../models';

interface PostListProps {
  selectedTag: string | null;
}

const PostList: React.FC<PostListProps> = ({ selectedTag }) => {
  const [posts, setPosts] = useState<PostPreview[]>([]);
const [isModalOpened, setIsModalOpened] = useState(false)
const [selectedPost, setSelectedPost] = useState<null| PostPreview>(null)
const [comments, setComments] = useState<Comment[]| null>(null)
  useEffect(() => {
    getPosts().then(response => {
      const filteredPosts = selectedTag
        ? response.data.data.filter(post => post.tags.includes(selectedTag))
        : response.data.data;
      setPosts(filteredPosts);
    });
  }, [selectedTag]);

  useEffect(() => {
  if (selectedPost) {
    getCommentsByPostId(selectedPost.id).then(response => {
      setComments(response.data.data)
    })
  }
  }, [selectedPost])
  

const handleOpenComments = (post:PostPreview) => {
  setSelectedPost(post)
  setIsModalOpened(true)
}




 
  return (
    <Grid2 container gap={2} size={12}>
      {posts.map((post) => (
        <Grid2 key={post.id}>
          <Card sx={{ width: 250 , minHeight:300}}>
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
            <CardActions >
        <Button onClick={()=>handleOpenComments(post)}>See comments</Button>
            </CardActions>
        
          </Card>
        
        </Grid2>
        
      ))}
      {selectedPost && <Dialog onClose={()=>setIsModalOpened(false)} open={isModalOpened}>
      <DialogTitle>{selectedPost.text}</DialogTitle>
      <DialogContent>
          {comments&&comments.map((comment)=>(
            <Typography component='h5' key={comment.id}>{comment.message}</Typography>
          ))}
      </DialogContent>
    </Dialog>}
    </Grid2>
  );
};

export default PostList;

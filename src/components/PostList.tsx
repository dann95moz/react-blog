import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid2, Collapse, IconButton, IconButtonProps, styled, CardActions } from '@mui/material';
import { getPosts } from '../services/api';
import { PostPreview } from '../models';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface PostListProps {
  selectedTag: string | null;
}

const PostList: React.FC<PostListProps> = ({ selectedTag }) => {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    getPosts().then(response => {
      const filteredPosts = selectedTag
        ? response.data.data.filter(post => post.tags.includes(selectedTag))
        : response.data.data;
      setPosts(filteredPosts);
    });
  }, [selectedTag]);

  const handleExpandClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));

  return (
    <Grid2 container gap={2} size={12}>
      {posts.map((post, index) => (
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
            <CardActions disableSpacing>
              <ExpandMore
                expand={expandedIndex === index}
                onClick={() => handleExpandClick(index)}
                aria-expanded={expandedIndex === index}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                <Typography>
                  
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default PostList;

import React, { ChangeEvent, useEffect, useState }  from 'react';
import { Card, CardContent,  Button, Typography,  Container, AppBar, Toolbar, Grid2, TextField, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import PostList from '../components/PostList';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTags } from '../services/api';
const HomePage: React.FC = () => {

const [selectedTag, setSelectedTag] = useState<string|null>(null)
const [tags, setTags] = useState<string[]|null>(null)

const filterTags = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedTag(e.target.value)
}
useEffect(() => {
  getTags().then(response => setTags(response.data.data.filter((tag)=>tag && tag.trim())));
}, []);
const onTagSelect = (tag:string) => {
  setSelectedTag(tag)
}

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Blog Home
          </Typography>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </Toolbar>
      </AppBar>

      <Grid2 container spacing={3} sx={{ mt: 3 }}>
        <Grid2 size={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Tags
              </Typography>
              <Grid2 container spacing={1} sx={{ mt: 2 }} size={12}>
              <TextField id="outlined-basic" label="Filter by tag" variant="outlined" onChange={filterTags} fullWidth/>
              </Grid2>
              <Grid2>
              <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Ver todos los tags
        </AccordionSummary>
        <AccordionDetails>
        {tags && tags.map(tag => (
        <Button variant='outlined' key={tag} onClick={() => onTagSelect(tag)}>
          {tag}
        </Button>
      ))}
        </AccordionDetails>
      </Accordion>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Posts
              </Typography>
              <PostList selectedTag={selectedTag} />
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default HomePage;

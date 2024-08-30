import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import { UserPreview } from '../models';
import { GoogleLogin} from '@react-oauth/google';
import { Container, Typography, Card, CardMedia, CardContent, Grid2, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserPreview[]>([]);
  const { isAuthenticated, user, login, logout } = useAuth();
  useEffect(() => {
    getUsers().then(response => setUsers(response.data.data));
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      getUsers().then(response => setUsers(response.data.data));
    }
  }, [isAuthenticated]);
  
  return (
   
    <div>
   <Container>
      {!isAuthenticated ? (
        <GoogleLogin
          onSuccess={login}
          onError={() => console.log('Login failed')}
        />
      ) : (
        <>
          <Button variant="outlined" onClick={logout} sx={{ mb: 2 }}>
            Logout
          </Button>
          <Typography variant="h4" component="h1" gutterBottom>
            Users
          </Typography>
          <Grid2 container spacing={3}>
            {users.map(user => (
              <Grid2  key={user.id} size={12} >
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={user.picture}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </>
      )}
    </Container>
      <h1>Users</h1>
      <div>
        {users.map(user => (
          <div key={user.id}>
            <img src={user.picture} alt={user.firstName} />
            <p>{user.firstName} {user.lastName}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default UsersPage;

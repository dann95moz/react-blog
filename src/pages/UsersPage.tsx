import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import { UserPreview } from '../models';
import { GoogleOAuthProvider } from '@react-oauth/google';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserPreview[]>([]);

  useEffect(() => {
    getUsers().then(response => setUsers(response.data.data));
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}>
    <div>
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
    </GoogleOAuthProvider>
  );
};

export default UsersPage;

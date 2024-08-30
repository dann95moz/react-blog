import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import { UserPreview } from '../models';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserPreview[]>([]);

  useEffect(() => {
    getUsers().then(response => setUsers(response.data.data));
  }, []);

  return (
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
  );
};

export default UsersPage;

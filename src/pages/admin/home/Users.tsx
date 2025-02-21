import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import toast from 'react-hot-toast';

interface User {
  uid: string;
  fullName: string;
  email: string;
  photoURL?: string;
}

interface UsersProps {
  handleUserClick: (user: User) => void;
}

const Users: React.FC<UsersProps> = ({ handleUserClick }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user ID from localStorage
  useEffect(() => {
    const CurrentUser = localStorage.getItem('currentUser');
    if (CurrentUser) {
      const parsedUser = JSON.parse(CurrentUser);
      const UserUID = parsedUser.uid;
      setUserId(UserUID);
    }
  }, []);

  // Fetch users after userId is set
  useEffect(() => {
    if (!userId) return; // Ensure userId is available before fetching users

    const fetchUsers = async () => {
      try {
        setLoading(true); // Set loading before fetching users
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        const fetchedUsers = querySnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        })) as User[];

        // Filter out the current user
        const filteredUsers = fetchedUsers.filter(user => user.uid !== userId);

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.uid}
            onClick={() => handleUserClick(user)}
            className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.fullName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;


import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

interface User {
  uid: string;
  fullName: string;
  email: string;
  photoURL?: string;
  lastLogin: string;
  lastMessage?: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  // Fetch all users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('lastLogin', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedUsers = querySnapshot.docs
          .map(doc => ({
            uid: doc.id,
            ...doc.data(),
          }))
          .filter(user => user.uid !== currentUser.uid) as User[]; // Exclude current user

        setUsers(fetchedUsers);
        if (fetchedUsers.length > 0) {
          setSelectedUser(fetchedUsers[0]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser.uid]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex mt-16">
      {/* Left sidebar - User list */}
      <div className="w-1/4 border-r border-gray-300 bg-white overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div
              key={user.uid}
              onClick={() => setSelectedUser(user)}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                selectedUser?.uid === user.uid ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.fullName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.fullName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.lastMessage || 'No messages yet'}
                  </p>
                </div>
                {user.lastLogin && (
                  <span className="text-xs text-gray-500">
                    {new Date(user.lastLogin).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Chat area */}
      <div className="w-3/4 flex flex-col bg-gray-50">
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="p-4 bg-white border-b border-gray-300 flex items-center space-x-4">
              {selectedUser.photoURL ? (
                <img
                  src={selectedUser.photoURL}
                  alt={selectedUser.fullName}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  {selectedUser.fullName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedUser.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedUser.email}
                </p>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Messages will be implemented in the next step */}
              <div className="text-center text-gray-500 mt-4">
                No messages yet. Start a conversation!
              </div>
            </div>

            {/* Message input */}
            <div className="p-4 bg-white border-t border-gray-300">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
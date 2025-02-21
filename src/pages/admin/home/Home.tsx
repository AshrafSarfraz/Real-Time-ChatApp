import React, { useState } from 'react';
import Users from './Users';
import ChatScreen from './ChatScreen';

interface User {
  uid: string;
  fullName: string;
  email: string;
  photoURL?: string;
}

const Home = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClickInHome = (user: User) => {
    console.log('User details in Home:', user);
    setSelectedUser(user);
  };

  return (
    <div className="h-[calc(100vh-4rem)] mt-16 flex">
      {/* Left Box - 25% width */}
      <div className="w-1/4 h-full bg-white border-r border-gray-200">
        <Users handleUserClick={handleUserClickInHome} />
      </div>

      {/* Right Box - 75% width */}
      <div className="w-3/4 h-full bg-gray-50">
        {selectedUser && <ChatScreen selectedUser={selectedUser} />}
      </div>
    </div>
  );
};

export default Home;

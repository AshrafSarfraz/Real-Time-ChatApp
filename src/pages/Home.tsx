import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
}

interface Message {
  id: number;
  sender: string;
  message: string;
  time: string;
}

// Update the MessagesByUser interface to use a string index signature
interface MessagesByUser {
  [key: string]: Message[];
}

// Dummy data for users
const dummyUsers: User[] = [
  { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM' },
  { id: 2, name: 'Jane Smith', lastMessage: 'See you tomorrow!', time: '9:45 AM' },
  { id: 3, name: 'Mike Johnson', lastMessage: 'Thanks!', time: 'Yesterday' },
  // Add more users as needed
];

// Update the object keys to be strings
const dummyMessagesByUser: MessagesByUser = {
  '1': [
    { id: 1, sender: 'John Doe', message: 'Hey, how are you?', time: '10:30 AM' },
    { id: 2, sender: 'You', message: 'I\'m good, thanks! How about you?', time: '10:31 AM' },
    { id: 3, sender: 'John Doe', message: 'Doing great! Any plans for the weekend?', time: '10:32 AM' },
  ],
  '2': [
    { id: 1, sender: 'Jane Smith', message: 'Did you finish the project?', time: '9:30 AM' },
    { id: 2, sender: 'You', message: 'Yes, just submitted it!', time: '9:40 AM' },
    { id: 3, sender: 'Jane Smith', message: 'See you tomorrow!', time: '9:45 AM' },
  ],
  '3': [
    { id: 1, sender: 'Mike Johnson', message: 'Meeting at 3?', time: 'Yesterday' },
    { id: 2, sender: 'You', message: 'Sure, works for me', time: 'Yesterday' },
    { id: 3, sender: 'Mike Johnson', message: 'Thanks!', time: 'Yesterday' },
  ],
};

const Home = () => {
  const [selectedUser, setSelectedUser] = useState<User>(dummyUsers[0]);
  
  return (
    <div className="h-screen flex mt-16">
      {/* Left sidebar - Users list */}
      <div className="w-1/5 border-r border-gray-300 bg-white overflow-y-auto">
        <div className="p-4 bg-gray-100">
          <h2 className="text-xl font-semibold">Chats</h2>
        </div>
        {/* Users list */}
        <div className="divide-y">
          {dummyUsers.map((user) => (
            <div 
              key={user.id} 
              className={`p-4 hover:bg-gray-100 cursor-pointer ${
                selectedUser.id === user.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">{user.name}</h3>
                <span className="text-sm text-gray-500">{user.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Chat area */}
      <div className="w-4/5 flex flex-col bg-gray-50">
        {/* Chat header */}
        <div className="p-4 bg-white border-b border-gray-300">
          <h2 className="font-semibold">{selectedUser.name}</h2>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {dummyMessagesByUser[selectedUser.id.toString()].map((message: Message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'You'
                    ? 'bg-green-100'
                    : 'bg-white'
                }`}
              >
                <p>{message.message}</p>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="p-4 bg-white border-t border-gray-300">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
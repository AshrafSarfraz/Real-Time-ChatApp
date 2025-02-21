import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/config';

interface User {
  uid: string;
  fullName: string;
  email: string;
  photoURL?: string;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: any;
}

interface ChatScreenProps {
  selectedUser: User | null;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ selectedUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    if (!selectedUser?.uid || !currentUser?.uid) {
      setMessages([]); // Clear messages when no user is selected
      return;
    }

    const chatRoomId = generateChatRoomId(currentUser.uid, selectedUser.uid);
    const messagesRef = collection(db, 'chatRooms', chatRoomId, 'messages');

    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
    });

    return () => {
      unsubscribe();
      setMessages([]); // Clear messages on user switch
    };
  }, [selectedUser, currentUser.uid]); // ✅ Fix: Dependency array theek ki

  const generateChatRoomId = (user1Id: string, user2Id: string): string => {
    return [user1Id, user2Id].sort().join('_'); // ✅ Ensure consistent chat room ID
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser?.uid) return;

    try {
      const chatRoomId = generateChatRoomId(currentUser.uid, selectedUser.uid);
      const messagesRef = collection(db, 'chatRooms', chatRoomId, 'messages');

      await addDoc(messagesRef, {
        text: newMessage,
        senderId: currentUser.uid,
        receiverId: selectedUser.uid,
        timestamp: serverTimestamp(),
      });

      setNewMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-gray-100 p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold">
          {selectedUser ? `Chat with ${selectedUser.fullName}` : 'Select a user'}
        </h2>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded-lg ${
              message.senderId === currentUser.uid ? 'bg-blue-100 ml-auto text-right' : 'bg-gray-200 mr-auto'
            }`}
          >
            <div className="text-xs text-gray-600">
              {message.senderId === currentUser.uid ? 'You' : selectedUser?.fullName}
            </div>
            <div>{message.text}</div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      {selectedUser && (
        <div className="p-4 border-t border-gray-300">
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;

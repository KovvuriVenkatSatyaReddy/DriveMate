import React, { useState } from 'react';
import SearchBar from './SearchBar';
import UserList from './UserList';
import ChatBox from './ChatBox';
import ChatWindow from './ChatHistory';

function Chat() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([{
    fromSelf:false,
    text: "Hello", 
    timestamp: "3:26PM",
  }]);

  // Sample user data (This can be fetched from an API)
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@institute.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@institute.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@institute.com' },
  ];

  // Filtered users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle message sending
  const sendMessage = (messageText) => {
    // Get the current timestamp
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    // Update chat history with the new message, including the timestamp
    setChatHistory([
      ...chatHistory, 
      { 
        fromSelf: true, 
        text: messageText, 
        timestamp: timestamp 
      }
    ]);
  };
  

  return (
    <div className="p-6 flex space-x-4">
      <div className="w-1/3">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <UserList users={filteredUsers} selectUser={setSelectedUser} />
      </div>
      <div className="w-2/3 bg-white shadow-lg rounded-lg">
        {selectedUser ? (
          <>
            <ChatWindow chatHistory={chatHistory} />
            <ChatBox selectedUser={selectedUser} sendMessage={sendMessage} />
          </>
        ) : (
          <div className="p-6 text-gray-500">Select a user to start chatting.</div>
        )}
      </div>
    </div>
  );
}

export default Chat;

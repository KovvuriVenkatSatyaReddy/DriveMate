import React, { useState } from 'react';

function ChatBox({ selectedUser, sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex">
        <input
          type="text"
          placeholder={`Message ${selectedUser.name}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;

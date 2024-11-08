import React from 'react';
import IncomingMessageBubble from './IncomingMessageBubble';
import OutgoingMessageBubble from './OutgoingMessageBubble';

function ChatWindow({ chatHistory }) {
  return (
    <div className="p-4 h-64 overflow-y-auto">
      {chatHistory.length > 0 ? (
        chatHistory.map((message, index) => (
          message.fromSelf ? (
            <OutgoingMessageBubble key={index} message={message} />
          ) : (
            <IncomingMessageBubble key={index} message={message} />
          )
        ))
      ) : (
        <div className="text-gray-500 text-center">No messages yet. Start the conversation!</div>
      )}
    </div>
  );
}

export default ChatWindow;

import React from 'react';

const OutgoingMessageBubble = ({ message }) => {
  return (
    <div className="flex justify-end mb-4">
      {/* Message bubble */}
      <div className="max-w-xs bg-blue-500 text-white p-3 rounded-lg shadow-sm">
        <p className="text-sm">{message.text}</p>
        <span className="text-xs text-blue-200 mt-1 block text-right">{message.timestamp}</span>
      </div>
    </div>
  );
};

export default OutgoingMessageBubble;

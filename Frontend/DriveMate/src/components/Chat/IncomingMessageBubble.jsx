import React from 'react';

const IncomingMessageBubble = ({ message }) => {
  return (
    <div className="flex items-end space-x-2 mb-4">
      {/* Profile Picture Placeholder */}
      <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full"></div>

      {/* Message bubble */}
      <div className="max-w-xs bg-gray-100 text-gray-900 p-3 rounded-lg shadow-sm">
        <p className="text-sm">{message.text}</p>
        <span className="text-xs text-gray-500 mt-1 block">{message.timestamp}</span>
      </div>
    </div>
  );
};

export default IncomingMessageBubble;

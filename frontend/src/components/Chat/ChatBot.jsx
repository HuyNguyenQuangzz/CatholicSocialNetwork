import React, { useState } from 'react';

const ChatBox = ({ chatGPTApi }) => {
  const [message, setMessage] = useState('');

  // Function to send a message to the Chat GPT API and display the response
  const sendMessage = async () => {
    const response = await chatGPTApi(message);
    setMessage('');
    // Display the response
    console.log(`Chat GPT: ${response}`);
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
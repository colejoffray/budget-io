import React, { useState } from 'react';

function FlashMessages() {
  const [flashMessages, setFlashMessages] = useState([]);

  // Function to handle receiving flash messages
  const receiveFlashMessages = (messages) => {
    setFlashMessages(messages);
  };

  return (
    <div>
      {flashMessages.map((message, index) => (
        <div key={index} className="flash-message">
          {message}
        </div>
      ))}
    </div>
  );
}

export default FlashMessages;
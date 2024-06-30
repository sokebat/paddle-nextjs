'use client'
import React, { useState } from 'react';

const YourComponent = () => {
  const [responseMessage, setResponseMessage] = useState('');

  const callWebhookApi = async () => {
    try {
      const response = await fetch('/api/paddle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Paddle-Signature': 'your-paddle-signature',  
        },
        body: JSON.stringify({
          // Example payload
          event_type: 'subscription.created',
          // Add other required fields here
        }),
      });

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error('Error calling webhook API:', error);
      setResponseMessage('Error calling API');
    }
  };

  return (
    <div>
      <button onClick={callWebhookApi}>Call Webhook API</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default YourComponent;

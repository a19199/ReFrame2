// pages/test-order.js
import { useState } from 'react';

export default function TestOrder() {
  const [message, setMessage] = useState('');

  const handleTestSubmit = async () => {
    const res = await fetch('/api/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        frame: 'White',
        image: 'https://via.placeholder.com/300x400.png?text=Test+Image',
      }),
    });

    const result = await res.json();
    setMessage(result.message || result.error || 'Unknown response');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Submit Test Order</h1>
      <button
        onClick={handleTestSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Send Test Order
      </button>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
}

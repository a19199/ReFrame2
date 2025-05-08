// pages/order.js
import { useState } from 'react';
import Head from 'next/head';

export default function OrderPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [frame, setFrame] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('frame', frame);
    formData.append('photo', image);

    setLoading(true);

    const res = await fetch('/api/submit-order', {
      method: 'POST',
      body: formData
    });

    setLoading(false);
    setSuccess(res.ok);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <Head>
        <title>Place Your Order - ReFrame</title>
      </Head>
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full p-2 border rounded"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            className="w-full p-2 border rounded"
            value={frame}
            onChange={(e) => setFrame(e.target.value)}
            required
          >
            <option value="">Select Frame</option>
            <option value="natural">Natural</option>
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
          <input
            className="w-full"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Order'}
          </button>
          {success && <p className="text-green-600">Order submitted successfully!</p>}
        </form>
      </div>
    </div>
  );
}

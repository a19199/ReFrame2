import { useState } from 'react';
import Head from 'next/head';

export default function OrderPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [frame, setFrame] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !frame || !name || !email) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const res = await fetch(
        'https://script.google.com/macros/s/AKfycbwqs4_JPLxFoH7slCPkB-YGypSikApDpZR9aj6w279qWWwQxwN1zkRwuUjf_y9-7JHv/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            frame,
            image: base64Image,
            address: '', // optional
          }),
        }
      );

      setLoading(false);
      setSuccess(res.ok);
    };

    reader.readAsDataURL(image);
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
            <option value="Natural">Natural</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
          </select>
          <input
            className="w-full"
            type="file"
            accept="image/*"
            onChange={handleImage}
            required
          />
          {preview && <img src={preview} alt="Preview" className="w-48 mx-auto" />}
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Order'}
          </button>
          {success && <p className="text-green-600">✅ Order submitted successfully!</p>}
        </form>
      </div>
    </div>
  );
}

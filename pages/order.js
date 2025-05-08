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
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
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
            address: '', // address optional
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
        <title>ReFrame – Order</title>
      </Head>
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Place Your Order</h1>
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
          <input
            className="w-full"
            type="file"
            accept="image/*"
            onChange={handleImage}
            required
          />

          <div className="flex justify-around mt-4">
            {['Natural', 'White', 'Black'].map((option) => (
              <label key={option} className={`text-center cursor-pointer ${frame === option ? 'ring-2 ring-blue-500 rounded' : ''}`}>
                <img src={`/frames/${option.toLowerCase()}.png`} alt={option} className="w-24 h-32 object-contain mx-auto mb-1" />
                <input
                  type="radio"
                  name="frame"
                  value={option}
                  checked={frame === option}
                  onChange={(e) => setFrame(e.target.value)}
                  className="hidden"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {preview && (
            <div className="mt-6 relative w-full max-w-sm mx-auto">
              <img
                src={preview}
                alt="Uploaded"
                className="w-full h-auto rounded absolute top-0 left-0 z-0 object-contain"
              />
              <img
                src={`/frames/${frame.toLowerCase()}.png`}
                alt={`${frame} Frame`}
                className="w-full h-auto relative z-10 pointer-events-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Order'}
          </button>
          {success && <p className="text-green-600 text-center">✅ Order submitted successfully!</p>}
        </form>
      </div>
    </div>
  );
}

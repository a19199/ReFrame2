import { useState } from 'react';
import Head from 'next/head';

const frameOptions = [
  { name: 'Natural', url: '/frames/natural.png' },
  { name: 'White', url: '/frames/white.png' },
  { name: 'Black', url: '/frames/black.png' },
];

export default function Home() {
  const [image, setImage] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
    if (!image || !selectedFrame || !name || !email) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          frame: selectedFrame.name,
          image: base64Image,
        }),
      });

      setLoading(false);
      setSuccess(res.ok);
    };

    reader.readAsDataURL(image);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <Head>
        <title>ReFrame</title>
      </Head>
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold mb-2">ReFrame</h1>
        <p className="mb-6 text-gray-600">
          Upload your photo, choose a frame, and submit your order.
        </p>

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
          <div className="grid grid-cols-3 gap-4">
            {frameOptions.map((frame) => (
              <div
                key={frame.name}
                className={`border rounded p-2 cursor-pointer ${
                  selectedFrame?.url === frame.url ? 'border-blue-500' : ''
                }`}
                onClick={() => setSelectedFrame(frame)}
              >
                <img src={frame.url} alt={frame.name} className="w-full h-auto" />
                <p className="text-sm mt-2">{frame.name}</p>
              </div>
            ))}
          </div>

          {preview && selectedFrame && (
            <div className="relative w-full max-w-md mx-auto my-6">
              <img src={preview} alt="Preview" className="w-full h-auto relative z-0" />
              <img
                src={selectedFrame.url}
                alt="Frame"
                className="absolute top-0 left-0 w-full h-auto z-10 pointer-events-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50"
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

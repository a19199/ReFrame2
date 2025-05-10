import { useState } from 'react';

export default function Checkout() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!image || !selectedFrame || !name || !email) {
      alert("Please complete all fields.");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const res = await fetch(
          'https://script.google.com/macros/s/AKfycbx34K5SexlzqrXuGxeN28DpxfLoH1GwA2dT0-7zzBYhiVScnwvHCL-zxVadXuU8yqGC/exec',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              frame: selectedFrame?.name,
              image: base64Image,
            }),
          }
        );

        if (res.ok) {
          setSuccess(true);
        } else {
          alert('Submission failed. Check Google Apps Script URL or permissions.');
        }
      } catch (err) {
        alert('Something went wrong: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(image);
  };

  const frameOptions = [
    { name: 'Natural', url: '/frames/natural.png' },
    { name: 'White', url: '/frames/white.png' },
    { name: 'Black', url: '/frames/black.png' },
  ];

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required
          />
          {preview && (
            <div className="relative w-full aspect-[4/5] mx-auto">
              <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-contain" />
              {selectedFrame && (
                <img src={selectedFrame.url} alt="Frame" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
              )}
            </div>
          )}
          <div className="flex justify-around mt-4">
            {frameOptions.map((frame) => (
              <div
                key={frame.name}
                onClick={() => setSelectedFrame(frame)}
                className={`cursor-pointer border p-2 rounded ${
                  selectedFrame?.name === frame.name ? 'border-black' : 'border-transparent'
                }`}
              >
                <img src={frame.url} alt={frame.name} className="w-20 h-20 object-contain" />
                <p className="text-center text-sm">{frame.name}</p>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Order'}
          </button>
          {success && <p className="text-green-600 text-center mt-2">✅ Order submitted successfully!</p>}
        </form>
      </div>
    </div>
  );
}

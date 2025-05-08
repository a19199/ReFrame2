import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);

  const frames = [
    { name: 'Natural', url: '/frames/natural.png' },
    { name: 'White', url: '/frames/white.png' },
    { name: 'Black', url: '/frames/black.png' },
  ];

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ReFrame</h1>
      <p className="text-lg text-gray-600 text-center max-w-xl mb-6">
        Upload your photo, choose a frame, and see your preview instantly.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-6"
      />

      <div className="flex gap-4 mb-6">
        {frames.map((frame) => (
          <button
            key={frame.name}
            onClick={() => setSelectedFrame(frame.url)}
            className={`border rounded p-1 ${
              selectedFrame === frame.url ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'
            }`}
          >
            <img src={frame.url} alt={frame.name} className="w-24 h-auto" />
            <p className="text-sm">{frame.name}</p>
          </button>
        ))}
      </div>

      {image && (
        <div className="relative w-80 h-auto">
          {selectedFrame && (
            <img
              src={selectedFrame}
              alt="Frame"
              className="absolute top-0 left-0 w-full h-auto z-10 pointer-events-none"
            />
          )}
          <img
            src={image}
            alt="Uploaded"
            className="relative w-full h-auto z-0"
          />
        </div>
      )}
    </main>
  );
}

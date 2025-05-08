import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);

  const frameOptions = [
    { name: 'Natural Wood', url: '/frames/natural.png' },
    { name: 'White', url: '/frames/white.png' },
    { name: 'Black', url: '/frames/black.png' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to ReFrame</h1>
      <p className="mb-6 text-lg">Upload your photo, choose a frame, and see your preview instantly.</p>

      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">
        {frameOptions.map((frame) => (
          <div key={frame.name} className="cursor-pointer text-center">
            <img
              src={frame.url}
              alt={frame.name}
              onClick={() => setSelectedFrame(frame.url)}
              className={`border-4 rounded-lg w-full transition-transform ${
                selectedFrame === frame.url ? 'border-blue-400 scale-105' : 'border-transparent'
              }`}
            />
            <p className="mt-2">{frame.name}</p>
          </div>
        ))}
      </div>

      {image && selectedFrame && (
        <div className="relative w-80 mx-auto mt-10">
          <img src={selectedFrame} alt="Selected Frame" className="w-full" />
          <img
            src={image}
            alt="Uploaded"
            className="absolute top-[12%] left-[12%] w-[76%] h-[76%] object-cover"
          />
        </div>
      )}
    </div>
  );
}

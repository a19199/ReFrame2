import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);

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
        className="mb-4"
      />

      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded" className="max-w-xs rounded shadow" />
        </div>
      )}
    </main>
  );
}

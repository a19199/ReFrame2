import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);

  const frameOptions = [
    { name: "Natural", url: "/frames/natural.png" },
    { name: "White", url: "/frames/white.png" },
    { name: "Black", url: "/frames/black.png" },
  ];

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleOrder = () => {
    if (!image || !selectedFrame) {
      alert("Please upload a photo and select a frame.");
      return;
    }

    // 추후 주문 페이지로 넘기거나, 로컬에 저장 가능
    alert("✅ Your design is ready to order!\n(We'll implement real checkout soon.)");
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">ReFrame</h1>
      <p className="text-gray-600 mb-6">
        Upload your photo, choose a frame, and see your preview instantly.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-6"
      />

      <div className="flex justify-center gap-4 mb-8">
        {frameOptions.map((frame) => (
          <button
            key={frame.name}
            onClick={() => setSelectedFrame(frame.url)}
            className={`border rounded p-2 transition ${
              selectedFrame === frame.url ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <img src={frame.url} alt={frame.name} className="w-20 h-24 object-contain" />
            <p className="text-sm mt-1">{frame.name}</p>
          </button>
        ))}
      </div>

      <div className="relative w-[300px] h-[400px] mx-auto mb-6">
        {image && (
          <img
            src={image}
            alt="Uploaded"
            className="absolute inset-0 w-full h-full object-contain z-10"
          />
        )}
        {selectedFrame && (
          <img
            src={selectedFrame}
            alt="Frame"
            className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
          />
        )}
      </div>

      <button
        onClick={handleOrder}
        className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition disabled:opacity-50"
        disabled={!image || !selectedFrame}
      >
        Order This
      </button>
    </div>
  );
}

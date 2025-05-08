import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Checkout() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [frame, setFrame] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage');
    const storedFrame = localStorage.getItem('selectedFrame');
    if (storedImage && storedFrame) {
      setImage(storedImage);
      setFrame(storedFrame);
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Order Summary</h1>

      <div className="max-w-md mx-auto border rounded shadow p-4 bg-gray-50">
        <div className="relative w-full aspect-[3/4] mb-4">
          {image && (
            <img
              src={image}
              alt="Uploaded"
              className="absolute inset-0 w-full h-full object-contain z-10"
            />
          )}
          {frame && (
            <img
              src={frame}
              alt="Frame"
              className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
            />
          )}
        </div>

        <form className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}

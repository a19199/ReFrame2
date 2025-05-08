export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">ReFrame</h1>
        <div className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-500">Choose Frame</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Upload Photo</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Track Order</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h2 className="text-4xl font-extrabold mb-4">Turn Your Favorite Moments into Framed Memories.</h2>
        <p className="text-lg mb-6">Easy upload, instant preview, and delivery to your door.</p>
        <a href="#" className="inline-block bg-pink-300 hover:bg-pink-400 text-white font-semibold py-3 px-6 rounded shadow">
          Get Started
        </a>
      </section>

      {/* Steps Section */}
      <section className="bg-white py-12 px-6">
        <h3 className="text-2xl font-bold text-center mb-8">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl mb-2">📷</div>
            <h4 className="font-semibold mb-1">Upload Your Photo</h4>
            <p className="text-sm text-gray-600">Choose any image from your device.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🖼️</div>
            <h4 className="font-semibold mb-1">Choose a Frame</h4>
            <p className="text-sm text-gray-600">Preview it instantly in various frames.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">📦</div>
            <h4 className="font-semibold mb-1">Order & Delivery</h4>
            <p className="text-sm text-gray-600">We’ll ship it right to your door.</p>
          </div>
        </div>
      </section>

      {/* Popular Frames */}
      <section className="py-12 px-6">
        <h3 className="text-2xl font-bold text-center mb-8">Popular Frames</h3>
        <div className="flex justify-center space-x-6">
          <img src="/frames/natural.png" alt="Natural Frame" className="w-40 shadow rounded" />
          <img src="/frames/white.png" alt="White Frame" className="w-40 shadow rounded" />
          <img src="/frames/black.png" alt="Black Frame" className="w-40 shadow rounded" />
        </div>
      </section>
    </div>
  );
}

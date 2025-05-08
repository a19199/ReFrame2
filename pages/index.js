export default function Home() {
  return (
    <div className="bg-blue-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-pink-400">ReFrame</h1>
          <nav className="space-x-4 text-sm">
            <a href="#" className="hover:text-pink-400">Choose Frame</a>
            <a href="#" className="hover:text-pink-400">Upload Photo</a>
            <a href="#" className="hover:text-pink-400">Track Order</a>
            <a href="#" className="hover:text-pink-400">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-pink-100 py-20 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Turn Your Favorite Moments into Framed Memories.
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Easy upload, instant preview, and delivery to your door.
        </p>
        <a
          href="#"
          className="bg-pink-400 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-500"
        >
          Get Started
        </a>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h3 className="text-2xl font-bold mb-8">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl mb-2">📷</div>
            <h4 className="font-semibold">Upload Your Photo</h4>
          </div>
          <div>
            <div className="text-4xl mb-2">🖼️</div>
            <h4 className="font-semibold">Choose a Frame</h4>
          </div>
          <div>
            <div className="text-4xl mb-2">📦</div>
            <h4 className="font-semibold">Order & Delivery</h4>
          </div>
        </div>
      </section>

      {/* Popular Frames */}
      <section className="bg-white py-16 px-6">
        <h3 className="text-2xl font-bold text-center mb-8">Popular Frames</h3>
        <div className="flex justify-center gap-6">
          <img src="/frames/natural.png" alt="Natural Frame" className="w-40 shadow rounded" />
          <img src="/frames/white.png" alt="White Frame" className="w-40 shadow rounded" />
          <img src="/frames/black.png" alt="Black Frame" className="w-40 shadow rounded" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
        © 2025 ReFrame. All rights reserved.
      </footer>
    </div>
  );
}

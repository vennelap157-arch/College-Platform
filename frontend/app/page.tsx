import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">CollegeFinder</h1>
        <div className="flex gap-6">
          <Link href="/colleges" className="text-gray-600 hover:text-blue-600">Colleges</Link>
          <Link href="/compare" className="text-gray-600 hover:text-blue-600">Compare</Link>
          <Link href="/predict" className="text-gray-600 hover:text-blue-600">Predictor</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center py-20 px-4">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Find Your Dream College</h2>
        <p className="text-xl text-gray-500 mb-8">Search, compare and predict colleges across India</p>
        <div className="flex gap-4 justify-center">
          <Link href="/colleges"
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700">
            Browse Colleges
          </Link>
          <Link href="/predict"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg hover:bg-blue-50">
            Predict My College
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-8 pb-20">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-bold text-lg mb-2">Search Colleges</h3>
          <p className="text-gray-500">Find colleges by name, location, fees and courses</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <div className="text-4xl mb-3">⚖️</div>
          <h3 className="font-bold text-lg mb-2">Compare Colleges</h3>
          <p className="text-gray-500">Compare fees, placements and ratings side by side</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <div className="text-4xl mb-3">🧠</div>
          <h3 className="font-bold text-lg mb-2">Predict Colleges</h3>
          <p className="text-gray-500">Enter your rank and find eligible colleges instantly</p>
        </div>
      </div>
    </div>
  );
}
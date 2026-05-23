'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function PredictorPage() {
  const [exam, setExam] = useState('JEE');
  const [rank, setRank] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const predict = async () => {
    if (!rank) return;
    setLoading(true);
    setSearched(true);
    const res = await fetch(`http://localhost:5000/predict?exam=${exam}&rank=${rank}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CollegeFinder</Link>
        <div className="flex gap-6">
          <Link href="/colleges" className="text-gray-600 hover:text-blue-600">Colleges</Link>
          <Link href="/compare" className="text-gray-600 hover:text-blue-600">Compare</Link>
          <Link href="/predict" className="text-blue-600 font-semibold">Predictor</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">🧠 College Predictor</h1>
        <p className="text-gray-500 mb-6">Enter your exam and rank to find colleges you are eligible for</p>

        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <div className="flex flex-wrap gap-4">
            <select
              className="border p-3 rounded-lg text-lg"
              value={exam}
              onChange={e => setExam(e.target.value)}>
              <option value="JEE">JEE</option>
              <option value="CAT">CAT</option>
              <option value="NEET">NEET</option>
              <option value="BITSAT">BITSAT</option>
              <option value="VITEEE">VITEEE</option>
            </select>
            <input
              className="border p-3 rounded-lg flex-1 text-lg"
              placeholder="Enter your rank e.g. 5000"
              type="number"
              value={rank}
              onChange={e => setRank(e.target.value)} />
            <button
              onClick={predict}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
              Predict
            </button>
          </div>
        </div>

        {loading && <p className="text-center py-10 text-gray-400">Finding colleges...</p>}

        {!loading && searched && results.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p className="text-5xl mb-4">😔</p>
            <p className="text-lg">No colleges found for your rank</p>
            <p className="text-sm mt-2">Try a different exam or higher rank</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div>
            <p className="text-green-600 font-semibold mb-4">✅ Found {results.length} colleges for your rank!</p>
            {results.map((c: any) => (
              <div key={c.id} className="bg-white border rounded-xl p-4 mb-3 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-lg">{c.name}</h2>
                    <p className="text-gray-500 text-sm">📍 {c.location}, {c.state}</p>
                    <p className="text-blue-600 text-sm mt-1">Cutoff Rank: {c.cutoff_rank?.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-semibold">₹{c.fees?.toLocaleString()}/yr</p>
                    <p className="text-yellow-500">⭐ {c.rating}/5</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link href={`/colleges/${c.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    View Details
                  </Link>
                  <Link href={`/compare?ids=${c.id}`}
                    className="border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm">
                    + Compare
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
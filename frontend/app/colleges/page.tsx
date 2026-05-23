'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [maxFees, setMaxFees] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/colleges?search=${search}&location=${location}&maxFees=${maxFees}&page=${page}`)
      .then(r => r.json())
      .then(data => { setColleges(data.colleges); setTotal(data.total); setLoading(false); });
  }, [search, location, maxFees, page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CollegeFinder</Link>
        <div className="flex gap-6">
          <Link href="/colleges" className="text-blue-600 font-semibold">Colleges</Link>
          <Link href="/compare" className="text-gray-600 hover:text-blue-600">Compare</Link>
          <Link href="/predict" className="text-gray-600 hover:text-blue-600">Predictor</Link>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Find Your College</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <input className="border p-2 rounded-lg flex-1 min-w-48"
            placeholder="🔍 Search college..."
            onChange={e => { setSearch(e.target.value); setPage(1); }} />
          <select className="border p-2 rounded-lg"
            onChange={e => { setLocation(e.target.value); setPage(1); }}>
            <option value="">All Locations</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
          </select>
          <select className="border p-2 rounded-lg"
            onChange={e => { setMaxFees(e.target.value); setPage(1); }}>
            <option value="">Any Fees</option>
            <option value="100000">Under ₹1 Lakh</option>
            <option value="200000">Under ₹2 Lakhs</option>
            <option value="300000">Under ₹3 Lakhs</option>
            <option value="500000">Under ₹5 Lakhs</option>
          </select>
        </div>
        <p className="text-gray-500 mb-4">{total} colleges found</p>
        {loading && <p className="text-center py-10 text-gray-400">Loading...</p>}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {colleges.length === 0 && (
              <p className="text-gray-400 col-span-3 text-center py-10">No colleges found</p>
            )}
            {colleges.map((c: any) => (
              <div key={c.id} className="bg-white border rounded-xl p-4 hover:shadow-lg transition">
                <h2 className="font-bold text-lg">{c.name}</h2>
                <p className="text-gray-500 text-sm mt-1">📍 {c.location}, {c.state}</p>
                <p className="text-green-600 font-semibold mt-1">💰 ₹{c.fees?.toLocaleString()}/yr</p>
                <p className="text-yellow-500 mt-1">⭐ {c.rating}/5</p>
                <p className="text-blue-500 text-sm mt-1">🎓 Placement: {c.placement_percent}%</p>
                <div className="flex gap-2 mt-3">
                  <Link href={`/colleges/${c.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    View Details
                  </Link>
                  <Link href={`/compare?ids=${c.id}`}
                    className="border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50">
                    + Compare
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && colleges.length > 0 && (
          <div className="flex gap-2 mt-8 justify-center">
            <button onClick={() => setPage(p => Math.max(1, p-1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Prev</button>
            <span className="px-4 py-2">Page {page}</span>
            <button onClick={() => setPage(p => p+1)}
              disabled={page * 12 >= total}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
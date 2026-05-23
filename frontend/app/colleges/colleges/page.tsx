'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CollegeDetail() {
  const pathname = usePathname();
  const id = pathname?.split('/').pop();
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/colleges/${id}`)
      .then(r => r.json())
      .then(data => { setCollege(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (!college) return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold text-red-500">ID: {pathname} | No data</h1>
      <Link href="/colleges" className="text-blue-600 mt-4 inline-block">← Back to Colleges</Link>
    </div>
  );

if (college.id === undefined) return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold text-red-500">College not found!</h1>
      <Link href="/colleges" className="text-blue-600 mt-4 inline-block">← Back to Colleges</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CollegeFinder</Link>
        <div className="flex gap-6">
          <Link href="/colleges" className="text-gray-600 hover:text-blue-600">Colleges</Link>
          <Link href="/compare" className="text-gray-600 hover:text-blue-600">Compare</Link>
          <Link href="/predict" className="text-gray-600 hover:text-blue-600">Predictor</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <Link href="/colleges" className="text-blue-600 hover:underline">← Back to Colleges</Link>

        <div className="bg-white rounded-xl p-6 mt-4 shadow-sm">
          <h1 className="text-3xl font-bold">{college.name}</h1>
          <p className="text-gray-500 mt-1">📍 {college.location}, {college.state}</p>
          <p className="text-gray-600 mt-3">{college.overview}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Fees/Year</p>
              <p className="font-bold text-lg">₹{college.fees?.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Placement</p>
              <p className="font-bold text-lg">{college.placement_percent}%</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Rating</p>
              <p className="font-bold text-lg">⭐ {college.rating}/5</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Established</p>
              <p className="font-bold text-lg">{college.established}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 mt-4 shadow-sm">
          <h2 className="text-xl font-bold mb-4">🎓 Courses Offered</h2>
          <div className="flex flex-wrap gap-2">
            {college.courses?.map((c: string) => (
              <span key={c} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{c}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 mt-4 shadow-sm">
          <h2 className="text-xl font-bold mb-4">💼 Placements</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Placement Rate</p>
              <p className="font-bold text-2xl text-green-600">{college.placement_percent}%</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="font-bold text-2xl text-blue-600">{college.total_students?.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Top Recruiters</p>
            <div className="flex flex-wrap gap-2">
              {['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys', 'TCS'].map(r => (
                <span key={r} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{r}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 mt-4 shadow-sm">
          <h2 className="text-xl font-bold mb-4">📝 Admission</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Exam Accepted</p>
              <p className="font-bold text-lg">{college.exam_accepted}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cutoff Rank</p>
              <p className="font-bold text-lg">{college.cutoff_rank?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Link href={`/compare?ids=${college.id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            ⚖️ Compare This College
          </Link>
          <Link href="/colleges"
            className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50">
            ← Back to List
          </Link>
        </div>
      </div>
    </div>
  );
} 
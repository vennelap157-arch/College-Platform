'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CompareContent() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get('ids') || '';
  const [ids, setIds] = useState(initialIds);
  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const compare = async () => {
    const idList = ids.split(',').filter(id => id.trim());
    if (idList.length < 2) { setError('Enter at least 2 college IDs'); return; }
    if (idList.length > 3) { setError('Maximum 3 colleges only'); return; }
    setError('');
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/compare?ids=${ids}`);
    const data = await res.json();
    if (data.error) { setError(data.error); setLoading(false); return; }
    setColleges(data);
    setLoading(false);
  };

  const fields = [
    { key: 'location', label: '📍 Location' },
    { key: 'state', label: '🗺️ State' },
    { key: 'fees', label: '💰 Fees/Year', format: (v: any) => `₹${v?.toLocaleString()}` },
    { key: 'rating', label: '⭐ Rating', format: (v: any) => `${v}/5` },
    { key: 'placement_percent', label: '🎓 Placement', format: (v: any) => `${v}%` },
    { key: 'established', label: '📅 Established' },
    { key: 'exam_accepted', label: '📝 Exam' },
    { key: 'cutoff_rank', label: '🏆 Cutoff Rank' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Compare Colleges</h1>
      <p className="text-gray-500 mb-6">Enter college IDs separated by commas (e.g. 1,2,3)</p>

      <div className="flex gap-4 mb-6">
        <input
          className="border p-2 rounded-lg flex-1"
          placeholder="e.g. 1,2,3"
          value={ids}
          onChange={e => setIds(e.target.value)} />
        <button
          onClick={compare}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Compare
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-400">Loading...</p>}

      {colleges.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Field</th>
                {colleges.map((c: any) => (
                  <th key={c.id} className="p-3 text-center">{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((field, i) => (
                <tr key={field.key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-3 font-semibold">{field.label}</td>
                  {colleges.map((c: any) => (
                    <td key={c.id} className="p-3 text-center">
                      {field.format ? field.format(c[field.key]) : c[field.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {colleges.length === 0 && !loading && !error && (
        <div className="text-center py-10 text-gray-400">
          <p className="text-5xl mb-4">⚖️</p>
          <p>Enter college IDs above to compare</p>
          <p className="text-sm mt-2">You can find college IDs on the college listing page</p>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CollegeFinder</Link>
        <div className="flex gap-6">
          <Link href="/colleges" className="text-gray-600 hover:text-blue-600">Colleges</Link>
          <Link href="/compare" className="text-blue-600 font-semibold">Compare</Link>
          <Link href="/predict" className="text-gray-600 hover:text-blue-600">Predictor</Link>
        </div>
      </nav>
      <Suspense fallback={<p className="text-center py-20">Loading...</p>}>
        <CompareContent />
      </Suspense>
    </div>
  );
}
import { useEffect, useState } from "react";
import { summarizeText } from "@/services/api";
import NewsCard from "@/components/NewsCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function Home() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [useMultilang, setUseMultilang] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('newsHistory') || '[]');
    setHistory(savedHistory);
  }, []);

  const saveToHistory = (newSummary: string) => {
    const updatedHistory = [newSummary, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('newsHistory', JSON.stringify(updatedHistory));
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const data = await summarizeText(text, useMultilang);
      setSummary(data.summary);
      saveToHistory(data.summary);
    } catch (error) {
      console.error('Error summarizing:', error);
    }
    setLoading(false);
  };

  const clearHistory = () => {
    localStorage.removeItem('newsHistory');
    setHistory([]);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">📰 NewsGist Summarizer</h1>

      <div className="flex items-center mb-4">
        <input
          id="multilang"
          type="checkbox"
          checked={useMultilang}
          onChange={() => setUseMultilang(!useMultilang)}
          className="mr-2 w-5 h-5"
        />
        <label htmlFor="multilang" className="text-gray-800 dark:text-white">Use Multi-Language Model</label>
      </div>
      
      <textarea
        className="w-full max-w-2xl p-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none mb-6"
        placeholder="Paste your news article here..."
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        disabled={loading || !text.trim()}
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition mb-6"
      >
        Summarize
      </button>

      {loading && <SkeletonCard />}
      {summary && <NewsCard summary={summary} />}

      {/* History Section */}
      {history.length > 0 && (
        <div className="mt-12 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Past Summaries</h2>
            <button
              onClick={clearHistory}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Clear History
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {history.map((item, index) => (
              <div key={index} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
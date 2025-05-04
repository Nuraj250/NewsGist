import { useState } from "react";

type NewsCardProps = {
  summary: string;
};

const NewsCard = ({ summary }: NewsCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md w-full max-w-2xl">
      <p className="text-gray-700 dark:text-gray-300 mb-4">{summary}</p>
      <button
        onClick={handleCopy}
        className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
      >
        {copied ? 'Copied!' : 'Copy Summary'}
      </button>
    </div>
  );
};

export default NewsCard;

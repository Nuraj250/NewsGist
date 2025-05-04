const SkeletonCard = () => {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md animate-pulse w-full max-w-2xl">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    );
  };
  
  export default SkeletonCard;
  
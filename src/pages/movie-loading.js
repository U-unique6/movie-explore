import { React } from "react";
const MovieLoading = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
      
        <div className="mb-6 flex justify-center items-center gap-3 p-4">
          <div className="w-full h-24  bg-gray-400" />

        
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-5">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 shadow-lg rounded-lg overflow-hidden animate-pulse"
            >
              <div className="w-full h-64 bg-gray-400" />
              <div className="p-4">
                <div className="h-6 bg-gray-400 rounded mb-2" />
                <div className="h-4 bg-gray-400 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieLoading;


export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20 animate-pulse">
    
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

   
        <div className="md:w-1/2 flex justify-center items-center bg-gray-100 p-6">
          <div className="w-full h-[400px] bg-gray-300 rounded-lg" />
        </div>

       
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-300 rounded w-1/4" />
            <div className="h-20 bg-gray-200 rounded w-full" />
          </div>

          <div className="mt-8">
            <div className="h-10 bg-gray-300 rounded w-1/3" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10 space-y-4">
        <div className="h-8 bg-gray-300 rounded w-1/4" />
        <div className="h-10 bg-gray-200 rounded w-full" />
        <div className="h-24 bg-gray-200 rounded w-full" />
        <div className="h-10 bg-gray-300 rounded w-1/3" />
      </div>


      <div className="max-w-4xl mx-auto mt-10 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/5" />
        <div className="space-y-3">
          <div className="bg-gray-200 p-4 rounded-md space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="bg-gray-200 p-4 rounded-md space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

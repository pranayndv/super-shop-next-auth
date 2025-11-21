

export default function Footer() {


  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        
        <h2 className="text-2xl font-bold italic text-lime-500">
          Super Shop
        </h2>

        <div className="space-x-5">
          <span >About</span>
          <span >Career</span>
        </div>


      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
        &copy; 2025 Super Shop. All rights reserved.
      </div>
    </footer>
  );
}

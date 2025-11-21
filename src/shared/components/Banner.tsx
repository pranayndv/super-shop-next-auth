import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative w-full h-[450px] md:h-[520px] flex items-center justify-center overflow-hidden rounded-xl shadow-lg mt-6">

    
      <Image
        src="/banner.jpg"
        alt="Banner Background"
        layout="fill"
        objectFit="cover"
        className="opacity-70"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

     
      <div className="relative max-w-3xl px-6 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Upgrade Your Style with Super Shop
        </h1>

        <p className="text-gray-200 mt-4 max-w-xl">
          Discover premium outfits crafted with elegance, comfort, and class.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            href="/products"
            className="px-6 py-3 bg-black border-2 border-lime-400 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Shop Now
          </Link>

          <Link
            href="/products"
            className="px-6 py-3 border border-white rounded-lg font-semibold hover:bg-white hover:text-black transition"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </div>
  );
}

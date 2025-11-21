"use server";

import serverApi from "@/hooks/serverApi";
import ProductFilter from "@/features/products/components/ProductFilter";
import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";
import CartButton from "@/app/cart/CartButton";

interface Product {
  id: string;
  name: string;
  gender: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}

export default async function Banner() {

  const cookieStore = cookies();
  const search = (await cookieStore).get("search")?.value.toLowerCase() || "";
  const category = (await cookieStore).get("category")?.value || "";


  const baseUrl = "https://68df5df0898434f4135779c3.mockapi.io/api";
  const api = await serverApi(baseUrl);

  
     const { data: products, error } = await api.get<Product[] | null>(`/users?name=${search}&category=${category}`);
  
     if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <p className="text-lg font-semibold mb-4">{error}</p>
      </div>
    );
  }


  return (
    <div className="space-y-6 px-5">
      <h2 className="text-4xl font-bold mb-10">Welcome to Super Cloths</h2>


      <ProductFilter search={search} category={category} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.length ? (
          products.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition flex justify-between flex-col"
            >

            <Link href={`/products/${item.id}`}>
              <Image
                width={300}
                height={1000}
                src={item.imageUrl}
                alt={item.name}
                className="w-full object-cover rounded-md mb-4"
              />
              
              </Link>
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.category}</p>
                <p className="text-green-600 font-bold mt-2">Rs.{item.price}</p>
                <p className="mt-2">{item.description}</p>
              </div>
              <CartButton label="Add to cart" item={item} />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
}

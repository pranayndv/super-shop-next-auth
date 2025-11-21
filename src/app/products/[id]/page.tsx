import Image from "next/image";
import serverApi from "@/hooks/serverApi";
import CartButton from "../../cart/CartButton";
import ReviewForm from "@/features/products/components/ReviewForm";
import { getReviews } from "@/actions/reviewActions";
import { Metadata } from "next";


interface Product {
  id: string;
  name: string;
  gender: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}


interface PageProps {
  params: { id: string };
}

interface Review {
  id: string;
  productId: string;
  name: string;
  review: string;
}


export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const baseUrl = "https://68df5df0898434f4135779c3.mockapi.io/api";
  const api = await serverApi(baseUrl);
  const {id} = await params;

  const { data: product } = await api.get<Product>(`/users/${id}`);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} – ${product.category}`,
    description: product.description.slice(0, 150) + "...",

    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
       type: "website", 
    },

    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}


export default async function ProductPage({ params }: Readonly<PageProps>) {
  const { id } = params;

  const baseUrl = "https://68df5df0898434f4135779c3.mockapi.io/api";
  const api = await serverApi(baseUrl);

  const { data: product, error } = await api.get<Product>(`/users/${id}`);


  const reviews: Review[] = await getReviews(id);

  if (error || !product) {
    throw new Error(error?.toString() || "Product not found");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20">

    
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

     
        <div className="md:w-1/2 flex justify-center items-center bg-gray-100 p-6">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg object-cover w-full h-auto max-h-[500px]"
          />
        </div>

       
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>
            <p className="text-gray-500 capitalize mb-1">
              Category: {product.category}
            </p>
            <p className="text-gray-500 capitalize mb-4">
              Gender: {product.gender}
            </p>

            <p className="text-green-600 font-semibold text-2xl mb-6">
              ${product.price}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-8">
            <CartButton label="Add to Cart" item={product} />
          </div>
        </div>
      </div>

  
      <ReviewForm productId={product.id} />


      <div className="space-y-3 mt-8">
        <h2 className="text-xl font-bold underline decoration-lime-500 underline-offset-8">
          Reviews
        </h2>

        {reviews?.map((rev) => (
          <div key={rev.id} className="bg-slate-200 p-3 rounded-md">
            <h3 className="font-bold">{rev.name}</h3>
            <p>{rev.review}</p>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

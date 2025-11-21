'use server'

import { revalidatePath } from "next/cache";


interface Review{
  productId: string;
  name: string;
  review: string;
}

export async function addReview(formData :Review) {
  const payload = {
    productId: formData.productId,
    name: formData.name,
    review : formData.review,
  }
  console.log("payload>>>", payload)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`,{
      method : "POST",
      body : JSON.stringify(payload)
    })
    
    if (res.status === 201 || res.status === 200) {

    revalidatePath(`/products/${formData.productId}`);
  }
  return { success: res.status === 201 || res.status === 200 };
}


export async function getReviews(id:string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews?productId=${id}`,{
      method : "GET",
    })

    const data =await res.json();    
    return data.reviews
}




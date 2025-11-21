"use client"

import { addReview } from "@/actions/reviewActions"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



const reviewSchema = z.object({
  productId: z.string().nonempty(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  review: z.string().min(5, "Review must be at least 5 characters"),
});

type Review = z.infer<typeof reviewSchema>;

export default function ReviewForm({ productId }: Readonly<{ productId: string }>) {

  const {register, handleSubmit, reset, formState:{isSubmitting, isValid, errors}} = useForm<Review>({
    resolver: zodResolver(reviewSchema),
    mode:"onChange",
    defaultValues:{
      productId,
      name: "",
      review: "",
    }
  })

  console.log("isValid>>>", isValid)

    const handleReview = async (formData : Review)=>{
       

      console.log("formdata>>",formData)
     const result = await addReview(formData);
    if (result?.success) {
      console.log("Review posted successfully!");
      reset();
    } else {
      console.log("Failed to post review.");
    }
    }
  return (
    <form onSubmit={handleSubmit(handleReview)}  className="space-y-4 py-5">
      <input type="hidden" {...register("productId", {required:true})} name="productId" value={productId} />

      <div>
        <input
          {...register("name", {required: true})}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder="Your Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm italic">{errors.name.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("review", {required: true})}
          rows={4}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder="Review"
        />
        {errors.review && (
          <p className="text-red-500 text-sm italic">{errors.review.message}</p>
        )}
      </div>

       <button
      type="submit"
      disabled={!isValid}
      className={`px-4 py-2 my-2 rounded-md font-semibold text-white
      ${!isValid ? "bg-gray-500 cursor-not-allowed" : "bg-black"} border-2 border-lime-500 hover:bg-gray-600`}
    >
      {isSubmitting ? "Posting..." : "Submit Review"}
    </button>

      
    </form>
  );
}

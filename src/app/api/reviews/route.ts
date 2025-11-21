import { NextResponse } from "next/server";

interface Review {
  productId: string;
  name: string;
  review: string;
}

const reviews: Review[] = [];


async function saveReviewToDB(reviewData: Review) {
  console.log("Saving review:", reviewData);
  reviews.push(reviewData);
  return reviewData;
}


// async function postReview(reviewData: Review) {
//     console.log("reviewData>>>", reviewData)
//       const res = await fetch(`https://68df5df0898434f4135779c3.mockapi.io/api/reviews`,{
//       method : "POST",
//       headers: {
//     "Content-Type": "application/json"
//   },
//       body : JSON.stringify(reviewData)
//     })
//     return res.ok? "Successfully add review": "failed"
// }


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, name, review } = body;

    if (!productId || !name || !review) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newReview = await saveReviewToDB({ productId, name, review });
    // const apiRes = await postReview({ productId, name, review });

    // console.log("review status>>>", apiRes)
    return NextResponse.json(
      { message: "Review added successfully", review: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding review>>>", error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (productId) {
      const productReviews = reviews.filter(
        (r) => r.productId === productId
      );
      return NextResponse.json({ reviews: productReviews }, { status: 200 });
    }

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews>>>>>", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

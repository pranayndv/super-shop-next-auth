"use server";

import { cookies } from "next/headers";

import ProductFilterClient from "./ProductFilterClient";

export default async function ProductFilter({
  search,
  category,
}: Readonly<{ search: string; category: string }>) {
  async function handleFilter(formData: FormData) {
    "use server";
    const newSearch = formData.get("search")?.toString() || "";
    const newCategory = formData.get("category")?.toString() || "";

    const cookieStore = cookies();
    (await cookieStore).set("search", newSearch);
    (await cookieStore).set("category", newCategory);
  }

  return (
    <form
      action={handleFilter}
      className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 mb-6 rounded-md shadow-sm"
    >
      <ProductFilterClient search={search} category={category} />
    </form>
  );
}

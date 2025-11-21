"use client";

import { ChangeEvent } from "react";

export const categories = [
      { value: "", label: "All Categories" },
      { value: "t-shirt", label: "T-Shirts" },
      { value: "jacket", label: "Jackets" },
      { value: "dress", label: "Dresses" },
      { value: "hoodie", label: "Hoodies" },
      { value: "coat", label: "Coats" },
      { value: "blazer", label: "Blazers" },
    ]

export default function ProductFilterClient({
  search,
  category,
}: Readonly<{ search: string; category: string }>) {
  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.form?.requestSubmit();
  };

  return (
    <>
      <div className="w-full sm:w-1/2">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Search Products
        </label>
        <input
          name="search"
          type="text"
          defaultValue={search}
          onChange={handleInput}
          placeholder="Search here"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      <div className="w-full sm:w-1/3">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          name="category"
          defaultValue={category}
          onChange={handleInput}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
        >
          {categories.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

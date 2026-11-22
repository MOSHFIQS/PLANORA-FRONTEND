"use client";

import CategoryForm from "../CategoryForm";

export default function UpdateCategory({ category }: { category: any }) {
  return <CategoryForm mode="update" category={category} />;
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, relatedProducts } from "@/lib/catalogue";
import { ProductDetail } from "@/components/product-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  const related = relatedProducts(product);
  return <ProductDetail product={product} related={related} />;
}

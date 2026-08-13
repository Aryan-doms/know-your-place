import React from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  handle: string;
  variants: Array<{ price: string, sku?: string }>;
  images: string[];
};

export default function ProductCard({ product }: { product: Product }) {
  const mainImage = product.images[0] || '';
  const hoverImage = product.images[1] || mainImage;

  return (
    <Link href={`/product/${product.handle}`} className="group block pointer-events-auto">
      <div className="relative aspect-[3/4] mb-4 bg-gray-100 overflow-hidden mix-blend-multiply">
        {/* We use mix-blend-multiply if the product images have white backgrounds,
            so it blends nicely with the bubble wrap. The reference site images have white bg. */}
        <img
          src={mainImage}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 group-hover:opacity-0 mix-blend-darken"
        />
        <img
          src={hoverImage}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-darken"
        />
      </div>
      {/* Product Info */}
      <div className="mt-4 text-center pointer-events-auto mix-blend-color-burn text-black">
        <h3 
          className="text-[14px] font-bold uppercase tracking-wide truncate px-2"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          {product.title}
        </h3>
        <p 
          className="text-[16px] font-normal mt-1"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          ₹{parseInt(product.variants[0]?.price || '0').toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

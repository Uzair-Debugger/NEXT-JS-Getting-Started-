// No 'use client'
/* useEffect and useState are React Client Hooks — they only work in the browser, not on the server.

Once you remove 'use client', that component becomes a Server Component.

Server Components run on the server only, before the page is sent to the client.

So when Next.js sees useEffect or useState inside a server component, it throws:

“You’re importing a component that needs useEffect. This React Hook only works in a Client Component.”*/
import React from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
}

// ✅ Server-side fetching
async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products', {
    // Optional cache control
    cache: 'no-store', // ensures fresh data on each request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  return data.products;
}

export default async function Home() {
  const products = await getProducts(); // fetched on the server

  return (
    <section aria-label="Products-list" className="py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white p-4"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold mb-1 text-black">{item.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{item.category}</p>
            <p className="text-sm text-gray-800 line-clamp-2 mb-3">
              {item.description}
            </p>
            <span className="font-bold text-blue-600">${item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

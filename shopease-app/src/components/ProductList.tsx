// src/components/ProductList.tsx (No date-fns - use native JavaScript)
import React, { useState } from 'react';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';

interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: string;
}

// Native JavaScript date formatter (no library needed!)
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const ProductList: React.FC = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Laptop', price: 999, createdAt: '2024-01-15' },
    { id: 2, name: 'Phone', price: 599, createdAt: '2024-02-20' },
    { id: 3, name: 'Tablet', price: 399, createdAt: '2024-03-10' },
  ]);

  const sortedProducts = orderBy(products, ['price'], ['desc']);
  const expensiveProducts = filter(products, p => p.price > 500);
  const formattedDates = products.map(p => formatDate(p.createdAt));

  return (
    <div>
      <h2>Products (Optimized Bundle)</h2>
      <p>Only imports needed lodash functions + native date formatting!</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>All Products (Sorted by Price)</h3>
        <ul>
          {sortedProducts.map(p => (
            <li key={p.id}>{p.name} - ${p.price}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Expensive Products (&gt;$500)</h3>
        <p>{expensiveProducts.length} products found</p>
      </div>

      <div>
        <h3>Formatted Dates</h3>
        {formattedDates.map((date, i) => (
          <div key={i}>{date}</div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
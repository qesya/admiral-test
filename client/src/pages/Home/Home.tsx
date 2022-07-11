import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../apollo/queries/product';
import { AddProductModal, Cart, ProductCard } from '../../components';
import { CartType, Product } from '../../types';

export default function Home() {
  const { data } = useQuery(GET_PRODUCTS);
  const [selectedProducts, setSelectedProducts] = useState<CartType[]>([]);
  const [focusedProduct, setFocusedProduct] = useState<Product | undefined>();

  const onUpdate = (e: CartType[]) => {
    setSelectedProducts(e);
    setFocusedProduct(undefined);
  };

  return (
    <div className="flex flex-col w-full ">
      {focusedProduct && (
        <AddProductModal
          product={focusedProduct}
          selectedProducts={selectedProducts}
          onUpdate={onUpdate}
          onCancel={() => setFocusedProduct(undefined)}
        />
      )}
      <div className="mx-4 lg:mx-20 pt-16">
        <div className="w-full flex flex-col lg:flex-row flex-wrap justify-between">
          {data?.products &&
            data.products.map((product: Product) => (
              <ProductCard product={product} onClick={setFocusedProduct} />
            ))}
        </div>
      </div>
      {selectedProducts.length > 0 && <Cart products={selectedProducts} />}
    </div>
  );
}

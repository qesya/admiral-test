import { useState } from 'react';
import { CartType, Product } from '../../types';
import Button from '../Button/Button';

type Props = {
  product: Product;
  selectedProducts: CartType[];
  onUpdate: (cart: CartType[]) => void;
  onCancel: () => void;
};

export default function AddProductModal({
  product,
  onCancel,
  onUpdate,
  selectedProducts,
}: Props) {
  const foundIndex = selectedProducts.findIndex(
    (e) => e.product.id === product.id
  );
  const [qty, setQty] = useState(
    selectedProducts[foundIndex]?.amount | product.minQty
  );

  const addToCart = () => {
    if (qty < product.minQty && qty !== 0) {
      alert('quantity is less than minimum quantity');
      return;
    }

    let products = selectedProducts;
    if (foundIndex !== -1) {
      if (qty === 0) {
        products.splice(foundIndex, 1);
      } else {
        products[foundIndex].amount = qty;
      }
    } else {
      products.push({
        product,
        amount: qty,
      });
    }
    onUpdate(products);
  };

  return (
    <div className="fixed w-full h-full bg-slate-600/70 z-20 justify-center items-center flex">
      <div className="bg-white p-5 w-full lg:w-1/3 mx-5 md:mx-0  rounded-lg">
        <h2 className="font-bold">{product.name}</h2>
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(parseInt(e.currentTarget.value))}
          className="flex w-full p-4 bg-mainBackground rounded-lg mt-4"
        />
        <div className="mt-8 flex flex-row">
          <Button
            onClick={onCancel}
            title="Cancel"
            variant="secondary"
            className="mr-2 flex-1 flex"
          />
          <Button onClick={addToCart} title="Add" className="flex-1 flex" />
        </div>
      </div>
    </div>
  );
}

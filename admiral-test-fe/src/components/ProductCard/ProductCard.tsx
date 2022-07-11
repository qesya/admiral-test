import { Product } from '../../types/product';
import { displayCurrency } from '../../utils/number';

type Props = {
  product: Product;
  onClick: React.Dispatch<React.SetStateAction<Product | undefined>>;
};

export default function ProductCard({ product, onClick }: Props) {
  return (
    <div className="flex flex-col w-full lg:w-1/3 p-2 relative mb-1">
      <div className="flex flex-row justify-between bg-mainBackground p-5 rounded-lg">
        <div className="flex flex-col">
          <h2 className="font-bold">{product.name}</h2>
          <h4>{displayCurrency(product.price)}</h4>
        </div>
        <button
          onClick={() => onClick(product)}
          className="px-4 bg-primary rounded-lg text-white">
          +
        </button>
      </div>
    </div>
  );
}

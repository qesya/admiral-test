import { useNavigate } from 'react-router-dom';
import { Routes } from '../../constants/routes';
import { CartType } from '../../types';
import { displayCurrency } from '../../utils/number';
import Button from '../Button/Button';

type Props = {
  products: CartType[];
};

export default function Cart({ products }: Props) {
  const navigate = useNavigate();
  const { amount, total } = (() => {
    return {
      amount: products.reduce((total, current) => total + current.amount, 0),
      total: products.reduce(
        (total, current) => total + current.amount * current.product.price,
        0
      ),
    };
  })();

  const onCheckout = () =>
    navigate(Routes.CHECKOUT, { state: { products, total } });

  return (
    <div className="fixed flex flex-row justify-between items-center w-full bottom-0 right-0 bg-slate-500 py-8 px-6 lg:px-20">
      <div>
        <h3 className="text-white font-bold">Cart ({amount})</h3>
        <h2 className="text-white font-bold">{displayCurrency(total)}</h2>
      </div>
      <Button title="Checkout" onClick={onCheckout} />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  CREATE_ORDER,
  CreateOrderInput,
  CreateOrderResponse,
  ProductMutation,
} from '../../apollo/mutations/createOrder';
import { Button, RadioButton } from '../../components';
import { CheckoutParamsType, Routes } from '../../constants/routes';
import { displayCurrency } from '../../utils/number';

const giftwrappings = [
  {
    name: 'Premium',
    charge: 20,
  },
  {
    name: 'Standard',
    charge: 5,
  },
  {
    name: 'None',
    charge: 0,
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { products, total } = state as CheckoutParamsType;
  const isPhysical = products.find((p) => p.product.type === 'physical');
  const [selectedWrapping, setSelectedWrapping] = useState(giftwrappings[2]);
  const [createOrder, { data }] = useMutation<
    CreateOrderResponse,
    CreateOrderInput
  >(CREATE_ORDER);
  const [tax] = useState(5);

  const getFinalPrice = () => total + selectedWrapping.charge;

  const mapProducts = (): ProductMutation[] => {
    return products.map((e) => ({
      id: e.product.id,
      qty: e.amount,
      giftWrap: e.product.type === 'physical' ? selectedWrapping : null,
      total: e.amount * e.product.price,
    }));
  };

  useEffect(() => {
    if (data) {
      navigate(Routes.HOME);
    }
  }, [data]);

  const onBuy = async () => {
    try {
      await createOrder({
        variables: {
          input: {
            products: mapProducts(),
            taxPercentage: tax,
            total: getFinalPrice(),
          },
        },
      });

      alert('Order created');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mx-4">
      <div className="w-full lg:w-1/2">
        <div className="flex bg-mainBackground p-5 rounded-lg mt-8">
          <div className="flex flex-col w-full">
            <h1 className="font-bold text-center">Checkout</h1>
            <div className="my-4">
              {products &&
                products.map((p) => (
                  <div className="flex flex-row justify-between items-center mb-2">
                    <h3>
                      {p.product.name} x{p.amount}
                    </h3>
                    <h3>{displayCurrency(p.amount * p.product.price)}</h3>
                  </div>
                ))}
            </div>
            <div>
              <h2 className="text-end">Total : {displayCurrency(total)}</h2>
            </div>
          </div>
        </div>
        {isPhysical && (
          <div className="flex flex-col mt-4 bg-mainBackground rounded-lg w-full p-5">
            <h2>Gift Wrapping</h2>
            {giftwrappings.map((wrap) => (
              <RadioButton
                name="GiftWrapping"
                label={`${wrap.name} (+${displayCurrency(wrap.charge)})`}
                value={wrap.name}
                onChange={(e) => setSelectedWrapping(wrap)}
              />
            ))}
          </div>
        )}
        <div className="flex flex-row items-center justify-between mt-4 bg-mainBackground rounded-lg w-full p-5">
          <div>
            <h2>
              Tax (+{tax}%) :{' '}
              {displayCurrency(((total + selectedWrapping.charge) * 5) / 100)}
            </h2>
            <h2 className="font-bold">
              Total :{' '}
              {displayCurrency(
                total + ((total + selectedWrapping.charge) * 5) / 100
              )}
            </h2>
          </div>
          <Button title="Buy" onClick={onBuy} />
        </div>
      </div>
    </div>
  );
}

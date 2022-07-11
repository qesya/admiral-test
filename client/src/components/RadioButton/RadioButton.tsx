import React from 'react';
import { displayCurrency } from '../../utils/number';

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function Switch({ label, name, value, onChange }: Props) {
  return (
    <div>
      <input
        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        value={value}
        name={name}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <label className="form-check-label inline-block text-gray-800">
        {label}
      </label>
    </div>
  );
}

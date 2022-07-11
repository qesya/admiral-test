import React, { ReactNode } from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: 'primary' | 'secondary';
  title: string | ReactNode;
};

export default function Button({ title, variant = 'primary', ...rest }: Props) {
  const buttonColor = variant === 'primary' ? 'bg-primary' : 'bg-none';
  const textColor = variant === 'primary' ? 'text-white' : 'text-primary';
  return (
    <button
      {...rest}
      className={`p-4 rounded-lg font-bold text-center flex justify-center ${textColor} ${buttonColor} ${rest.className}`}>
      {title}
    </button>
  );
}

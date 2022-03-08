import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div className={'p-4 bg-gray-800 rounded-xl ' + className}>{children}</div>
  );
}

export default Card;

import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  children?: React.ReactNode;
  href: string;
  text: string;
  title?: string;
}

function LinkButton({ children, title, href, text }: NavbarProps) {
  return (
    <>
      <Link
        title={title}
        to={href}
        className="p-2 px-4 text-center bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl w-fit"
      >
        {text}
        {children}
      </Link>
    </>
  );
}

export default LinkButton;

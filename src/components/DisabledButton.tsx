import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  children?: React.ReactNode;
  text: string;
}

function DisabledLinkButton({ children, text }: NavbarProps) {
  return (
    <>
      <p className="p-2 px-4 text-center bg-gradient-to-r from-purple-400 to-blue-300 rounded-xl cursor-not-allowed">
        {text}
        {children}
      </p>
    </>
  );
}

export default DisabledLinkButton;

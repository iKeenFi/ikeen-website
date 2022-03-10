import React, { AllHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  children?: React.ReactNode;
  text: string;
}

function DisabledLinkButton(props: AllHTMLAttributes<HTMLParagraphElement>) {
  return (
    <>
      <p
        {...props}
        className="p-2 px-4 text-center bg-gradient-to-r from-purple-400 to-blue-300 rounded-xl cursor-not-allowed"
      >
        {props.children}
      </p>
    </>
  );
}

export default DisabledLinkButton;

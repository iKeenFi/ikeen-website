import React, { AllHTMLAttributes, LinkHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

function ExternalLinkButton(props: AllHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className="p-2 px-4 text-center bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl"
    >
      {props.children}
    </a>
  );
}

export default ExternalLinkButton;

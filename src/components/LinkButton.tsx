import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

function LinkButton(props: LinkProps) {
  let { children } = props;
  return (
    <>
      <Link
        {...props}
        className="p-2 px-4 text-center bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl"
      >
        {children}
      </Link>
    </>
  );
}

export default LinkButton;

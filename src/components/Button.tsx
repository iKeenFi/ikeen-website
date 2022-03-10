import React, { ButtonHTMLAttributes } from 'react';

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  let { children } = props;
  return (
    <>
      <button
        {...props}
        className={
          'p-2 px-4 text-center bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl ' +
          props.className
        }
      >
        {children}
      </button>
    </>
  );
}

export default Button;

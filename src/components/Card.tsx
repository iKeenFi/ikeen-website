import React, { AllHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

function Card(props: AllHTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={'p-4 bg-gray-800 rounded-xl ' + props.className}>
      {props.children}
    </div>
  );
}

export default Card;

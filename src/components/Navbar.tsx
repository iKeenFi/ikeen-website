import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import LinkButton from './Button';

interface NavbarProps {}

function Navbar({}: NavbarProps) {
  let location = useLocation();
  return (
    <div className="flex flex-row flex-grow gap-x-2 justify-center items-center p-4 min-w-full text-white bg-gray-800 sm:justify-start">
      <img src={Logo} className="inline-block w-12 sm:w-10" alt="" />
      <span className="text-2xl font-bold sm:text-xl sm:inline-flex">
        iKeen Finance
      </span>
      {location.pathname !== '/' && <LinkButton href="/" text="Go to Home" />}
    </div>
  );
}

export default Navbar;

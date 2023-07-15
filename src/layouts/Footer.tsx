import React from 'react';
import logo from '@/assets/images/book_logo.png';
import { RiFacebookBoxFill, RiInstagramLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#242630] text-secondary p-20">
      <div className="flex justify-between">
        <Link to="/">
          <div className="cursor-pointer">
            <img src={logo} height={50} width={50} alt="Book catalog logo" />
          </div>
        </Link>
        <div className="flex gap-20">
          <ul className="space-y-2">
            <li>All Books</li>
            <li>Favourite list</li>
            <li>Ho to borrow books</li>
          </ul>
          <ul className="space-y-2">
            <li>About us</li>
            <li>Careers</li>
          </ul>
          <ul className="space-y-2">
            <li>List your gear</li>
            <li>Contact team</li>
          </ul>
        </div>
        <div className="flex gap-2 text-2xl">
          <RiFacebookBoxFill />
          <RiInstagramLine />
        </div>
      </div>
      <div className="flex w-full mt-20 gap-5">
        <p>Privacy Policy</p>
        <p>Terms & Condition</p>
        <p className="ml-auto"> &#169; Sajid Hasan {year}</p>
      </div>
    </div>
  );
}

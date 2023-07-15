import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';
import { HiOutlineSearch } from 'react-icons/hi';
import Cart from '../components/Cart';
import logo from '../assets/images/book_logo.png';

export default function Navbar() {
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div className="cursor-pointer">
            <img src={logo} height={50} width={50} alt="Book catalog logo" />
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/All Books">Products</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Sign In</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/All Books">Sign Up</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

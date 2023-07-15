import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import logo from '../assets/images/book_logo.png';
import Cookies from 'js-cookie';

export default function Navbar() {
  const userToken = Cookies.get('token');
  const userName = Cookies.get('name');
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
                  <Link to="/signup">Signup</Link>
                </Button>
              </li>
              {!userToken ? (
                <li>
                  <Button variant="link" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                </li>
              ) : (
                <li>
                  <Button variant="link" asChild>
                    <Link to="/All Books">LogOut</Link>
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

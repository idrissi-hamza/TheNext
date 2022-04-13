import { Link } from "react-router-dom";

import Logo from "../asset/logo.svg";
import Button from "./Button";

export default function App() {
  return (
    <nav className="w-full py-2 pl-4 pr-10 border-b-2">
      <ul className="flex mx-auto items-center justify-center space-x-4 ">
        <li className="mr-auto">
          <Link to="/" className="flex flex-col justify-center items-center">
            <img src={Logo} className="w-8  -mb-1  invert-[.25]"></img>
            <span className="text-sm">TheNext</span>
          </Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Button title={'Logout'} />
        </li>
      </ul>
    </nav>
  );
}

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import Logo from "../asset/logo.svg";
import Button from "./Button";
import CtrlNavbar from "./CtrlNavbar";

export default function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <nav className="w-full py-2 pl-4 pr-10 border-b border-b-slate-400 bg-slate-200   ">
      <ul className="flex mx-auto items-center  space-x-4 ">
        <li className="mr-auto flex items-center">
          <div className="flex">
            <Link to="/" className="flex flex-col justify-center items-center">
              <img src={Logo} className="w-8  -mb-1  invert-[.25]"></img>
              <span className="text-sm">TheNext</span>
            </Link>
          </div>

          {user && (
            <CtrlNavbar/>
          )}
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>hello, {user.displayName}</li>
            <li>
              <Button title={"Logout"} onClick={logout} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

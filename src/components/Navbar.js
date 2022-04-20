import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { LogoutIcon } from "@heroicons/react/outline";
import Logo from "../asset/logo.svg";
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
              <img src={Logo} alt='logo' className="w-8  -mb-1  invert-[.25]"></img>
              <span className="text-sm">TheNext</span>
            </Link>
          </div>

          {user && <CtrlNavbar />}
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
              <button className="flex items-center justify-center space-x-1">
                <LogoutIcon
                  onClick={logout}
                  className="group-hover:text-red-500 w-6 h-6 text-gray-600"
                />
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

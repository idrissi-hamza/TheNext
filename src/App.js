import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/login/login";
import Signup from "./routes/signup/signup";
import Home from "./routes/home/home";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <div className="flex flex-col h-screen ">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;

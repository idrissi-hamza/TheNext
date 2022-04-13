import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/login/login";
import Signup from "./routes/signup/signup";
import Home from "./routes/home/home";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady } = useAuthContext();
  return (
    <>
    {authIsReady && (<BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>)}
    </>
  );
}

export default App;

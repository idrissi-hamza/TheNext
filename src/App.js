import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/login/login";
import Signup from "./routes/signup/signup";
import Home from "./routes/home/home";
import Navbar from "./components/Navbar";
import Tasks from "./routes/tasks/Tasks";
import Sidebar from "./components/sidebar/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <div className="flex flex-col h-screen
           ">
            {user && <Navbar />}
            <div className="flex h-full ">
              {user && <Sidebar />}
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
                <Route
                  path="*"
                  element={
                    <main className="p-10">
                      <p>There's nothing here!</p>
                    </main>
                  }
                />
                <Route
                  path="tasks/:id"
                  element={user ? <Tasks /> : <Navigate to="/signup" />}
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;

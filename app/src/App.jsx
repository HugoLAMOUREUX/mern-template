import { ENVIRONMENT, API_URL } from "./config";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./services/api";
import { setUser } from "./redux/auth/authAction";
import Auth from "./scenes/auth";
import Loader from "./components/Loader";
import Home from "./scenes/home";

const AuthLayout = () => (
  <div className="flex min-h-screen w-screen flex-col bg-gray-50">
    <div className="flex-1">
      <Outlet />
    </div>
  </div>
);

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.post("/user/login_token");
        if (!res.user) return setLoading(false);
        if (res.token) api.setToken(res.token);
        dispatch(setUser(res.user));
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/auth/login" />;

  return (
    <div className="flex min-h-screen w-screen flex-col bg-gray-50">
      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/auth/*" element={<Auth />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

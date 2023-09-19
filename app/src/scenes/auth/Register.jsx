import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { setUser } from "../../redux/auth/authAction";
import api from "../../services/api";

const Register = () => {
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);

  const submit = async () => {
    try {
      setLoading(true);
      const { user, token } = await api.post(`/user/register`, values);
      setLoading(false);
      if (token) api.setToken(token.toString());
      if (user) dispatch(setUser(user));
    } catch (e) {
      toast.error(e?.code || "Error");
      setLoading(false);
      console.log("e", e);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <div className="m-5 mx-auto mt-10 w-full md:w-1/2 p-14 rounded-md bg-white font-myfont border border-gray-300">
      <div className="font-[Helvetica] text-center text-3xl font-semibold text-primary">Register</div>
      <div className="my-4" />
      <div>
        <div className="flex gap-4 mb-6">
          <div className="flex flex-1 flex-col-reverse">
            <input
              placeholder="John"
              className="peer bg-transparent outline-0 block w-full p-2.5 rounded-sm border border-gray-300 text-gray-800 leading-tight focus:outline-none focus:border-primary focus:border "
              name="firstName"
              type="text"
              id="firstName"
              value={values.firstName}
              onChange={(e) => setValues({ ...values, firstName: e.target.value })}
            />
            <label className="peer-focus:text-primary" htmlFor="firstName">
              First name
            </label>
          </div>
          <div className="flex flex-1 flex-col-reverse">
            <input
              placeholder="Doe"
              className="peer bg-transparent outline-0 block w-full p-2.5 rounded-sm border border-gray-300 text-gray-800 leading-tight focus:outline-none focus:border-primary focus:border "
              name="lastName"
              type="text"
              id="lastName"
              value={values.lastName}
              onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            />
            <label className="peer-focus:text-primary" htmlFor="lastName">
              Last name
            </label>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex flex-col-reverse">
            <input
              placeholder="example@domain.com"
              className="peer bg-transparent outline-0 block w-full p-2.5 rounded-sm border border-gray-300 text-gray-800 leading-tight focus:outline-none focus:border-primary focus:border "
              name="email"
              type="email"
              id="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <label className="peer-focus:text-primary" htmlFor="email">
              E-mail
            </label>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex flex-col-reverse">
            <input
              placeholder="password"
              className="peer bg-transparent outline-0 block w-full p-2.5 rounded-sm border border-gray-300 text-gray-800 leading-tight focus:outline-none focus:border-primary focus:border "
              name="password"
              type="password"
              id="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
            <label className="peer-focus:text-primary" htmlFor="password">
              Password
            </label>
          </div>
        </div>
        <button
          disabled={loading || !values.email || !values.password}
          className="disabled:cursor-not-allowed disabled:opacity-40 bg-blue-700 outline-0 block w-full p-2.5 rounded-sm text-white leading-tight hover:bg-blue-400"
          onClick={submit}>
          Register
        </button>
        <hr className="my-5" />
        <div className="text-center text-sm text-gray-600">Already have an account ?</div>
        <div className="text-center">
          <Link className="text-primary hover:underline" to="/auth/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

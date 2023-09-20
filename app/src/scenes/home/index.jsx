import React from "react";
import api from "../../services/api";

const Home = () => {
  return (
    <div className="p-4">
      <h3 className="text-base font-semibold leading-6 text-black mb-2">Hello there 👋</h3>
      <p>Start creating your new app !</p>
      <button
        onClick={async () => {
          const res = await api.post("/user/login_token");
        }}>
        test
      </button>
    </div>
  );
};

export default Home;

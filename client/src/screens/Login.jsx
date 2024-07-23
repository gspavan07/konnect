import React, { useState } from "react";
import { Link } from "react-router-dom";

import { SiLiberadotchat } from "react-icons/si";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section className="items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex flex-col text-center items-center mb-6 text-2xl font-semibold text-white"
        >
          <SiLiberadotchat className="w-8 h-8 mr-2" />
          Konnect
        </Link>
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-[#242424]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 text-white"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="flex justify-end items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 text-white"
                    required=""
                  />
                  {showPassword ? (
                    <LuEye
                      className="absolute m-3"
                      onClick={() => {
                        setShowPassword(false);
                      }}
                    />
                  ) : (
                    <LuEyeOff
                      className="absolute m-3"
                      onClick={() => {
                        setShowPassword(true);
                      }}
                    />
                  )}
                </div>
              </div>
              <button className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#2563eb] hover:bg-#1d4ed8] focus:ring-[#1e40af]">
                Login
              </button>
              <p className="text-sm text-center font-light text-gray-400">
                Don{"'"}t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium hover:underline text-[#3b82f6]"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

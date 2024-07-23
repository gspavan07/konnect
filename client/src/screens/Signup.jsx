import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiLiberadotchat } from "react-icons/si";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const confirmPasswordRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    const confirmPassword = confirmPasswordRef.current.value;

    setErrors({});
    setErrorText("");

    if (confirmPassword !== password) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: true }));
      setErrorText("Confirm Password does not match password");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const json = await res.json();

      if (json.success) {
        navigate("/");
      } else {
        const errorMapping = {
          USERNAME_EXISTS: "Username already exists",
          "auth/email-already-in-use": "Email already in use",
          "auth/weak-password": "Password is too weak",
        };

        setErrorText(errorMapping[json.errorCode] || "An error occurred");
        setErrors((prevErrors) => ({ ...prevErrors, [json.errorCode]: true }));
      }
    } catch (error) {
      setErrorText("An error occurred while signing up");
    }
  };

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
          <form
            className="p-6 space-y-4 md:space-y-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight md:text-2xl text-white">
              Create an account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={`border text-sm rounded-lg block w-full p-2.5 ${
                    errors.USERNAME_EXISTS
                      ? "border-red-600"
                      : "border-gray-600"
                  } text-white`}
                  placeholder="name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`border text-sm rounded-lg block w-full p-2.5 ${
                    errors["auth/email-already-in-use"]
                      ? "border-red-600"
                      : "border-gray-600"
                  } text-white`}
                  placeholder="name@company.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="flex justify-end items-center relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`border text-sm rounded-lg block w-full p-2.5 ${
                      errors["auth/weak-password"]
                        ? "border-red-600"
                        : "border-gray-600"
                    } text-white`}
                    required
                    onChange={handleChange}
                  />
                  {showPassword ? (
                    <LuEye
                      className="absolute m-3 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <LuEyeOff
                      className="absolute m-3 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm password
                </label>
                <div className="flex justify-end items-center relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className={`border text-sm rounded-lg block w-full p-2.5 ${
                      errors.confirmPassword
                        ? "border-red-600"
                        : "border-gray-600"
                    } text-white`}
                    required
                    ref={confirmPasswordRef}
                  />
                  {showPassword ? (
                    <LuEye
                      className="absolute m-3 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <LuEyeOff
                      className="absolute m-3 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border text-sm rounded-lg block p-2.5 border-gray-600 text-white"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-300">
                    I accept the{" "}
                    <Link
                      className="font-medium hover:underline text-[#3b82f6]"
                      to="/terms"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-[#1e40af]"
              >
                Create an account
              </button>
              {errorText && (
                <p className="text-red-500 text-xs italic mt-2">{errorText}</p>
              )}
              <p className="text-sm text-center font-light text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium hover:underline text-[#3b82f6]"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;

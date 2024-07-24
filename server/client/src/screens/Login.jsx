import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiLiberadotchat } from "react-icons/si";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Toaster, toast } from "sonner";

const Login = () => {
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    localStorage.getItem("accessToken")
      ? (toast.success("Already logged in!"),
        setTimeout(() => {
          navigate("/");
        }, 2000))
      : null;
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText("");
    const { username, password } = formData;
    // Perform form validation
    if (!formData.username || !formData.password) {
      setErrorText("All fields are required.");
      return;
    }
    try {
      console.log(formData);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("accessToken", json.accessToken);
        navigate("/");
      } else {
        const errorMapping = {
          "auth/invalid-credential": "Please enter a valid credential.",
        };

        setErrorText(errorMapping[json.errorCode] || "An error occurred");
      }
    } catch (error) {
      setErrorText("An error occurred while login");
    }
    // Redirect to the home page
  };
  return (
    <>
      <Toaster richColors />

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
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 text-white"
                    placeholder="name@company.com"
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
                  <div className="flex justify-end items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 text-white"
                      onChange={handleChange}
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
                <button
                  type="submit"
                  className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#2563eb] hover:bg-#1d4ed8] focus:ring-[#1e40af]"
                >
                  Login
                </button>
                {errorText && (
                  <p className="text-red-500 text-xs italic mt-2">
                    {errorText}
                  </p>
                )}
                <p className="text-sm text-center font-light text-gray-400">
                  Don{"'"}t have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium hover:underline text-[#3b82f6]"
                  >
                    Create one here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

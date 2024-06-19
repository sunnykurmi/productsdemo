import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { RiCloseLine } from "@remixicon/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignin } from "../store/Actions/userActions";

function Login() {
  const navigate = useNavigate();
  const { isAuth, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [studentFormData, setStudentFormData] = useState({
    studentemail: "",
    studentpassword: "",
  });

  const handleStudentChange = (e) => {
    setStudentFormData({ ...studentFormData, [e.target.name]: e.target.value });
  };

  //(studentFormData);
  const signinStudent = async (event) => {
    event.preventDefault();
    dispatch(asyncsignin(studentFormData));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate]);
  return (
    <div>
    

      <div className="login__form">
        <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
          <form className="w-full max-w-lg p-4 md:p-10 shadow-md">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-blue-900">
                Welcome Back
              </h2>
              <p className="text-gray-500">
                Log in to continue to your account
              </p>
            </div>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={studentFormData.email}
                onChange={handleStudentChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
         
              ></input>
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={studentFormData.password}
                onChange={handleStudentChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            
              ></input>
            </div>
            <div className="items-center">
              <div>
                <button
                  type="submit"
                  onClick={signinStudent}
                  className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Log In
                </button>
              </div>
              <br />
              <div className="relative">
                <div className="absolute left-0 right-0 flex justify-center items-center">
                  <div className="border-t w-full absolute"></div>
                 
                </div>
              </div>
              <div className="flex flex-wrap justify-center my-3 w-full mt-12">
                <a
                  className="inline-block align-baseline font-medium text-md text-brand hover:text-blue-800 text-right"
                  href="/signup"
                >
                  Create an account
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-slate-50 flex flex-col mx-auto w-full max-w-lg px-4">
        <small className="text-slate-600">test user details</small>
        <small className="text-slate-600">Email: user1@example.com</small>
        <small className="text-slate-600">Password: password1</small>
      </div>

    </div>
  );
}

export default Login;

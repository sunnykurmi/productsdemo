import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncsignup } from "../store/Actions/userActions";

function Signup() {
  const navigate = useNavigate();
  const { isAuth, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formValid, setFormValid] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signupuser = async (event) => {
    event.preventDefault();
    dispatch(asyncsignup(formData));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate]);
  useEffect(() => {
    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setFormValid(isFormValid);
  }, [formData]);
  return (
    <div>


      <div className="register__form">
        <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
          <form action="#">
            <div className="w-full max-w-lg p-4 shadow-md md:p-10">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-extrabold text-blue-900">
                  Join the Adventure!
                </h2>
                <p className="text-gray-500">
                  Create your account and start your journey with us
                </p>
              </div>
              <div className="flex flex-wrap mb-6 -mx-3">
                
               
              </div>
              <div className="mb-6">
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                ></input>
              </div>
              
              <div className="mb-6">
                <input
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                ></input>
              </div>
              
              <div className="flex items-center w-full my-3">
                <button
                  type="submit"
                  onClick={signupuser}
                  disabled={!formValid}
                  className="w-full  px-4 py-2 font-bold text-white rounded bg-blue-900 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
                  Register
                </button>
              </div>
              <a
                className="inline-block w-full text-lg text-center text-gray-500 align-baseline hover:text-blue-800"
                href="/login"
              >
                Back to login
              </a>
            </div>
          </form>
        </div>
      </div>


    </div>
  );
}

export default Signup;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asynccurrentUser } from "../store/Actions/userActions";

export default function Purchase() {
    const dispatch = useDispatch();
    const [products, setproducts] = useState([]);
    const {id} = useParams();
    console.log(id);
    const { user } = useSelector((state) => state.user);
  
    useEffect(() => {
      dispatch(asynccurrentUser());
    }, [dispatch]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          setproducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchData();
    }, []);
  

    console.log(products);


const checkouthandler = async (price) => {
    const {data:key} = await axios.get("http://localhost:9090/key");
    const {data} = await axios.post("http://localhost:9090/checkout", {price});
    console.log(data);
    const options = {
        key: key.key, // Enter the Key ID generated from the Dashboard
        amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Hello User",
        description: "Test Transaction",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvts5aHBstDkR8PigS4RmZkbZy78zpZoSuOw&s",
        order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:9090/paymentverify",
        handler: function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        prefill: {
            name: "Test User",
            email: "Testuser@example.com",
            contact: "9000090000"
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#3399cc"
        }
    };
    const  razor = new window.Razorpay(options);
        razor.open();
    
        
}


    if (!products) {
        return <div>Loading...</div>;
      }


  return (
    <div className="">
          <div className="flex justify-between items-center p-5">
        <h1 className="text-3xl font-semibold text-slate-900">Products</h1>
        <div className="flex items-center">
          <p className="text-slate-900 mr-2">Hello, {user?.email}</p>
          <button className="bg-slate-900 text-white px-3 py-1 rounded-md">
            <a href="/">
            
            Sign out
            </a>

          </button>
        </div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5   ">
       
      <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a
          className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
         
        >
          <img
            className="object-cover"
            src={products.image}
            alt="product image"
          />
         
        </a>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight text-slate-900">
              {products.title}
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-2xl font-bold text-slate-900">{products.price} Rs</span>
            </p>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                {products.rating?.rate}
              </span>
            </div>
          </div>
          <button
          onClick={()=>checkouthandler(products.price)}
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            
            Buy Now
        
          </button>
        </div>
      </div>
          

      </div>
    </div>
  )
}

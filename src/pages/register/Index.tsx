import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import LoginImage from "../../../assets/loginPageImage/register.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { loginPassword, registration } from "@/api/Reqest";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  }:any = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data: any) => {
    localStorage.clear();
    const { username, password , name , phone , email , cmppassword} = data;
    try {

      if (password == cmppassword ) {
        
        setLoading(true);
        setError("");
        const response: any = await registration({ username, password , name , phone , email  });
        if (response?.data?.id) {
          
          const response: any = await loginPassword({ username, password });
          if (response?.data?.accessToken) {
            const token = response?.data?.accessToken;
            toast.success("Create account successful!");
            localStorage.setItem("customer_login_auth", JSON.stringify(response.data));
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // console.log("Success toast about to trigger");

            navigate("/");
          } else {
            toast.error(response?.data?.message || "Create account failed.");
            // console.log("response?.data?.message", response?.data?.message);
          }
        } else {
          toast.error(response?.data?.message || "Create account failed.");
          // console.log("response?.data?.message", response?.data?.message);
        }
      }else{
        toast.error("Password and confirm password did not match.");
      }
    } catch (error:any) {
      toast.error( error?.response?.data?.message ||  "Create account failed.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto  min-h-screen">
      <ToastContainer />
      <div className=" flex items-center justify- space-x-1 my-2 opacity-90 ml-40">
        <FaArrowLeftLong />
        <Link to={"/"} className="font-semibold">
          Homepage
        </Link>
      </div>
      <div className="container mx-auto  flex justify-center sm:flex-col lg:flex-row">
        {/* left side */}
        <div className="flex sm:flex-row rounded-[25px]">
          <img
            className="w-full sm:min-w-[500px] md:max-w-[800px] lg:max-w-[600px] object-cover object-center text-white rounded-tl-3xl rounded-bl-3xl"
            src={LoginImage}
            alt="Login Visual"
          />
        </div>
        {/* right side*/}
        <div className="sm:min-[150px]  lg:w-[600px]  border-2 bg-[#016E69] border-none text-white rounded-tr-3xl rounded-br-3xl">
          <div className="mt-32">
            <h3 className="font-semibold mb-4 text-center text-3xl mr-20">
              Create Your Account
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ml-24 w-[432px]">
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  placeholder="Username"
                  className="w-full h-[64px] mt-4  p-2 border border-gray-400 rounded-lg  text-black"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}

                <input
                  type="text"
                  {...register("name", { required: "name is required" })}
                  placeholder="Name"
                  className="w-full h-[64px] mt-4  p-2 border border-gray-400 rounded-lg  text-black"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}

                <input
                  type="text"
                  {...register("phone", { required: "Phone is required" })}
                  placeholder="Mobile"
                  className="w-full h-[64px] mt-4  p-2 border border-gray-400 rounded-lg  text-black"
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}

                <input
                  type="text"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                  className="w-full h-[64px] mt-4  p-2 border border-gray-400 rounded-lg  text-black"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                <div className="flex justify-center relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-[64px]  mt-4  p-2 border border-gray-400 rounded-lg  text-black"
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute mt-10 right-3 text-black cursor-pointer"
                    />
                  ) : (
                    <FaRegEye
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute mt-10 right-3 text-black cursor-pointer"
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}

                <div className="flex justify-center relative">
                  <input
                    {...register("cmppassword", {
                      required: "Retype Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Retype Password"
                    className="w-full h-[64px]  mt-4  p-2 border border-gray-400 rounded-lg  text-black"
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute mt-10 right-3 text-black cursor-pointer"
                    />
                  ) : (
                    <FaRegEye
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute mt-10 right-3 text-black cursor-pointer"
                    />
                  )}
                </div>
                {errors.cmppassword && (
                  <p className="text-red-500">{errors.cmppassword.message}</p>
                )}

                <div className="flex space-x-1 mt-5">
                  <input className="w-6 h-6 rounded-lg" type="checkbox" />
                  <p className="leading-6">Remember me</p>
                </div>
                <button
                  type="submit"
                  className="w-[432px] h-[64px] mt-28 rounded-md bg-[#ffcc1d] text-black font-bold"
                >
                  {loading ? "Loading..." : "Create Your Account"}
                </button>
                {error && (
                  <p className="text-red-500 text-center mt-4">{error}</p>
                )}
                <p className="text-center mt-5 mb-10">
                  Already have an account?{" "}
                  <Link to={"/login"}>
                    <span className="text-[#ffcc1d] underline cursor-pointer">
                      {" "}
                      Login{" "}
                    </span>
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

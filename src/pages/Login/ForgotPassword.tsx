import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import LoginImage from "../../../assets/loginPageImage/register.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  forgetPasswordOptSend,
  forgetPasswordOptValidate,
  resetPassword,
} from "@/api/Reqest";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { permission_details, validatePassword } from "@/utils";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setshowOtp] = useState(false);
  const [showReset, setshowReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpData, setotpData] = useState<any>({});
  const [key, setkey] = useState();
  const [error, setError] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();

  console.log(`otpData`, otpData);

  const onSubmit = async (data: any) => {
    localStorage.clear();
    const { username, otp, password, confirmPassword } = data;

    try {
      setLoading(true);
      setError("");
      if (showOtp) {
        if (!showReset) {
          const { data } = await forgetPasswordOptValidate({ otp, key });
          setotpData(data);
          setLoading(false);
          toast.success("Otp Match successful!");
          setshowReset(true);
        } else {
          const newObj: any = {
            password,
            confirmPassword,
            username: key,
          };
          await resetPassword(newObj, otpData.accessToken);
          toast.success("Password Reset successful!");

          


          const token =otpData?.accessToken;
        // toast.success("Login successful!");
        localStorage.setItem(
          "customer_login_auth",
          JSON.stringify(otpData),
        );
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setTimeout(() => {
          window.location.href = window.location.origin + "/admin";
        }, 500);

        }
      } else {
        setkey(username);
        await forgetPasswordOptSend({ username });
        setshowOtp(true);
        toast.success("Otp sent successful!");
        setLoading(false);
      }

      // if (response?.data?.accessToken) {
      //   const token = response?.data?.accessToken;
      //   toast.success("Otp sent successful!");
      //   // localStorage.setItem(
      //   //   "customer_login_auth",
      //   //   JSON.stringify(response.data),
      //   // );

      // } else {
      //   toast.error(response?.data?.message || "Login failed.");
      //   // console.log("response?.data?.message", response?.data?.message);
      // }
    } catch (error) {
      console.log("Error toast about to trigger", error);
      toast.error(error?.response?.data?.message || "Server is busy");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="container mx-auto flex justify-center items-center h-screen md:overflow-auto lg:overflow-hidden xl:overflow-hidden">
        <div className="flex justify-center items-center  xxxs:flex-col xxs:flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row p-5 w-full h-min">
          {/* Left side */}
          <div className="flex flex-1 justify-center items-center rounded-[25px] xs:flex-col md:flex-row lg:flex-row">
            <img
              className="
              xxxs:min-w-full
              xxs:min-w-full
              xs:min-w-full
              md:min-w-full
              lg:min-w-full
              xl:min-w-full
              md:h-[350px]
              lg:h-[507px]
              h-full
              object-cover object-center text-white
      xl:rounded-tl-3xl
      xl:rounded-bl-3xl

      lg:rounded-none
      md:rounded-tr-3xl
      md:rounded-tl-3xl
      sm:rounded-tr-3xl
      sm:rounded-tl-3xl
      xs:rounded-tr-3xl
      xs:rounded-tl-3xl
    xxs:rounded-tr-3xl
    xxs:rounded-tl-3xl
    xxxs:rounded-tr-3xl
    xxxs:rounded-tl-3xl"
              src={LoginImage}
              alt="Login Visual"
            />
          </div>
          {/* Right side */}
          <div
            className="flex flex-1 flex-col justify-center items-center border-2 bg-primaryColor border-none text-white
          xxxs:rounded-br-3xl
          xxxs:rounded-bl-3xl
          xxs:rounded-br-3xl
          xxs:rounded-bl-3xl
          xs:rounded-br-3xl
          xs:rounded-bl-3xl
          sm:rounded-none
          md:rounded-br-3xl
          md:rounded-bl-3xl
          lg:rounded-none
          xl:rounded-tr-3xl
          xl:rounded-br-3xl
          xs:h-min
          md:h-[650px]
          lg:h-[508px]
          xl:h-[508px]
          xxs:w-full
          xxxs:w-full
          md:w-[567px]

          "
          >
            <div className="  xxxs:px-3 xxxs:py-4  xxs:px-3 xxs:py-4   xs:px-5 xs:py-8  sm:pb-10  md:px-5 md:py-0  lg:px-10  xl:px-10 xxs:w-full xs:w-[385px] sm:w-[600px] md:w-[565px] lg:w-full xl:w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3
                  className="font-semibold text-center xs:mt-0 sm:mt-5 md:mt-2 lg:mt-0 xl:mt-0
                xs:text-base
                sm:text-lg
                md:text-xl
                lg:text-3xl
                xl:text-3xl"
                >
                  Forget Password: {showOtp ? "Enter Otp" : "Enter Email/Phone"}
                </h3>
                <div className="w-full">
                  {/* username */}

                  {!showOtp ? (
                    <div className="my-5">
                      <input
                        maxLength={50}
                        type="text"
                        {...register("username", {
                          required: "Username is required",
                        })}
                        placeholder="Email/Mobile"
                        className="  xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-full lg:w-full xl:w-full  xxxs:px-2 xxs:px-2 xxxs:py-1 xxs:py-1 xs:px-2 xs:py-1 sm:p-3 md:p-3 lg:p-5 xl:p-5 border border-gray-400 rounded-lg text-black"
                      />
                      {errors?.username && (
                        <p className="text-white font-semibold">
                          {errors?.username?.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      {showReset ? (
                        <div className="my-5 ">
                          {/* password */}
                          <div className="flex justify-center relative mb-2">
                            <input
                              {...register("password", {
                                required: "Password is required",
                              })}
                              onChange={(e: any) => {
                                const msg = validatePassword(e.target.value);
                                setErrormsg(msg);
                              }}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="xxxs:w-full xxs:w-full  xs:w-full md:w-full lg:w-full xl:w-full    xxxs:px-3 xxxs:py-1 xxs:px-3 xxs:py-1 xs:px-3 xs:py-1 sm:p-3 md:p-3 lg:p-5 xl:p-5 border border-gray-400 rounded-lg text-black"
                            />
                            {showPassword ? (
                              <FaRegEyeSlash
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute
                        xxxs:mt-2 xxxs:right-3
                        xxs:mt-2 xxs:right-3
                        xs:mt-2 xs:right-3
                        sm:mt-4 sm:right-3
                        md:mt-5 md:right-3
                        lg:mt-6 lg:right-3
                        xl:mt-6 xl:right-3
                        text-black cursor-pointer"
                              />
                            ) : (
                              <FaRegEye
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute
                        xxxs:mt-2 xxxs:right-3
                        xxs:mt-2 xxs:right-3
                        xs:mt-2 xs:right-3
                        sm:mt-4 sm:right-3
                        md:mt-5 md:right-3
                        lg:mt-6 lg:right-3
                        xl:mt-6 xl:right-3
                        text-black cursor-pointer"
                              />
                            )}
                          </div>

                          <div className="flex justify-center relative">
                            <input
                              {...register("confirmPassword", {
                                required: "Confirm Password is required",
                              })}
                              onChange={(e: any) => {
                                const msg = validatePassword(e.target.value);
                                setErrormsg(msg);
                              }}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="xxxs:w-full xxs:w-full  xs:w-full md:w-full lg:w-full xl:w-full    xxxs:px-3 xxxs:py-1 xxs:px-3 xxs:py-1 xs:px-3 xs:py-1 sm:p-3 md:p-3 lg:p-5 xl:p-5 border border-gray-400 rounded-lg text-black"
                            />
                            {showPassword ? (
                              <FaRegEyeSlash
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute
                        xxxs:mt-2 xxxs:right-3
                        xxs:mt-2 xxs:right-3
                        xs:mt-2 xs:right-3
                        sm:mt-4 sm:right-3
                        md:mt-5 md:right-3
                        lg:mt-6 lg:right-3
                        xl:mt-6 xl:right-3
                        text-black cursor-pointer"
                              />
                            ) : (
                              <FaRegEye
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute
                        xxxs:mt-2 xxxs:right-3
                        xxs:mt-2 xxs:right-3
                        xs:mt-2 xs:right-3
                        sm:mt-4 sm:right-3
                        md:mt-5 md:right-3
                        lg:mt-6 lg:right-3
                        xl:mt-6 xl:right-3
                        text-black cursor-pointer"
                              />
                            )}
                          </div>

                          {errors.password && (
                            <p className="text-white font-semibold">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="my-5">
                          <input
                            maxLength={50}
                            type="number"
                            {...register("otp", {
                              required: "otp is required",
                            })}
                            placeholder="Enter Your Otp"
                            className="  xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-full lg:w-full xl:w-full  xxxs:px-2 xxs:px-2 xxxs:py-1 xxs:py-1 xs:px-2 xs:py-1 sm:p-3 md:p-3 lg:p-5 xl:p-5 border border-gray-400 rounded-lg text-black"
                          />
                          {errors?.otp && (
                            <p className="text-white font-semibold">
                              {errors?.otp?.message}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  <p className="text-red-50">{errormsg}</p>

                  <button
                    type="submit"
                    animate-spin
                    className="xxxs:w-full xxs:w-full xs:w-full sm:w-full md:w-full lg:w-full xl:w-full xs:p-1 sm:p-2 my-5 rounded-md bg-darkYellow text-black font-bold bg-logoBg"
                  >
                    {loading ? "Loading..." : "Send"}
                  </button>
                  {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                  )}

                  <div className="flex items-center space-x-1 mt-5">
                    <Link to={"/login"}>Login?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </motion.div>
  );
};

export default ForgotPassword;

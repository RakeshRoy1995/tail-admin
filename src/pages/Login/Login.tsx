import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { get_all_data, loginPassword } from "@/api/Reqest";
import axios from "axios";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setrememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  const onSubmit = async (data: any) => {
    localStorage.clear();
    const { username, password } = data;

    try {
      setLoading(true);
      setError("");
      const response: any = await loginPassword({ username, password });
      console.log(`response`, response);
      if (response?.data?.access_token) {
        localStorage.setItem("AI_model", "gpt-4");
        const token = response?.data?.access_token;
        toast.success("Login successful!");
        localStorage.setItem(
          "customer_login_auth",
          JSON.stringify(response.data),
        );
        localStorage.setItem("token", token);

        const roleData: any = await get_all_data(
          "user-role/user/" + response.data?.id,
        );
        localStorage.setItem("current_role", JSON.stringify(roleData.data[0]));

        if (roleData.data[0]?.id) {
          const aiModel: any = await get_all_data(
            "ai-model",
          );
          localStorage.setItem("AI_model", aiModel.data[0]?.code);
          localStorage.setItem("all_aiModel", JSON.stringify(aiModel.data));
          localStorage.setItem("all_role", JSON.stringify(roleData.data));
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (rememberMe) {
          setCookie("username", { username, password }, 7);
        }
        setTimeout(() => {
          window.location.href = window.location.origin + "/admin";
        }, 500);
      } else {
        toast.error(response?.data?.message || "Login failed.");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error toast about to trigger", error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Login failed.");
      
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="wrapper">
        <div className="section-two" />
        <div className="section-one">
          <div className="container">
            <div className="row login-wrapper">
              <div className="col-lg-7 col-12">
                <div className="welcome">
                  <h3>Welcome to</h3>
                  <h1>Institutional Innovation &amp; Design Tool</h1>
                </div>
              </div>
              <div className="col-lg-5 col-12">
                <div className="login-form">
                  <p>
                    <a href="#">
                      <i className="fa fa-chevron-left" aria-hidden="true" />{" "}
                      Cancel{" "}
                    </a>
                  </p>
                  <div className="inner-logo">
                    <a className="center-img" href="#">
                      <img
                        src="/public/asset/assets/img/trbglogo.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="inner-form">
                    <h4>Login</h4>
                    <hr />
                    <p>Enter your Email and Password for sign up/login.</p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        maxLength={50}
                        {...register("username", {
                          required: "Username is required",
                        })}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address"
                      />
                      {errors?.username && (
                        <p className="text-white font-semibold">
                          {errors?.username?.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                        {...register("password", {
                          required: "Password is required",
                        })}
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter Password"
                      />
                    </div>
                    <button type="submit" className="btn" disabled={loading}>
                      Continue {loading && (
                        <i className="fa fa-spinner fa-spin" aria-hidden="true" />)}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="row section-three">
                  <div className="image-wrap">
                  <img src="asset/assets/img/l-img1.png" alt="" />
                  <img src="asset/assets/img/l-img2.png" alt="" />
                  <img src="asset/assets/img/l-img3.png" alt="" />
                  <img src="asset/assets/img/l-img4.png" alt="" />
                  <img src="asset/assets/img/l-img5.png" alt="" />
                  </div>
              </div>

          </div>
        </div>
        {/* <div className="section-three">
          <div className="container">
            <div className="row">
              <div className="image-wrap">
                <img src="asset/assets/img/l-img1.png" alt="" />
                <img src="asset/assets/img/l-img2.png" alt="" />
                <img src="asset/assets/img/l-img3.png" alt="" />
                <img src="asset/assets/img/l-img4.png" alt="" />
                <img src="asset/assets/img/l-img5.png" alt="" />
              </div>
            </div>
          </div>
        </div> */}
        <footer className="footer text-center login-footer">
          <div className="container">
            <div className="row">
              {/* Footer Location*/}
              <div className="col-lg-6 col-md-6 col-4">
                <div className="footer-logo ">
                  <img src="asset/assets/img/footer-logo.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-8">
                <div className="copyright text-right text-white">
                  <p>All rights reserved © 2025</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

import React, { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Config/Axios/Axios";
import { UserContext } from "../../../App";
import { EyeIcon, EyeClosedIcon } from "@primer/octicons-react";
import { MailFilled, PhoneFilled } from "@ant-design/icons";
import { Ring } from "@uiball/loaders";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { GoogleLogin } from "@react-oauth/google";

const Login = ({ setauthenticated }) => {
  const [email, setemail] = useState("");
  const [pswd, setpswd] = useState("");
  const [loading, setloading] = useState(false);
  const [viewPassword, setviewPassword] = useState(false);
  const [err, seterr] = useState("");

  const { setUser } = useContext(UserContext);

  const nav = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     console.log(decodedToken); // Log the decoded token if needed
  //     setUser(decodedToken);
  //   }
  // }, []);

  // const login = (credentialResponse) => {
  //   console.log(credentialResponse);
  //   const decodedCredentials = jwtDecode(credentialResponse.credential);
  //   console.log(decodedCredentials);

  //   setUser(decodedCredentials);
  //   localStorage.setItem("token", credentialResponse.credential);
  // };



  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     setUser(decodedToken);
  //   }
  // }, []);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
        Axios.post("/api/v1/app/auth/whoami", {}, {
            headers: {
                'authorization': `beare ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
              console.log(res);
              
                    setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err);
                seterr("Session Expired! login again...")
                sessionStorage.removeItem("token")
            })
    }
}, [])

  const login = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      // Send token to backend for verification
      const response = await Axios.post("/api/v1/app/auth/signUpWithGoogle", { token });
    
      // Handle successful login
      const { user, token: newToken } = response.data;

      setUser(user);
      localStorage.setItem("token", newToken);
      nav("/dashboard"); // Redirect to dashboard or home page
    } catch (error) {
      console.error("Login Failed:", error);
      seterr("Login Failed. Please try again.");
    }
  };
  //   useEffect(
  //     () => {
  //         if (user) {
  //             axios
  //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //                     headers: {
  //                         Authorization: `Bearer ${user.access_token}`,
  //                         Accept: 'application/json'
  //                     }
  //                 })
  //                 .then((res) => {
  //                     setProfile(res.data);
  //                 })
  //                 .catch((err) => console.log(err));
  //         }
  //     },
  //     [ user ]
  // );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      login();
    }
  };

  return (
    // <div
    //   className="d-flex justify-content-center align-items-center"
    //   style={{ height: "100vh", width: "100vw" }}
    // >
    //   <div id="main-wrapper" className="container">
    //     <div className="row justify-content-center">
    //       <div className="col-xl-10">
    //         <div className="card border-0">
    //           <div className="card-body p-0">
    //             <div
    //               className="row rounded-3 no-gutters"
    //               style={{
    //                 //   backgroundColor: "#000",
    //                 boxShadow: "rgb(121 121 121 / 28%) 6px 6px 13px 1px",
    //               }}
    //             >
    //               <div className="col-lg-6">
    //                 <div className="p-5">
    //                   <div className="mb-5">
    //                     <h3 className="h4 font-weight-bold text-theme">Login</h3>
    //                   </div>

    //                   <h6 className="h5 mb-0">Welcome back!</h6>
    //                   <p className="text-muted mt-2 mb-5">
    //                     Efficiently manage your fleet with{" "}
    //                     <strong>Manage My Truck</strong>. Track expenses,
    //                     monitor profits, and generate detailed reports with
    //                     ease.
    //                   </p>

    //                   <GoogleLogin
    //                     onSuccess={(credentialResponse) => {
    //                       login(credentialResponse);
    //                     }}
    //                     onError={() => {
    //                       console.log("Login Failed");
    //                     }}
    //                   />
    //                 </div>
    //               </div>

    //               <div className="col-lg-6 d-none d-lg-inline-block p-0 rounded-3">
    //                 <div className="account-block rounded-right rounded-3">
    //                   <div className="overlay rounded-right rounded-3"></div>
    //                   <div className="account-testimonial rounded-3">
    //                     <p className="lead text-white">
    //                       "Efficiency is doing things right; effectiveness is doing the right things."
    //                     </p>
    //                     <p>- Peter Drucker</p>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <section
      className="bg-primary py-3 py-md-5 py-xl-8"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="container mt-5">
        <div className="row gy-4 align-items-center">
          <div className="col-12 col-md-6 col-xl-7">
            <div className="d-flex justify-content-center text-bg-primary">
              <div className="col-12 col-xl-9">
                <h1>
                  <b>Manage My Truck</b>
                </h1>
                <hr className="border-primary-subtle mb-4" />
                <p className="lead mb-5">
                  Efficiently manage your fleet with{" "}
                  <strong>Manage My Truck</strong>. Track expenses, monitor
                  profits, and generate detailed reports with ease.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-5">
            <div className="card border-0 rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-4">
                      <h3>Sign in</h3>
                    </div>
                  </div>
                </div>
                <div className="w-100 d-flex">
                  <div className="flex-grow-1">
                    <GoogleLogin
                    width={320}
                      onSuccess={(credentialResponse) => {
                        login(credentialResponse);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </div>
                </div>
                <hr className="border-primary-subtle mb-4" />
                {/* <span className="text-danger" style={{fontSize: 8, fontFamily: 'revert'}}>*Note: This application is available only to users who have subscribed by reaching out to the admin team.</span> */}
                <div className="row">
                  <div className="col-12">
                    <p className="mt-4 mb-4">Contact us</p>
                    <div className="d-flex gap-2 gap-sm-3 justify-content-centerX">
                      <a
                        href="mailto:dev.codhub@gmail.com"
                        className="btn btn-outline-danger bsb-btn-circle bsb-btn-circle-2xl"
                      >
                        <MailFilled />
                      </a>
                      <a
                        href="#!"
                        className="btn btn-outline-danger bsb-btn-circle bsb-btn-circle-2xl"
                      >
                        <PhoneFilled />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

import React, { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Config/Axios/Axios";
import { UserContext } from "../../../App";
import { EyeIcon, EyeClosedIcon } from "@primer/octicons-react";
import { MailFilled, PhoneFilled } from "@ant-design/icons";
import { Ring } from "@uiball/loaders";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { GoogleLogin } from "@react-oauth/google";
import LoaderOverlay from "../../../Components/LoaderOverlay/LoaderOverlay";

const Login = ({ setauthenticated }) => {
  const [email, setemail] = useState("");
  const [pswd, setpswd] = useState("");
  const [loading, setloading] = useState(false);
  const [viewPassword, setviewPassword] = useState(false);
  const [err, seterr] = useState("");
  const [loader, setLoader] = useState(true);

  const { setUser } = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    setLoader(true);
    if (localStorage.getItem("token") != null) {
      Axios.post(
        "/api/v1/app/auth/whoami",
        {},
        {
          headers: {
            authorization: `beare ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          setUser(res.data.user);
          // setLoader(false)
        })
        .catch((err) => {
          console.log(err);
          seterr("Session Expired! login again...");
          setLoader(false)
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = async (credentialResponse) => {
    setLoader(true); 
    try {
      const token = credentialResponse.credential;
  
      // Send token to backend for verification
      const response = await Axios.post("/api/v1/app/auth/signUpWithGoogle", {
        token,
      });
  
      // Handle successful login
      const { user, token: newToken } = response.data;
  
      setUser(user);
      localStorage.setItem("token", newToken);
      nav("/dashboard"); // Redirect to dashboard or home page
  
    } catch (error) {
      console.error("Login Failed:", error);
      seterr("Login Failed. Please try again.");
      setLoader(false); 
    } finally {
      // setLoader(false); 
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      login();
    }
  };

  return (
    <>
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
    <LoaderOverlay isVisible={loading}/>
    </>
  );
};

export default Login;

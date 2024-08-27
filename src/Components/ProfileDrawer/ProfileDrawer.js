import { Divider, Drawer, FloatButton, Modal } from "antd";
import React, { createContext, useEffect, useRef, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { jwtDecode } from "jwt-decode";
import { CloseOutlined } from "@ant-design/icons";
import GetHelpModal from "../GetHelpModal/GetHelpModal";
import PrivacyPolicyModal from "../PrivacyPolicyModal/PrivacyPolicyModal";
import AboutUsModal from "../AboutUsModal/AboutUsModal";
const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);

const ProfileDrawer = ({ profileOpen, setProfileOpen }) => {
  const [userCredentials, setuserCredentials] = useState(null);

  useEffect(() => {
    const userCred = jwtDecode(localStorage.getItem("token"));
    setuserCredentials(userCred);
  }, []);

  const onProfileClose = () => {
    setProfileOpen(false);
  };

  const getHelpRef = useRef();
  const privacyPolicyRef = useRef();
  const aboutUsRef = useRef();

  const handleOk = () => {
    googleLogout();
    localStorage.removeItem("token");
    window.location.reload();
  };

  const callGetHelpModal = () => {
    if (getHelpRef.current) {
      getHelpRef.current.showModal();
    }
  };

  const callPrivacyPolicyModal = () => {
    if (privacyPolicyRef.current) {
      privacyPolicyRef.current.showModal();
    }
  };

  const callAboutUsModal = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.showModal();
    }
  };

  return (
    <Drawer
      placement={"right"}
      closable={false}
      onClose={onProfileClose}
      open={profileOpen}
      style={{ padding: 0 }}
      key={"right"}
    >
      <div className="card" style={{ borderRadius: "6px" }}>
        <div className="card-body text-center">
          <div className="mt-3 mb-4">
            <img
              src={
                userCredentials?.picture
                  ? userCredentials.picture
                  : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              }
              className="rounded-circle img-fluid"
              style={{ width: "100px" }}
              alt="User"
            />
          </div>
          <h4 className="mb-2">{userCredentials?.name}</h4>
          <p className="text-muted mb-4">
            {/* 8547520864 <span className="mx-2">|</span>  */}
            {userCredentials?.email}
          </p>
          <div className="mb-4 pb-2 d-flex flex-column gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-floating"
              onClick={callGetHelpModal}
            >
              {/* <WechatOutlined /> */}
              Get Help
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-floating"
              onClick={callPrivacyPolicyModal}
            >
              {/* <AlertFillIcon/> */}
              Privacy Policy
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-floating"
              onClick={callAboutUsModal}
            >
              {/* <BookmarkFillIcon/> */}
              About Us
            </button>
          </div>
          <div className="d-flex flex-column">
            <ConfirmModal
              title="Confirm Action"
              content="Are you sure you want to signout?"
              onOk={handleOk}
              onCancel={null}
            >
              <button
                type="button"
                className="btn btn-danger btn-rounded btn-floating"
              >
                Logout
              </button>
            </ConfirmModal>
          </div>
          <Divider />
          <div className="d-flex justify-content-between text-center mt-3 mb-2">
            <div>
              <p className="mb-2 h5">8471</p>
              <p className="text-muted mb-0">Total Revenue</p>
            </div>
            <div className="px-3">
              <p className="mb-2 h5">8512</p>
              <p className="text-muted mb-0">Total Expenses</p>
            </div>
            <div>
              <p className="mb-2 h5">4751</p>
              <p className="text-muted mb-0">Total Days</p>
            </div>
          </div>
        </div>
      </div>
      <FloatButton
        shape="circle"
        type="primary"
        style={{
          insetInlineEnd: 16,
          top: 16,
        }}
        onClick={onProfileClose}
        icon={<CloseOutlined />}
      />
      <GetHelpModal ref={getHelpRef} />
      <PrivacyPolicyModal ref={privacyPolicyRef} />
      <AboutUsModal ref={aboutUsRef} />
    </Drawer>
  );
};

export default ProfileDrawer;

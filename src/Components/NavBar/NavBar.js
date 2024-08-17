import React, { useState } from "react";
import { Button, Divider, Drawer, Radio, Space } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { PersonIcon } from "@primer/octicons-react";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer";
import MenuDrawer from "../MenuDrawer/MenuDrawer";

const App = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const showNavDrawer = () => {
    setNavOpen(true);
  };

  const showProfileDrawer = () => {
    setProfileOpen(true);
  };

  const [theme, setTheme] = useState("dark");
  const [current, setCurrent] = useState("1");
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="mb-4">
      <Space className="p-4 bg-dark w-100 rounded-3 d-flex justify-content-between">
        <Button
          type="dark"
          className="p-2"
          style={{
            border: "1px solid white",
            borderRadius: "160px",
            height: "40px",
            width: "40px",
          }}
          onClick={showNavDrawer}
        >
          <MenuFoldOutlined style={{ color: "white", fontSize: 18 }} />
        </Button>
        <div>
          <b className="text-white fw-800 fs-5">Manage My Truck</b>
        </div>
        <Button
          type="dark"
          className="p-2"
          style={{
            border: "1px solid white",
            borderRadius: "160px",
            height: "40px",
            width: "40px",
          }}
          onClick={showProfileDrawer}
        >
          <PersonIcon fill={"white"} size={24} />
        </Button>
      </Space>

      <MenuDrawer 
      navOpen={navOpen}
      setNavOpen={setNavOpen}
      />
      <ProfileDrawer
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
      />
    </div>
  );
};
export default App;

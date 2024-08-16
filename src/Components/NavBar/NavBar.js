import React, { useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { PersonIcon } from "@primer/octicons-react";
const items = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "1",
        label: "Option 1",
      },
      {
        key: "2",
        label: "Option 2",
      },
      {
        key: "3",
        label: "Option 3",
      },
      {
        key: "4",
        label: "Option 4",
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          {
            key: "7",
            label: "Option 7",
          },
          {
            key: "8",
            label: "Option 8",
          },
        ],
      },
    ],
  },
  {
    key: "sub4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
      {
        key: "11",
        label: "Option 11",
      },
      {
        key: "12",
        label: "Option 12",
      },
    ],
  },
];

const App = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const showNavDrawer = () => {
    setNavOpen(true);
  };
  const onNavClose = () => {
    setNavOpen(false);
  };

  const showProfileDrawer = () => {
    setProfileOpen(true);
  };
  const onProfileClose = () => {
    setProfileOpen(false);
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
      <Drawer
        placement={"left"}
        closable={false}
        onClose={onNavClose}
        open={navOpen}
        style={{ padding: 0 }}
        key={"left"}
      ></Drawer>

      <Drawer
        placement={"right"}
        closable={false}
        onClose={onProfileClose}
        open={profileOpen}
        style={{ padding: 0 }}
        key={"right"}
      ></Drawer>
    </div>
  );
};
export default App;

import React, { useState } from "react";
import { Button, Divider, Drawer, Radio, Space } from "antd";
import { MenuFoldOutlined, LeftOutlined } from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { PersonIcon } from "@primer/octicons-react";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer";
import MenuDrawer from "../MenuDrawer/MenuDrawer";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [expenses, setExpenses] = useState({
    'fuelExpenses': 'Fuel Expenses',
    'defExpenses': 'Def Expenses',
    'otherExpenses': 'Other Expenses',
  })

  const loc = useLocation();
  const navigate = useNavigate();

  const showNavDrawer = () => {
    setNavOpen(true);
  };

  const showProfileDrawer = () => {
    setProfileOpen(true);
  };

  return (
    <div className="mb-4">
      {loc.pathname.startsWith("/expenseSummary/") ? (
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
            onClick={() => navigate(-1)}
          >
            <LeftOutlined style={{ color: "white", fontSize: 18 }} />
          </Button>
          <div>
            <b className="text-white fw-800 fs-5">{`${loc.pathname.split('/')[2]} - ${expenses[loc.pathname.split('/')[3]]}`}</b>
          </div>
          <div></div>
        </Space>
      ) : (
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
      )}

      <MenuDrawer navOpen={navOpen} setNavOpen={setNavOpen} />
      <ProfileDrawer
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
      />
    </div>
  );
};
export default NavBar;

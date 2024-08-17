import { Divider, Drawer } from "antd";
import React from "react";

const MenuDrawer = ({navOpen, setNavOpen}) => {

    const onNavClose = () => {
        setNavOpen(false);
      };

  return (
    <Drawer
        placement={"left"}
        closable={false}
        onClose={onNavClose}
        open={navOpen}
        style={{ padding: 0 }}
        key={"left"}
      ></Drawer>
  )
}

export default MenuDrawer
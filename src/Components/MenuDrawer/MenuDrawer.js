import { Divider, Drawer, FloatButton } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";

const MenuDrawer = ({ navOpen, setNavOpen }) => {
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
    >
      <div className="mt-5">
      <b className="fs-5" style={{color:"#808080"}}>Document management features are coming soon.</b>
      </div>
      <FloatButton
        shape="circle"
        type="dark"
        style={{
          insetInlineStart: 320,
          top: 16,
        }}
        onClick={onNavClose}
        icon={<CloseOutlined />}
      />
    </Drawer>
  );
};

export default MenuDrawer;

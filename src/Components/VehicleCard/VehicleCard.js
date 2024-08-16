import React from "react";
import { EditFilled, FolderOpenFilled } from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;

const VehicleCard = () => (
  <Card
    hoverable
    bordered
    cover={<img alt="example" src="truck.jpg" />}
    actions={[
      <EditFilled key="edit" style={{ fontSize: 18 }} />,
      <FolderOpenFilled key="ellipsis" style={{ fontSize: 18 }} />,
    ]}
  >
    <Meta title="KL42D0551" description="This is the description" />
  </Card>
);
export default VehicleCard;

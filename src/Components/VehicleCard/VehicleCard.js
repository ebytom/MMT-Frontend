import React, { useRef } from "react";
import { EditFilled, FolderOpenFilled } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import VehicleModal from "../VehicleModal/VehicleModal";
import CatalogModal from "../CatalogModal/CatalogModal";
const { Meta } = Card;

const VehicleCard = ({ data }) => {
  const vehicleModalRef = useRef();
  const catalogModalRef = useRef();

  const callVehicleModal = () => {
    if (vehicleModalRef.current) {
      vehicleModalRef.current.showLoading();
    }
  };

  const callCatalogModal = () => {
    if (catalogModalRef.current) {
      catalogModalRef.current.showLoading();
    }
  };

  const addNewVehicle = (newVehicleDetails) => {
    console.log(newVehicleDetails);
  };

  return (
    <>
      <Card
        hoverable
        bordered
        style={{border: "1px solid #cbcbcb"}}
        cover={<img alt="example" src={data.imgURL?data.imgURL:"/truck.jpg"} />}
        actions={[
          <EditFilled
            key="edit"
            style={{ fontSize: 18 }}
            onClick={callVehicleModal}
          />,
          <FolderOpenFilled
            key="ellipsis"
            style={{ fontSize: 18 }}
            onClick={callCatalogModal}
          />,
        ]}
      >
        <Meta title={data.vehicleNo} description={data.desc} style={{height: '80px', overflow:'hidden'}} />
      </Card>
      <VehicleModal ref={vehicleModalRef} addNewVehicle={addNewVehicle} />
      <CatalogModal ref={catalogModalRef} regNo={data.vehicleNo} />
    </>
  );
};
export default VehicleCard;

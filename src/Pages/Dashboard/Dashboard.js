import { DesktopDownloadIcon, HistoryIcon } from "@primer/octicons-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../../Config/Axios/Axios";
import { UserContext } from "../../App";
import { Button, Divider, Modal, Spin } from "antd";
import { Ring } from "@uiball/loaders";
import StatisticCard from "../../Components/StatisticCard/StatisticCard";
import VehicleCard from "../../Components/VehicleCard/VehicleCard";
import { PlusCircleFilled } from "@ant-design/icons";
import VehicleModal from "../../Components/VehicleModal/VehicleModal";
import LoaderOverlay from "../../Components/LoaderOverlay/LoaderOverlay";

const Dashboard = () => {
  const [contentLoader, setContentLoader] = useState(true);
  const [analyticsLoader, setAnalyticsLoader] = useState(true);
  const [isError, setIsError] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setContentLoader(true);
    Axios.get(`/api/v1/app/truck/getAllTrucksByUser/${user.userId}`, {
      params: {
        addedBy: user.userId,
      },
    })
      .then((res) => {
        console.log(res);
        setTrucks(res.data);
        setContentLoader(false);
      })
      .catch((err) => {
        setIsError(true);
        setContentLoader(false);
      });

    return () => {};
  }, []);

  useEffect(() => {
    setAnalyticsLoader(true);
    Axios.get(`/api/v1/app/metadata/getMetadataByUserId`, {
      params: {
        userId: user.userId,
      },
    })
      .then((res) => {
        console.log(res);
        setMetadata(res.data);
        setAnalyticsLoader(false);
      })
      .catch((err) => {
        setIsError(true);
        // setContentLoader(false);
      });
  }, []);

  const vehicleModalRef = useRef();

  const callVehicleModal = () => {
    if (vehicleModalRef.current) {
      vehicleModalRef.current.showLoading();
    }
  };

  return (
    <>
      <LoaderOverlay isVisible={contentLoader} />
      {analyticsLoader ? (
        <div className="w-100 my-5 d-flex align-items-center justify-content-center">
          <b className="me-3">Analyzing metrics</b>
        <Spin size="large" />
        </div>
      ) : (
        <div className="dashboard-container">
          <StatisticCard
            title={"Total Expenses"}
            value={metadata.grandTotal}
            thisMonth={metadata.monthlyExpenses?.monthlyGrandTotal}
          />
          <StatisticCard
            title={"Total Fuel Expenses"}
            value={metadata.fuelTotal}
            thisMonth={metadata.monthlyExpenses?.fuel}
          />
          <StatisticCard
            title={"Total Def Expenses"}
            value={metadata.defTotal}
            thisMonth={metadata.monthlyExpenses?.def}
          />
          <StatisticCard
            title={"Total Other Expenses"}
            value={metadata.otherTotal}
            thisMonth={metadata.monthlyExpenses?.other}
          />
          <StatisticCard
            title={"Total Fuel Used"}
            value={metadata.fuelUsedTotal}
            thisMonth={metadata.monthlyExpenses?.fuelUsed}
          />
        </div>
      )}

      <Divider
        style={{
          borderColor: "#000",
          margin: "50px 0px",
        }}
      >
        Manage Vehicles
      </Divider>
      <div className="dashboard-container vehicleCard px-4 pb-5">
        {trucks?.map((truck) => {
          return <VehicleCard key={truck._id} data={truck} />;
        })}

        <button
          className="bg-light rounded d-flex align-items-center justify-content-center"
          style={{ border: "2px dashed #cbcbcb", minHeight: 150 }}
          onClick={callVehicleModal}
        >
          <PlusCircleFilled style={{ fontSize: 76, color: "#d6d6d6" }} />
        </button>
      </div>
      <VehicleModal
        ref={vehicleModalRef}
        setTrucks={setTrucks}
        trucks={trucks}
        vehicleData={null}
      />
    </>
  );
};

export default Dashboard;

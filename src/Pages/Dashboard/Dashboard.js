import { DesktopDownloadIcon, HistoryIcon } from "@primer/octicons-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Axios } from "../../Config/Axios/Axios";
import { UserContext } from "../../App";
import { Button, Divider, Modal } from "antd";
import { Ring } from "@uiball/loaders";
import StatisticCard from "../../Components/StatisticCard/StatisticCard";
import VehicleCard from "../../Components/VehicleCard/VehicleCard";
import { PlusCircleFilled } from "@ant-design/icons";
import VehicleModal from "../../Components/VehicleModal/VehicleModal";
import LoaderOverlay from "../../Components/LoaderOverlay/LoaderOverlay";

const Dashboard = () => {
  const [contentLoader, setContentLoader] = useState(true);
  const [isError, setIsError] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const {user} = useContext(UserContext);

  useEffect(() => {
    setContentLoader(true);
    Axios.get(`/api/v1/app/truck/getAllTrucksByUser/${user.sub}`, {
      params: {
        userId: user.sub
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

  // const showModal = (requestId) => {
  //     Axios.post('/api/v1/service/getRequestById', {
  //         requestId: requestId,
  //     })
  //         .then(function (res) {
  //             console.log(res.data.request);
  //             setdata(res.data.request)
  //             setIsModalOpen(true)
  //         })
  //         .catch(function (error) {
  //             console.log(error);
  //         })
  // };

  // const handleOk = () => {
  //     setIsModalOpen(false)
  // };

  // const handleCancel = () => {
  //     setIsModalOpen(false)
  // }

  // const handleDelete = () => {
  //     if (window.confirm("Are you sure you want to delete?") === true) {
  //         Axios.delete('/api/v1/service/deleteRequestById', {
  //             params: {
  //                 requestId: requestId
  //             }
  //         }).then(function (res) {
  //             window.location.reload();
  //         })
  //             .catch(err =>
  //                 console.log(err)
  //             )
  //     }
  //     else {
  //         return
  //     }
  // }

  // const downloadFile = (fileName) => {
  //     setdownloadLoader(true)
  //     Axios.get(`/downloadFile?fileName=${fileName}`, {
  //         responseType: 'blob',
  //     })
  //         .then(function (res) {
  //             setdownloadLoader(false)
  //             console.log(res)
  //             var ee = document.createElement("a")
  //             ee.href = URL.createObjectURL(new Blob([res.data]))
  //             ee.setAttribute("download", data.uploadedFileName)
  //             document.body.append(ee)
  //             ee.click()
  //         })
  //         .catch(err => {
  //             console.log(err)
  //             setdownloadLoader(false)
  //         })
  // }

  const [vehicleSampleData, setVehicleSampleData] = useState([
    {
      imgURL: "/truck.jpg",
      registrationNo: "MH12P5678",
      chassisNo: "ijkl5678mnop",
      engineNo: "lmn1234",
      desc: "A blue motorcycle perfect for city commutes.",
    },
    {
      imgURL: "/truck.jpg",
      registrationNo: "KA03R7890",
      chassisNo: "qrst9012uvwx",
      engineNo: "opq5678",
      desc: "A spacious SUV with off-road capabilities. A spacious SUV with off-road capabilities. ",
    },
    {
      imgURL: "/truck.jpg",
      registrationNo: "HR26S2345",
      chassisNo: "yzab3456cdef",
      engineNo: "stu9012",
      desc: "A white van ideal for family trips.",
    },
    {
      imgURL: "/truck.jpg",
      registrationNo: "UP32T6789",
      chassisNo: "ghij7890klmn",
      engineNo: "vwx3456",
      desc: "A large bus suitable for group travel.",
    },
  ]);

  const vehicleModalRef = useRef();

  const callVehicleModal = () => {
    if (vehicleModalRef.current) {
      vehicleModalRef.current.showLoading();
    }
  };

  return (
    <>
      <LoaderOverlay isVisible={contentLoader} />
      <div className="dashboard-container">
        <StatisticCard
          title={"Total Expenses"}
          value={200000}
          thisMonth={5657}
        />
        <StatisticCard
          title={"Total Fuel Expenses"}
          value={200000}
          thisMonth={8767}
        />
        <StatisticCard
          title={"Total Def Expenses"}
          value={3767}
          thisMonth={9879}
        />
        <StatisticCard
          title={"Total Other Expenses"}
          value={767647}
          thisMonth={7567}
        />
        <StatisticCard
          title={"Total Fuel Used"}
          value={666644}
          thisMonth={8868}
        />
      </div>
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
      <VehicleModal ref={vehicleModalRef} setTrucks={setTrucks} trucks={trucks} vehicleData={null}/>
    </>
  );
};

export default Dashboard;

import { DesktopDownloadIcon, HistoryIcon } from "@primer/octicons-react";
import React, { useContext, useEffect, useState } from "react";
import { Axios } from "../../Config/Axios/Axios";
import { UserContext } from "../../App";
import { Button, Divider, Modal } from "antd";
import { Ring } from "@uiball/loaders";
import StatisticCard from "../../Components/StatisticCard/StatisticCard";
import VehicleCard from "../../Components/VehicleCard/VehicleCard";
import { PlusCircleFilled } from "@ant-design/icons";

const Dashboard = () => {
  // useEffect(() => {
  //     setcontentloader(true)
  //     Axios.post("/api/v1/service/getMyRequests", {
  //         userEmail: user.email,
  //         // requirementId: searchVal
  //     })
  //         .then((res) => {
  //             console.log(res);
  //             setRequests(res.data.requests.reverse())
  //             setarrived(true)
  //             setcontentloader(false)
  //         })
  //         .catch((err) => {
  //             setisError(true)
  //             setcontentloader(false)
  //         })
  //     return () => {
  //         setRequests([])
  //     }
  // }, [])

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

  return (
    <>
      <div className="dashboard-container">
        <StatisticCard title={"Total Expenses"} value={200000} />
        <StatisticCard title={"Total Profit"} value={3767} />
        <StatisticCard title={"Total Toll"} value={767647} />
        <StatisticCard title={"Total Maintainance"} value={666644} />
        <StatisticCard title={"Total Fuel"} value={589767} />
      </div>
      <Divider
        style={{
          borderColor: "#000",
          margin: "50px 0px",
        }}
      >
        Manage Vehicles
      </Divider>
      <div className="dashboard-container pb-5">
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <button className="bg-light rounded d-flex align-items-center justify-content-center" style={{border: '2px dashed #d6d6d6', minHeight: 150}}>
          <PlusCircleFilled style={{fontSize: 76, color: '#d6d6d6'}}/>
        </button>
      </div>
    </>
  );
};

export default Dashboard;

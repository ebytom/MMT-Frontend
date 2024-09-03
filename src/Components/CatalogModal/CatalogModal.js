import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AppsIcon, FlameIcon, LogIcon } from "@primer/octicons-react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../Config/Axios/Axios";

const CatalogModal = forwardRef(({ vehicleId, regNo }, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState({});
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    Axios.get(`/api/v1/app/metadata/getMetadataByTruckId`, {
      params: {
        truckId: vehicleId,
      },
    })
      .then((res) => {
        setMetadata(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setLoading(false);
      });
  };

  useImperativeHandle(ref, () => ({
    showLoading,
  }));

  return (
    <>
      <Modal
        title={regNo}
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        loading={loading}
      >
        <div className="my-4">
          <Button
            type="primary"
            size={"large"}
            className="my-3"
            style={{
              width: "100%",
              height: "60px",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() =>
              navigate(`/expenseSummary/fuelExpenses/${vehicleId}`)
            }
          >
            <div className="d-flex align-items-center p-2">
              <FlameIcon size={24} />
              <div className="d-flex flex-column ms-3" style={{alignItems: "flex-start"}}>
                <span className="fw-bold m-0 p-0">Fuel Expenses</span>
                <span className="p-0 m-0" style={{ fontSize: 10, fontStyle: "oblique" }}>this month</span>
              </div>
            </div>
            <div className="bg-white p-1 rounded text-black w-50">
              <span className="fw-bold">{metadata.fuelTotal}</span>
            </div>
          </Button>
          <Button
            type="primary"
            size={"large"}
            className="my-3"
            style={{
              width: "100%",
              height: "60px",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => navigate(`/expenseSummary/defExpenses/${vehicleId}`)}
          >
            <div className="d-flex align-items-center p-2">
              <AppsIcon size={22} />
              <div className="d-flex flex-column ms-3" style={{alignItems: "flex-start"}}>
                <span className="fw-bold m-0 p-0">Def Expenses</span>
                <span className="p-0 m-0" style={{ fontSize: 10, fontStyle: "oblique" }}>this month</span>
              </div>
            </div>
            <div className="bg-white p-1 rounded text-black w-50">
              <span className="fw-bold">{metadata.defTotal}</span>
            </div>
          </Button>
          <Button
            type="primary"
            size={"large"}
            className="my-2"
            style={{
              width: "100%",
              height: "60px",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() =>
              navigate(`/expenseSummary/otherExpenses/${vehicleId}`)
            }
          >
            <div className="d-flex align-items-center p-2">
              <LogIcon size={22} />
              <div className="d-flex flex-column ms-3" style={{alignItems: "flex-start"}}>
                <span className="fw-bold m-0 p-0">Other Expenses</span>
                <span className="p-0 m-0" style={{ fontSize: 10, fontStyle: "oblique" }}>this month</span>
              </div>
            </div>
            <div className="bg-white p-1 rounded text-black w-50">
              <span className="fw-bold">{metadata.otherTotal}</span>
            </div>
          </Button>
        </div>
      </Modal>
    </>
  );
});

export default CatalogModal;

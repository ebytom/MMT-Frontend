import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AppsIcon, FlameIcon, LogIcon } from "@primer/octicons-react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../Config/Axios/Axios";

const CatalogModal = forwardRef(({ vehicleId }, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState({});
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    Axios.get(
      `/api/v1/app/metadata/getMetadataByTruckId`,
      {
        params: {
          truckId: vehicleId,
        },
      }
    )
      .then((res) => {
        console.log(res);
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
        title={vehicleId}
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
              navigate(`/expenseSummary/${vehicleId}/fuelExpenses`)
            }
          >
            <div className="d-flex align-items-center p-2">
              <FlameIcon size={24} />
              <span className="ms-3 fw-bold">Fuel Expenses</span>
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
            onClick={() => navigate(`/expenseSummary/${vehicleId}/defExpenses`)}
          >
            <div className="d-flex align-items-center p-2">
              <AppsIcon size={22} />
              <span className="ms-3 fw-bold">Def Expenses</span>
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
              navigate(`/expenseSummary/${vehicleId}/otherExpenses`)
            }
          >
            <div className="d-flex align-items-center p-2">
              <LogIcon size={22} />
              <span className="ms-3 fw-bold">Other Expenses</span>
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

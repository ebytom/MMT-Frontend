import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Axios } from "../../Config/Axios/Axios";
import LoaderOverlay from "../LoaderOverlay/LoaderOverlay";
import { UserContext } from "../../App";

const VehicleModal = forwardRef(({ addNewVehicle, vehicleData }, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contentLoader, setContentLoader] = useState(false);
  const [truck, setTruck] = useState({});
  const [isError, setIsError] = useState(false);
  const [form] = Form.useForm();

  const { user } = useContext(UserContext);

  console.log(vehicleData);
  

  useEffect(() => {
    setLoading(true);
    console.log(vehicleData);
    // if(vehicleData)
    // {
    //   Axios.get("/api/v1/app/truck/getTruckById", {
    //     params: {
    //       id: vehicleData?._id,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       setTruck(res.data);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       setIsError(true);
    //       setLoading(false);
    //     });
    // }
    setLoading(false);
    return () => {};
  }, []);

  const showLoading = () => {
    setOpen(true);
    // setLoading(true);
  };

  useImperativeHandle(ref, () => ({
    showLoading,
  }));

  const normFile = (e) => {
    console.log(e);

    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const submitDetails = async () => {
    try {
      const values = await form.validateFields(); // Validate and get form values
      setContentLoader(true);
      if (vehicleData) {
        Axios.put("/api/v1/app/truck/updateTruckById", {
          params: {
            id: vehicleData?._id,
          },
        })
          .then((res) => {
            console.log(res);
            setContentLoader(true);
          })
          .catch((err) => {
            setIsError(true);
            setContentLoader(true);
          });
      } else {
        console.log("user", user);

        Axios.post("/api/v1/app/truck/addTruck", {
          ...values,
          userId: user.sub,
        })
          .then((res) => {
            console.log("Response:", res);
            setContentLoader(false); // Assuming you want to hide the loader after a successful response
          })
          .catch((err) => {
            console.error("Error:", err); // Log the error details for debugging
            setIsError(true);
            setContentLoader(false); // Hide the loader after an error
          });
      }
      // addNewVehicle(values);
      // setOpen(false);
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <>
      <LoaderOverlay isVisible={contentLoader} />
      <Modal
        title="Vehicle Details"
        footer={
          <Button type="primary" onClick={submitDetails}>
            Submit
          </Button>
        }
        open={open}
        onCancel={() => setOpen(false)}
        loading={loading}
      >
        <Form
          form={form}
          name="imgURL"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600, marginTop: 50 }}
        >
          <Form.Item
            label="Upload Vehicle Image"
            name="imgURL"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            initialValue={vehicleData && vehicleData.imgURL && vehicleData.imgURL.length > 0
              ? [vehicleData.imgURL[0]]:[]}
            // rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              maxCount={1}
              showUploadList={{ showRemoveIcon: true }}
              accept="image/*"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Registration Number"
            name="registrationNo"
            initialValue={vehicleData ? vehicleData.registrationNo : ""}
            rules={[
              {
                required: true,
                message: "Please enter the Registration Number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Chassis Number"
            name="chassisNo"
            initialValue={vehicleData ? vehicleData.chassisNo : ""}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Engine Number"
            name="engineNo"
            initialValue={vehicleData ? vehicleData.engineNo : ""}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Make"
            name="make"
            initialValue={vehicleData ? vehicleData.make : ""}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Model"
            name="model"
            initialValue={vehicleData ? vehicleData.model : ""}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Year"
            name="year"
            initialValue={vehicleData ? vehicleData.year : ""}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            initialValue={vehicleData ? vehicleData.desc : ""}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default VehicleModal;

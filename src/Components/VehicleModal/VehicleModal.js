import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const VehicleModal = forwardRef(({ addNewVehicle }, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
      addNewVehicle(values); // Pass the form values to addNewVehicle
      setOpen(false); // Close the modal on successful submission
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <>
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
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Upload Vehicle Image"
            name="imgURL"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              maxCount={1}
              showUploadList={{ showRemoveIcon: true }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Vehicle Number"
            name="vehicleNo"
            rules={[
              { required: true, message: "Please enter the vehicle number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Chassis Number"
            name="chassisNo"
            rules={[
              { required: true, message: "Please enter the chassis number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Engine Number" name="engineNo">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="desc">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default VehicleModal;

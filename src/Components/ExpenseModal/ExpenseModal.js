import React, { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import dayjs from "dayjs";
import { Axios } from "../../Config/Axios/Axios";
import LoaderOverlay from "../LoaderOverlay/LoaderOverlay";
import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../App";

const { Option } = Select;

const ExpenseModal = forwardRef(
  ({ addExpense, category, formFields, apis, onSuccess }, ref) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contentLoader, setContentLoader] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [form] = Form.useForm();

    const {user} = useContext(UserContext)

    function getApiEndpoints(expenseType) {
      const expense = apis[expenseType];
      if (expense) {
        return expense.addAPI;
      } else {
        throw new Error(`Invalid expense type: ${expenseType}`);
      }
    }

    const location = useLocation();

    const showModal = () => {
      setOpen(true);
      // setLoading(true);
    };

    useImperativeHandle(ref, () => ({
      showModal,
    }));

    const handleCategoryChange = (value) => {
      setSelectedCategory(value);
      if (value !== 'other') {
        form.setFieldsValue({ other: '' });
      }
    };

    const submitDetails = async () => {
      try {
        const values = await form.validateFields();
        setContentLoader(true);
        Axios.post(
          `/api/v1/app/${location.pathname.split("/")[3]}/${getApiEndpoints(
            location.pathname.split("/")[3]
          )}`,
          {
            ...values,
            addedBy: user.userId,
            truckId: location.pathname.split("/")[2],
          }
        )
          .then((res) => {
            setContentLoader(false);
            form.resetFields();
            setOpen(false);
            onSuccess()
          })
          .catch((err) => {
            console.error("Error:", err); // Log the error details for debugging
            setIsError(true);
            setContentLoader(false); // Hide the loader after an error
          });
        setOpen(false); // Close the modal on successful submission
      } catch (error) {
        console.error("Form submission failed:", error);
      }
    };

    const renderFormFields = () => {
      return formFields.map((field) => {
        if (field.name === 'other' && selectedCategory !== 'other') {
          return null; // Skip rendering if 'other' is disabled
        }
        switch (field.type) {
          case "date":
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
                defaultValue={dayjs()}
              >
                <DatePicker defaultValue={dayjs()} />
              </Form.Item>
            );
          case "input":
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
              >
                <Input type={field.textType} disabled={field.name === 'other' && selectedCategory !== 'other'}/>
              </Form.Item>
            );
          case "select":
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                hasFeedback
                rules={field.rules}
              >
                <Select placeholder={field.placeholder} onChange={handleCategoryChange}>
                  {field.options.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            );
          default:
            return null;
        }
      });
    };

    const initialValues = formFields.reduce((acc, field) => {
      if (field.type === "date") {
        acc[field.name] = dayjs(); 
      }
      return acc;
    }, {});

    return (
      <>
        <LoaderOverlay isVisible={contentLoader} />
        <Modal
          title={`Add ${category}`}
          footer={
            <Button type="primary" onClick={submitDetails}>
              Submit
            </Button>
          }
          open={open}
          onCancel={() => {
            setOpen(false);
            setIsError(false);
          }}
          loading={loading}
        >
          {isError && (
            <b className="text-danger">
              Something went wrong! Check your entry...
            </b>
          )}
          <Form
            form={form}
            name="expenses"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600, marginTop: 50 }}
            initialValues={initialValues}
          >
            {renderFormFields()}
          </Form>
        </Modal>
      </>
    );
  }
);

export default ExpenseModal;

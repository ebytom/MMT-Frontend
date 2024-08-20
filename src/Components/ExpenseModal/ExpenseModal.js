import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import dayjs from 'dayjs';

const {Option} = Select;

const ExpenseModal = forwardRef(({ addExpense, category, formFields }, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useImperativeHandle(ref, () => ({
    showModal,
  }));

  const submitDetails = async () => {
    try {
      const values = await form.validateFields(); // Validate and get form values
      console.log(values);
      
      addExpense(values); // Pass the form values to addNewVehicle
      setOpen(false); // Close the modal on successful submission
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const renderFormFields = () => {
    return formFields.map((field) => {
      switch (field.type) {
        case 'date':
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
        case 'input':
          return (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              rules={field.rules}
            >
              <Input />
            </Form.Item>
          );
          case 'select':
          return (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              hasFeedback
              rules={field.rules}
            >
              <Select placeholder={field.placeholder}>
                {field.options.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        // Add more cases as needed for different types of inputs
        default:
          return null;
      }
    });
  };

  const initialValues = formFields.reduce((acc, field) => {
    if (field.type === 'date') {
      acc[field.name] = dayjs(); // Set default date value here
    }
    return acc;
  }, {});

  return (
    <>
      <Modal
        title={`Add ${category}`}
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
});

export default ExpenseModal;

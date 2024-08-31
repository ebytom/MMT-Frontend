import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, FloatButton, Table } from "antd";
import { useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ExpenseModal from "../../Components/ExpenseModal/ExpenseModal";
import { Axios } from "../../Config/Axios/Axios";
import LoaderOverlay from "../../Components/LoaderOverlay/LoaderOverlay";
import { DatePicker, Space } from "antd";
// import moment from "moment";
import dayjs from "dayjs";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import { ArrowRightIcon } from "@primer/octicons-react";
// import locale from 'antd/locale/en_GB';
// import 'dayjs/locale/en-gb';

// dayjs.locale('en-gb');

const { RangePicker } = DatePicker;

const formFields = {
  fuelExpenses: [
    {
      type: "date",
      name: "date",
      label: "Choose Date",
      rules: [{ required: true, message: "Please choose the date" }],
    },
    {
      type: "input",
      name: "currentKM",
      label: "Current KM",
      textType: "number",
      rules: [{ required: true, message: "Please enter the current KM" }],
    },
    {
      type: "input",
      name: "litres",
      label: "Fuel Litres",
      textType: "number",
      rules: [
        { required: true, message: "Please enter the litres of fuel filled" },
      ],
    },
    {
      type: "input",
      name: "cost",
      label: "Fuel Cost",
      textType: "number",
      rules: [{ required: true, message: "Please enter the cost of fuel" }],
    },
    { type: "input", name: "note", label: "Note", textType: "text" },
  ],
  defExpenses: [
    {
      type: "date",
      name: "date",
      label: "Choose Date",
      rules: [{ required: true, message: "Please choose the date" }],
    },
    {
      type: "input",
      name: "currentKM",
      label: "Current KM",
      textType: "number",
      rules: [{ required: true, message: "Please enter the current KM" }],
    },
    {
      type: "input",
      name: "litres",
      label: "Def Litres",
      textType: "number",
      rules: [
        { required: true, message: "Please enter the litres of def filled" },
      ],
    },
    {
      type: "input",
      name: "cost",
      label: "Def Cost",
      textType: "number",
      rules: [{ required: true, message: "Please enter the cost of def" }],
    },
    { type: "input", name: "note", label: "Note", textType: "text" },
  ],
  otherExpenses: [
    {
      type: "date",
      name: "date",
      label: "Choose Date",
      rules: [{ required: true, message: "Please choose the date" }],
    },
    {
      type: "select",
      name: "category",
      label: "Category",
      placeholder: "Choose category",
      rules: [{ required: true, message: "Please select a category" }],
      options: [
        { value: "toll", label: "Toll" },
        { value: "pollution", label: "Pollution" },
        { value: "insurance", label: "Insurance" },
        { value: "service&Maintenance", label: "Service & Maintenance" },
        { value: "salary&incentives", label: "Salary & Incentives" },
        { value: "other", label: "Other" },
      ],
    },
    {
      type: "input",
      name: "other",
      label: "Other",
      textType: "text",
      rules: [{ required: true, message: "Please enter other category" }],
    },
    {
      type: "input",
      name: "cost",
      label: "Cost",
      textType: "number",
      rules: [{ required: true, message: "Please enter the cost" }],
    },
    { type: "input", name: "note", label: "Note", textType: "text" },
  ],
};

const apis = {
  fuelExpenses: {
    addAPI: "addFuelExpense",
    updateAPI: "updateFuelExpense",
    getAllExpenses: "getAllFuelExpensesByTruckId",
    deleteAPI: "deleteFuelExpenseById", // Add this line
  },
  defExpenses: {
    addAPI: "addDefExpense",
    updateAPI: "updateDefExpense",
    getAllExpenses: "getAllDefExpensesByTruckId",
    deleteAPI: "deleteDefExpenseById", // Add this line
  },
  otherExpenses: {
    addAPI: "addOtherExpense",
    updateAPI: "updateOtherExpense",
    getAllExpenses: "getAllOtherExpensesByTruckId",
    deleteAPI: "deleteOtherExpenseById", // Add this line
  },
};

function getDeleteApiEndpoints(expenseType) {
  const expense = apis[expenseType];
  if (expense) {
    return expense.deleteAPI;
  } else {
    throw new Error(`Invalid expense type: ${expenseType}`);
  }
}

function getAllApiEndpoints(expenseType) {
  const expense = apis[expenseType];
  if (expense) {
    return expense.getAllExpenses;
  } else {
    throw new Error(`Invalid expense type: ${expenseType}`);
  }
}

const ExpenseSummary = () => {
  const [expenses, setExpenses] = useState({
    fuelExpenses: "Fuel Expenses",
    defExpenses: "Def Expenses",
    otherExpenses: "Other Expenses",
  });
  const [contentLoader, setContentLoader] = useState(true);
  const [expensesList, setExpensesList] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isError, setIsError] = useState(false);
  const [selectedDates, setSelectedDates] = useState([
    dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ]);
  

  const location = useLocation();
  const expenseModalRef = useRef();

  useEffect(() => {
    setContentLoader(true);
    Axios.get(
      `/api/v1/app/${location.pathname.split("/")[3]}/${getAllApiEndpoints(
        location.pathname.split("/")[3]
      )}`,
      {
        params: {
          truckId: location.pathname.split("/")[2],
          selectedDates,
        },
      }
    )
      .then((res) => {
        setExpensesList(res.data.expenses);
        setTotalExpense(res.data.totalExpense || 0);
        setContentLoader(false);
      })
      .catch((err) => {
        setExpensesList([]);
        setTotalExpense(0);
        setIsError(true);
        setContentLoader(false);
      });
  }, [selectedDates]);

  const refreshExpenses = () => {
    setContentLoader(true);
    Axios.get(
      `/api/v1/app/${location.pathname.split("/")[3]}/${getAllApiEndpoints(
        location.pathname.split("/")[3]
      )}`,
      {
        params: {
          truckId: location.pathname.split("/")[2],
          selectedDates,
        },
      }
    )
      .then((res) => {
        setExpensesList(res.data.expenses);
        setTotalExpense(res.data.totalExpense || 0);
        setContentLoader(false);
      })
      .catch((err) => {
        setExpensesList([]);
        setTotalExpense(0);
        setIsError(true);
        setContentLoader(false);
      });
  };

  const handleOk = (id) => {
    Axios.delete(
      `/api/v1/app/${location.pathname.split("/")[3]}/${getDeleteApiEndpoints(
        location.pathname.split("/")[3]
      )}/${id}`,
      { params: { id } }
    )
      .then(() => {
        setSelectedDates([dayjs().subtract(1, "month"), dayjs()]);
      })
      .catch((err) => {
        console.error("Failed to delete expense:", err);
      });
  };

  const callExpenseModal = () => {
    if (expenseModalRef.current) {
      expenseModalRef.current.showModal();
    }
  };

  const maxDate = new Date();

  const handleDateChange = (date, dateString, index) => {
    const newDates = [...selectedDates];
    newDates[index] = dateString
    

    setSelectedDates(newDates);
    refreshExpenses();
  };

  const tableColumns = {
    fuelExpenses: [
      {
        title: "Date",
        width: 40,
        dataIndex: "date",
        key: "date",
        fixed: "left",
      },
      {
        title: "Current KM",
        width: 100,
        dataIndex: "currentKM",
        key: "currentKM",
      },
      {
        title: "Litres",
        width: 100,
        dataIndex: "litres",
        key: "litres",
      },
      {
        title: "Cost",
        width: 100,
        dataIndex: "cost",
        key: "cost",
      },
      {
        title: "Range",
        width: 100,
        dataIndex: "range",
        key: "range",
      },
      {
        title: "Mileage",
        width: 100,
        dataIndex: "mileage",
        key: "mileage",
      },
      {
        title: "Action",
        key: "operation",
        width: 40,
        render: (text, record) => (
          <ConfirmModal
            title="Confirm Action"
            content="Are you sure you want to delete?"
            onOk={() => handleOk(record._id)}
            key={record._id}
            onCancel={() => {}}
          >
            <button
              type="button"
              className="btn btn-danger btn-rounded btn-floating"
            >
              Delete
            </button>
          </ConfirmModal>
        ),
      },
    ],
    defExpenses: [
      {
        title: "Date",
        width: 40,
        dataIndex: "date",
        key: "date",
        fixed: "left",
      },
      {
        title: "Current KM",
        width: 100,
        dataIndex: "currentKM",
        key: "currentKM",
      },
      {
        title: "Range",
        width: 100,
        dataIndex: "range",
        key: "range",
      },
      {
        title: "Litres",
        width: 100,
        dataIndex: "litres",
        key: "litres",
      },
      {
        title: "Cost",
        width: 100,
        dataIndex: "cost",
        key: "cost",
      },
      {
        title: "Action",
        key: "operation",
        //   fixed: "right",
        width: 40,
        render: (text, record) => (
          <ConfirmModal
            title="Confirm Action"
            content="Are you sure you want to delete?"
            onOk={() => handleOk(record._id)}
            key={record._id}
            onCancel={() => {}}
          >
            <button
              type="button"
              className="btn btn-danger btn-rounded btn-floating"
            >
              Delete
            </button>
          </ConfirmModal>
        ),
      },
    ],
    otherExpenses: [
      {
        title: "Date",
        width: 40,
        dataIndex: "date",
        key: "date",
        fixed: "left",
      },
      {
        title: "Category",
        width: 100,
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Cost",
        width: 100,
        dataIndex: "cost",
        key: "cost",
      },
      {
        title: "Note",
        width: 100,
        dataIndex: "note",
        key: "note",
      },
      {
        title: "Action",
        key: "operation",
        //   fixed: "right",
        width: 40,
        render: (text, record) => (
          <ConfirmModal
            title="Confirm Action"
            content="Are you sure you want to delete?"
            onOk={() => handleOk(record._id)}
            key={record._id}
            onCancel={() => {}}
          >
            <button
              type="button"
              className="btn btn-danger btn-rounded btn-floating"
            >
              Delete
            </button>
          </ConfirmModal>
        ),
      },
    ],
  };

  return (
    <>
      <LoaderOverlay isVisible={contentLoader} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* <RangePicker
          format="YYYY-MM-DD"
          onChange={handleDateChange}
          disabledDate={(current) => current && current > maxDate}
          value={
            selectedDates?.length
              ? [dayjs(selectedDates[0]), dayjs(selectedDates[1])]
              : [dayjs(), dayjs()]
          }
        /> */}

        <div className="d-flex gap-3 align-items-center">
          <input
            type="date"
            style={{
              padding: "10px",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "7px",
            }}
            onChange={(e) =>
              handleDateChange(e.target.value, e.target.value, 0)
            }
            value={selectedDates[0]}
          />
          <ArrowRightIcon size={16} />
          <input
            type="date"
            style={{
              padding: "10px",
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "7px",
            }}
            onChange={(e) =>
              handleDateChange(e.target.value, e.target.value, 1)
            }
            value={selectedDates[1]}
          />
        </div>

        <div
          className="d-flex border align-items-center p-2 ps-3 rounded gap-3"
          style={{ background: "#fafafa" }}
        >
          <b>Total Expense</b>
          <div className="p-2 border bg-white rounded">{totalExpense}</div>
        </div>
      </div>
      <Table
        columns={tableColumns[location.pathname.split("/")[3]]}
        dataSource={expensesList}
        scroll={{
          x: 1500,
          y: 500,
        }}
      />
      <FloatButton
        shape="circle"
        type="primary"
        style={{
          insetInlineEnd: "6%",
          height: 80,
          width: 80,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={callExpenseModal}
        icon={<PlusOutlined style={{ fontSize: 20 }} />}
      />
      <ExpenseModal
        ref={expenseModalRef}
        setExpensesList={setExpensesList}
        expensesList={expensesList}
        category={expenses[location.pathname.split("/")[3]]}
        formFields={formFields[location.pathname.split("/")[3]]}
        apis={apis}
        onSuccess={refreshExpenses}
      />
    </>
  );
};

export default ExpenseSummary;

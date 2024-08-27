import React, { useEffect, useRef, useState } from "react";
import { FloatButton, Table } from "antd";
import { useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ExpenseModal from "../../Components/ExpenseModal/ExpenseModal";
import { Axios } from "../../Config/Axios/Axios";
import LoaderOverlay from "../../Components/LoaderOverlay/LoaderOverlay";

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
      //   fixed: "right",
      width: 40,
      render: () => <a className="text-primary">delete</a>,
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
      render: () => <a className="text-primary">delete</a>,
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
      render: () => <a className="text-primary">delete</a>,
    },
  ],
};

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
      rules: [{ required: true, message: "Please enter the current KM" }],
    },
    {
      type: "input",
      name: "litres",
      label: "Fuel Litres",
      rules: [
        { required: true, message: "Please enter the litres of fuel filled" },
      ],
    },
    {
      type: "input",
      name: "cost",
      label: "Fuel Cost",
      rules: [{ required: true, message: "Please enter the cost of fuel" }],
    },
    { type: "input", name: "note", label: "Note" },
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
      rules: [{ required: true, message: "Please enter the current KM" }],
    },
    {
      type: "input",
      name: "litres",
      label: "Def Litres",
      rules: [
        { required: true, message: "Please enter the litres of def filled" },
      ],
    },
    {
      type: "input",
      name: "cost",
      label: "Def Cost",
      rules: [{ required: true, message: "Please enter the cost of def" }],
    },
    { type: "input", name: "note", label: "Note" },
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
      ],
    },
    {
      type: "input",
      name: "cost",
      label: "Cost",
      rules: [{ required: true, message: "Please enter the cost" }],
    },
    { type: "input", name: "note", label: "Note" },
  ],
};

const apis = {
  fuelExpenses: {
      addAPI: "addFuelExpense",
      updateAPI: "updateFuelExpense",
      getAllExpenses: "getAllFuelExpensesByTruckId"
  },
  defExpenses: {
      addAPI: "addDefExpense",
      updateAPI: "updateDefExpense",
      getAllExpenses:"getAllDefExpensesByTruckId"
  },
  otherExpenses: {
      addAPI: "addOtherExpense",
      updateAPI: "updateOtherExpense",
      getAllExpenses:"getAllOtherExpensesByTruckId"
  }
};

function getAddApiEndpoints(expenseType) {
  const expense = apis[expenseType];
  if (expense) {
      return expense.addAPI;
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

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    date: `Edward ${i}`,
    currentKM: 32,
    cost: 32,
    mileage: 32,
    litres: `London Park no. ${i}`,
  });
}

const ExpenseSummary = () => {
  const [expenses, setExpenses] = useState({
    fuelExpenses: "Fuel Expenses",
    defExpenses: "Def Expenses",
    otherExpenses: "Other Expenses",
  });
  const [contentLoader, setContentLoader] = useState(true);
  const [expensesList, setExpensesList] = useState([]);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const expenseModalRef = useRef();
  

  useEffect(() => {
    setContentLoader(true);
    Axios.get(`/api/v1/app/${location.pathname.split("/")[3]}/${getAllApiEndpoints(location.pathname.split("/")[3])}`, {
      params: {
        truckId: location.pathname.split("/")[2],
      },
    })
      .then((res) => {
        console.log(res);
        setExpensesList(res.data);
        setContentLoader(false);
      })
      .catch((err) => {
        setIsError(true);
        setContentLoader(false);
      });
  }, []);

  const callExpenseModal = () => {
    if (expenseModalRef.current) {
      expenseModalRef.current.showModal();
    }
  };

  const addExpense = () => {};

  return (
    <>
      <LoaderOverlay isVisible={contentLoader} />
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
        addExpense={addExpense}
        category={expenses[location.pathname.split("/")[3]]}
        formFields={formFields[location.pathname.split("/")[3]]}
        apis={apis}
      />
    </>
  );
};

export default ExpenseSummary;

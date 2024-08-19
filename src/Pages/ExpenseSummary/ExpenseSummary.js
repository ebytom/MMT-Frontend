import React from "react";
import { Table } from "antd";
import { useLocation } from "react-router-dom";

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
      title: "Milege",
      width: 100,
      dataIndex: "milege",
      key: "milege",
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
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    date: `Edward ${i}`,
    currentKM: 32,
    cost: 32,
    milege: 32,
    litres: `London Park no. ${i}`,
  });
}

const ExpenseSummary = () => {
  const location = useLocation();
  return (
    <Table
      columns={tableColumns[location.pathname.split("/")[3]]}
      dataSource={data}
      scroll={{
        x: 1500,
        y: 500,
      }}
    />
  );
};

export default ExpenseSummary;

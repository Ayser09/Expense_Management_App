import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import "../index.css";
import { Form, Input, Modal, Select, Table, message } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = "DatePicker";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  // Table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined onClick={handleDelete} className="mx-2" />
        </div>
      ),
    },
  ];
  // await axios.post(
  //   `http://localhost:8080/api/v1/transactions/add-transaction`,
  //   { ...values, userid: user._id }
  // );
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Retrieve the user object
      setLoading(true);
      if (editable) {
        await axios.post(
          `http://localhost:8080/api/v1/transactions/edit-transaction`,
          {
            paylaod: {
              ...values,
              userid: user._id,
            },
            transactionId: editable._id,
          }
        );
      } else {
        await axios.post(
          `http://localhost:8080/api/v1/transactions/add-transaction`,
          { ...values, userid: user._id }
        );
      }
      setLoading(false);
      message.success("Transaction updated successfully");
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
      console.error(error);
    }
  };

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post(
          `http://localhost:8080/api/v1/transactions/get-transaction`,
          { userid: user._id, frequency, selectedDate, type }
        );
        setLoading(false);
        setAllTransaction(res.data);
        console.log("Data received:", res.data); // Add this line
      } catch (error) {
        message.error("Failed to get transactions");
        console.error(error);
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8080/api/v1/transactions/delete-transaction`,
        { transactionId: record._id }
      );
      setLoading(false);
      message.success("transaction deleted succesfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete transactions");
    }
  };
  return (
    <>
      <Layout>
        {loading && <Spinner />}
        <h1 className="p-3">HOMEPAGE</h1>
        <section className="layout p-2">
          <div className="grow1 md-2 p-3">
            <h6>Select Range</h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">1 week</Select.Option>
              <Select.Option value="30">1 month</Select.Option>
              <Select.Option value="365">1 year</Select.Option>
              <Select.Option value="custom"> customs</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
              />
            )}
          </div>
          <div className="grow1 md-2 p-3">
            <h6>Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
            {/* {type === "all" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
              />
            )} */}
          </div>
          <div className="grow1 md-2 p-3">
            <h6>Select Chart</h6>
            <UnorderedListOutlined
              className={`me-2 ${viewData === "table"}`}
              onClick={() => setViewData("table")}
            />
            📊
            <AreaChartOutlined
              className={`me-2 ${viewData === "analytics"}`}
              onClick={() => setViewData("analytics")}
            />
            📑
          </div>
          <div className="grow1 md-2 p-3">
            <Button onClick={() => setShowModal(true)}>Add New</Button>
          </div>
        </section>
        <section className="layout1">
          <div className="body">
            {viewData === "table" ? (
              <Table columns={columns} dataSource={allTransaction} />
            ) : (
              <Analytics allTransaction={allTransaction} />
            )}
          </div>
        </section>
        <Modal
          title={editable ? "edit transaction" : "add transaction"}
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
          >
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Type" name="type" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">TAX</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date" rules={[{ required: true }]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name="reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <Input type="text" />
            </Form.Item>
            <Button variant="info" type="submit">
              Save
            </Button>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default HomePage;

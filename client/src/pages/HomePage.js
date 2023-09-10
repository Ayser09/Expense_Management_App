import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import "../index.css";
import { Form, Input, Modal, Select, Table, message } from "antd";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
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
      title: "reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
    },
  ];

  const getAllTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8080/api/v1/transactions/get-transaction`,
        { userid: user._id }
      );
      setLoading(false);
      setAllTransaction(res.data);
      console.log(res.data);
    } catch (error) {
      message.error("Failed to get query");
      console.log(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Retrieve the user object
      setLoading(true);
      await axios.post(
        `http://localhost:8080/api/v1/transactions/add-transaction`,
        { ...values, userid: user._id }
      );
      setLoading(false);
      message.success("Transaction added successfully");
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add query");
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTransaction();
  }, []);
  return (
    <>
      <Layout>
        {loading}
        <h1>HOMEPAGE</h1>
        <section class="layout">
          <div class="grow1 md-2 p-3">range filter</div>
          <div class="grow1 md-2 p-3">
            <Button onClick={() => setShowModal(true)}>add new</Button>{" "}
          </div>
        </section>
        <section class="layout1">
          <div class="sidebar">Content</div>
          <div class="body">
            <Table
              columns={columns}
              dataSource={Array.isArray(allTransaction) ? allTransaction : []}
            />
          </div>
        </section>
        <Modal
          title="add transaction"
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="amount " name="amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="type " name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense"> Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="category " name="category">
              <Select>
                <Select.Option value="income">
                  add according to whatevr inc source
                </Select.Option>
                <Select.Option value="expense"> spending</Select.Option>
                <Select.Option value="expense"> food</Select.Option>
                <Select.Option value="expense"> tax</Select.Option>
                <Select.Option value="expense"> meds</Select.Option>
                <Select.Option value="expense"> emi</Select.Option>
                <Select.Option value="expense"> etc</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="description " name="description">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="ref " name="reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label=" date" name="date">
              <Input type="date" />
            </Form.Item>
            <Button variant="info" type="submit">
              save
            </Button>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default HomePage;

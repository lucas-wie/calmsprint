import React from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

const TaskForm = ({ onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onCreate(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ status: 1 }}
    >
      <Form.Item
        name="description"
        label="Description"
        autoComplete='off'
        rules={[
          {
            required: true,
            message: "Please enter a description",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[
          {
            required: true,
            message: "Please select a status",
          },
        ]}
      >
        <Select>
          <Option value={1}>To do</Option>
          <Option value={2}>Doing</Option>
          <Option value={3}>Done</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
        <Button onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;

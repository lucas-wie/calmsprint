import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

const TaskEditForm = ({ task, onEdit, onCancel }) => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    description: task.text,
    status: task.status.toString(),
  });

  const onFinish = (values) => {
    // Enviar os dados editados para a API
    fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: task.userId,
        text: values.description,
        status: parseInt(values.status),
      }),
    })
    .then(() => {
        onEdit();
        onCancel();
    })
    .catch((error) => {
        console.error("Error creating task:", error);
    });
  };

  const onDelete = () => {
    // Enviar os dados editados para a API
    fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(() => {
        onEdit();
        onCancel();
    })
    .catch((error) => {
        console.error("Error deleting task:", error);
    });
  };

  return (
    <Form form={form} onFinish={onFinish}>
        <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the status!' }]}
        >
            <Select>
                <Option value="1">To do</Option>
                <Option value="2">Doing</Option>
                <Option value="3">Done</Option>
            </Select>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
                Save
            </Button>
            <Button onClick={onDelete} style={{ marginLeft: 8 }}>
                Delete
            </Button>
        </Form.Item>
    </Form>
  );
};

export default TaskEditForm;

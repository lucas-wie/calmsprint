import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { json } from "react-router-dom";
import { Modal, Button, Form, Select } from "antd";
import Column from "./Column";
import TaskForm from "./TaskForm";
import { connect } from "react-redux";
import "./Styles/BoardKanban.css"

export default function BoardKanban(props) {
    const [toDo, setTODO] = useState([]);
    const [doing, setDoing] = useState([]);
    const [done, setDone] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const userId = props.userId;

    useEffect(() => {
        fetch(`http://localhost:8080/tasks/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
          .then((response) => response.json())
          .then((json) => {
            setTODO(json.filter((task) => task.status === 1));
            setDoing(json.filter((task) => task.status === 2));
            setDone(json.filter((task) => task.status === 3));
          });
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (source.droppableId == destination.droppableId) return;

        // REMOVE FROM A SOURCE ARRAY
        if (source.droppableId == 1) {
            setTODO(removeItemById(draggableId, toDo));
        }
        else if (source.droppableId == 2) {
            setDoing(removeItemById(draggableId, doing));
        }
        else {
            setDone(removeItemById(draggableId, done));
        }

        // GET ITEM
        const task = findItemById(draggableId, [...toDo, ...doing, ...done]);

        // ADD ITEM
        if (destination.droppableId == 1) {
            setTODO([{ ...task, toDo: task.status === 1 }, ...toDo]);
        }
        else if (destination.droppableId == 2) {
            setDoing([{ ...task, toDo: task.status === 2 }, ...doing]);
        }
        else {
            setDone([{ ...task, toDo: task.status === 2 }, ...done]);
        }
        
    }

    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleCreate = async (values) => {
        const { description, status } = values;
    
        const response = await fetch("http://localhost:8080/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            text: description,
            status: status,
          }),
        })
        const createdTask = await response.json();

        
        if (createdTask.status == 1) {
            setTODO([...toDo, createdTask]);
        }
        else if (createdTask.status == 2) {
            setDoing([...doing, createdTask]);
        }
        else {
            setDone([...done, createdTask]);
        }

        setIsModalVisible(false);

        if(!response.ok) {
            console.error('Erro ao fazer login:', response.statusText);
        }
    };

    return (
        <div className="board-container">
            <div className="header-board-container">
                <Button className="header-board-container-button" type="primary" onClick={showModal}>
                    New Task
                </Button>

            </div>
            <Modal
                title="Create New Task"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <TaskForm onCreate={handleCreate} onCancel={handleCancel} />
            </Modal>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="kanban-container">

                    <Column title={"To do"} tasks={toDo} id={"1"} />
                    <Column title={"Doing"} tasks={doing} id={"2"} />
                    <Column title={"Done"} tasks={done} id={"3"}  />
                </div>
            </DragDropContext>
        </div>
    )
}
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar, Image, Modal, Form, Input, Select, Button } from "antd";
import TaskEditForm from "./TaskEditForm";
import { text } from "@fortawesome/fontawesome-svg-core";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TextContent = styled.div``;

const Icons = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
`;

function bgcolorChange(props) {
    return props.isDragging
      ? "lightgreen"
      : props.isDraggable
      ? props.isBacklog
        ? "#F2D7D5"
        : "#DCDCDC"
      : props.isBacklog
      ? "#F2D7D5"
      : "#EAF4FC";
  }

export default function Task({ task, index }) {
    const [toDo, setTODO] = useState([]);
    const [doing, setDoing] = useState([]);
    const [done, setDone] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [taskDetails, setTaskDetails] = useState(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditCancel = () => {
        setIsEditing(false);
    };

    const handleEdit = () => {
        window.location.reload();
    }
    
    return (
        <div>
            <Modal
                title="Update Task"
                open={isEditing}
                onCancel={handleEditCancel}
                footer={null}
            >
                <TaskEditForm task={task} onEdit={handleEdit} onCancel={handleEditCancel}  />
            </Modal>
            <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        onClick={handleEditClick}
                    >
                        
                        <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
                            <span>
                                <small>
                                    #{task.id}
                                    {" "}
                                </small>
                            </span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
                            <TextContent>{task.text}</TextContent>
                        </div>

                        <Icons>
                            <div>
                                <Avatar src={"https://joesch.moe/api/v1/random?key=" + task.id} />
                            </div>
                        </Icons>
                        {provided.placeholder}
                    </Container>
                )}
            </Draggable>
        </div> 
    )
}
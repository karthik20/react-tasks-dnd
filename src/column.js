import React from "react";
import styled from "styled-components";
import Task from "./task";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 0.5rem;
  border: 0.02rem solid lightgrey;
  border-radius: 0.03rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isDragging ? "#82f5a0" : "#ffffff")};
`;
const Title = styled.h3`
  padding: 0.5rem;
  text-align: center;
  background-color: #ffffff;
  opacity: ${(props) => (props.isDragging ? "50%" : "100%")};
`;
const TaskList = styled.div`
  padding: 0.5rem;
  transition: background-color 0.4s ease;
  background-color: ${(props) => (props.isDraggingOver ? "#1499c9" : "white")};
  flex-grow: 1;
  min-height: 10rem;
`;

export default ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Title {...provided.dragHandleProps} isDragging={snapshot.isDragging}>
            {column.title}
          </Title>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

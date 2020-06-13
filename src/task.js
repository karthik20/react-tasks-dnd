import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 0.02rem solid lightgrey;
  padding: 0.4rem;
  margin-bottom: 0.7rem;
  border-radius: 0.3rem;
  background-color: ${(props) => (props.isDragging ? "#82f5a0" : "white")};
`;
export default ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

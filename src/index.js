import "@atlaskit/css-reset";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Column from "./column";
import initialData from "./initial-data";

const Container = styled.main`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  justify-content: space-evenly;
  /* background-color: ${(props) =>
    props.isDraggingOver ? "#1499c9" : "#ffffff"}; */
`;

const App = () => {
  const [data, setData] = useState(initialData);
  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData({
        ...data,
        columnOrder: newColumnOrder,
      });
      return;
    }

    const sourceColumn = data.columns[source.droppableId];
    const destinationColumn = data.columns[destination.droppableId];

    if (sourceColumn.id === destinationColumn.id) {
      const newSourceTaskIds = Array.from(sourceColumn.taskIds);
      newSourceTaskIds.splice(source.index, 1);
      newSourceTaskIds.splice(destination.index, 0, draggableId);

      const modifiedSourceColumn = {
        ...sourceColumn,
        taskIds: newSourceTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [modifiedSourceColumn.id]: modifiedSourceColumn,
        },
      });
      return;
    }

    const updatedSourceTaskIds = Array.from(sourceColumn.taskIds);
    updatedSourceTaskIds.splice(source.index, 1);
    const modifiedSourceColumn = {
      ...sourceColumn,
      taskIds: updatedSourceTaskIds,
    };

    const updatedDestinationTaskIds = Array.from(destinationColumn.taskIds);
    updatedDestinationTaskIds.splice(destination.index, 0, draggableId);
    const modifiedDestinationColumn = {
      ...destinationColumn,
      taskIds: updatedDestinationTaskIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [modifiedSourceColumn.id]: modifiedSourceColumn,
        [modifiedDestinationColumn.id]: modifiedDestinationColumn,
      },
    });
  };

  const renderColumns = () =>
    data.columnOrder.map((columnId, index) => {
      const column = data.columns[columnId];
      const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
      return (
        <Column key={column.id} column={column} tasks={tasks} index={index} />
      );
    });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {renderColumns()}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

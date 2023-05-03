import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import initialData from '../data/initial-data';
import Column from '../components/Column';

export const ApplicationsPage: React.FC = () => {
  const [state, setState] = useState(initialData);
  const column1 = state.columnOrder.map((columnId) => {
    const column = state.columns[columnId];
    const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
    //return <Column key={column.id} column={column} tasks={tasks} />;
  });
  return <div>column1</div>;
};

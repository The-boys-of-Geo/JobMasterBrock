interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface InitialData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

const initialData: InitialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage'},
    'task-2': { id: 'task-1', content: 'Take out the garbage'},
    'task-3': { id: 'task-1', content: 'Take out the garbage'},
    'task-4': { id: 'task-1', content: 'Take out the garbage'},
  },
  columns: {
    'Interested' : {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1','task-2','task-3','task-4']
    },
    
  },
  columnOrder: ['column-1']
}
export default initialData;

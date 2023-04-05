import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Job {
  id: string;
  title: string;
  status: 'applied' | 'interested' | 'inprogress';
}

export const YourJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([
    { id: 'job7', title: 'Software Developer', status: 'applied' },
  { id: 'job8', title: 'UI/UX Designer', status: 'applied' },
  { id: 'job9', title: 'Marketing Manager', status: 'interested' },
  { id: 'job10', title: 'Sales Representative', status: 'interested' },
  { id: 'job11', title: 'Project Manager', status: 'inprogress' },
  { id: 'job12', title: 'Data Analyst', status: 'inprogress' },
  ]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // if dropped outside of droppable area
    if (!destination) {
      return;
    }

    // if dropped in the same location
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // update the jobs array
    const updatedJobs = [...jobs];
    const job = updatedJobs.find((j) => j.id === draggableId);
    job!.status = destination.droppableId as Job['status'];
    updatedJobs.splice(source.index, 1);
    updatedJobs.splice(destination.index, 0, job!);
    setJobs(updatedJobs);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="applied">
        {(provided) => (
          <div>
            <h2>Applied</h2>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                outline: '1px solid grey',
                padding: 8,
                backgroundColor: 'lightgrey',
                minHeight: 100,
              }}
            >
              {jobs
                .filter((job) => job.status === 'applied')
                .map((job, index) => (
                  <Draggable key={job.id} draggableId={job.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          backgroundColor: 'white',
                          padding: 16,
                          marginBottom: 8,
                          border: '1px solid lightgrey',
                          borderRadius: 4,
                          ...provided.draggableProps.style,
                        }}
                      >
                        <div>{job.title}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="interested">
        {(provided) => (
          <div>
            <h2>Interested</h2>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                outline: '1px solid grey',
                padding: 8,
                backgroundColor: 'lightgrey',
                minHeight: 100,
              }}
            >
              {jobs
                .filter((job) => job.status === 'interested')
                .map((job, index) => (
                  <Draggable key={job.id} draggableId={job.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          backgroundColor: 'white',
                          padding: 16,
                          marginBottom: 8,
                          border: '1px solid lightgrey',
                          borderRadius: 4,
                          ...provided.draggableProps.style,
                        }}
                      >
                        <div>{job.title}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="inprogress">
        {(provided) => (
          <div>
            <h2>In Progress</h2>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                outline: '1px solid grey',
                padding: 8,
                backgroundColor: 'lightgrey',
                minHeight: 100,
              }}
            >
              {jobs
                .filter((job) => job.status === 'inprogress')
                .map((job, index) => (
                  <Draggable key={job.id} draggableId={job.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          backgroundColor: 'white',
                          padding: 16,
                          marginBottom: 8,
                          border: '1px solid lightgrey',
                          borderRadius: 4,
                          ...provided.draggableProps.style,
                        }}
                      >
                        <div>{job.title}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      </DragDropContext>
  )}

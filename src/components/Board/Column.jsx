import React from 'react';
import Task from './Task';

const Column = ({ title, tasks }) => {
  return (
    <div className="column" >
      <h2>{title}</h2>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))
      ) : (
        <p>No tasks in this category</p>
      )}
    </div>
  );
};

export default Column;

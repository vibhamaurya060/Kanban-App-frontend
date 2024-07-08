import React from 'react';

const Task = ({ task }) => {
  return (

    <div className="task" style={{width:"250px", border:"1px solid white" ,marginTop:"10px", padding:"10px"}}>
      <h3>{task.title}</h3>
      <p>{task.desc}</p>
      <p>Status: {task.status}</p>
      {/* Add any other task details you want to display */}
    </div>

  );
};

export default Task;

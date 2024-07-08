import React, { useEffect, useState } from 'react';
import Column from './Column';
import taskService from '../../services/taskService'; // Adjust the path as per your project structure

const Board = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasks(); // Assuming getTasks() retrieves all tasks
        const categorizedTasks = {
          todo: data.filter((task) => task.status === 'todo'),
          inProgress: data.filter((task) => task.status === 'inprogress'), // Ensure status matches backend data
          done: data.filter((task) => task.status === 'done'),
        };
        setTasks(categorizedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Handle error state or alert the user
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="board" style={{marginLeft:"100px"}}>
        <hr style={{color:"white"}}/>
      <Column title="To Do" tasks={tasks.todo} /><hr style={{color:"white"}}/>
      <Column title="In Progress" tasks={tasks.inProgress} /><hr style={{color:"white"}}/>
      <Column title="Done" tasks={tasks.done} /> <hr style={{color:"white"}}/>
    </div>
  );
};

export default Board;

import React from 'react';
import { useNavigate } from 'react-router-dom';


const Task = ({ task, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <p>Status: {task.status}</p>
      <button className="edit-btn" onClick={() => navigate(`/edit-task/${task.id}`)}>Edit</button>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default Task;

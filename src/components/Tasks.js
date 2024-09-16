import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tasks.css';

const Tasks = ({ tasks, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-task/${id}`);
  };

  return (
    <div className="tasks-container">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3>{task.text}</h3>
          <p>{task.description}</p>
          <p>{task.day} {task.time}</p>
          <p>Status: {task.status}</p>
          <div className="btn-container">
            <button className="btn" onClick={() => handleEdit(task.id)}>Edit</button>
            <button className="btn delete" onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;

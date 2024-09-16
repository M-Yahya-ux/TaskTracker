import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditTask.css';

const EditTask = ({ onEdit, tasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === id);

  const [text, setText] = useState(task ? task.text : '');
  const [day, setDay] = useState(task ? task.day : '');
  const [time, setTime] = useState(task ? task.time : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [status, setStatus] = useState(task ? task.status : 'Pending');
  const [reminder, setReminder] = useState(task ? task.reminder : false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setText(task.text);
      setDay(task.day);
      setTime(task.time);
      setDescription(task.description);
      setStatus(task.status);
      setReminder(task.reminder);
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    if (!text) newErrors.text = 'Task title is required.';
    if (!day) newErrors.day = 'Day is required.';
    if (!time) newErrors.time = 'Time is required.';
    if (!description) newErrors.description = 'Description is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      onEdit({ id, text, day, time, description, status, reminder });
      navigate('/');
    } catch (error) {
      alert('Failed to update task. Please try again.');
    }
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Task</label>
          <input
            type="text"
            id="text"
            placeholder="Edit Task"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setErrors({ ...errors, text: '' });
            }}
          />
          {errors.text && <p className="error">{errors.text}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="day">Day</label>
          <input
            type="date"
            id="day"
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
              setErrors({ ...errors, day: '' });
            }}
          />
          {errors.day && <p className="error">{errors.day}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setErrors({ ...errors, time: '' });
            }}
          />
          {errors.time && <p className="error">{errors.time}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Edit Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({ ...errors, description: '' });
            }}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="form-control-check">
          <label htmlFor="reminder">Set Reminder</label>
          <input
            type="checkbox"
            id="reminder"
            checked={reminder}
            onChange={() => setReminder(!reminder)}
          />
        </div>
        <button className="btn btn-block" type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTask.css';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [reminder, setReminder] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      onAdd({ text, day, time, description, status, reminder });
      setText('');
      setDay('');
      setTime('');
      setDescription('');
      setStatus('Pending');
      setReminder(false);
      navigate('/');
    } catch (error) {
      alert('Failed to add task. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Add Task</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Task</label>
          <input
            type="text"
            id="text"
            placeholder="Add Task"
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
            placeholder="Add Description"
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
        <button className="btn btn-block" type="submit">Save Task</button>
      </form>
    </div>
  );
};

export default AddTask;

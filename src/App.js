import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      text: 'Code Completion',
      day: 'Feb 5th',
      time: '14:30',
      description: 'Complete the coding task.',
      status: 'In Progress',
    },
    {
      id: '2',
      text: 'Code Updating',
      day: 'Feb 6th',
      time: '13:00',
      description: 'Update the codebase.',
      status: 'Pending',
    },
    {
      id: '3',
      text: 'Code Testing',
      day: 'Feb 7th',
      time: '21:30',
      description: 'Test the new code.',
      status: 'Completed',
    },
  ]);

  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: `${tasks.length + 1}` }]);
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  

  const filteredTasks = tasks.filter(task => {
    return (filter === 'All' || task.status === filter) &&
      (task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
       task.day.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'Date') {
      return new Date(`${a.day} ${a.time}`) - new Date(`${b.day} ${b.time}`);
    } else {
      return a.text.localeCompare(b.text);
    }
  });

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="controls">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn" onClick={() => setSearchQuery(searchQuery)}>Search</button>
                </div>
                <div className="filter-section">
                  <label htmlFor="status-filter">Filter tasks:</label>
                  <select
                    id="status-filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="sort-section">
                  <label htmlFor="sort-by">Sort by:</label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="Date">Due Date</option>
                    <option value="Title">Title</option>
                  </select>
                </div>
              </div>
              <section className="tasks-section">
                <div className="total-tasks">
                  <h3>Total Tasks: {filteredTasks.length}</h3>
                </div>
                <Tasks
                  tasks={sortedTasks}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              </section>
            </>
          }
        />
        <Route path="/add-task" element={<AddTask onAdd={handleAddTask} />} />
        <Route path="/edit-task/:id" element={<EditTask onEdit={handleEditTask} tasks={tasks} />} />
      </Routes>
    </div>
  );
}

export default App;

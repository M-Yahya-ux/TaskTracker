import React from "react";
import PropTypes from 'prop-types';
import Button from "./Button";
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Header = ({ title }) => {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const onClick = () => {
    navigate('/add-task');  // Navigate to the Add Task page
  };

  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button 
        color='green' 
        text='Add Task'
        onClick={onClick}  // Set the navigation function on button click
      />
    </header>
  );
}

Header.defaultProps = {
  title: 'Task Tracker',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

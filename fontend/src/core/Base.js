import React from 'react';
import Menu from './Menu';

const Base = ({
    title = "My Title",
    description = "My Description",
    className = "text-white p-4",
    children
}) => {
  return (
    <div>
      <Menu></Menu>
      <div className="container-fluid">
        <div className="jumbotron text-white text-center py-3">
            <h2 className="display-4">{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer mt-auto py-1">
        <div className="container-fluid bg-success text-white text-center py-3">
            <h4>If you any question ,feel free to reach out</h4>
            <button className="btn btn-warning btn-lg rounded">Contact US</button>
        </div>
        <div className="container text-center">
            <span className="text-muted ">An amazing <span className='text-white'>MERN</span> Bootcamp</span>
        </div>
      </footer>
    </div>
  )
}

export default Base;

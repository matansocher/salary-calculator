import React from 'react';

const MainPageObject = (props) => {
  return (
    <div className="col-sm-6 col-md-4">
      <img src={props.image} className="money-image" alt="money"/>
      <h4>
        {props.header}: {props.value}
      </h4>
    </div>
  );
}

export default MainPageObject;

// <i className={props.icon} aria-hidden="true"></i>

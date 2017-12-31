import React from 'react';

const MainPageObject = (props) => {
  return (
    <div className="col-sm-6 col-md-4">
      <h3>
        <i className={props.icon} aria-hidden="true"></i>
        {props.header}: {props.value}
      </h3>
    </div>
  );
}

export default MainPageObject;

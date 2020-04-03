import React from "react";

const Title = ({ city, wind }) => (
  <div className="col-4 m-2">
    <div className="card animated fadeIn">
      <div className="card-body align-self-stretch">
        <h5 className="card-title text-center">{city}</h5>
        <p className="card-text text-center">
          <span className="badge badge-pill badge-primary">{wind}</span>
        </p>
      </div>
    </div>
  </div>
);
export default React.memo(Title);

import React from "react";

const WeatherApp = ({ weather }) => (
  <div className="App">
    <div className="container p-8">
      <div className="m-4 row d-flex justify-content-center">
          <h1>Wind Speed Per City</h1>
      </div>
      <div className="row d-flex justify-content-center">{weather}</div>
    </div>
  </div>
);

export default React.memo(WeatherApp);

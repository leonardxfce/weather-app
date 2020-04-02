import React from "react";

const WeatherApp = ({ weather }) => <div className="App">{weather}</div>;

export default React.memo(WeatherApp);

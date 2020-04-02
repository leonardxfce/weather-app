import React from "react";
import Title from "./components/Title";
import WeatherApp from "./components/WeatherApp";
import { getWeatherData } from "./utils";

class App extends React.Component {
  state = {
    weatherData: [],
  };

  updateWeatherData = (weatherData) => this.setState({ weatherData });

  componentDidMount = () => getWeatherData().then(this.updateWeatherData);

  getTitle = ({ city, wind }, i) => <Title key={i} city={city} wind={wind} />;

  render = () => {
    const {
      state: { weatherData },
      getTitle,
    } = this;
    const weather = weatherData.map(getTitle);
    return <WeatherApp weather={weather} />;
  };
}

export default App;

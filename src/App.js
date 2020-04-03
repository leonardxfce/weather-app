import React from "react";
import Spinner from "./components/Spinner";
import Title from "./components/Title";
import WeatherApp from "./components/WeatherApp";
import { isEmpty } from "lodash";
import { getWeatherData } from "./utils";

class App extends React.Component {
  state = {
    weatherData: [],
  };

  updateWeatherData = (weatherData) => this.setState({ weatherData });

  componentDidMount = () => getWeatherData().then(this.updateWeatherData);

  getTitle = ({ city, wind }, i) => <Title key={i} city={city} wind={wind} />;

  getTitles = () => this.state.weatherData.map(this.getTitle);

  render = () => {
    const {
      state: { weatherData },
      getTitles,
    } = this;
    const weather = isEmpty(weatherData) ? <Spinner /> : getTitles();
    return <WeatherApp weather={weather} />;
  };
}

export default App;

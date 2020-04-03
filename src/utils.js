import { flow, lowerFirst, memoize, trim } from "lodash";
import { parse } from "parse5";
import { stringify } from "query-string";
import {
  CITY_URL,
  COMMA_SEPARATOR,
  DEGREE_SIGN,
  WEATHER_URL,
} from "./constants";

const splitByComma = (string) => string.split(COMMA_SEPARATOR);

const splitByDegree = (string) => string.split(DEGREE_SIGN);

const normalizeString = flow(trim, lowerFirst);

const getNormalizedStrings = (strings) => strings.map(normalizeString);

const objectFromCoordinateArray = ([degree, cardinal]) => ({
  degree,
  cardinal,
});

const getCoordinates = (rawCoordinate) => rawCoordinate.map(getCoordinate);

const createGeoCoordinate = ([first, second]) => ({
  [first.cardinal]: first.degree,
  [second.cardinal]: second.degree,
});

const createCityURL = (queryParams) => `${CITY_URL}?${queryParams}`;

const responseToJSON = (response) => response.json();

const findRow = (tableDOM) => tableDOM.childNodes[0].childNodes[0].value;

const resolvePromise = (promise) => promise.then(responseToJSON);

const getCoordinate = flow(
  splitByDegree,
  getNormalizedStrings,
  objectFromCoordinateArray
);

const getURLForCityName = flow(
  findRow,
  splitByComma,
  getCoordinates,
  createGeoCoordinate,
  stringify,
  createCityURL,
  fetch,
  resolvePromise
);

const getURLSForCities = (tableHTML) => tableHTML.map(getURLForCityName);

const memoizedGetURLsForCities = memoize(getURLSForCities);

const responseToText = (response) => response.text();

const findTable = (downloadedDOM) =>
  downloadedDOM.childNodes[0].childNodes[1].childNodes[1].childNodes[1]
    .childNodes;

const getTableElementAsArray = (table) => [...table];

const compose = (...list) => (acc2) =>
  list.reduce((acc2, fn) => acc2.then(fn), Promise.resolve(acc2));

const getTableElement = compose(
  fetch,
  responseToText,
  parse,
  findTable,
  getTableElementAsArray
);

const memoizedGetTableHTML = memoize(getTableElement);

const findWindValue = (elem) => elem.childNodes[1].childNodes[0].value;

const getWindCells = (table) => table.map(findWindValue);

const getWeatherPromises = compose(
  memoizedGetTableHTML,
  memoizedGetURLsForCities
);

const getCities = async () => {
  const weatherPromises = await getWeatherPromises(WEATHER_URL);
  return Promise.all(weatherPromises);
};

const composedGetWindData = compose(memoizedGetTableHTML, getWindCells);

const getWindData = async () => composedGetWindData(WEATHER_URL);

export const getWeatherData = async () => {
  const cities = await getCities();
  const winds = await getWindData();
  const tranformToWeatherData = ({ result }, i) => ({
    city: result,
    wind: winds[i],
  });
  return cities.map(tranformToWeatherData);
};

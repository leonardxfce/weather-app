import React from "react";

const Title = ({ city, wind }) => (
  <h1>
    {city}
    -
    {wind}
  </h1>
);
export default React.memo(Title);

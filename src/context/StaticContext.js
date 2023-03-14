import React from "react";

const StaticContext = React.createContext({
  text: "Hello world",
  subscribe: false,
});

export default StaticContext;

import React from "react";

const Image = (props) => {
  if (!props.gif) {
    return <img alt="" src="#"></img>;
  }

  return <img alt={props.weather} src={props.gif}></img>;
};

export default Image;

import React from "react";

const Swatch = ({ oneStyle }) => {

console.log('swatch')
  return (<div>
    <img src={oneStyle.photos[0].thumbnail_url} />
  </div>)
}

export default Swatch;
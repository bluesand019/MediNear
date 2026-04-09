import React from "react";

const Searchbar = ({type, placeholder}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Searchbar;

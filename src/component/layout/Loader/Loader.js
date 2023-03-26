import React from "react";
import "./Loader.css";
import FadeLoader from "react-spinners/FadeLoader";

const Loader = () => {
  return (
    <div className="loading">
       <div style={{display : 'flex', justifyContent: 'center'}}>
         <FadeLoader color="#000" loading='true' css="" size={25} />
      </div>
    </div>
  );
};

export default Loader;
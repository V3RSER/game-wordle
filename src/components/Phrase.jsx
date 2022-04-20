import React from "react";

const Phrase = ({ value = "", length = 1 }) => {
  return (
    <>
      <div
        className="phrase"
        style={{
          gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`,
        }}>
        {[...Array(length).keys()].map((index) => (
          <h1 key={index} className="letter">
            {value.charAt(index).toUpperCase()}
          </h1>
        ))}
      </div>
    </>
  );
};

export default Phrase;

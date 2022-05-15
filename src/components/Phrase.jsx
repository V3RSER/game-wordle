import React from "react";

const Phrase = ({
  letters = [{ value: "", color: "", hidden: false }],
  length = 1,
}) => {
  return (
    <>
      <div
        className="phrase"
        style={{
          gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`,
        }}>
        {[...Array(length).keys()].map((index) => (
          <h1
            key={index}
            className={`letter ${
              letters[index]?.color ? letters[index].color : "white"
            }`}>
            {!letters[index]?.hidden && letters[index]?.value.toUpperCase()}
          </h1>
        ))}
      </div>
    </>
  );
};

export default Phrase;

import React from "react";
import { connect } from "react-redux";
import Phrase from "./Phrase";

const Grid = ({ phrases, secretElement }) => {
  return (
    <div className="pt-2">
      {phrases.map((p, index) => (
        <Phrase
          key={index}
          letters={p.letters}
          length={secretElement.name?.length}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  secretElement: state.element.secret,
});

export default connect(mapStateToProps)(Grid);

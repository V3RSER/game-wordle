import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { connect } from "react-redux";
import { Alert, Button, InputGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Game = ({ secretElement, reloadGame }) => {
  return (
    <InputGroup>
      <Alert className="defeat" color="danger">
        DERROTA. Era {secretElement.name.toUpperCase()}
      </Alert>
      <Button color="danger" onClick={() => reloadGame()}>
        <FontAwesomeIcon icon={faArrowRotateRight} />
      </Button>
    </InputGroup>
  );
};

const mapStateToProps = (state) => ({
  secretElement: state.element.secret,
});

export default connect(mapStateToProps)(Game);

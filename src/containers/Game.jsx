import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, Input, Spinner } from "reactstrap";
import { setCards, setSecretElement } from "../actions/elementActions";
import Phrase from "../components/Phrase";

const Game = ({ loading, error, elements, secretElement, setCards }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [phrase, setPhrase] = useState("");
  const comparePhrase = () => {};

  useEffect(() => {
    if (!loading && !elements.length && !error) {
      switch (params.category) {
        case "cr":
          setCards();
          break;
        default:
          break;
      }
    }
    if (elements.length && !secretElement.id) {
      dispatch(
        setSecretElement(elements[Math.floor(Math.random() * elements.length)])
      );
    }
  }, [dispatch, loading, elements, secretElement, error, setCards, params]);

  const isValidPhrase = (p) => {
    return (
      p.length <= secretElement.name?.length &&
      p.split(" ").length <= secretElement.name?.split(" ").length
    );
  };

  const renderEvents = () => {
    if (loading) {
      return (
        <Spinner
          color="secondary"
          type="grow"
          className="text-center"
          style={{ position: "absolute", left: "50%", top: "50%" }}>
          Loading...
        </Spinner>
      );
    }
    if (error) {
      return <Alert color="danger">Error</Alert>;
    }
  };

  const renderTable = () => {
    if (secretElement?.id)
      return (
        <div className="pt-2">
          {[...Array(parseInt(params.attempts)).keys()].map((index) => (
            <Phrase
              key={index}
              value={phrase}
              length={secretElement.name?.length}
            />
          ))}
        </div>
      );
  };
  return (
    <div className="py-3 mx-auto">
      <Input
        className="mt-2"
        value={phrase}
        onChange={(event) => {
          if (isValidPhrase(event.target.value)) {
            setPhrase(event.target.value);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            comparePhrase();
          }
        }}
      />
      {renderEvents()}
      {renderTable()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.element.loading,
  error: state.element.error,
  elements: state.element.list,
  secretElement: state.element.secret,
});

const mapDispatchToProps = {
  setCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

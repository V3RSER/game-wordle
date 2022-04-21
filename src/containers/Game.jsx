import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, Input, Spinner } from "reactstrap";
import { setCards, setSecretElement } from "../actions/elementActions";
import Phrase from "../components/Phrase";

const Game = ({ loading, error, elements, secretElement, setCards }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [inputPhrase, setInputPhrase] = useState({
    value: "",
    index: 0,
  });
  const [phrases, setPhrases] = useState(
    [...Array(parseInt(params.attempts)).keys()].map(() => ({
      letters: [],
    }))
  );

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

  const isValidInputPhrase = (p) => {
    return (
      p.length <= secretElement.name?.length &&
      p.split(" ").length <= secretElement.name?.split(" ").length
    );
  };

  const comparePhrase = () => {
    if (inputPhrase.value.length === secretElement.name.length) {
      setInputPhrase({ value: "", index: ++inputPhrase.index });
    }
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

  return (
    <div className="py-3 mx-auto">
      <Input
        className="mt-2"
        value={inputPhrase.value}
        onChange={(event) => {
          if (isValidInputPhrase(event.target.value)) {
            setInputPhrase({
              value: event.target.value,
              index: inputPhrase.index,
            });
            phrases[inputPhrase.index] = {
              letters: Array.from(event.target.value).map((letter) => ({
                value: letter,
              })),
            };
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

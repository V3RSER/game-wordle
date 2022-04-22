import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faCoffee,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, Button, Input, InputGroup, Spinner } from "reactstrap";
import {
  setCards,
  setSecretElement,
  setAgents,
} from "../actions/elementActions";
import ElementCard from "../components/ElementCard";
import Phrase from "../components/Phrase";

const Game = ({
  loading,
  error,
  elements,
  secretElement,
  setCards,
  setAgents,
  setSecretElement,
}) => {
  const params = useParams();
  const dispatch = useDispatch();
  let initialInputPhrase = {
    value: "",
    index: 0,
  };
  let initialPhrases = [...Array(parseInt(params.attempts)).keys()].map(() => ({
    letters: [],
  }));
  const [inputPhrase, setInputPhrase] = useState(initialInputPhrase);
  const [phrases, setPhrases] = useState(initialPhrases);
  const [victory, setVictory] = useState(false);
  const [defeat, setDefeat] = useState(false);

  useEffect(() => {
    if (!loading && !elements.length && !error) {
      switch (params.category) {
        case "cr":
          setCards();
          break;
        case "valorant":
          setAgents();
          break;
        default:
          break;
      }
    }
  }, [dispatch, loading, elements, error, setCards, setAgents, params]);

  useEffect(() => {
    if (elements.length && !secretElement?.id) {
      dispatch(
        setSecretElement(elements[Math.floor(Math.random() * elements.length)])
      );
    }
  }, [dispatch, elements, secretElement, setSecretElement]);

  const isValidInputPhrase = (p) => {
    return (
      p.length <= secretElement.name?.length &&
      p.split(" ").length <= secretElement.name?.split(" ").length
    );
  };

  const comprobateVictory = () => {
    if (inputPhrase.value.length === secretElement.name.length && !defeat) {
      phrases[inputPhrase.index] = {
        letters: phrases[inputPhrase.index].letters.map((letter, index) => ({
          value: letter.value,
          color:
            Array.from(secretElement.name.toUpperCase())[index] ===
            letter.value.toUpperCase()
              ? "green"
              : secretElement.name
                  .toUpperCase()
                  .includes(letter.value.toUpperCase())
              ? "yellow"
              : "grey",
        })),
      };

      inputPhrase.value.toUpperCase() === secretElement.name.toUpperCase()
        ? setVictory(true)
        : inputPhrase.index === params.attempts - 1
        ? setDefeat(true)
        : setInputPhrase({ value: "", index: ++inputPhrase.index });
    }
  };

  const renderEvents = () => {
    if (loading) {
      return (
        <Spinner
          color="light"
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

  const renderGame = () => {
    if (secretElement?.id)
      return (
        <div className={"game"}>
          {victory ? (
            <>
              <Alert color="success">¡FELICIDADES! Desbloqueaste: </Alert>
              <ElementCard element={secretElement} win={true}></ElementCard>
            </>
          ) : (
            <>
              {defeat ? (
                <InputGroup>
                  <Alert className="defeat" color="danger">
                    DERROTA. Era {secretElement.name.toUpperCase()}
                  </Alert>
                  <Button
                    color="danger"
                    onClick={() => {
                      dispatch(
                        setSecretElement(
                          elements[Math.floor(Math.random() * elements.length)]
                        )
                      );
                      setPhrases(initialPhrases);
                      setInputPhrase(initialInputPhrase);
                      setDefeat(false);
                    }}>
                    <FontAwesomeIcon icon={faArrowRotateRight} />
                  </Button>
                </InputGroup>
              ) : (
                <InputGroup>
                  <Input
                    value={inputPhrase.value.toUpperCase()}
                    onChange={(event) => {
                      if (isValidInputPhrase(event.target.value)) {
                        setInputPhrase({
                          value: event.target.value,
                          index: inputPhrase.index,
                        });
                        phrases[inputPhrase.index] = {
                          letters: Array.from(event.target.value).map(
                            (letter) => ({
                              value: letter,
                            })
                          ),
                        };
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        comprobateVictory();
                      }
                    }}
                  />
                  <Button
                    color="success"
                    onClick={() => {
                      comprobateVictory();
                    }}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
                </InputGroup>
              )}

              <div className="pt-2">
                {phrases.map((p, index) => (
                  <Phrase
                    key={index}
                    letters={p.letters}
                    length={secretElement.name?.length}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      );
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/${params.category}.jpg`,
        }}
        className={"background"}>
        {renderGame()}
        {renderEvents()}
      </div>
    </>
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
  setAgents,
  setSecretElement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

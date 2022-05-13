import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert, Button, Input, InputGroup, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  setCards,
  setSecretElement,
  setAgents,
  setElementList,
} from "../actions/elementActions";
import ElementCard from "../components/ElementCard";
import Defeat from "../components/Defeat";
import Grid from "../components/Grid";

const Game = ({
  loading,
  error,
  elements,
  secretElement,
  setCards,
  setAgents,
  setSecretElement,
  setElementList,
}) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [attempts, setAttempts] = useState(
    params.attempts === "0" ? 5 : parseInt(params.attempts)
  );
  let initialInputPhrase = {
    value: "",
    index: 0,
  };
  let initialPhrases = [...Array(parseInt(attempts)).keys()].map(() => ({
    letters: [],
  }));
  const [inputPhrase, setInputPhrase] = useState(initialInputPhrase);
  const [phrases, setPhrases] = useState(initialPhrases);
  const [victory, setVictory] = useState(false);
  const [defeat, setDefeat] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(setSecretElement({}));
      dispatch(setElementList([]));
    };
  }, [dispatch, setElementList, setSecretElement]);

  useEffect(() => {
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
  }, [params.category, setAgents, setCards]);

  const selectSecretElement = useCallback(() => {
    let elementsFilter;
    switch (params.difficulty) {
      case "0":
        elementsFilter = elements.filter(
          (element) => element.name.length > 1 && element.name.length <= 5
        );
        break;
      case "1":
        elementsFilter = elements.filter(
          (element) => element.name.length > 5 && element.name.length <= 10
        );
        break;
      case "2":
        elementsFilter = elements.filter((element) => element.name.length > 10);
        break;
      default:
        elementsFilter = elements;
    }
    dispatch(
      setSecretElement(
        elementsFilter[Math.floor(Math.random() * elementsFilter.length)]
      )
    );
  });

  useEffect(() => {
    if (elements.length && !loading && !secretElement?.id)
      selectSecretElement();
  }, [elements.length, loading, secretElement?.id, selectSecretElement]);

  function isValidInputPhrase(p) {
    return (
      p.length <= secretElement.name?.length &&
      p.split(" ").length <= secretElement.name?.split(" ").length
    );
  }

  const updatePrhases = () => {
    setPhrases(
      phrases.map((prhase, idx) => {
        if (idx === inputPhrase.index)
          return {
            letters: phrases[inputPhrase.index].letters.map(
              (letter, index) => ({
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
              })
            ),
          };
        return prhase;
      })
    );
    phrases[inputPhrase.index] = {};
  };

  function comprobateVictory() {
    if (inputPhrase.value.length === secretElement.name.length && !defeat) {
      updatePrhases();

      inputPhrase.value.toUpperCase() === secretElement.name.toUpperCase()
        ? setVictory(true)
        : inputPhrase.index === attempts - 1
        ? setDefeat(true)
        : setInputPhrase({ value: "", index: ++inputPhrase.index });
    }
  }

  const reloadGame = () => {
    selectSecretElement();
    setPhrases(initialPhrases);
    setInputPhrase(initialInputPhrase);
    setDefeat(false);
  };

  const renderGame = () => {
    return (
      <div className={"game"}>
        {victory ? (
          <>
            <Alert color="success">¡VICTORIA! Desbloqueaste: </Alert>
            <ElementCard element={secretElement}></ElementCard>
          </>
        ) : (
          <>
            {defeat ? (
              <Defeat reloadGame={() => reloadGame} />
            ) : (
              <>
                <InputGroup>
                  <Input
                    value={inputPhrase.value.toUpperCase()}
                    onChange={(event) => {
                      if (isValidInputPhrase(event.target.value)) {
                        setInputPhrase({
                          value: event.target.value,
                          index: inputPhrase.index,
                        });

                        setPhrases(
                          phrases.map((prhase, index) => {
                            if (index === inputPhrase.index)
                              return {
                                letters: Array.from(event.target.value).map(
                                  (letter) => ({
                                    value: letter,
                                  })
                                ),
                              };
                            return prhase;
                          })
                        );
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        comprobateVictory();
                      }
                    }}
                  />
                  <Button color="danger" onClick={() => reloadGame()}>
                    <FontAwesomeIcon icon={faArrowRotateRight} />
                  </Button>
                  <Button
                    color="success"
                    onClick={() => {
                      comprobateVictory();
                    }}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
                </InputGroup>
              </>
            )}
            <Grid phrases={phrases} />
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
        {secretElement.id && renderGame()}
        {loading && (
          <Spinner
            color="light"
            className="text-center"
            style={{ margin: "auto" }}>
            Loading...
          </Spinner>
        )}
        {error && (
          <Alert color="danger" style={{ margin: "auto" }}>
            Error
          </Alert>
        )}
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
  setElementList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

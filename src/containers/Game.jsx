import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Input, Spinner } from "reactstrap";
import { setCards, setSecretElement } from "../actions/elementListActions";
import Phrase from "../components/Phrase";

const Game = ({ loading, error, elements, elementSecret, setCards }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [word, setWord] = useState("");

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
    if (elements.length && !elementSecret.id) {
      dispatch(
        setSecretElement(elements[Math.floor(Math.random() * elements.length)])
      );
    }
  }, [dispatch, loading, elements, elementSecret, error, setCards, params]);

  return (
    <>
      {loading ? (
        <Spinner
          color="dark"
          style={{ position: "absolute", top: "50%", left: "50%" }}>
          Loading...
        </Spinner>
      ) : (
        <>
          {elementSecret.name && word === "" ? (
            <Phrase length={elementSecret.name.length} />
          ) : (
            <Phrase value={word} length={elementSecret.name?.length} />
          )}
          <Input
            value={word}
            onChange={(event) => {
              if (event.target.value.length <= elementSecret.name?.length) {
                setWord(event.target.value);
              }
            }}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.elementList.loading,
  error: state.elementList.error,
  elements: state.elementList.elements,
  elementSecret: state.elementList.elementSecret,
});

const mapDispatchToProps = {
  setCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Label, Input, Form, ButtonGroup } from "reactstrap";

const Home = () => {
  const [checkAny, setCheckAny] = useState(true);
  const [wordLength, setWordLength] = useState(0);
  const [wordSource, setWordSource] = useState("cr");

  const navigate = useNavigate();

  const isValidLength = () => {
    return (
      (wordLength >= 0 && wordLength !== "" && wordLength < 20) ||
      wordLength === 0
    );
  };

  return (
    <div className="pt-5 mx-auto">
      <Form>
        <FormGroup>
          <Label>Fuente de palabra</Label>
          <Input
            type="select"
            defaultValue={wordSource}
            onChange={(event) => {
              setWordSource(event.target.value);
            }}>
            <option value="cr">Clash Royale</option>
            {/* <option value="dictionary">Diccionario</option> */}
            <option value="valorant">Valorant</option>
          </Input>
        </FormGroup>
        <Label>Longitud de palabra</Label>
        <FormGroup>
          <ButtonGroup>
            {checkAny ? (
              <Input
                className="left-input"
                placeholder="Tamaño"
                type="text"
                disabled
                value="Cualquiera"
              />
            ) : (
              <Input
                className="left-input"
                placeholder="Tamaño"
                type="number"
                value={wordLength}
                invalid={!isValidLength()}
                min={0}
                onChange={(event) => {
                  if (event.target.value <= 0) {
                    setCheckAny(!checkAny);
                  }
                  setWordLength(event.target.value);
                }}
              />
            )}
            <Button
              className="right-button"
              color="primary"
              size="sm"
              outline
              active={!checkAny}
              onClick={() => {
                setCheckAny(!checkAny);
                setWordLength(1);
              }}>
              Personalizar
            </Button>
          </ButtonGroup>
        </FormGroup>
        <Button
          className="mt-4"
          block
          color="dark"
          size="lg"
          onClick={() => {
            if (isValidLength()) {
              navigate(`${wordSource}/${wordLength}/${5}`);
            }
          }}>
          Comenzar
        </Button>
      </Form>
    </div>
  );
};

export default Home;

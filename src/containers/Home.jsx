import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Label, Input, Form, ButtonGroup } from "reactstrap";

const Home = () => {
  const [checkAny, setCheckAny] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [wordSource, setWordSource] = useState("cr");

  const navigate = useNavigate();

  const isValidLength = () => {
    return (attempts >= 0 && attempts !== "" && attempts < 8) || attempts === 0;
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
            <option value="valorant">Valorant</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Dificultad</Label>
          <Input
            type="select"
            defaultValue={difficulty}
            onChange={(event) => {
              setDifficulty(event.target.value);
            }}>
            <option value="0">Fácil</option>
            <option default value="1">
              Normal
            </option>
            <option value="2">Difícil</option>
          </Input>
        </FormGroup>
        <Label>Intentos</Label>
        <FormGroup>
          <ButtonGroup>
            {checkAny ? (
              <Input
                className="left-input"
                placeholder="Intentos"
                type="text"
                disabled
                value="Defecto"
              />
            ) : (
              <Input
                className="left-input"
                placeholder="Tamaño"
                type="number"
                value={attempts}
                invalid={!isValidLength()}
                min={0}
                onChange={(event) => {
                  if (event.target.value <= 0) {
                    setCheckAny(!checkAny);
                  }
                  setAttempts(event.target.value);
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
                setAttempts(1);
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
              navigate(`${wordSource}/${difficulty}/${attempts}`);
            }
          }}>
          Comenzar
        </Button>
      </Form>
    </div>
  );
};

export default Home;

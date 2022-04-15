import React, { useState } from "react";
import { Button, FormGroup, Label, Input, Form } from "reactstrap";

const Home = () => {
  const [checkAny, setCheckAny] = useState(true);
  const [wordLength, setWordLength] = useState(0);
  const [wordSource, setWordSource] = useState("cr");

  const isValidLength = () => {
    return wordLength >= 0 && wordLength !== "" && wordLength < 20;
  };

  return (
    <>
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
            <option value="dictionary">Diccionario</option>
            <option value="valorant">Valorant</option>
          </Input>
        </FormGroup>
        <Label>Longitud de palabra</Label>
        <FormGroup>
          <Input
            placeholder="Tamaño"
            type="number"
            disabled={checkAny}
            value={wordLength}
            valid={isValidLength()}
            invalid={!isValidLength()}
            min={0}
            onChange={(event) => {
              setWordLength(event.target.value);
            }}
          />
          <Input
            type="checkbox"
            checked={checkAny}
            onChange={() => {
              setCheckAny(!checkAny);
              setWordLength(0);
            }}
          />
          <Label>Cualquiera</Label>
        </FormGroup>
        <Button
          block
          color="dark"
          size="lg"
          onClick={() => {
            if (isValidLength())
              console.log(
                "wordLength: " + wordLength + ", wordSource: " + wordSource
              );
          }}>
          Comenzar
        </Button>
      </Form>
    </>
  );
};

export default Home;

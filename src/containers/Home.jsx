import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Input, Form, ButtonGroup } from "reactstrap";

const Home = () => {
  const [checkAny, setCheckAny] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [wordSource, setWordSource] = useState("cr");

  const navigate = useNavigate();

  const isValidLength = () => {
    return (attempts >= 0 && attempts !== "" && attempts < 8) || attempts === 0;
  };

  const renderMenu = () => {
    return (
      <div className="home-content">
        <div className="row shadow">
          <div
            className="col-md-6 menu-background"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/img/${wordSource}_home.jpg`,
            }}>
            <div className="content">
              <h2 className="pb-3">INFORMACIÓN</h2>
              <h4>¿Cómo se juega?</h4>
              <p>Adivina el personaje oculto para desbloquear su tarjeta</p>
            </div>
          </div>
          <div className="col-md-6 p-0 menu">
            <div className="content my-auto">
              <Form>
                <FormGroup>
                  <h2 className="pb-3">OPCIONES</h2>
                  <h5>Fuente del personaje</h5>
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
                  <h5>Dificultad</h5>
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
                <h5>Intentos</h5>
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
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={"background"}>
      <video muted loop preload="auto" autoPlay>
        <source
          type="video/webm"
          src={`${process.env.PUBLIC_URL}/img/background_home_1.webm`}
        />
      </video>
      {renderMenu()}
    </div>
  );
};

export default Home;

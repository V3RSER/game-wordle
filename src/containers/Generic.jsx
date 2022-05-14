import React from "react";

const Generic = ({ message, error }) => {
  return (
    <div className={"background"}>
      <video muted loop preload="auto" autoPlay>
        <source
          type="video/webm"
          src={`${process.env.PUBLIC_URL}/img/background.webm`}
        />
      </video>

      <div className="home-content">
        <div
          style={{
            color: "white",
            backgroundColor: "#0000007a",
            padding: "1rem",
            borderRadius: "10px",
            fontSize: "3rem",
            textAlign: "center",
          }}>
          {error && (
            <h2
              style={{
                fontSize: "3rem",
              }}>
              <b> {error.toUpperCase()}</b>
            </h2>
          )}
          <h2
            style={{
              fontSize: "3rem",
            }}>
            {message}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Generic;

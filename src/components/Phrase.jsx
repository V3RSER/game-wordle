import React from "react";
import { Table } from "reactstrap";
import Letter from "./Letter";
const Phrase = ({ value = "", length }) => {
  return (
    <>
      <Table bordered responsive size="">
        <tbody>
          <tr>
            {[...Array(length).keys()].map((index) => (
              <Letter key={index} value={value.charAt(index)} />
            ))}
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Phrase;

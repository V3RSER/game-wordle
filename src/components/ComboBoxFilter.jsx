import React from "react";
import { Input } from "reactstrap";

const ComboBoxFilter = ({ defaultValue, state, setState, source }) => {
  return (
    <Input
      type="select"
      defaultValue={defaultValue}
      onChange={(event) => {
        setState({ value: event.target.value, options: state.options });
      }}>
      {state.options[source].map((op, index) => (
        <option key={index} value={op.value}>
          {op.name}
        </option>
      ))}
    </Input>
  );
};

export default ComboBoxFilter;

import React from "react";
import classes from "./InputForm.module.css";

type InputFormProps = {
  placeholder: string;
  active?: boolean;
  labelText: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputForm({
  placeholder,
  labelText,
  active,
  name,
  value,
  onChange,
}: InputFormProps) {
  return (
    <label className={classes.labelBox}>
      {labelText}
      <input
        required
        name={name}
        value={value}
        onChange={onChange}
        type="text"
        className={
          active ? `${classes.styled} ${classes.activeStatus}` : classes.styled
        }
        placeholder={placeholder}
      />
    </label>
  );
}

import type { ChangeEvent } from "react";
import classes from "./Checkbox.module.css";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  status?: string;
}

export function Checkbox({
  checked,
  onChange,
  disabled = false,
  status,
}: CheckboxProps) {
  return (
    <div className={classes.checkboxDiv}>
      <div
        className={`${classes.statusDiv} ${status ? classes[status] : ""}`}
      />
      <input
        type="checkbox"
        className={classes.checkbox}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

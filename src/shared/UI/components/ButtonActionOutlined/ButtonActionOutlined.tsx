import React from "react";
import classes from "./ButtonActionOutlined.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function ButtonActionOutlined({
  children,
  active,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={
        active ? `${classes.styled} ${classes.activeStatus}` : classes.styled
      }
    >
      {children}
    </button>
  );
}

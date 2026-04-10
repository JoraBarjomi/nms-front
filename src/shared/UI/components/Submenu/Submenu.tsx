import classes from "./Submenu.module.css";
import { SubmenuItem } from "../SubmenuItem/SubmenuItem";
import { Fragment } from "react/jsx-runtime";

interface SubmenuProps {
  items: { to: string; label: string }[];
}

export function Submenu({ items }: SubmenuProps) {
  return (
    <div className={classes.submenu}>
      {items.map((item, index) => (
        <Fragment key={item.to}>
          <SubmenuItem to={item.to} label={item.label} />
          {index < items.length - 1 && (
            <span className={classes.separator}>/</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

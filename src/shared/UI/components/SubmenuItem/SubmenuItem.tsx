import { NavLink } from "react-router-dom";
import classes from "./SubmenuItem.module.css";

interface SubmenuItemProps {
  to: string;
  label: string;
}

export function SubmenuItem({ to, label }: SubmenuItemProps) {
  return (
    <div>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? `${classes.link} ${classes.activeLink}` : classes.link
        }
      >
        {label}
      </NavLink>
    </div>
  );
}

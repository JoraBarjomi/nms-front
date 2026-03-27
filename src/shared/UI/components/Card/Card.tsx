import { type Size } from "../../../constants/sizeCard";
import classes from "./Card.module.css";

type CardProps = {
  size?: Size;
  title?: React.ReactNode;
  text?: React.ReactNode;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export function Card({ size, title, text, icon: Icon }: CardProps) {
  return (
    <div className={`${classes.card_ground} ${size ? classes[size] : ""}`}>
      <div className={classes.card_content}>
        {" "}
        <h1 className={classes.card_title}>{title}</h1>
        <h2 className={classes.card_main_text}>{text}</h2>
      </div>
      {Icon && <Icon className={classes.card_icon} />}
    </div>
  );
}

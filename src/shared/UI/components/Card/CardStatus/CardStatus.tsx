import classes from "../Card.module.css";

type CardSize = "small" | "medium" | "large";
type CardStatus = "critical" | "major" | "warning" | "maint" | "closed";

type CardProps = {
  size?: CardSize;
  title?: React.ReactNode;
  text?: React.ReactNode;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  status?: CardStatus;
};

export function CardStatus({
  size,
  title,
  text,
  icon: Icon,
  status,
}: CardProps) {
  return (
    <div className={`${classes.card_ground} ${size ? classes[size] : ""}`}>
      <div className={classes.card_content}>
        {" "}
        <h1 className={classes.card_title}>{title}</h1>
        <h2 className={classes.card_main_text}>{text}</h2>
      </div>
      <div className={classes.card_status}>
        {Icon && <Icon className={classes.card_icon} />}
        <div className={`${status ? classes[status] : ""}`}></div>
      </div>
    </div>
  );
}

import classes from "../Card.module.css";

type CardProps = {
  title?: React.ReactNode;
  text?: React.ReactNode;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  status?: React.ReactNode;
};

export function CardStatus({ title, text, icon: Icon, status }: CardProps) {
  return (
    <div className={classes.card_ground}>
      <div className={classes.card_content}>
        {" "}
        <h1 className={classes.card_title}>{title}</h1>
        <h2 className={classes.card_main_text}>{text}</h2>
      </div>
      <div className={classes.card_status}>
        {" "}
        {Icon && <Icon className={classes.card_icon} />}
        {status === "critical" ? (
          <div className={classes.card_critical}></div>
        ) : status === "major" ? (
          <div className={classes.card_major}></div>
        ) : status === "warning" ? (
          <div className={classes.card_warning}></div>
        ) : status === "closed" ? (
          <div className={classes.card_closed}></div>
        ) : null}
      </div>
    </div>
  );
}

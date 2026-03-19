import classes from "./Status.module.css";

type StatusProps = {
  status?: React.ReactNode;
};

export function Status({ status }: StatusProps) {
  return (
    <>
      {status === "critical" ? (
        <div className={classes.content}>
          {" "}
          <div className={classes.card_critical}></div>
          <h1 className={classes.h1}>Critical</h1>
        </div>
      ) : status === "major" ? (
        <div className={classes.content}>
          <div className={classes.card_major}></div>
          <h1 className={classes.h1}>Major</h1>
        </div>
      ) : status === "warning" ? (
        <div className={classes.content}>
          <div className={classes.card_warning}></div>
          <h1 className={classes.h1}>Warning</h1>
        </div>
      ) : status === "closed" ? (
        <div className={classes.content}>
          <div className={classes.card_closed}></div>

          <h1 className={classes.h1}>Closed</h1>
        </div>
      ) : null}
    </>
  );
}

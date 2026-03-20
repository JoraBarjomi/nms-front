import classes from "./Status.module.css";

type StatusProps = {
  status?: React.ReactNode;
};

export function Status({ status }: StatusProps) {
  return (
    <>
      {status === "down" ? (
        <div className={classes.content}>
          <div className={classes.card_down}></div>
          <h1 className={classes.h1}>Down</h1>
        </div>
      ) : status === "maint" ? (
        <div className={classes.content}>
          <div className={classes.card_maint}></div>
          <h1 className={classes.h1}>Maint</h1>
        </div>
      ) : status === "deg" ? (
        <div className={classes.content}>
          <div className={classes.card_deg}></div>
          <h1 className={classes.h1}>Degraded</h1>
        </div>
      ) : status === "up" ? (
        <div className={classes.content}>
          <div className={classes.card_up}></div>
          <h1 className={classes.h1}>Up</h1>
        </div>
      ) : null}
    </>
  );
}

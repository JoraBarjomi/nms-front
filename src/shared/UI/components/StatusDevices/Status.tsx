import classes from "./Status.module.css";
import { type AllStatuses } from "../../../constants/allStatuses";

type StatusProps = {
  status?: AllStatuses;
};

export function Status({ status }: StatusProps) {
  return (
    <>
      {status === "down" ? (
        <div className={classes.content}>
          <div className={"down"}></div>
          <h1 className={classes.h1}>Down</h1>
        </div>
      ) : status === "maint" ? (
        <div className={classes.content}>
          <div className={"maint"}></div>
          <h1 className={classes.h1}>Maint</h1>
        </div>
      ) : status === "deg" ? (
        <div className={classes.content}>
          <div className={"deg"}></div>
          <h1 className={classes.h1}>Degraded</h1>
        </div>
      ) : status === "up" ? (
        <div className={classes.content}>
          <div className={"up"}></div>
          <h1 className={classes.h1}>Up</h1>
        </div>
      ) : null}
    </>
  );
}

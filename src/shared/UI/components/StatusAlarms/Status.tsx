import classes from "./Status.module.css";
import { type AllStatuses } from "../../../constants/allStatuses";

type StatusProps = {
  status?: AllStatuses;
};

export function Status({ status }: StatusProps) {
  return (
    <>
      {status === "critical" ? (
        <div className={classes.content}>
          <div className={"critical"}></div>
          <h1 className={classes.h1}>Critical</h1>
        </div>
      ) : status === "major" ? (
        <div className={classes.content}>
          <div className={"major"}></div>
          <h1 className={classes.h1}>Major</h1>
        </div>
      ) : status === "warning" ? (
        <div className={classes.content}>
          <div className={"warning"}></div>
          <h1 className={classes.h1}>Warning</h1>
        </div>
      ) : status === "closed" ? (
        <div className={classes.content}>
          <div className={"closed"}></div>

          <h1 className={classes.h1}>Closed</h1>
        </div>
      ) : null}
    </>
  );
}

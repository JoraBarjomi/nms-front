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
          <div className={classes.down}></div>
          <h1 className={classes.h1}>Down</h1>
        </div>
      ) : status === "maint" ? (
        <div className={classes.content}>
          <div className={classes.maint}></div>
          <h1 className={classes.h1}>Maint</h1>
        </div>
      ) : status === "deg" ? (
        <div className={classes.content}>
          <div className={classes.deg}></div>
          <h1 className={classes.h1}>Degraded</h1>
        </div>
      ) : status === "active" ? (
        <div className={classes.content}>
          <div className={classes.activeStatus}></div>
          <h1 className={classes.h1}>Active</h1>
        </div>
      ) : status === "critical" ? (
        <div className={classes.content}>
          <div className={classes.critical}></div>
          <h1 className={classes.h1}>Critical</h1>
        </div>
      ) : status === "major" ? (
        <div className={classes.content}>
          <div className={classes.major}></div>
          <h1 className={classes.h1}>Major</h1>
        </div>
      ) : status === "warning" ? (
        <div className={classes.content}>
          <div className={classes.warning}></div>
          <h1 className={classes.h1}>Warning</h1>
        </div>
      ) : status === "closed" ? (
        <div className={classes.content}>
          <div className={classes.closed}></div>

          <h1 className={classes.h1}>Closed</h1>
        </div>
      ) : null}
    </>
  );
}

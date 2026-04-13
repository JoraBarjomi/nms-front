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
          <span className={classes.text}>Down</span>
        </div>
      ) : status === "maint" ? (
        <div className={classes.content}>
          <div className={classes.maint}></div>
          <span className={classes.text}>Maint</span>
        </div>
      ) : status === "deg" ? (
        <div className={classes.content}>
          <div className={classes.deg}></div>
          <span className={classes.text}>Degraded</span>
        </div>
      ) : status === "active" ? (
        <div className={classes.content}>
          <div className={classes.activeStatus}></div>
          <span className={classes.text}>Active</span>
        </div>
      ) : status === "critical" ? (
        <div className={classes.content}>
          <div className={classes.critical}></div>
          <span className={classes.text}>Critical</span>
        </div>
      ) : status === "major" ? (
        <div className={classes.content}>
          <div className={classes.major}></div>
          <span className={classes.text}>Major</span>
        </div>
      ) : status === "warning" ? (
        <div className={classes.content}>
          <div className={classes.warning}></div>
          <span className={classes.text}>Warning</span>
        </div>
      ) : status === "closed" ? (
        <div className={classes.content}>
          <div className={classes.closed}></div>

          <span className={classes.text}>Closed</span>
        </div>
      ) : status === "connected" ? (
        <div className={classes.content}>
          <div className={classes.activeStatus}></div>
          <span className={classes.text}>Connected</span>
        </div>
      ) : status === "connecting" ? (
        <div className={classes.content}>
          <div className={classes.warning}></div>
          <span className={classes.text}>Connected</span>
        </div>
      ) : status === "reconnecting" ? (
        <div className={classes.content}>
          <div className={classes.major}></div>
          <span className={classes.text}>Connected</span>
        </div>
      ) : status === "disconnected" ? (
        <div className={classes.content}>
          <div className={classes.down}></div>
          <span className={classes.text}>Connected</span>
        </div>
      ) : null}
    </>
  );
}

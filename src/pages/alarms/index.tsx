import { Card } from "../../shared/UI/components/Card/Card";
import { HomeIcon } from "../../shared/UI/icons/icons";
import classes from "./alarms.module.css";

export function AlarmsPage() {
  return (
    <div>
      <div className={classes.cards}>
        {" "}
        <Card title={"Alarms"} text={"943"} icon={HomeIcon}></Card>
        <Card title={"Alarms"} text={"943"} icon={HomeIcon}></Card>
        <Card title={"Alarms"} text={"943"} icon={HomeIcon}></Card>
        <Card title={"Alarms"} text={"943"} icon={HomeIcon}></Card>
        <Card title={"Alarms"} text={"943"} icon={HomeIcon}></Card>
      </div>
    </div>
  );
}

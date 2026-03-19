import { Card } from "../../shared/UI/components/Card/Card";
import { CardStatus } from "../../shared/UI/components/Card/CardStatus/CardStatus";
// import {
//   HeartbeatIcon,
//   AlarmsIcon,
//   DownIcon,
//   UpIcon,
//   MaintIcon,
//   PlotIcon,
// } from "../../shared/UI/icons/icons";
import Table from "../../shared/UI/components/Table/Table";
import classes from "./devices.module.css";

export function DevicesPage() {
  return (
    <div className={classes.content}>
      <div className={classes.cards}>
        <div className={classes.left_cards}>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
        <div className={classes.right_cards}>
          <CardStatus></CardStatus>
          <CardStatus></CardStatus>
          <CardStatus></CardStatus>
          <CardStatus></CardStatus>
        </div>
      </div>
      <div className={classes.table}>
        {" "}
        <Table></Table>
      </div>
    </div>
  );
}

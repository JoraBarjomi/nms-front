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
import classes from "./devices.module.css";
import Table from "../../widgets/Table/Table";
import { DevicesData } from "../../entities/Device";
import { deviceTableColumns } from "../../features/deviceTable/deviceColumns";
export function DevicesPage() {
  return (
    <div className={classes.content}>
      <div className={classes.cards}>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <CardStatus></CardStatus>
        <CardStatus></CardStatus>
        <CardStatus></CardStatus>
        <CardStatus></CardStatus>
      </div>
      <div className={classes.table}>
        <Table
          columnsTable={deviceTableColumns}
          dataTable={DevicesData}
        ></Table>
      </div>
    </div>
  );
}

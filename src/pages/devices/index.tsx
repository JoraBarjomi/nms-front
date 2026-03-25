import { Card } from "../../shared/UI/components/Card/Card";
import { CardStatus } from "../../shared/UI/components/Card/CardStatus/CardStatus";
import { BigCard } from "../../shared/UI/components/Card/BigCard/BigCard";
import {
  AllIcon,
  BSIcon,
  RouterIcon,
  SWIcon,
  OtchetIcon,
  PlotIcon,
  UpIcon,
  DownIcon,
  ProgressIcon,
  SpeedIcon,
  DownlinkIcon,
} from "../../shared/UI/icons/icons";
import classes from "./devices.module.css";
import Table from "../../widgets/Table/Table";
import { DevicesData } from "../../entities/Device";
import { deviceTableColumns } from "../../features/deviceTable/deviceColumns";
export function DevicesPage() {
  const totalDevices = DevicesData.length;
  const activeCells = DevicesData.filter((a) => a.type === "eNodeB").length;
  const activeRouters = DevicesData.filter((a) => a.type === "router").length;
  const activeSwitches = DevicesData.filter((a) => a.type === "switch").length;
  const downDevices = DevicesData.filter((a) => a.status === "down").length;
  const upDevices = DevicesData.filter((a) => a.status === "up").length;
  const maintDevices = DevicesData.filter((a) => a.status === "maint").length;
  const degDevices = DevicesData.filter((a) => a.status === "deg").length;

  return (
    <div className={classes.content}>
      <div className={classes.cardsDiv}>
        <div className={classes.cards_left}>
          <Card
            size="medium"
            title={"ALL"}
            text={totalDevices}
            icon={AllIcon}
          ></Card>
          <Card
            size="medium"
            title={"Cells"}
            text={activeCells}
            icon={BSIcon}
          ></Card>
          <CardStatus
            size="medium"
            title={"UP"}
            text={upDevices}
            icon={UpIcon}
            status={"closed"}
          ></CardStatus>
          <CardStatus
            size="medium"
            title={"MAINT"}
            text={maintDevices}
            icon={OtchetIcon}
            status={"maint"}
          ></CardStatus>
          <Card
            size="medium"
            title={"Routers"}
            text={activeRouters}
            icon={RouterIcon}
          ></Card>
          <Card
            size="medium"
            title={"Switches"}
            text={activeSwitches}
            icon={SWIcon}
          ></Card>
          <CardStatus
            size="medium"
            title={"DOWN"}
            text={downDevices}
            icon={DownIcon}
            status={"critical"}
          ></CardStatus>
          <CardStatus
            size="medium"
            title={"DEGRADED"}
            text={degDevices}
            icon={PlotIcon}
            status={"warning"}
          ></CardStatus>
        </div>
        <div className={classes.cards_right}>
          <BigCard
            title={"AVG LOAD"}
            text={"33%"}
            icon={ProgressIcon}
          ></BigCard>
          <BigCard title={"AVG Uptime"} text={"33%"} icon={SpeedIcon}></BigCard>
          <BigCard
            title={"AVG Downlink"}
            text={"33%"}
            icon={DownlinkIcon}
          ></BigCard>
        </div>
      </div>
      <div className={classes.table}>
        <Table
          columnsTable={deviceTableColumns}
          dataTable={DevicesData}
          renderDetails={(row) => (
            <div className={classes.info}>
              <h3>Device: {row.device}</h3>
              <p>Type: {row.type}</p>
              <p>Uptime: {row.uptime}</p>
              <p>Load: {row.load}</p>
              <p>Status: {row.status}</p>
            </div>
          )}
        ></Table>
      </div>
    </div>
  );
}

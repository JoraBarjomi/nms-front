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
import { countBy } from "../../shared/utils/countBy";
import { ALL_STATUSES } from "../../shared/constants/allStatuses";
import { ALL_DEVICES } from "../../shared/constants/allDevices";

export function DevicesPage() {
  const totalDevices = DevicesData.length;
  const activeCells = countBy(DevicesData, ALL_DEVICES.ENODEB);
  const activeRouters = countBy(DevicesData, ALL_DEVICES.ROUTER);
  const activeSwitches = countBy(DevicesData, ALL_DEVICES.SWITCH);
  const downDevices = countBy(DevicesData, ALL_STATUSES.DOWN);
  const upDevices = countBy(DevicesData, ALL_STATUSES.ACTIVE);
  const maintDevices = countBy(DevicesData, ALL_STATUSES.MAINT);
  const degDevices = countBy(DevicesData, ALL_STATUSES.DEG);

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
            title={"ACTIVE"}
            text={upDevices}
            icon={UpIcon}
            status={"active"}
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
            status={"down"}
          ></CardStatus>
          <CardStatus
            size="medium"
            title={"DEGRADED"}
            text={degDevices}
            icon={PlotIcon}
            status={"deg"}
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
              <p>Ip: {row.ip}</p>
            </div>
          )}
        ></Table>
      </div>
    </div>
  );
}

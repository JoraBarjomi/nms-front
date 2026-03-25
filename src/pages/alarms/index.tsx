import { Card } from "../../shared/UI/components/Card/Card";
import { CardStatus } from "../../shared/UI/components/Card/CardStatus/CardStatus";
import {
  HeartbeatIcon,
  AlarmsIcon,
  DownIcon,
  UpIcon,
  MaintIcon,
  PlotIcon,
} from "../../shared/UI/icons/icons";
import Table from "../../widgets/Table/Table";
import classes from "./alarms.module.css";
import { alarmTableColumns } from "../../features/alarmTable/columnsAlarms";
import { AlarmsData } from "../../entities/Alarms";

const totalAlarms = AlarmsData.length;
const activeAlarms = AlarmsData.filter((a) => a.status !== "closed").length;
const criticalAlarms = AlarmsData.filter((a) => a.status === "critical").length;
const majorAlarms = AlarmsData.filter((a) => a.status === "major").length;
const warningAlarms = AlarmsData.filter((a) => a.status === "warning").length;
const closedAlarms = AlarmsData.filter((a) => a.status === "closed").length;

export function AlarmsPage() {
  return (
    <div className={classes.content}>
      <div className={classes.cards}>
        <div className={classes.left_cards}>
          <Card
            size="large"
            title={"Alarms"}
            text={totalAlarms}
            icon={AlarmsIcon}
          ></Card>
          <Card
            size="large"
            title={"Active"}
            text={activeAlarms}
            icon={HeartbeatIcon}
          ></Card>
        </div>
        <div className={classes.right_cards}>
          <CardStatus
            size="large"
            title={"Critical"}
            text={criticalAlarms}
            icon={DownIcon}
            status={"critical"}
          ></CardStatus>
          <CardStatus
            size="large"
            title={"Major"}
            text={majorAlarms}
            icon={PlotIcon}
            status={"major"}
          ></CardStatus>
          <CardStatus
            size="large"
            title={"Warning"}
            text={warningAlarms}
            icon={MaintIcon}
            status={"warning"}
          ></CardStatus>
          <CardStatus
            size="large"
            title={"Closed"}
            text={closedAlarms}
            icon={UpIcon}
            status={"closed"}
          ></CardStatus>
        </div>
      </div>
      <div className={classes.table}>
        <Table
          columnsTable={alarmTableColumns}
          dataTable={AlarmsData}
          renderDetails={(row) => (
            <div className={classes.info}>
              <h3>Device: {row.device}</h3>
              <p>Status: {row.status}</p>
              <p>Probable cause: {row.probable_cause}</p>
              <p>Specific problem: {row.spec_problem}</p>
            </div>
          )}
        ></Table>
      </div>
    </div>
  );
}

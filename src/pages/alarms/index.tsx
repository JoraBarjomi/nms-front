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
import Table from "../../shared/UI/components/Table/Table";
import classes from "./alarms.module.css";

export function AlarmsPage() {
  return (
    <div>
      <div className={classes.cards}>
        <div className={classes.left_cards}>
          <Card title={"Alarms"} text={"943"} icon={AlarmsIcon}></Card>
          <Card title={"Active"} text={"8"} icon={HeartbeatIcon}></Card>
        </div>
        <div className={classes.right_cards}>
          <CardStatus
            title={"Critical"}
            text={"11"}
            icon={DownIcon}
            status={"critical"}
          ></CardStatus>
          <CardStatus
            title={"Major"}
            text={"8"}
            icon={MaintIcon}
            status={"major"}
          ></CardStatus>
          <CardStatus
            title={"Warning"}
            text={"7"}
            icon={PlotIcon}
            status={"warning"}
          ></CardStatus>
          <CardStatus
            title={"Closed"}
            text={"25"}
            icon={UpIcon}
            status={"closed"}
          ></CardStatus>
        </div>
      </div>
      <Table></Table>
    </div>
  );
}

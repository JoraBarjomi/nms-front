import { Box, Divider } from "@mui/material";
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
import { AlarmsData } from "../../entities/Alarms";
import { countBy } from "../../shared/utils/countBy";
import { ALL_STATUSES } from "../../shared/constants/allStatuses";
import Table from "../../widgets/Table/Table";
import { alarmTableColumns } from "../../features/alarmTable/columnsAlarms";

const totalAlarms = AlarmsData.length;
const activeAlarms = AlarmsData.filter(
  (a) => a.status !== ALL_STATUSES.CLOSED,
).length;
const criticalAlarms = countBy(AlarmsData, ALL_STATUSES.CRITICAL);
const majorAlarms = countBy(AlarmsData, ALL_STATUSES.MAJOR);
const warningAlarms = countBy(AlarmsData, ALL_STATUSES.WARNING);
const closedAlarms = countBy(AlarmsData, ALL_STATUSES.CLOSED);

export function AlarmsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Card
          size="medium"
          title={"Alarms"}
          text={totalAlarms}
          icon={AlarmsIcon}
        />

        <Card
          size="medium"
          title={"Active"}
          text={activeAlarms}
          icon={HeartbeatIcon}
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: "none", lg: "block" },
            borderColor: "transparent",
          }}
        />

        <CardStatus
          size="medium"
          title={"Critical"}
          text={criticalAlarms}
          icon={DownIcon}
          status={"critical"}
        />
        <CardStatus
          size="medium"
          title={"Major"}
          text={majorAlarms}
          icon={PlotIcon}
          status={"major"}
        />
        <CardStatus
          size="medium"
          title={"Warning"}
          text={warningAlarms}
          icon={MaintIcon}
          status={"warning"}
        />
        <CardStatus
          size="medium"
          title={"Closed"}
          text={closedAlarms}
          icon={UpIcon}
          status={"closed"}
        />
      </Box>

      <Box>
        <Table rows={AlarmsData} columns={alarmTableColumns} />
      </Box>
    </Box>
  );
}

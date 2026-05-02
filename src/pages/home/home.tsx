import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";

import { HeartbeatIcon, UpIcon } from "../../shared/UI/icons/icons";

import { Card } from "../../shared/UI/components/Card/Card";
import { CardStatus } from "../../shared/UI/components/Card/CardStatus/CardStatus";

import { type NetworkElement } from "../../entities/Element/Element";
import {
  getSystemHealth,
  fetchNetworkElements,
} from "../../entities/System/api/systemApi";

export function HomePage() {
  const [healthStatus, setHealthStatus] = useState<"active" | "critical">(
    "critical",
  );
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    getSystemHealth()
      .then(() => {
        setHealthStatus("active");
        setStatusText("Online");
      })
      .catch(() => {
        setHealthStatus("critical");
        setStatusText("Offline");
      });
  }, []);

  const [elements, setElements] = useState<NetworkElement[]>([]);
  useEffect(() => {
    fetchNetworkElements()
      .then((data) => setElements(data))
      .catch((error) => {
        console.error("Failed to fetch network elements in home:", error);
      });
  }, []);

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
        <CardStatus
          size="large"
          title={"System health"}
          text={statusText}
          icon={HeartbeatIcon}
          status={healthStatus}
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: "none", lg: "block" },
            borderColor: "transparent",
          }}
        />

        <Card
          size="large"
          title={"Total elements"}
          text={elements.length}
          icon={UpIcon}
        />

        <CardStatus size="medium" title={""} text={""} />
        <CardStatus size="medium" title={""} text={""} />
        <CardStatus size="medium" title={""} text={""} />
        <CardStatus size="medium" title={""} text={""} />
      </Box>
    </Box>
  );
}

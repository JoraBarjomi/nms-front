import { type Size } from "../../../../constants/sizeCard";
import { type AllStatuses } from "../../../../constants/allStatuses";
import { Card as MuiCard, Box, Typography } from "@mui/material";

type CardProps = {
  size?: Size;
  title?: React.ReactNode;
  text?: React.ReactNode;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  status?: AllStatuses;
};

const sizeMap: Record<string, string> = {
  small: "100px",
  medium: "120px",
  large: "170px",
};

const statusColorMap: Record<string, string> = {
  critical: "var(--color-error)",
  down: "var(--color-error)",
  major: "var(--color-major)",
  warning: "var(--color-warning)",
  deg: "var(--color-warning)",
  maint: "var(--color-maint)",
  closed: "var(--color-success)",
  active: "var(--color-success)",
};

export function CardStatus({ size, title, text, icon: Icon, status }: CardProps) {
  const minWidth = size && sizeMap[size] ? sizeMap[size] : "160px";

  return (
    <MuiCard
      variant="outlined"
      sx={{
        display: "flex",
        minWidth,
        maxWidth: "220px",
        flex: 1,
        height: "90px",
        borderRadius: "10px",
        p: "10px 10px 14px 10px",
        boxSizing: "border-box",
        justifyContent: "space-between",
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 300,
            fontSize: "15px",
            m: 0,
            color: "text.secondary",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600,
            fontSize: "25px",
            lineHeight: 1,
            m: 0,
            color: "text.primary",
          }}
        >
          {text}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexShrink: 0,
          ml: "10px",
        }}
      >
        {Icon && (
          <Box sx={{ color: "text.secondary", display: "flex" }}>
            <Icon style={{ width: "19px", height: "19px" }} />
          </Box>
        )}
        {status && (
          <Box
            sx={{
              width: "19px",
              height: "19px",
              borderRadius: "50%",
              backgroundColor: statusColorMap[status] || "var(--color-disabled)",
            }}
          />
        )}
      </Box>
    </MuiCard>
  );
}

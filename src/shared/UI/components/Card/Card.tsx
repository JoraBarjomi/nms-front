import { type Size } from "../../../constants/sizeCard";
import { Card as MuiCard, Box, Typography } from "@mui/material";

type CardProps = {
  size?: Size;
  title?: React.ReactNode;
  text?: React.ReactNode;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const sizeMap: Record<string, string> = {
  small: "100px",
  medium: "120px",
  large: "170px",
};

export function Card({ size, title, text, icon: Icon }: CardProps) {
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
      {Icon && (
        <Box sx={{ flexShrink: 0, color: "text.secondary", display: "flex" }}>
          <Icon style={{ width: "19px", height: "19px" }} />
        </Box>
      )}
    </MuiCard>
  );
}

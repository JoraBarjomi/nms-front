import { NavLink } from "react-router-dom";
import { LogoIcon } from "../../icons/icons";

import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

type LogoProps = {
  open?: boolean;
}

export function Logo({open}: LogoProps) {
  return (
    <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit'}}>
      <Box sx={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <LogoIcon />
        {open && (<Typography variant="h6" component="h1" color="text.primary" sx={{fontWeight: 600, fontSize: 24}}>NMS</Typography>)}
      </Box>
    </NavLink>
  );
}
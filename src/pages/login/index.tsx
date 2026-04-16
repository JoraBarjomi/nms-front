import * as React from "react";
import {
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";

const providers = [{ id: "credentials", name: "Email and Password" }];

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="medium"
      disableElevation
      fullWidth
      sx={{ my: 2, py: 1.5, borderRadius: 2, fontWeight: 600 }}
    >
      Sign In
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="/register" variant="body2" sx={{ fontWeight: 500 }}>
      Create an account
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2" sx={{ fontWeight: 500 }}>
      Forgot password?
    </Link>
  );
}

function Title() {
  return (
    <Box sx={{ mb: 1 }}>
      <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>Login</h2>
      <p style={{ margin: 0, opacity: 0.7 }}>
        Welcome back! Please enter your details.
      </p>
    </Box>
  );
}

function RememberMeCheckbox() {
  const theme = useTheme();
  return (
    <FormControlLabel
      label="Remember me"
      control={
        <Checkbox
          name="remember"
          value="true"
          color="primary"
          sx={{ padding: 0.5, "& .MuiSvgIcon-root": { fontSize: 20 } }}
        />
      }
      slotProps={{
        typography: {
          color: "textSecondary",
          fontSize: theme.typography.pxToRem(14),
          fontWeight: 500,
        },
      }}
    />
  );
}

export function LoginPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
        backgroundColor: "background.default",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 480,
          width: "100%",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SignInPage
          signIn={(_provider, formData) =>
            alert(`Logging in with: ${formData.get("email")}`)
          }
          slots={{
            title: Title,
            emailField: CustomEmailField,
            passwordField: CustomPasswordField,
            submitButton: CustomButton,
            signUpLink: SignUpLink,
            rememberMe: RememberMeCheckbox,
            forgotPasswordLink: ForgotPasswordLink,
          }}
          providers={providers}
          sx={{
            "& .MuiTypography-root": {
              color: "text.primary",
            },
            "& .MuiLink-root": {
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
}

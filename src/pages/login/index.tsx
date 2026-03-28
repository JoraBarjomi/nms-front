import { NavLink } from "react-router-dom";
import { ButtonAction } from "../../shared/UI/components/ButtonAction/ButtonAction";
import classes from "./login.module.css";

export function LoginPage() {
  return (
    <div className={classes.body}>
      <div className={classes.picture}></div>

      <div className={classes.form}>
        <h2>Login Form</h2>

        <div className={classes.card}>
          <div>
            <h1>Welcome Back!</h1>
            <p>Enter your Credentials to access your account</p>
            <NavLink to="/profile" className="link">
              <ButtonAction>Login</ButtonAction>
            </NavLink>
          </div>
          <NavLink to="/register" className="link">
            <ButtonAction>Register</ButtonAction>{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

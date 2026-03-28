import { NavLink } from "react-router-dom";
import { ButtonAction } from "../../shared/UI/components/ButtonAction/ButtonAction";
import classes from "./register.module.css";

export function RegisterPage() {
  return (
    <div className={classes.body}>
      <div className={classes.form}>
        <h2>Register Form</h2>

        <div className={classes.card}>
          <div>
            <h1>Get Started Now!</h1>
            <p>Enter your personal details and start journey with us</p>
            <NavLink to="/profile" className="link">
              <ButtonAction>Register</ButtonAction>
            </NavLink>
          </div>
        </div>
      </div>
      <div className={classes.picture}></div>
    </div>
  );
}

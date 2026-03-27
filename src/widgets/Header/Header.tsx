import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { ButtonAction } from "../../shared/UI/components/ButtonAction/ButtonAction";

type HeaderProps = {
  curPage?: React.ReactNode;
  userInfo?: React.ReactNode;
  isLogin?: boolean;
};

export function Header({ curPage, userInfo, isLogin }: HeaderProps) {
  return (
    <header className={classes.header}>
      <div className={classes.pageTitle}>{curPage}</div>
      {isLogin ? (
        <NavLink to="/profile" className={classes.link}>
          <div className={classes.userPic}>{userInfo}</div>
        </NavLink>
      ) : (
        <div className={classes.login}>
          <NavLink to="/login" className={classes.link}>
            <ButtonAction>Login</ButtonAction>
          </NavLink>
        </div>
      )}
    </header>
  );
}

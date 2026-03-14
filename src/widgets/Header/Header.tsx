import React from "react";
import classes from "./Header.module.css";

type HeaderProps = {
  curPage?: React.ReactNode;
  userInfo?: React.ReactNode;
};

export function Header({ curPage, userInfo }: HeaderProps) {
  return (
    <header className={classes.header}>
      <div className={classes.pageTitle}>{curPage}</div>
      <div className={classes.userPic}>{userInfo}</div>
    </header>
  );
}

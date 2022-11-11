import React, { Fragment, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "./Header.css";
const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const options = [
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully...");
    history("/login");
  }

  return (
    <Fragment>
      <span className="userName">Hello, {user.name}</span>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        direction="down"
        className="speedDial"
        style={{ zIndex: "11" }}
        icon={
          <img
            src={
              user.avatar.url ? user.avatar.url : "../../../images/Profile.png"
            }
            className="speedDialIcon"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>

      <Toaster position="bottom-center" reverseOrder={false} />
    </Fragment>
  );
};

export default UserOptions;

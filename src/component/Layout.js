import React, { forwardRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Notifications from "@material-ui/icons/Notifications";
import PropTypes from "prop-types";
import { Button, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  section: {
    minHeight: "562px",
    width: "100%",
  },

  logo: {
    display: "block",
    margin: "auto",
  },
  margin: {
    marginTop: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    display: "flex-item",
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: "#F6F6F6",
    overflowX: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(1),
  },
}));

const Layout = forwardRef(({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="h6" color="primary">My Task</Typography>
          </div>

          <div>
          <Button href="/" color="primary">Home</Button>
            <Tooltip title="Notification">
              <IconButton aria-label="notification">
                <Notifications />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton aria-label="profile">
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton aria-label="logout">
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.section}>
          <Container>{children}</Container>
        </div>
      </main>
    </div>
  );
});

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
};

export default Layout;

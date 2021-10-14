import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Layout from "../component/Layout";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserDetail from "./UserDetail";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: "10px",
  },
  media: {
    height: 75,
    width: 75,
  },
  center: {
    justifyContent: "center",
  },
});

export default function Home() {
  const classes = useStyles();
  const [userlist, setUserlist] = useState([]);
  const history = useHistory();
  const [Id, setId] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => {
        console.log(res.data);
        setUserlist(res.data);
      })
      .catch();
  }, []);
  const handleViewPost = (id) => {
    history.push({
      pathname: "/user/posts/" + id,
    });
  };
  const handleViewDetail = (id) => {
    setId(id);
    setOpen(true);
  };

  return (
    <Layout>
      <div>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          All Users
        </Typography>
        <br />
        <Container>
          <Grid container spacing={3}>
            {userlist && userlist.length > 0 ? (
              userlist.map((user) => {
                return (
                  <Grid item xs={6} sm={4} md={3}>
                    <Card className={classes.root}>
                      <CardContent>
                        <Box display="flex" justifyContent="center">
                          <Avatar
                            alt="Cindy Baker"
                            src=""
                            className={classes.media}
                          />
                        </Box>
                        <br />
                        <Typography
                          variant="body2"
                          align="center"
                          component="p"
                          gutterBottom
                        >
                          ID : {user.id}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          align="center"
                          component="h6"
                        >
                          Name: {user.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          align="center"
                          gutterBottom
                        >
                          Email: {user.email}
                        </Typography>
                      </CardContent>

                      <CardActions className={classes.center}>
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          onClick={() => handleViewPost(user.id)}
                        >
                          View post
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          variant="contained"
                          onClick={() => handleViewDetail(user.id)}
                        >
                          View Detail
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <div></div>
            )}
          </Grid>
        </Container>
        <br />
      </div>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" color="secondary">
            {"User Detail"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <UserDetail Id={Id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

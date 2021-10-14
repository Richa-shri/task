import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Layout from "../component/Layout";
import axios from "axios";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CommentIcon from "@material-ui/icons/Comment";

const useStyles = makeStyles({
  root: {},
  avatar: {
    background: "pink",
  },
});

export default function Comments(props) {
  const classes = useStyles();
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=2`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch();
  }, []);

  return (
    <Layout>
      <div>
        <Typography
          gutterBottom
          variant="h5"
          component="h4"
          align="center"
        >
         Post Related Comments 
        </Typography>
        <br />
        <Container>
          <Grid container spacing={2} justifyContent="center">
            {post && post.length > 0 ? (
              post.map((user) => {
                return (
                  <Grid item xs={12} sm={12} md={10}>
                    <Card className={classes.root}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                          >
                            <CommentIcon />
                          </Avatar>
                        }
                        title={user.name}
                        subheader={user.id}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {user.userId}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {user.body}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <div>No Data found</div>
            )}
          </Grid>
        </Container>
        <br />
      </div>
    </Layout>
  );
}

import React, { useEffect, useState } from "react";
import { Typography, Grid, Divider } from "@material-ui/core";
import axios from "axios";

export default function UserDetail({ Id }) {
  const myid = Id;
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${myid}`)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
      })
      .catch();
  }, [myid]);
  return (
    <div>
      {detail !== undefined &&
      detail.address !== undefined &&
      detail.address.geo !== undefined &&
      detail.company ? (
        [detail].map((item) => {
          return (
            <div key={item.id}>
              <Grid container spacing={1}>
                <Grid item sm={6}>
                  <Typography gutterBottom variant="body2">
                    name : {item.name}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Email: {item.email}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Phone: {item.phone}
                  </Typography>
                </Grid>

                <Grid item sm={6}>
                  <Typography gutterBottom variant="body2">
                    Id : {item.id}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    UserName: {item.username}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Website: {item.website}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography gutterBottom variant="subtitle2">
                    Address
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography gutterBottom variant="body2">
                    City : {item.address.city}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Geo
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    (lat): {item.address.geo.lat}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    (lng) : {item.address.geo.lng}
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography gutterBottom variant="body2">
                    Street : {item.address.street}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Suite: {item.address.suite}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Zipcode : {item.address.zipcode}
                  </Typography>
                </Grid>
            
                <Grid item sm={12}>
                <Typography gutterBottom variant="subtitle2">
                   Company
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Company Name : {item.company.name}
                  </Typography>
                
                  <Typography gutterBottom variant="body2">
                  Bs:  {item.company.bs}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                  catchPhrase : {item.company.catchPhrase}
                  </Typography>
                </Grid>
                
              </Grid>
              <br />
              <Divider />
            </div>
          );
        })
      ) : (
        <p>no data</p>
      )}
    </div>
  );
}

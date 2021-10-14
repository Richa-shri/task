import React, { useEffect, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Layout from "../component/Layout";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Chip
} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {},
  table: {
    "& .MuiTableCell-root": {
      // borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
  },
  TableCell: {
    minWidth: 200,
  },
  formControl: {
    width: 220,
    margin: theme.spacing(1),
  },
  btn: {
    display: "block",
    margin: theme.spacing(0, 1),
  },
}));

export default function Post(props) {
  const classes = useStyles();
  const [detail, setDetail] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
      })
      .catch();
  }, [id]);

  const handleViewComment = (id) => {
    history.push({
      pathname: "/user/post/comment/" + id,
    });
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // filter and search
  const rows = useMemo(() => {
    const searchRegex = searchTerm && new RegExp(`${searchTerm}`, "gi");
    return detail.filter((item) => !searchRegex || searchRegex.test(item.id));
  }, [detail, searchTerm]);

  return (
    <Layout>
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Related Post
        </Typography>
        <br />
        <Paper className={classes.root}>
          <Box
            display="flex"
            my={1}
            justifyContent="flex-end"
            alignItems="center"
          >
            <TextField
              id="outlined-basic"
              label="Search by  ID"
              className={classes.formControl}
              variant="outlined"
              margin="dense"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Divider />
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              aria-label="sticky table"
              className={classes.table}
            >
              <TableHead>
                <TableRow>
                  <TableCell>SNo.</TableCell>
                  <TableCell className={classes.TableCell}>Title</TableCell>
                  <TableCell className={classes.TableCell}>Detail</TableCell>
                  <TableCell className={classes.TableCell}>Id</TableCell>
                  <TableCell className={classes.TableCell}>User Id</TableCell>
                  <TableCell className={classes.TableCell}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className={classes.TableCell}>
                          {row.title}
                        </TableCell>

                        <TableCell className={classes.TableCell}>
                          {row.body}
                        </TableCell>
                        <TableCell className={classes.TableCell}>
                        <Chip label={row.id}  color="secondary"/>

                          
                        </TableCell>
                        <TableCell className={classes.TableCell}>
                        {row.userId}
                        </TableCell>
                        <TableCell className={classes.TableCell}>
                          {" "}
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleViewComment(row.id)}
                            variant="contained"
                          >
                            View Comments
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </Layout>
  );
}

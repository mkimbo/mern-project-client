import React from "react";
import { CircularProgress, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Spinner = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <CircularProgress thickness={4} size={100} color="primary" />
    </Container>
  );
};

export default Spinner;

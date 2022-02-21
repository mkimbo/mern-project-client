import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  FormLabel,
  Container,
  Typography,
  Grid,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
const LOGIN_URL = "/login";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  //const [success, setSuccess] = useState(false);

  const { setUser, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const togglePersistedLogin = () => {
    setPersist(!persist);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUser(response?.data);
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response.");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Wrong Email or Password");
      } else {
        setErrMsg("Login Failed.");
      }
      errRef.current.focus();
    }
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid align="center">
            <LockOutlinedIcon />

            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Typography
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </Typography>
          </Grid>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormLabel>Email:</FormLabel>
            <OutlinedInput
              ref={emailRef}
              required
              fullWidth
              name="email"
              type="email"
              id="email"
              autoComplete="off"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel>Password:</FormLabel>
            <OutlinedInput
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={pwd}
              variant="outlined"
              onChange={(e) => setPwd(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={persist}
                  onChange={() => togglePersistedLogin()}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "5px", marginBottom: "3px" }}
            >
              Sign In
            </Button>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Dont have an account? Sign up"}
              </Link>
            </Grid>
          </Box>
        </Box>
        {/*  <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </React.Fragment>
  );
};

export default Login;

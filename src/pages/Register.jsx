import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Grid,
  Typography,
  Container,
  OutlinedInput,
  FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
const REGISTER_URL = "/register";

//const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)|\s([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/;

const Register = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  useEffect(() => {
    success && navigate("/login");
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if send button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios.post(REGISTER_URL, JSON.stringify({ email, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setSuccess(true);
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email is already taken");
      } else {
        setErrMsg("Registration Failed");
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
              Sign Up
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
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              endAdornment={
                <InputAdornment position="end">
                  {validEmail ? <CheckIcon className="valid" /> : ""}
                  {validEmail || !email ? (
                    ""
                  ) : (
                    <CloseIcon className="invalid" />
                  )}
                </InputAdornment>
              }
            />
            <Typography
              component="div"
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              Provide a valid email.
            </Typography>
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
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              endAdornment={
                <InputAdornment position="end">
                  {validPwd ? <CheckIcon className="valid" /> : ""}
                  {validPwd || !pwd ? "" : <CloseIcon className="invalid" />}
                </InputAdornment>
              }
            />
            <Typography
              component="div"
              id="pwdnote"
              className={
                pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
              }
            >
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </Typography>
            <FormLabel>Confirm password:</FormLabel>
            <OutlinedInput
              required
              fullWidth
              name="confirm_password"
              type="password"
              id="confirm_password"
              autoComplete="off"
              value={matchPwd}
              variant="outlined"
              onChange={(e) => setMatchPwd(e.target.value)}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              endAdornment={
                <InputAdornment position="end">
                  {validMatch && matchPwd ? (
                    <CheckIcon className="valid" />
                  ) : (
                    ""
                  )}
                  {validMatch || !matchPwd ? (
                    ""
                  ) : (
                    <CloseIcon className="invalid" />
                  )}
                </InputAdornment>
              }
            />
            <Typography
              component="div"
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              Must match the first password input field.
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "5px", marginBottom: "3px" }}
              disabled={!validEmail || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </Button>
            <Grid item>
              <Link to="/login" variant="body2">
                {"Already registered? Log in"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Register;

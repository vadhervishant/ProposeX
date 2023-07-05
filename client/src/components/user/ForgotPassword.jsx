import { useEffect, useState, useContext } from "react";
import TextField from '@mui/material/TextField';
import { Card, Typography, Button } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";


const ForgotPassword = () => {

  const navigate = useNavigate();
  const defaultForm = {
    email: '',
    code: '',
    password: '',
    confirmPassword: ''
  };

  const [form, setForm] = useState(defaultForm);

  const [isPending, setIsPending] = useState(false);
  const [isChangePasswordPending, setIsChangePasswordPending] = useState(false);
  const [emailTextboxVisible, setEmailTextboxVisible] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  // const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);

  const [error, setError] = useState({
    email: false,
    code: false,
    password: false,
    confirmPassword: false
  });

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const codeRegex = /^[0-9]{6}$/g;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/UserDashboard");
    }
  }, []);

  const validate = (event) => {
    let formNew = form;
    formNew[event.target.name] = event.target.value;
    setForm({ ...formNew });
    let errorNew = error;
    switch (event.target.name) {
      case "email":
        errorNew["email"] = !event.target.value.match(emailRegex);
        break;
      case "code":
        errorNew["code"] = !event.target.value.match(codeRegex);
        break;
      case "password":
        errorNew["password"] = !event.target.value.match(passwordRegex);
        if (form.confirmPassword !== '') {
          errorNew["confirmPassword"] = event.target.value !== formNew.confirmPassword;
        }
        break;
      case "confirmPassword":
        errorNew["confirmPassword"] = event.target.value !== formNew.password;
        break;
    }
    setError({ ...errorNew });

  };

  const sendCode = async () => {
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_BASE_URL}` + `/forgotpassword`, {
          email: form.email
        }, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
          }
        });
      if (response.status == 200) {
        setIsPending(false);
        setEmailTextboxVisible(false);
        // setSnackbarSeverity("success");
        // setSnackbarMessage("A 6-digit code has been sent to the registered email");
        // setOpenSnackbar(true);
      }
    } catch (error) {
      setIsPending(false);
      // setSnackbarSeverity("error");
      // setSnackbarMessage(error.response.data.message);
      // setOpenSnackbar(true);
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_BASE_URL}` + `/verifycode`, {
          email: form.email,
          code: form.code
        }, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
          }
        });
      if (response.status == 200) {
        setIsPending(false);
        localStorage.setItem("token", response.data.token);
        setOpenDialog(true);
      }
    } catch (error) {
      setIsPending(false);
      // setSnackbarSeverity("error");
      // setSnackbarMessage(error.response.data.message);
      // setOpenSnackbar(true);
    }
  };

  const changePassword = async () => {

    try {
      const response = await axios
        .put(`${process.env.REACT_APP_BASE_URL}` + `/changepassword`, {
          password: form.password,
          confirmPassword: form.confirmPassword
        }, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
      if (response.status == 200) {
        localStorage.clear();
        setIsChangePasswordPending(false);
        // setSnackbarSeverity("success");
        // setSnackbarMessage('Password changed successfully.');
        // setOpenSnackbar(true);
        navigate("/Login");
      }
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/SessionTimeOut");
      }
      setIsPending(false);
      setOpenDialog(false);
      // setSnackbarSeverity("error");
      // setSnackbarMessage(error.response.data.message);
      // setOpenSnackbar(true);
    }
  };


  const handleClick = (event) => {
    switch (event.target.name) {
      case "sendCode":
        setIsPending(true);
        sendCode();
        break;
      case "btnOpenDialog":
        setIsPending(true);
        verifyCode();
        break;
      case "cancel":
        setError({ ...error, password: false });
        setError({ ...error, confirmPassword: false });
        setOpenDialog(false);
        break;
      case "updatePassword":
        setIsChangePasswordPending(true);
        changePassword();
        break;
    }
  };

  return (
    <Grid container sx={{ margin: 5 }}>
      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={10} md={4}>
        <Card sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h2" align="center" gutterBottom>
                Forgot Password
              </Typography>
            </Grid>
            <Grid item>
              {emailTextboxVisible ?
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  error={error.email}
                  onChange={validate}
                  helperText={error.email ? "Invalid email format." : ""}
                  value={form.email}
                  fullWidth
                /> : <TextField
                  id="code"
                  name="code"
                  label="Code"
                  type="number"
                  error={error.code}
                  onChange={validate}
                  helperText={error.code ? "Invalid code format." : ""}
                  value={form.code}
                  fullWidth
                />}

            </Grid>

            <Grid item>
              {emailTextboxVisible ?

                <LoadingButton
                  type="submit"
                  id="sendCode"
                  name="sendCode"
                  onClick={handleClick}
                  loading={isPending}
                  disabled={error.email || !form.email || !emailTextboxVisible}
                  variant="contained"
                  fullWidth
                >
                  Send Code
                </LoadingButton> : <LoadingButton
                  type="submit"
                  id="btnOpenDialog"
                  name="btnOpenDialog"
                  onClick={handleClick}

                  loading={isPending}
                  disabled={error.code || !form.code || emailTextboxVisible}
                  variant="contained"
                  fullWidth
                >
                  Reset Password
                </LoadingButton>}
            </Grid>
          </Grid>
        </Card>
        <Dialog open={openDialog}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  error={error.password}
                  onChange={validate}
                  helperText={error.password ? "Password must at least contain: 8 characters, 1 special character, 1 uppercase alphabet, 1 lowercase alphabet." : ""}
                  value={form.password}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Re-enter Password"
                  type="password"
                  error={error.confirmPassword}
                  onChange={validate}
                  helperText={error.confirmPassword ? "Passwords do not match." : ""}
                  value={form.confirmPassword}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button id="cancel" name="cancel" onClick={handleClick}>Cancel</Button>
            <LoadingButton
              id="updatePassword" name="updatePassword"
              onClick={handleClick}
              loading={isChangePasswordPending}
              disabled={Object.keys(error).some(k => error[k]) || !form.password || !form.confirmPassword}
              variant="contained"
            >
              Reset
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid >

  );
};

export default ForgotPassword;
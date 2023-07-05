import { useEffect, useState, useContext } from "react";
import TextField from '@mui/material/TextField';
import { Button, Card, Switch, FormControlLabel, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../../utils/UserContext";


const UserProfile = () => {
  const navigate = useNavigate();
  const defaultProfileForm = {
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    nsfw: false,
  };

  const defaultPasswordForm = {
    password: '',
    confirmPassword: ''
  };

  const [profileForm, setProfileForm] = useState({ ...defaultProfileForm });
  const [passwordForm, setPasswordForm] = useState({ ...defaultPasswordForm });
  const [profileFormChanged, setProfileFormChanged] = useState(false);


  const [isPending, setIsPending] = useState(false);
  const [isUpdatePasswordPending, setIsUpdatePasswordPending] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);


  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    email: false,
    nsfw: false,
    password: false,
    confirmPassword: false
  });

  const fetchProfile = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}` + `/profile`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .catch((err) => {
        console.error(err);
      });

    try {
      if (response.status == 200) {
        setProfileForm(response.data.user);
      }
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/SessionTimeOut");
      }
      setSnackbarSeverity("error");
      setSnackbarMessage('Something went wrong! Please refresh to try again...');
      setOpenSnackbar(true);
    }
  };

  const updateProfile = async () => {
    try {
      const response = await axios
        .put(`${process.env.REACT_APP_BASE_URL}` + `/profile`, {
          ...profileForm
        }, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
      if (response.status == 200) {
        setProfileFormChanged(false);
        setProfileForm(response.data.user);
        setIsPending(false);
        setSnackbarSeverity("success");
        setSnackbarMessage('Profile updated successfully.');
        setOpenSnackbar(true);
      }
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/SessionTimeOut");
      }
      setSnackbarSeverity("error");
      setSnackbarMessage(error.response.data.message);
      setOpenSnackbar(true);
    }
  };

  const changePassword = async () => {
    try {
      const response = await axios
        .put(`${process.env.REACT_APP_BASE_URL}` + `/changepassword`, {
          password: passwordForm.password,
          confirmPassword: passwordForm.confirmPassword
        }, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
      if (response.status == 200) {
        setProfileFormChanged(false);
        setIsUpdatePasswordPending(false);
        setProfileForm(response.data.user);
        setSnackbarSeverity("success");
        setPasswordForm({ ...defaultPasswordForm });
        setOpenDialog(false);
        setSnackbarMessage('Password changed successfully.');
        setOpenSnackbar(true);
      }
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/SessionTimeOut");
      }
      setSnackbarSeverity("error");
      setSnackbarMessage(error.response.data.message);
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/Login");
    }
    fetchProfile();
  }, []);


  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
  const nameRegex = /\b([A-Za-zÀ-ÿ][-,a-z. ']+[ ]*)+/g;


  const validate = (event) => {
    setProfileFormChanged(true);
    let formNew = { ...profileForm, ...passwordForm };
    formNew[event.target.name] = event.target.value;
    setProfileForm({ ...formNew });
    setPasswordForm({ ...formNew });
    let errorNew = error;
    switch (event.target.name) {
      case "firstName":
        errorNew["firstName"] = !event.target.value.match(nameRegex) && event.target.value;
        break;
      case "lastName":
        errorNew["lastName"] = !event.target.value.match(nameRegex) && event.target.value;
        break;
      case "email":
        errorNew["email"] = !event.target.value.match(emailRegex);
        break;
      case "nsfw":
        break;
      case "password":
        errorNew["password"] = !event.target.value.match(passwordRegex);
        if (passwordForm.confirmPassword !== '') {
          errorNew["confirmPassword"] = event.target.value !== formNew.confirmPassword;
        }
        break;
      case "confirmPassword":
        errorNew["confirmPassword"] = event.target.value !== formNew.password;
        break;
    }
    setError({ ...errorNew });

  };


  const handleSubmit = (e) => {
    setIsPending(true);
    updateProfile();
  };



  const handleOpen = (event) => {
    switch (event.target.name) {
      case "changePasswordLink":
        setOpenDialog(true);
        break;
    }
  };

  const handleClick = (event) => {
    switch (event.target.name) {
      case "nsfw":
        setProfileFormChanged(true);
        setProfileForm({ ...profileForm, nsfw: !profileForm.nsfw });
        break;
      case "cancel":
        setProfileForm({ ...profileForm });
        setPasswordForm({ ...defaultPasswordForm });
        setError({ ...error, password: false });
        setError({ ...error, confirmPassword: false });
        setOpenDialog(false);
        break;
      case "updatePassword":
        setIsUpdatePasswordPending(true);
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
                User Profile
              </Typography>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  error={error.firstName}
                  onChange={validate}
                  helperText={error.firstName ? "Invalid first name format." : ""}
                  value={profileForm.firstName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  error={error.lastName}
                  onChange={validate}
                  helperText={error.lastName ? "Invalid last name format." : ""}
                  value={profileForm.lastName}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                required
                id="email"
                label="Email"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                value={profileForm.email}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                multiline
                rows={4}
                id="bio"
                name="bio"
                label="Bio"
                error={error.bio}
                onChange={validate}
                helperText={error.bio ? "Invalid bio format." : ""}
                value={profileForm.bio}
                fullWidth
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                label="Show Adult Content"
                control={<Switch
                  id="nsfw"
                  name="nsfw"
                  checked={profileForm.nsfw}
                  onClick={handleClick}
                />}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                type="submit"
                onClick={handleSubmit}
                loading={isPending}
                disabled={!profileFormChanged || Object.keys(error).some(k => error[k]) || !profileForm.email || openDialog}
                variant="contained"
                fullWidth
              >
                Submit
              </LoadingButton>
            </Grid>
            <Grid item>
              <Button
                id="changePasswordLink"
                name="changePasswordLink"
                variant="text"
                href="#contained-buttons"
                onClick={handleOpen}
                fullWidth>
                Change Password?
              </Button>
            </Grid>
          </Grid>
        </Card>
        <Dialog open={openDialog}>
          <DialogTitle>Change Password</DialogTitle>
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
              loading={isUpdatePasswordPending}
              disabled={Object.keys(error).some(k => error[k]) || !passwordForm.password || !passwordForm.confirmPassword}
              variant="contained"
            >
              Update
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid >

  );
};

export default UserProfile;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";
import  { useState } from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.primary.main, // You can customize the color here
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

export default function Form() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const location = useLocation();
  const { file } = location.state;
  const classes = useStyles();
  // const formData = new FormData();
  // formData.append("file", file);

  const handleUpload_refactor = (event) => {
    event.preventDefault();
    setClick(true);
    setIsLoading(true);
  
    // Collect data from form fields
    const formData = new FormData();
    formData.append("file", file);
  
    // Append additional form fields to the FormData object
    formData.append("field1", event.target.field1.value);
    formData.append("field2", event.target.field2.value);
    formData.append("field3", event.target.field3.value);
    formData.append("field4", event.target.field4.value);
    formData.append("field5", event.target.field5.value);
    formData.append("field6", event.target.field6.value);
    formData.append("field7", event.target.field7.value);
    formData.append("field8", event.target.field8.value);
    formData.append("field9", event.target.field9.value);
    formData.append("field10", event.target.field10.value);

    // Add more formData.append statements for additional fields
  
    axios
      .post("http://localhost:5001/refactor", formData)
      .then((response) => {
        if (!response.data || !response.data.refactored_csv) {
          navigate('/error_in_backend');
          return;
        }
  
        // Download refactored CSV
        const blob = new Blob([response.data.refactored_csv], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'refactored_data.csv';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  


  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" className={classes.heading}>
        Customize Refactoring by Inputting the Following Fields
      </Typography>
      <form onSubmit={handleUpload_refactor}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 1"
              variant="outlined"
              fullWidth
              className={classes.textField}
              name="field1"
            />
          </Grid>
          {/* Add more TextField components for additional fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 2"
              variant="outlined"
              fullWidth
              className={classes.textField}
              name="field2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 3"
              variant="outlined"
              fullWidth
              className={classes.textField}
              name="field3"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 4"
              variant="outlined"
              fullWidth
              className={classes.textField}
              name="field4"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 5"
              variant="outlined"
              fullWidth
              className={classes.textField}
              name="field5"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 6"
              variant="outlined"
              fullWidth
              className={classes.textField}
              name="field6"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 7"
              variant="outlined"
              fullWidth
              className={classes.textField}
              name="field7"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 8"
              variant="outlined"
              fullWidth
              className={classes.textField}
              name="field8"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 9"
              variant="outlined"
              fullWidth
              className={classes.textField}
              name="field9"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 10"
              variant="outlined"
              fullWidth
              className={classes.textField}
              name="field10"
            />
          </Grid>
          
          {/* Add more TextField components for additional fields */}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submitButton}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

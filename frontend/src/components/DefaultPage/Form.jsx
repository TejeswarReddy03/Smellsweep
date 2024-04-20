import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" className={classes.heading}>
        Customize Refactoring by Inputting the Following Fields
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 1"
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          {/* Add more TextField components for additional fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 2"
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 3"
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 4"
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 5"
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 6"
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 7"
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 8"
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 9"
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Field 10"
              variant="outlined"
              fullWidth
              className={classes.textField}
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

import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme/theme'

import Registration from './index'

// const theme = createMuiTheme({
//     stepper: {
//       iconColor: '#DAE7DE'
//     },
//     overrides: {
//       MuiStepIcon: {
//         root: {
//           color: '#DAE7DE',
//           '&$completed': {
//             color: '#44C767',
//           },
//           '&$active': {
//             color: '#44C767',
//           },
//           '&$disabled': {
//           color: '#DAE7DE',
//           },
//         },
//       active: {},
//       completed: {},
//       disabled: {}
//     },
//   },
// })

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // color: '#E6E6ED',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  active: {
      color: '#44C767'
  }
}));

function getSteps() {
  return ['Create account', 'Owner Information', 'Dog Information', 'Preferences and Dealbreakers'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

export default function ProgressBar() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
        {/* <ThemeProvider theme={theme}> */}
            <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
            ))}
            </Stepper>
        {/* </ThemeProvider> */}
      <Registration handleNext={handleNext} handleBack={handleBack} />
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

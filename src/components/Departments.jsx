import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const departments = [
  {
    name: "Cardiology",
    imageURL: "https://img.freepik.com/free-vector/human-internal-organ-with-heart_1308-108889.jpg?t=st=1721319684~exp=1721323284~hmac=91b565dfbff476cd0cc3438e05f7e0a2704132a25769c1aa9afc1e920860da0d&w=740"
  },
  {
    name: "Neurology",
    imageURL: "https://img.freepik.com/premium-vector/dopamine-pathway-human-brain-monoamine-neurotransmitter-motor-control-vector-illustration_206049-1155.jpg?w=740"
  },
  {
    name: "Orthopedics",
    imageURL: "https://img.freepik.com/free-photo/specialist-explaining-human-skeleton-retired-woman-checkup-visit-talking-about-bones-injury-osteopathy-appointment-covid-19-pandemic-doctor-showing-joint-model-patient_482257-39991.jpg?t=st=1721319591~exp=1721323191~hmac=7e068f3383d04fc27bc83ee124ec4caa55cc65d512f558ff3f6aeb186ebdf272&w=740"
  },
  {
    name: "Pediatrics",
    imageURL: "https://th.bing.com/th/id/R.ba58b711e8bdf74fea8db16faf962f1b?rik=83vCHjxilBaB4Q&pid=ImgRaw&r=0"
  },
  {
    name: "Oncology",
    imageURL: "https://cdn-icons-png.flaticon.com/512/7284/7284118.png"
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = departments.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (

    <>
    <h1 className='text-3xl md:text-5xl mt-10 ml-24 font-bold'>Departments:</h1>
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
       
        bgcolor: 'background.default',
        padding: 2
      }}
    >
      <Box sx={{ maxWidth: { xs: 300, sm: 400 }, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography >{departments[activeStep].name}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {departments.map((department, index) => (
            <div key={department.name}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: { xs: 200, sm: 255 },
                    display: 'block',
                    maxWidth: { xs: 300, sm: 400 },
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={department.imageURL}
                  alt={department.name}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </Box>
    </>
  );
}

export default SwipeableTextMobileStepper;

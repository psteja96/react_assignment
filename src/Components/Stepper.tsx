import React from 'react';
import { Box, Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../Store/hooks.ts';
import type {RootState} from "../Store/store.ts";

const steps = ['Personal Info', 'Address', 'Education', 'Employment'];

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    '& .MuiStepConnector-line': {
        borderColor: theme.palette.primary.main,
    },
}));

const StepperComponent: React.FC = () => {
    const activeStep = useAppSelector((state: RootState) => state.form.activeStep);
    const completedSteps = useAppSelector((state: RootState) => state.form.completedSteps);

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Stepper
                activeStep={activeStep}
                connector={<CustomStepConnector />}
                alternativeLabel
            >
                {steps.map((label, index) => (
                    <Step key={label} completed={completedSteps.includes(index)}>
                        <StepLabel
                            sx={{
                                '& .MuiStepLabel-label': {
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: activeStep === index ? 'primary.main' : 'text.secondary',
                                }
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default StepperComponent;
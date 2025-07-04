import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';

import { useAppSelector } from '../Store/hooks.ts';
import type {RootState} from "../Store/store.ts";
import PersonalInfoForm from "./BasicInfo.tsx";
import AddressForm from "./Address.tsx";
import EducationForm from "./Education.tsx";
import EmploymentForm from "./WorkExperience.tsx";
import StepperComponent from "../Components/Stepper.tsx";

const MultiStepForm: React.FC = () => {
    const activeStep = useAppSelector((state: RootState) => state.form.activeStep);

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <PersonalInfoForm />;
            case 1:
                return <AddressForm />;
            case 2:
                return <EducationForm />;
            case 3:
                return <EmploymentForm />;
            default:
                throw new Error('Unknown step');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Multi-Step Form
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Complete all steps to submit your information
                </Typography>
            </Box>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <StepperComponent />
                <Box sx={{ mt: 2 }}>
                    {getStepContent(activeStep)}
                </Box>
            </Paper>
        </Container>
    );
};

export default MultiStepForm;
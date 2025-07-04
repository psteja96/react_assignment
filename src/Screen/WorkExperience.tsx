import React from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hooks.ts';
import type {RootState} from "../Store/store.ts";
import {updateEmploymentInfo, completeStep, resetForm, setActiveStep} from '../Store/Slices/formSlice.ts';
import { Box, TextField, Button, Grid, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const EmploymentForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const employmentInfo = useAppSelector((state: RootState) => state.form.employmentInfo);
    const [currentJob, setCurrentJob] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateEmploymentInfo({ [name]: value }));
    };

    const handleDateChange = (name: string, date: Date | null) => {
        dispatch(updateEmploymentInfo({ [name]: date }));
    };

    const handleBack = () => {
        dispatch(setActiveStep(2));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(completeStep(3));

        // In a real app, you would submit the form data to a server here
        console.log('Form submission complete');

        // Reset form after submission
        setTimeout(() => {
            dispatch(resetForm());
        }, 2000);
    };

    const handleCurrentJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentJob(e.target.checked);
        if (e.target.checked) {
            dispatch(updateEmploymentInfo({ endDate: null }));
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Employment Information
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="companyName"
                        name="companyName"
                        label="Company Name"
                        value={employmentInfo.companyName}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="jobTitle"
                        name="jobTitle"
                        label="Job Title"
                        value={employmentInfo.jobTitle}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Start Date"
                            value={employmentInfo.startDate}
                            onChange={(date) => handleDateChange('startDate', date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            inputFormat="MM/dd/yyyy"
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="End Date"
                            value={employmentInfo.endDate}
                            onChange={(date) => handleDateChange('endDate', date)}
                            disabled={currentJob}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            inputFormat="MM/dd/yyyy"
                        />
                    </LocalizationProvider>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={currentJob}
                                onChange={handleCurrentJobChange}
                                color="primary"
                            />
                        }
                        label="I currently work here"
                        sx={{ mt: 1 }}
                    />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleBack}
                        sx={{ minWidth: 120 }}
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ minWidth: 120 }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EmploymentForm;
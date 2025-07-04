import React from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hooks.ts';
import type {RootState} from "../Store/store.ts";
import { updateEducationInfo, completeStep, setActiveStep } from '../Store/Slices/formSlice.ts';
import { Box, TextField, Button, Grid, Typography, MenuItem } from '@mui/material';

const degrees = [
    'High School',
    'Associate Degree',
    "Bachelor's Degree",
    "Master's Degree",
    'Doctorate',
    'Other'
];

const EducationForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const educationInfo = useAppSelector((state: RootState) => state.form.educationInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateEducationInfo({ [name]: value }));
    };

    const handleBack = () => {
        dispatch(setActiveStep(1));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(completeStep(2));
        dispatch(setActiveStep(3));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Education Information
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="highestDegree"
                        name="highestDegree"
                        select
                        label="Highest Degree"
                        value={educationInfo.highestDegree}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {degrees.map((degree) => (
                            <MenuItem key={degree} value={degree}>
                                {degree}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="institution"
                        name="institution"
                        label="Institution"
                        value={educationInfo.institution}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="graduationYear"
                        name="graduationYear"
                        label="Year of Graduation"
                        type="number"
                        inputProps={{ min: 1900, max: new Date().getFullYear() }}
                        value={educationInfo.graduationYear}
                        onChange={handleChange}
                        variant="outlined"
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
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EducationForm;
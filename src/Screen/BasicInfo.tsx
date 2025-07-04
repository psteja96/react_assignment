import React from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hooks.ts';
//import { RootState } from '../../app/store';
import { updatePersonalInfo, completeStep, setActiveStep } from '../Store/Slices/formSlice.ts';
import { Box, TextField, Button, Grid, Typography, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { format } from 'date-fns';
import type {RootState} from "../Store/store.ts";

const PersonalInfoForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const personalInfo = useAppSelector((state: RootState) => state.form.personalInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updatePersonalInfo({ [name]: value }));
    };

    const handleDateChange = (date: Date | null) => {
        dispatch(updatePersonalInfo({ dateOfBirth: date }));
    };

    const handlePhoneChange = (value: string) => {
        dispatch(updatePersonalInfo({ phoneNumber: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(completeStep(0));
        dispatch(setActiveStep(1));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Personal Information
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Box sx={{
                        border: '1px solid rgba(0, 0, 0, 0.23)',
                        borderRadius: '4px',
                        padding: '16.5px 14px',
                        '&:hover': {
                            borderColor: 'rgba(0, 0, 0, 0.87)'
                        },
                        '&:focus-within': {
                            borderColor: '#1976d2',
                            borderWidth: '2px'
                        }
                    }}>
                        <PhoneInput
                            international
                            defaultCountry="US"
                            value={personalInfo.phoneNumber}
                            onChange={handlePhoneChange}
                            placeholder="Enter phone number"
                            style={{
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                fontSize: '1rem',
                                fontFamily: 'Roboto, sans-serif'
                            }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Birth"
                            value={personalInfo.dateOfBirth}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            inputFormat="dd/MM/yyyy"
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
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

export default PersonalInfoForm;
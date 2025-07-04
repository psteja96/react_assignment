import React from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hooks.ts';
import type {RootState} from "../Store/store.ts";
import { updateAddressInfo, completeStep, setActiveStep } from '../Store/Slices/formSlice.ts';
import { Box, TextField, Button, Grid, Typography, MenuItem } from '@mui/material';

const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const AddressForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const addressInfo = useAppSelector((state: RootState) => state.form.addressInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateAddressInfo({ [name]: value }));
    };

    const handleBack = () => {
        dispatch(setActiveStep(0));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(completeStep(1));
        dispatch(setActiveStep(2));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Address Information
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="street"
                        name="street"
                        label="Street Address"
                        value={addressInfo.street}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="city"
                        name="city"
                        label="City"
                        value={addressInfo.city}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="state"
                        name="state"
                        select
                        label="State"
                        value={addressInfo.state}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {states.map((state) => (
                            <MenuItem key={state} value={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="zipCode"
                        name="zipCode"
                        label="ZIP / Postal Code"
                        value={addressInfo.zipCode}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="country"
                        name="country"
                        label="Country"
                        value={addressInfo.country}
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

export default AddressForm;
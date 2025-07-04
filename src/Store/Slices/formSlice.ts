import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
    activeStep: number;
    completedSteps: number[];
    personalInfo: {
        fullName: string;
        phoneNumber: string;
        dateOfBirth: Date | null;
        email: string;
    };
    addressInfo: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    educationInfo: {
        highestDegree: string;
        institution: string;
        graduationYear: string;
    };
    employmentInfo: {
        companyName: string;
        jobTitle: string;
        startDate: Date | null;
        endDate: Date | null;
    };
}

const initialState: FormState = {
    activeStep: 0,
    completedSteps: [],
    personalInfo: {
        fullName: '',
        phoneNumber: '',
        dateOfBirth: null,
        email: ''
    },
    addressInfo: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    },
    educationInfo: {
        highestDegree: '',
        institution: '',
        graduationYear: ''
    },
    employmentInfo: {
        companyName: '',
        jobTitle: '',
        startDate: null,
        endDate: null
    }
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setActiveStep: (state, action: PayloadAction<number>) => {
            state.activeStep = action.payload;
        },
        completeStep: (state, action: PayloadAction<number>) => {
            if (!state.completedSteps.includes(action.payload)) {
                state.completedSteps.push(action.payload);
            }
        },
        updatePersonalInfo: (state, action: PayloadAction<Partial<FormState['personalInfo']>>) => {
            state.personalInfo = { ...state.personalInfo, ...action.payload };
        },
        updateAddressInfo: (state, action: PayloadAction<Partial<FormState['addressInfo']>>) => {
            state.addressInfo = { ...state.addressInfo, ...action.payload };
        },
        updateEducationInfo: (state, action: PayloadAction<Partial<FormState['educationInfo']>>) => {
            state.educationInfo = { ...state.educationInfo, ...action.payload };
        },
        updateEmploymentInfo: (state, action: PayloadAction<Partial<FormState['employmentInfo']>>) => {
            state.employmentInfo = { ...state.employmentInfo, ...action.payload };
        },
        resetForm: () => initialState
    }
});

export const {
    setActiveStep,
    completeStep,
    updatePersonalInfo,
    updateAddressInfo,
    updateEducationInfo,
    updateEmploymentInfo,
    resetForm
} = formSlice.actions;

export default formSlice.reducer;
/**
 * Required external modules
 */
/** Material UI */
import { CheckboxProps, FormControlLabelProps, FormControlLabelProps, InputProps } from '@mui/material';
/** React */
import React from 'react';

export interface LoginForm {
	userId: string;
	password: string;
	rememberMe: boolean;
}

export interface RegistrationForm {
	userId: string;
	name: string;
	password: string;
	passwordConfirmation: string;
}

export interface SearchTourForm {
	searchTour: string;
}

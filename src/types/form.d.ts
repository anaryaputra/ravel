/**
 * Required external modules
 */
/** Material UI */
import { CheckboxProps, FormControlLabelProps, FormControlLabelProps, InputProps } from '@mui/material';

export interface LoginForm {
	userId: string;
	password: string;
	rememberMe?: boolean;
}

export interface RegistrationForm {
	userId: string;
	name: string;
	password: string;
	confirmationPassword: string;
}
export interface FormTextFieldProps extends InputProps {
	error?: boolean | undefined;
	helperText?: string | false | undefined;
	label?: string | undefined;
}
export interface FormCheckboxProps extends CheckboxProps {
	label?: string | undefined;
	labelProps?: FormControlLabelProps | undefined;
}

export interface SearchTourForm {
	keyword: string;
}

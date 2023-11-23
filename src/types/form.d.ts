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

export interface FormTextFieldProps extends InputProps {
	error?: boolean | undefined;
	helperText?: string | false | undefined;
	label?: string | undefined;
}

// export interface FormCheckboxProps extends CheckboxProps {
export interface FormCheckboxProps extends CheckboxProps {
	label?: string | undefined;
	labelProps?: FormControlLabelProps | undefined;
}

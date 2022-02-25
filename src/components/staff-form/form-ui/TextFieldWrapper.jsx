import React from 'react';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';

const TextFieldWrapper = ({ name, ...rest }) => {

	const [field, meta] = useField(name);

	const configTextField = {
		...field,
		...rest,
		fullWidth: true,
		variant: 'outlined'
	}

	if (meta && meta.touched && meta.error) {
		configTextField.error = true;
		configTextField.helperText = meta.error;
	}

	return (
		<TextField {...configTextField} />
	);
};

export default TextFieldWrapper;

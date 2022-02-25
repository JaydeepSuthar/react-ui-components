import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import { useField, useFormikContext } from 'formik';

const RadioButtonWrapper = ({ name, ...rest }) => {

	// const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	// const handleChange = e => {
	// 	const { value } = e.target;
	// 	setFieldValue(name, value);
	// };

	const configTextField = {
		...field,
		...rest,
		// fullWidth: true,
		// variant: 'outlined',
		// onChange: handleChange
	};

	if (meta && meta.touched && meta.error) {
		configTextField.error = true;
		configTextField.helperText = meta.error;
	}

	return (
		// <TextField type='radio'{...configTextField} />
		<FormControlLabel {...configTextField} control={<Radio />} />
	);
};

export default RadioButtonWrapper;

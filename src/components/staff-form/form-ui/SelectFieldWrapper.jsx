import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useField, useFormikContext } from 'formik';

const SelectFieldWrapper = ({ name, options, ...rest }) => {

	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = e => {
		const { value } = e.target;
		setFieldValue(name, value);
	};

	const configTextField = {
		...field,
		...rest,
		select: true,
		fullWidth: true,
		variant: 'outlined',
		onChange: handleChange
	};

	if (meta && meta.touched && meta.error) {
		configTextField.error = true;
		configTextField.helperText = meta.error;
	}

	return (
		<TextField {...configTextField}>
			{
				Object.keys(options).map((item, pos) => {
					return (
						<MenuItem keys={pos} value={item}>
							{options[item]}
						</MenuItem>
					);
				})
			}
		</TextField>
	);
};

export default SelectFieldWrapper;

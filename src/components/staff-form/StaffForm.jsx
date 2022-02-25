import { Formik, Form, Field, getIn } from "formik";
import * as Yup from 'yup';

import { Grid, Paper, RadioGroup, Typography, Button } from "@mui/material";

import TextFieldWrapper from "./form-ui/TextFieldWrapper";
import SelectFieldWrapper from "./form-ui/SelectFieldWrapper";
import RadioButtonWrapper from "./form-ui/RadioButtonWrapper";

const phoneNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const staffRoleOptions = {
	'deliveryBoy': 'Delivery Boy',
	'staff': 'Staff'
};

const StaffSchema = Yup.object().shape({
	name: Yup.object().shape({
		firstName: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		lastName: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
	}),
	number: Yup.string()
		.matches(phoneNumberRegex, 'Phone Number is not Valid')
		.required('Required'),
	gender: Yup.string().required(),
	address: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	state: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	city: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	role: Yup.mixed()
		.oneOf(['deliveryBoy', 'staff'])
		.required()
});

export const AatmiyaStaffForm = () => {
	return (
		<>
			<Formik
				initialValues={{
					name: {
						firstName: "",
						lastName: "",
					},
					number: "",
					gender: "",
					address: "",
					state: "",
					city: "",
					role: "",
				}}
				validationSchema={StaffSchema}
				onSubmit={(data, { resetForm }) => {
					alert(JSON.stringify(data, null, 2));
					resetForm({ data: '' });
				}}
			>
				{({
					isValid,
				}) => (
					<Paper sx={{ padding: "1.5rem", borderRadius: 4, marginTop: 10 }} elevation={2}>
						<Typography variant="h4">Staff Form</Typography>
						<Form className="flex" style={{ marginTop: '20px' }}>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<TextFieldWrapper
										name="name.firstName"
										label="First Name"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextFieldWrapper
										name="name.lastName"
										label="Last Name"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextFieldWrapper
										name="number"
										label="Phone Number"
									/>
								</Grid>
								<Grid item xs={12}>
									<RadioGroup row>
										<RadioButtonWrapper
											name="gender"
											label="Male"
											value="male"
										/>
										<RadioButtonWrapper
											name="gender"
											label="Female"
											value="female"
										/>
									</RadioGroup>
								</Grid>

								<Grid item xs={12}>
									<TextFieldWrapper
										name="address"
										label="Adress"
										multiline
										rows={4}
									/>
								</Grid>

								<Grid item xs={6}>
									<TextFieldWrapper
										name="state"
										label="State"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextFieldWrapper
										name="city"
										label="City"
									/>
								</Grid>
								<Grid item xs={12}>
									<SelectFieldWrapper
										name="role"
										label="Staff Role"
										options={staffRoleOptions}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button disabled={Boolean(!isValid)} type="submit" variant="contained" color="success">Save</Button>
								</Grid>
							</Grid>
							{/* <pre>{JSON.stringify(values, null, 2)}</pre>
							<pre>{JSON.stringify(errors, null, 2)}</pre> */}
						</Form>
					</Paper>
				)}
			</Formik>
		</>
	);
};

export default AatmiyaStaffForm;

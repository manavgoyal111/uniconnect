import { useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import {
	Grid,
	Stack,
	TextField,
	Checkbox,
	FormGroup,
	FormControlLabel,
	RadioGroup,
	Radio,
	FormLabel,
	FormControl,
	Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";

const Add = () => {
	const [form, setForm] = useState({
		title: "",
		type: "",
		size: "",
		color: "",
		slug: "",
		description: "",
	});

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const submitForm = async (e) => {
		e.preventDefault();

		// const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/add`);
		// const response = await res.json();
		// console.log(response);
	};

	return (
		<>
			<Head>
				<title>Add | Dashboard | Uniconnect</title>
				<meta name="description" content="Sareewear Dashboard Add products" />
			</Head>

			<ThemeProvider theme={theme}>
				<FullLayout>
					<Grid container spacing={0}>
						<Grid item xs={12} lg={12}>
							<BaseCard title="Add a Product" className="text-green-500">
								<Stack spacing={3}>
									<TextField
										value={form.title}
										onChange={onChange}
										name="title"
										label="Title"
										variant="outlined"
									/>
									<TextField
										value={form.type}
										onChange={onChange}
										name="type"
										label="Type"
										variant="outlined"
									/>
									<TextField
										value={form.size}
										onChange={onChange}
										name="size"
										label="Size"
										variant="outlined"
									/>
									<TextField
										value={form.color}
										onChange={onChange}
										name="color"
										label="Color"
										variant="outlined"
									/>
									<TextField
										value={form.slug}
										onChange={onChange}
										name="slug"
										label="Slug"
										variant="outlined"
									/>
									<TextField
										value={form.description}
										onChange={onChange}
										name="description"
										label="Description"
										multiline
										rows={3}
									/>
									<FormGroup>
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Terms & Condition"
										/>
										<FormControlLabel
											disabled
											control={<Checkbox />}
											label="Disabled"
										/>
									</FormGroup>
									<FormControl>
										<FormLabel
											value={form.title}
											onChange={onChange}
											name="demo-radio-buttons-group-label"
										>
											Gender
										</FormLabel>
										<RadioGroup
											aria-labelledby="demo-radio-buttons-group-label"
											defaultValue="male"
											name="radio-buttons-group"
										>
											<FormControlLabel
												value="female"
												control={<Radio />}
												label="Female"
											/>
											<FormControlLabel
												value="male"
												control={<Radio />}
												label="Male"
											/>
											<FormControlLabel
												value="other"
												control={<Radio />}
												label="Other"
											/>
										</RadioGroup>
									</FormControl>
								</Stack>
								<br />
								<Button onClick={submitForm} variant="outlined" mt={2}>
									Submit
								</Button>
							</BaseCard>
						</Grid>
					</Grid>
				</FullLayout>
			</ThemeProvider>
		</>
	);
};

export default Add;

import { useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import {
	Grid,
	Stack,
	TextField,
	Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";

const AddCab = () => {
	const [form, setForm] = useState({
		from: "",
		to: "",
		email: "",
		time: "",
		price: "",
		desc: "",
		contact: "",
	});

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const submitForm = async (e) => {
		e.preventDefault();

		const settings = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: form.from,
				to: form.to,
				email: form.email,
				time: form.time,
				price: form.price,
				desc: form.desc,
				contact: form.contact,
			})
		};

		const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addcabs`, settings);
		const response = await res.json();

		if (response.success) {
			setForm({
				from: "",
				to: "",
				email: "",
				time: "",
				price: "",
				desc: "",
				contact: "",
			})
		}
	};

	return (
		<>
			<Head>
				<title>Add Cab | Admin | Uniconnect</title>
				<meta name="description" content="Admin Dashboard Add cab" />
			</Head>

			<ThemeProvider theme={theme}>
				<FullLayout>
					<Grid container spacing={0}>
						<Grid item xs={12} lg={12}>
							<BaseCard title="Add a Cab request" className="text-green-500">
								<Stack spacing={3}>
									<TextField
										value={form.from}
										onChange={onChange}
										name="from"
										label="From"
										variant="outlined"
									/>
									<TextField
										value={form.to}
										onChange={onChange}
										name="to"
										label="To"
										variant="outlined"
									/>
									<TextField
										value={form.email}
										onChange={onChange}
										name="email"
										label="Email"
										variant="outlined"
									/>
									<TextField
										value={form.time}
										onChange={onChange}
										name="time"
										label="Time"
										variant="outlined"
									/>
									<TextField
										value={form.price}
										onChange={onChange}
										name="price"
										label="Price"
										variant="outlined"
									/>
									<TextField
										value={form.contact}
										onChange={onChange}
										name="contact"
										label="Contact"
										variant="outlined"
									/>
									<TextField
										value={form.desc}
										onChange={onChange}
										name="desc"
										label="Desc"
										multiline
										rows={3}
									/>
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

export default AddCab;

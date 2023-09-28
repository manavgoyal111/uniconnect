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

const AddProd = () => {
	const [form, setForm] = useState({
		title: "",
		slug: "",
		desc: "",
		price: "",
		category: "",
		img: "",
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
				title: form.title,
				slug: form.slug,
				desc: form.desc,
				price: form.price,
				category: form.category,
				img: form.img,
			})
		};

		const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, settings);
		const response = await res.json();

		if (response.success) {
			setForm({
				title: "",
				slug: "",
				desc: "",
				price: "",
				category: "",
				img: "",
			})
		}
	};

	return (
		<>
			<Head>
				<title>Add Product | Admin | Uniconnect</title>
				<meta name="description" content="Admin Dashboard Add cab" />
			</Head>

			<ThemeProvider theme={theme}>
				<FullLayout>
					<Grid container spacing={0}>
						<Grid item xs={12} lg={12}>
							<BaseCard title="Add a Cab request" className="text-green-500">
								<Stack spacing={3}>
									<TextField
										value={form.title}
										onChange={onChange}
										name="title"
										label="Title"
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
										value={form.price}
										onChange={onChange}
										name="price"
										label="Price"
										variant="outlined"
									/>
									<TextField
										value={form.category}
										onChange={onChange}
										name="category"
										label="Category"
										variant="outlined"
									/>
									<TextField
										value={form.img}
										onChange={onChange}
										name="img"
										label="Image"
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

export default AddProd;

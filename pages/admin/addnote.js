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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProd = () => {
	const [form, setForm] = useState({
		title: "",
		slug: "",
		desc: "",
		price: "",
		category: "",
		img: "",
		pdf: "",
	});

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const submitForm = async (e) => {
		e.preventDefault();

		if (form.title == "" || form.slug == "" || form.desc == "" || form.price == "" || form.category == "" || form.img == "" || form.pdf == "") {
			toast.error("Fill the form", {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return;
		}

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
				pdf: form.pdf,
			})
		};

		const check = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/check`, settings);
		const checkRes = await check.json();
		if (!checkRes.status) {
			toast.error("Document is not valid!", {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return;
		}

		const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproduct`, settings);
		const response = await res.json();

		if (response.success) {
			toast.success("Note Added!", {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setForm({
				title: "",
				slug: "",
				desc: "",
				price: "",
				category: "",
				img: "",
				pdf: "",
			})
		} else {
			toast.error("Error Occurred!", {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<>
			<Head>
				<title>Add Note | Admin | Uniconnect</title>
				<meta name="description" content="Admin Dashboard for adding note" />
			</Head>

			<ToastContainer
				position="top-left"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<ThemeProvider theme={theme}>
				<FullLayout>
					<Grid container spacing={0}>
						<Grid item xs={12} lg={12}>
							<BaseCard title="Add a new product" className="text-green-500">
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
									<TextField
										value={form.pdf}
										label="PDF"
										variant="outlined"
									/>
									<Button
										variant="contained"
										component="label"
									>
										Upload File
										<input
											type="file"
											value={form.pdf}
											onChange={onChange}
											name="pdf"
											label="PDF"
											hidden
										/>
									</Button>
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

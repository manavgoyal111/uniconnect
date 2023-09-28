import Head from "next/head";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import Products from "../../src/components/dashboard/Products";

const Index = ({ products }) => {
	return (
		<>
			<Head>
				<title>Dashboard | Admin | Uniconnect</title>
				<meta name="description" content="Uniconnect Dashboard" />
			</Head>

			<ThemeProvider theme={theme}>
				<FullLayout>
					<Grid container spacing={0}>
						<Grid item xs={12} lg={12}>
							<Products products={products} />
						</Grid>
					</Grid>
				</FullLayout>
			</ThemeProvider>
		</>
	);
};

export async function getServerSideProps(context) {
	if (!mongoose.connections[0].readyState) {
		await mongoose.connect(process.env.MONGO_URI);
	}

	const products = await Product.find();

	return { props: { products: JSON.parse(JSON.stringify(products)) } };
}

export default Index;

import Head from "next/head";
import mongoose from "mongoose";
import { ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Product from "../../models/Product";
import Products from "../../src/components/dashboard/Products";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";

const AllProducts = ({ products }) => {
	return (
		<>
			<Head>
				<title>All Products | Dashboard | Uniconnect</title>
				<meta name="description" content="Sareewear Dashboard show All Products" />
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

export default AllProducts;

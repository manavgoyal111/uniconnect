import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Products from "../../src/components/dashboard/Products";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";

const AllOrders = () => {
	return (
		<>
			<Head>
				<title>All Orders | Dashboard | Uniconnect</title>
				<meta name="description" content="Sareewear Dashboard All Orders" />
			</Head>

			<ThemeProvider theme={theme}>
				<FullLayout>
					<Grid container spacing={0}>
						{/* <Grid item xs={12} lg={12}>
							<Products />
						</Grid> */}
					</Grid>
				</FullLayout>
			</ThemeProvider>
		</>
	);
};

export default AllOrders;

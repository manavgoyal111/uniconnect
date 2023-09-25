import Head from "next/head";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import Products from "../../src/components/dashboard/Products";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";

const Index = () => {
	return (
		<>
			<Head>
				<title>Dashboard | Uniconnect</title>
				<meta name="description" content="Sareewear Dashboard" />
			</Head>

			<ThemeProvider theme={theme}>
				<FullLayout>
					<Grid container spacing={0}>
						<Grid item xs={12} lg={12}>
							<SalesOverview />
						</Grid>
						{/* ------------------------- row 1 ------------------------- */}
						<Grid item xs={12} lg={4}>
							<DailyActivity />
						</Grid>
						{/* <Grid item xs={12} lg={8}>
							<Products />
						</Grid> */}
						<Grid item xs={12} lg={12}>
							<BlogCard />
						</Grid>
					</Grid>
				</FullLayout>
			</ThemeProvider>
		</>
	);
};

export default Index;

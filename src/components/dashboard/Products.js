import React from "react";
import Image from "next/image";
import {
	Typography,
	Box,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const Products = ({ products }) => {
	return (
		<BaseCard title="All Products">
			<Table
				aria-label="simple table"
				sx={{
					whiteSpace: "nowrap",
				}}
			>
				<TableHead>
					<TableRow>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								Title
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								Slug
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								Image
							</Typography>
						</TableCell>
						<TableCell>
							<Typography color="textSecondary" variant="h6">
								Size/Color
							</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography color="textSecondary" variant="h6">
								Price
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products.map((product) => (
						<TableRow key={product._id}>
							<TableCell>
								<Typography
									sx={{
										fontWeight: "600",
									}}
								>
									{product.title}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography>{product.slug}</Typography>
							</TableCell>
							<TableCell>
								<Image src={product.img} alt="Product" height={40} width={40} />
							</TableCell>
							<TableCell>
								<Typography>
									{product.size}/{product.color}
								</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography variant="h6">₹{product.price}</Typography>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</BaseCard>
	);
};

export default Products;

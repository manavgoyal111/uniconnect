import React from "react";

import { Card, CardContent, Divider, Box, Typography, Chip } from "@mui/material";

const BaseCard = (props) => {
	return (
		<Card>
			<Box p={2} display="flex" alignItems="center" className="text-green-500">
				<Typography variant="h3">{props.title}</Typography>
			</Box>
			<CardContent>{props.children}</CardContent>
		</Card>
	);
};

export default BaseCard;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		from: { type: String, required: true },
		to: { type: String, required: true },
		price: { type: Number, required: true },
		time: { type: Number, required: true },
		desc: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.models.Product ||
	mongoose.model("Product", productSchema);

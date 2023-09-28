const mongoose = require("mongoose");

const cabSchema = new mongoose.Schema(
	{
		from: { type: String, required: true },
		to: { type: String, required: true },
		email: { type: String, required: true },
		time: { type: String, required: true },
		price: { type: Number, required: true },
		desc: { type: String },
		contact: { type: Number }
	},
	{ timestamps: true }
);

export default mongoose.models.Cab ||
	mongoose.model("Cab", cabSchema);

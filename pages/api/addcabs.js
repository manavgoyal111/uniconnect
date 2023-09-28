import Cab from "../../models/Cab";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
	if (req.method == "POST") {
		let c = new Cab({
			from: req.body.from,
			to: req.body.to,
			email: req.body.email,
			time: req.body.time,
			price: req.body.price,
			desc: req.body.desc,
			contact: req.body.contact
		});
		await c.save();
		res.status(200).json({ success: true });
	} else {
		res.status(400).json({ success: false, error: "This method is not allowed" });
	}
};

export default connectDb(handler);
